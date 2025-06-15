import React, {useState, useEffect, useContext, useCallback } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Profiledonatur.css'
import Headeruser from '../components/Headeruser';

const formatRupiah = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

function Profiledonatur() {

    const { authState, login } = useContext(AuthContext);

    const [profileData, setProfileData] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [transactions, setTransactions] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date_desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!authState.token) { setLoading(false); return; }
            try {
                const response = await fetch('http://localhost:8081/api/profile/donatur', {
                    headers: { 'Authorization': `Bearer ${authState.token}` },
                });
                if (!response.ok) throw new Error('Failed to fetch profile.');
                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProfileData();
    }, [authState.token]);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            if (!authState.token) return;

            const queryParams = new URLSearchParams({
                ...(filterStatus !== 'all' && { status: filterStatus }),
                sortBy: sortBy
            });
            const url = `http://localhost:8081/api/donations/my-history?${queryParams}`;
            
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch transactions.');
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [authState.token, filterStatus, sortBy]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

   const statusColor = {
        Success: 'status-diterima',
        Pending: 'status-pending',
        Failed: 'status-tidak-diterima',
    };

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

    if (loading && !profileData) return <div>Loading...</div>;
    if (error && !profileData) return <div>Error: {error}</div>;
    if (!profileData) return <div>No profile data found. Please login.</div>;
    
    return (
    <div >
        <Headeruser/>
        <div className="donor-profile">
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
                <div className="transaction-header">
                    <h2 className='history-title'>Transaksi</h2>
                    <div className="filters">
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">Semua Status</option>
                            <option value="Success">Diterima</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Gagal</option>
                        </select>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date_desc">Terbaru</option>
                            <option value="date_asc">Terlama</option>
                            <option value="amount_desc">Jumlah Terbesar</option>
                            <option value="amount_asc">Jumlah Terkecil</option>
                        </select>
                    </div>
                </div>

                <div className="transaction-box">
                    <div className="transaction-header-row">
                        <div className="column" style={{flex: '1.5'}}>Jumlah</div>
                        <div className="column" style={{flex: '3'}}>Kampanye</div>
                        <div className="column" style={{flex: '1.5', justifyContent: 'flex-start'}}>Status</div>
                        <div className="column" style={{flex: '1.5', textAlign: 'right'}}>Tanggal</div>
                    </div>

                    {loading ? (
                        <p style={{padding: '1rem'}}>Loading transactions...</p>
                    ) : error ? (
                        <p className="error-message" style={{padding: '1rem'}}>{error}</p>
                    ) : transactions.length > 0 ? (
                        transactions.map((tx, index) => (
                            <div key={index} className="transaction-row">

                                <div className="column transaction-amount">{formatRupiah(tx.jumlah)}</div>
                                
                                <div className="column transaction-details">
                                    <Link to={`/donationdetail/${tx.campaignId}`} className="transaction-kampanye-link">
                                        <div className="transaction-kampanye-title">{tx.campaignTitle}</div>
                                    </Link>
                                    <div className="transaction-yayasan">{tx.foundationName}</div>
                                </div>

                                <div className="column transaction-status">
                                    <span className={`status-pill ${statusColor[tx.status]}`}>{tx.status}</span>
                                </div>

                                <div className="column transaction-date">{formatDate(tx.tgl_donasi)}</div>

                            </div>
                        ))
                    ) : (
                        <p style={{padding: '1rem'}}>Anda belum memiliki riwayat transaksi.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profiledonatur