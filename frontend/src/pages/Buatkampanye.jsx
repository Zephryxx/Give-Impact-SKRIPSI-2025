import '../styles/Buatkampanye.css'
import Headeruser from '../components/Headeruser';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const kategoriOptions = ["Bencana Alam", "Pendidikan", "Darurat", "Kesehatan", "Sosial"];

const Buatkampanye = () => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        kategori: '',
        judul: '',
        penerima: '',
        deskripsi: '',
        rincian: '',
        target: '',
        tanggalMulai: '',
        tanggalBerakhir: '',
        gambar: null,
        previewImage: "",

    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleTargetChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, target: numericValue }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, gambar: file }));
            setError('');
        } else {
            setError('Please select a valid image file (jpg, png, etc).');
            setFormData(prev => ({ ...prev, gambar: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');
        
        const token = authState.token;
        if (!token) {
            setError("Sesi telah berakhir. Silakan login kembali.");
            return;
        }
        
        const { kategori, judul, penerima, deskripsi, rincian, target, tanggalMulai, tanggalBerakhir, gambar } = formData;
        const requiredFields = { kategori, judul, penerima, deskripsi, rincian, target, tanggalMulai, tanggalBerakhir, gambar };
        
        if (Object.values(requiredFields).some(val => val === '' || val === null)) {
            setError("All Fields must be filled");
            return;
        }
        
        if (judul && judul.length < 10) {
            setError("Campaign title must be at least 10 characters long");
            return;
        }
        if (tanggalMulai && tanggalBerakhir) {
            const startDate = new Date(tanggalMulai);
            const endDate = new Date(tanggalBerakhir);
            if (endDate <= startDate) {
                setError("End Date must be after starting date");
                return;
            }
        }
        if (target && parseInt(target) <= 0) {
            setError("Target donation must not be 0");
            return;
        }
        
        setIsLoading(true);

        const dataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            dataToSubmit.append(key, value);
        });

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/buatkampanye`, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`
            },
                body: dataToSubmit,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'An error occured when creating campaign');
            }

            setSuccessMessage('Campaign succesfully created!');
            setFormData({
                kategori: '', judul: '', penerima: '', deskripsi: '', rincian: '',
                target: '', tanggalMulai: '', tanggalBerakhir: '', gambar: null,
            });
            setTimeout(() => {
                    navigate('/home/foundation');
                }, 2000);

        } catch (err) {
            console.error("Submission failed:", err);
            setError(err.message || "Connection to server failed. Please Try again" );
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="donation-container">
        <Headeruser/>
        <div className="donation-form-content">
            <h2 className="form-title">Pengisian Data</h2>
            <form className="donation-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">

                <label className='label-buatkampanye'>Kategori Donasi
                    {!formData.judul && <span style={{ color: 'red' }}> *</span>}
                </label>
                <select
                    name="kategori"
                    className='input-buatkampanye'
                    value={formData.kategori}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select One</option>
                    {kategoriOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>

                <label className='label-buatkampanye'>Judul Donasi
                    {!formData.judul && <span style={{ color: 'red' }}> *</span>}
                </label>
                <input className='input-buatkampanye' type="text" name="judul" value={formData.judul} onChange={handleChange} required />

                <label className='label-buatkampanye'>Pihak penerima donasi
                    {!formData.penerima && <span style={{ color: 'red' }}> *</span>}
                </label>
                <input className='input-buatkampanye' type="text" name="penerima" value={formData.penerima} onChange={handleChange} required />

                <label className='label-buatkampanye'>Deskripsi donasi / Cerita Penerima
                    {!formData.deskripsi && <span style={{ color: 'red' }}> *</span>}
                </label>
                <textarea className='input-buatkampanye' name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="3" required />

                <label className='label-buatkampanye'>Perincian penggunaan dana
                    {!formData.rincian && <span style={{ color: 'red' }}> *</span>}
                </label>
                <textarea className='input-buatkampanye' name="rincian" value={formData.rincian} onChange={handleChange} rows="3" required />

                <label className='label-buatkampanye'>Target Pengumpulan Dana{!formData.target && <span style={{ color: 'red' }}> *</span>}</label>
                <input 
                    className='input-buatkampanye' 
                    type="text" 
                    name="target" 
                    value={formatRupiah(formData.target)}
                    onChange={handleTargetChange}
                    placeholder="Rp 0"
                />
                                
                <div className="form-group date-group">
                <div>
                    <label className='label-buatkampanye'>Tanggal Mulai
                        {!formData.tanggalMulai && <span style={{ color: 'red' }}> *</span>}
                    </label>
                    <input className='input-date-buatkampanye' type="date" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleChange} required />
                </div>
                <div>
                    <label className='label-buatkampanye'>Tanggal Berakhir
                        {!formData.tanggalBerakhir && <span style={{ color: 'red' }}> *</span>}
                    </label>
                    <input className='input-date-buatkampanye' type="date" name="tanggalBerakhir" value={formData.tanggalBerakhir} onChange={handleChange} required />
                </div>
                </div>

                <label className='label-buatkampanye'>Foto Banner
                    {!formData.gambar && <span style={{ color: 'red' }}> *</span>}
                </label>
                <input className='input-buatkampanye' type="file" name="gambar" accept="image/*" onChange={handleImageChange} required />
                
                {formData.previewImage && (
                    <img
                    src={formData.previewImage}
                    alt="Preview"
                    className="preview-image-editprofile"
                    />
                )}
                
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Membuat Kampanye...' : 'Buat Kampanye'}
                </button>

                </div>
            </form>
        </div>
    </div>
  );
};

export default Buatkampanye;