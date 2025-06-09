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
        status: 'INVALID',
        date: '2025-05-15',
        },
    ];

    const statusColor = {
        DITERIMA: 'status-diterima',
        PENDING: 'status-pending',
        'INVALID': 'status-tidak-diterima',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
        alert("Form submitted!");

        setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        });
        setIsPopupOpen(false);
    };

    return (
    <div className="donor-profile">
        {/* Header */}
        <Headeruser/>

        {/* Profile Section */}
        <div className="profile-section">
            <h2 className="profile-title-donatur">Profile</h2>

            <div className="profile-box-donatur">

                    <svg xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
          
                <div className="profile-form">
                    <div className="form-rows">

                        <div className="left-fields-donatur">
                            <div className="field-donatur">
                                <label className='profile-label'>Username:</label>
                                <input className='input-profile-donatur' type="text" value="Masbro" readOnly/>
                            </div>

                            <div className="field-donatur">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile-donatur' type="text" value="masbro@gmail.com" readOnly />
                            </div>

                            <div className="field-donatur">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile-donatur' type="text" value="08112999291" readOnly />
                            </div>
                        </div>

                        {/* <div className="right-field-donatur">
                            <div className="field-donatur">
                                <label className='profile-label'>Alamat:</label>
                                <textarea className='input-profile-foundation' value="Jl anggrek"readOnly></textarea>
                            </div>
                        </div> */}
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
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    />
                                    <input
                                    className='input-editprofile'
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    step="0.01"
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
                        <div className="column transaction-amount">{tx.amount}</div>
                        <div className="column transaction-kampanye-title">{tx.title}</div>
                        <div className="column transaction-yayasan">{tx.foundation}</div>
                        <div className={`column transaction-status ${statusColor[tx.status]}`}>{tx.status}</div>
                        <div className="column transaction- date">{tx.date}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Profiledonatur