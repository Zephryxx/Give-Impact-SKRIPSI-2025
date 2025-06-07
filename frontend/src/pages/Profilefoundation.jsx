import React, {useState} from 'react'
import '../styles/Profilefoundation.css'
import Headeruser from '../components/Headeruser';
function Profilefoundation() {
    
    const dummyData = [
        {
            nama: 'Bantu Pendidikan Anak Desa',
            donasi: 'Rp. 12.500.000',
            donatur: 145,
            tanggal: '12 Juni 2025',
            progress: 60,
        },
        {
            nama: 'Dukung UMKM Lokal',
            donasi: 'Rp. 7.200.000',
            donatur: 88,
            tanggal: '28 Mei 2025',
            progress: 45,
        },
        {
            nama: 'Bantuan Korban Banjir',
            donasi: 'Rp. 20.000.000',
            donatur: 210,
            tanggal: '30 Juni 2025',
            progress: 80,
        },
        {
            nama: 'Renovasi Mushola Kampung',
            donasi: 'Rp. 5.600.000',
            donatur: 65,
            tanggal: '15 Juli 2025',
            progress: 30,
        },
        {
            nama: 'Pembangunan Sumur Air Bersih',
            donasi: 'Rp. 10.000.000',
            donatur: 120,
            tanggal: '10 Agustus 2025',
            progress: 55,
        },
        {
            nama: 'Sembako untuk Dhuafa',
            donasi: 'Rp. 8.400.000',
            donatur: 99,
            tanggal: '20 Juni 2025',
            progress: 40,
        },
        {
            nama: 'Beasiswa Santri',
            donasi: 'Rp. 15.750.000',
            donatur: 160,
            tanggal: '25 Juli 2025',
            progress: 70,
        },
    ];

    const [provider, setProvider] = useState("");

    /* Pop Up Edit*/
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        picture: null,
        previewImage: "",
    });
        
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
        
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFormData(prev => ({
            ...prev,
            picture: file,
            previewImage: URL.createObjectURL(file),
        }));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
        alert("Form submitted!");

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            picture: null,
            previewImage: "",
        });
        setIsPopupOpen(false);
    };
    
    return (
        <div className="foundation-profile">
            {/* Header */}
            <Headeruser/>

            {/* Profile Section */}
            <div className="profile-section">

                <h2 className="profile-title">Profile</h2>

                <div className="profile-box">
                    <div className="profile-picture"></div>
                    <div className="profile-form">
                        <div className="form-rows">

                            <div className="left-fields">
                                <div className="field">
                                <label className='profile-label'>Foundation:</label>
                                <input className='input-profile' type="text" value="Sejahtera" readOnly/>
                                </div>

                                <div className="field">
                                <label className='profile-label'>Username:</label>
                                <input className='input-profile' type="text" value="Masbro" readOnly/>
                                </div>

                                <div className="field">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile' type="text" value="masbro@gmail.com" readOnly />
                                </div>

                                <div className="field">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile' type="number" value="08112999291" readOnly />
                                </div>

                            </div>

                            <div className="right-field">
                                <div className="field">
                                    <label className='profile-label'>No. Pajak:</label>
                                    <input className='input-profile' type="number" value="0811299232" readOnly />
                                </div>

                                <div className="field">
                                    <label className='profile-label'>Jenis Provider:</label>
                                    <select
                                        className='input-profile'
                                        value={provider}
                                        onChange={(e) => setProvider(e.target.value)}
                                        >
                                        <option value="1"></option>
                                        <option value="a">a</option>
                                        <option value="b">b</option>
                                        <option value="c">c</option>
                                        <option value="d">d</option>
                                        <option value="e">e</option>
                                    </select>
                                </div>

                                <div className="field">
                                    <label className='profile-label'>No. Rekening:</label>
                                    <input className='input-profile' type="number" value="081121491" readOnly />
                                </div>
                            </div>
                        </div>
                        <button className="edit-button"onClick={() => setIsPopupOpen(true)}>Edit Profile</button>

                        {isPopupOpen && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
                                        &times;
                                    </button>

                                    <h2 className='edit-profile-title'>Edit Profile</h2>
                                    <form onSubmit={handleSubmit} className="editprofile-form-user">

                                        <input
                                        className='input-editprofile'
                                        type="text"
                                        name="name"
                                        placeholder="Foundation"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        />

                                        <input
                                        className='input-editprofile'
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        />

                                        <input
                                        className='input-editprofile'
                                        type="text"
                                        name="Email"
                                        placeholder="Email"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        />

                                        <input
                                        className='input-editprofile'
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        />

                                        <input
                                        className='input-editprofile'
                                        type='number'w
                                        name="pajak"
                                        placeholder="No.Pajak"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        />
                                        <input
                                        className='input-editprofile'
                                        type='text'
                                        name="provider"
                                        placeholder="Jenis Provider"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        />
                                        <input
                                        className='input-editprofile'
                                        type='number'
                                        name="rek"
                                        placeholder="No. Rekening"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        />

                                        <input type="file" accept="image/*" onChange={handleImageChange} />

                                        {formData.previewImage && (
                                        <img
                                            src={formData.previewImage}
                                            alt="Preview"
                                            className="preview-image-editprofile"
                                        />
                                        )}

                                        <button type="submit" className='submit-button'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="history-section">
                <h2 className="history-title">Riwayat</h2>
                <div className="history-list">
                    {dummyData.map((tx, index) => (
                        
                        <div key={index} className="history-card">
                            {/* Kiri */}
                            <div className="history-content">
                                <div className="history-title">{tx.title}</div>
                                <div className="history-label">Dana Terkumpul</div>
                                <div className="history-amount">{tx.amount}</div>
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${tx.progress}%` }}></div>
                                </div>
                                <div className="history-details">
                                <span>{tx.donatur} Donatur</span>
                                <span>Berakhir: <b>{tx.tanggal}</b></span>
                                </div>
                            </div>

                            {/* Kanan */}
                                <div className="history-img"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profilefoundation;