import React, { useState } from 'react';
import '../styles/Buatkampanye.css'
import Headeruser from '../components/Headeruser';

const Buatkampanye = () => {
  const [formData, setFormData] = useState({
    kategori: '',
    judul: '',
    penerima: '',
    deskripsi: '',
    rincian: '',
    target: '',
    tanggalMulai: '',
    tanggalBerakhir: '',
    foto: null,
    previewImage: "",

  });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto') {
            setFormData({ ...formData, foto: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
    }
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
        console.log('Data Donasi:', formData);
        alert('Donasi berhasil dibuat!');
    };

  return (
    <div className="donation-container">
        <Headeruser/>
        <div className="donation-form-content">
            <h2 className="form-title">Pengisian Data</h2>
            <form className="donation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    {/* Kategori donasi */}

                <label className='label-buatkampanye'>Kategori Donasi</label>
                <input className='input-buatkampanye' type="text" name="kategori" value={formData.kategori} onChange={handleChange} required />

                    {/* judul donasi */}

                <label className='label-buatkampanye'>Judul Donasi</label>
                <input className='input-buatkampanye' type="text" name="judul" value={formData.judul} onChange={handleChange} required />

                    {/* nama penerima donasi */}

                <label className='label-buatkampanye'>Pihak penerima donasi</label>
                <input className='input-buatkampanye' type="text" name="penerima" value={formData.penerima} onChange={handleChange} required />

                    {/* cerita singkat tentang penerima donasi */}

                <label className='label-buatkampanye'>Deskripsi donasi / Cerita Penerima</label>
                <textarea className='input-buatkampanye' name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows="3" required />

                    {/* Rincian dana */}

                <label className='label-buatkampanye'>Perincian penggunaan dana</label>
                <textarea className='input-buatkampanye' name="rincian" value={formData.rincian} onChange={handleChange} rows="3" required />

                    {/* Targer jumlah donasi */}

                <label className='label-buatkampanye'>Target pengumpulan dana (Jumlah)</label>
                <input className='input-buatkampanye' type="number" name="target" value={formData.target} onChange={handleChange} required />

                    {/* Waktu mulai dan berakhir */}

                <div className="form-group date-group">
                <div>
                    <label className='label-buatkampanye'>Tanggal Mulai</label>
                    <input className='input-date-buatkampanye' type="date" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleChange} required />
                </div>
                <div>
                    <label className='label-buatkampanye'>Tanggal Berakhir</label>
                    <input className='input-date-buatkampanye' type="date" name="tanggalBerakhir" value={formData.tanggalBerakhir} onChange={handleChange} required />
                </div>
                </div>

                    {/* Foto Banner */}

                <label className='label-buatkampanye'>Foto Banner</label>
                <input className='input-buatkampanye' type="file" name="foto" accept="image/*" onChange={handleImageChange}/>
                    {formData.previewImage && (
                      <img
                        src={formData.previewImage}
                        alt="Preview"
                        className="preview-image-editprofile"
                      />
                    )}

                <button type="submit" className="submit-button">Buat Donasi</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Buatkampanye;