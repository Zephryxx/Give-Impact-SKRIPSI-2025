import React, {useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import '../styles/Profiledonatur.css'
import Headeruser from '../components/Headeruser';


function Profiledonatur() {

    const { authState, login } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    });

    useEffect(() => {

        const fetchProfileData = async () => {
            if (!authState.token) return;
            try {
                const response = await fetch('http://localhost:8081/api/profile/donatur', {
                    headers: { 'Authorization': `Bearer ${authState.token}` },
                });
                if (!response.ok) throw new Error('Failed to fetch profile.');
                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [authState.token]);

    const handleOpenPopup = () => {
        if (profileData) {
            setFormData({
                name: profileData.username,
                email: profileData.email,
                phone: profileData.no_telp,
            });
            setIsPopupOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8081/api/profile/donatur', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error((await response.json()).message || "Failed to update profile.");
            
            setProfileData({ 
                username: formData.name, 
                email: formData.email, 
                no_telp: formData.phone 
            });

            const updatedUser = { ...authState.user, nama: formData.name, email: formData.email };
            login(updatedUser, authState.token);
            
            setIsPopupOpen(false);

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error && !profileData) return <div>Error: {error}</div>;
    if (!profileData) return <div>No profile data found.</div>;

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
                                <input className='input-profile-donatur' type="text" value={profileData.username} readOnly/>
                            </div>

                            <div className="field-donatur">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile-donatur' type="text" value={profileData.email} readOnly />
                            </div>

                            <div className="field-donatur">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile-donatur' type="text" value={profileData.no_telp} readOnly />
                            </div>
                        </div>
                    </div>
                    <button className="edit-button"onClick={handleOpenPopup}>Edit Profile</button>

                    {isPopupOpen && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
                                    &times;
                                </button>

                                <h2 className='edit-profile-title'>Edit Profile</h2>
                                {error && <p className="error-message">{error}</p>}
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
                                        name="email"
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