import React, {useState, } from 'react'
import '../styles/Profiledonatur.css'
import Headeruser from '../components/Headeruser';
function Profiledonatur() {
    const transactions = [
        {
        amount: 'Rp. 300.000',
        title: 'Bantu Anak Yatim',
        foundation: 'Yayasan Peduli Anak',
        status: 'DITERIMA',
        date: '2025-05-25',
        },
        {
        amount: 'Rp. 250.000',
        title: 'Donasi Bencana Alam',
        foundation: 'Relawan Nusantara',
        status: 'PENDING',
        date: '2025-05-20',
        },
        {
        amount: 'Rp. 500.000',
        title: 'Pendidikan Untuk Semua',
        foundation: 'Yayasan Pendidikan',
        status: 'TIDAK DITERIMA',
        date: '2025-05-15',
        },
    ];

    const statusColor = {
        DITERIMA: 'status-diterima',
        PENDING: 'status-pending',
        'TIDAK DITERIMA': 'status-tidak-diterima',
    };

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
    <div className="donor-profile">
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
                                <label className='profile-label'>Username:</label>
                                <input className='input-profile' type="text" value="Masbro" readOnly/>
                            </div>

                            <div className="field">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile' type="text" value="masbro@gmail.com" readOnly />
                            </div>

                            <div className="field">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile' type="text" value="08112999291" readOnly />
                            </div>
                        </div>

                        <div className="right-field">
                            <label className='profile-label'>Alamat:</label>
                            <textarea className='input-profile' value="Jl anggrek"readOnly></textarea>
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
                                    <textarea
                                    className='input-editprofile'
                                    name="address"
                                    placeholder="Address"
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

      {/* Transaction Section */}
        <div className="transaction-section">
            <h2 className='history-title'>Transaksi</h2>

            <div className="transaction-box">
                {transactions.map((tx, index) => (
                    <div key={index} className="transaction-row">
                        <div className="column amount">{tx.amount}</div>
                        <div className="column kampanye-title">{tx.title}</div>
                        <div className="column yayasan">{tx.foundation}</div>
                        <div className={`column status ${statusColor[tx.status]}`}>{tx.status}</div>
                        <div className="column date">{tx.date}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Profiledonatur