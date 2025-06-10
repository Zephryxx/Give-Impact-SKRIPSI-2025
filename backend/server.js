const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "A token is required for authentication" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
    });
};

//#region GET
app.get('/', (req, res) => {
    return res.json({ message: "From Backend Side" });
});

app.get('/users', async (req, res) => {
    const sql = "SELECT User_ID, nama, email, tipe_akun, dibuat FROM `User`";
                                                                            
    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Failed to retrieve users from the database." });
    }
});

const getFoundationIdByUserId = async (userId, connection) => {
    const [foundations] = await connection.execute('SELECT Foundation_ID FROM foundation WHERE user_ID = ?', [userId]);

    if (foundations.length === 0) {
        throw new Error('Foundation profile not found for this user.');
    }
    
    return foundations[0].Foundation_ID;
};
//#endregion

//#region  DATABASE
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'giveimpact',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database.');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

//#endregion

//#region MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/campaign_images/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image file is allowed'), false);
        }
    }
});
//#endregion

//#region REGISTER & LOGIN
app.post('/api/register/donatur', async (req, res) => {
    const { nama, no_telp, email, password } = req.body;

    if (!nama || !no_telp || !email || !password) {
        return res.status(400).json({ message: "All fields (nama, nomor, telepon, email, password) are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(no_telp)) {
        return res.status(400).json({ message: "Invalid phone number format (10-15 digits)." });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }
    if (nama.trim().length < 5) {
        return res.status(400).json({ message: "name must be at least 5 characters." });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const [existingUsers] = await connection.execute('SELECT User_ID FROM `User` WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            await connection.rollback();
            return res.status(409).json({ message: "Email already registered." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const tipe_akun = 'Donatur';

        const userInsertQuery = 'INSERT INTO `User` (nama, email, password, tipe_akun, dibuat) VALUES (?, ?, ?, ?, NOW())';
        const [userResult] = await connection.execute(userInsertQuery, [nama, email, hashedPassword, tipe_akun]);
        
        const newUserId = userResult.insertId;
        if (!newUserId) {
            await connection.rollback();
            throw new Error('Failed to create user record.');
        }

        const donorInsertQuery = 'INSERT INTO Donor (user_ID, no_telp, alamat) VALUES (?, ?, NULL)';
        await connection.execute(donorInsertQuery, [newUserId, no_telp]);

        await connection.commit();

        res.status(201).json({ message: "Donatur registered successfully!" });

    } catch (error) {
        console.error("Error during Donatur registration:", error);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ message: "Registration failed due to a server error." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.post('/api/register/foundation', async (req, res) => {
    const { nama_user, nama_foundation, email, no_telp, password, no_pajak, rekening } = req.body; 

    if (!nama_user || !nama_foundation || !email || !no_telp || !password || !no_pajak || !rekening) {
        return res.status(400).json({ message: "All fields (nama foundation, nama user, email, nomor telepon, password, no_pajak, rekening) are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(no_telp)) {
        return res.status(400).json({ message: "Invalid phone number format (10-15 digits)." });
    }
    if (no_pajak.trim().length < 5) { 
        return res.status(400).json({ message: "Tax number (no_pajak) seems too short." });
    }
    if (!rekening.includes(" - ") || rekening.split(" - ")[0].trim().length < 5 || rekening.split(" - ")[1].trim().length < 2) {
        return res.status(400).json({ message: "Account details (number - provider) format seems incorrect or too short." });
    }
    if (nama_foundation.trim().length < 5) {
        return res.status(400).json({ message: "Foundation name must be at least 5 characters." });
    }
    if (nama_user.trim().length < 5) {
        return res.status(400).json({ message: "name must be at least 5 characters." });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        
        const [existingUsers] = await connection.execute('SELECT User_ID FROM `User` WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            await connection.rollback();
            return res.status(409).json({ message: "Email already registered." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const tipe_akun = 'Foundation'; 
        
        const userInsertQuery = 'INSERT INTO `User` (nama, email, password, tipe_akun, dibuat) VALUES (?, ?, ?, ?, NOW())';
        const [userResult] = await connection.execute(userInsertQuery, [nama_user, email, hashedPassword, tipe_akun]);
        
        const newUserId = userResult.insertId;
        if (!newUserId) {
            await connection.rollback();
            throw new Error('Failed to create user record for foundation.');
        }

const foundationInsertQuery = 'INSERT INTO Foundation (user_ID, nama_foundation, no_telp, no_pajak, rekening) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(foundationInsertQuery, [newUserId, nama_foundation, no_telp, no_pajak, rekening]);

        await connection.commit();
        res.status(201).json({ message: "Foundation registered successfully!" });

    } catch (error) {
        console.error("Error during foundation registration:", error.message, error.stack);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ message: "Foundation registration failed due to a server error." });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    let connection;
    try {
        connection = await db.getConnection();
        
        const findUserQuery = 'SELECT User_ID, nama, email, password AS hashedPassword, tipe_akun FROM `User` WHERE email = ?';
        const [users] = await connection.execute(findUserQuery, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found" }); 
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Wrong password." });
        }

        const payload = {
            userId: user.User_ID,
            email: user.email,
            tipe_akun: user.tipe_akun,
            nama: user.nama
        };

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("FATAL ERROR: JWT_SECRET is not defined.");
            return res.status(500).json({ message: "Server configuration error." });
        }

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.json({
            message: "Login successful!",
            token: token,
            user: {
                id: user.User_ID,
                nama: user.nama,
                email: user.email,
                tipe_akun: user.tipe_akun
            }
        });

    } catch (error) {
        console.error("Error during login:", error.message, error.stack);
        res.status(500).json({ message: "Login failed due to a server error." });
    } finally {
        if (connection) connection.release();
    }
});
//#endregion

//#region FOUNDATION_MENU
app.post('/api/buatkampanye', authenticateToken, upload.single('foto'), async (req, res) => {

    const { userId, tipe_akun } = req.user;
    const { kategori, judul, penerima, deskripsi, rincian, target, tanggalMulai, tanggalBerakhir } = req.body;

    if (tipe_akun !== 'Foundation') {
        return res.status(403).json({ message: "Access denied: only foundation are allowed to create campaign." });
    }
    if (!req.file){
        return res.status(400).json({ message: 'Banner photo must be uploaded' });
    }
    const namaFileGambar = req.file.filename;

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const foundation_ID = await getFoundationIdByUserId(userId, connection);
        
        const query = `
            INSERT INTO kampanye (
                foundation_ID, judul, jenis, nm_penetima, deksripsi, 
                perincian, target_donasi, tgl_mulai, tgl_selesai, gambar
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            foundation_ID, judul, kategori, penerima, deskripsi,
            rincian, target, tanggalMulai, tanggalBerakhir, namaFileGambar
        ];
        
        const [result] = await connection.execute(query, values);
        
        await connection.commit();

        res.status(201).json({ 
            message: "Campaign Succesfully created!",
            kampanyeId: result.insertId
        });

    } catch (error) {
        console.error("Error when creating campaign:", error);

        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ message: "Campaign was failed to create due to server error" });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});
//#endregion

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Server is shutting down...');
    await db.end();
    console.log('Database pool closed.');
    process.exit(0);
});