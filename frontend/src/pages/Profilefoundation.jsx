import React, {useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profilefoundation.css'
import Headeruser from '../components/Headeruser';

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = Number(angka) || 0;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(angka);
};

function Profilefoundation() {
    
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [campaignHistory, setCampaignHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const providerOptions = ["BCA", "OVO", "DANA", "GOPAY", "Mandiri", "BNI"];

    const [selectedProvider, setSelectedProvider] = useState(providerOptions[0]);
    const [displayNumber, setDisplayNumber] = useState('-');

    const [rekening, setRekening] = useState('-');
    const [provider, setProvider] = useState('');

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editData, setEditData] = useState({
        nama_foundation: '',
        username: '',
        email: '',
        no_telp: '',
        no_pajak: '',
        rekening: []
    });


    useEffect(() => {
    
        const fetchData = async () => {
            if (!authState.token) return;
            try {
                const [profileResponse, campaignsResponse] = await Promise.all([
                    fetch('http://localhost:8081/api/profile/foundation', {
                        headers: { 'Authorization': `Bearer ${authState.token}` },
                    }),
                    fetch('http://localhost:8081/api/foundation/my-campaigns', {
                        headers: { 'Authorization': `Bearer ${authState.token}` },
                    })
                ]);
                if (!profileResponse.ok) throw new Error('Failed to fetch profile.');
                if (!campaignsResponse.ok) throw new Error('Failed to fetch campaign history.');
                const profile = await profileResponse.json();
                const campaigns = await campaignsResponse.json();

                setProfileData(profile);
                setEditData(profile);
                setCampaignHistory(campaigns);

                if (!Array.isArray(profile.rekening)) {
                    profile.rekening = [];
                }
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [authState.token]);

    const handleOpenPopup = () => {
        setEditData({ ...profileData, rekening: Array.isArray(profileData.rekening) ? profileData.rekening : [] });
        setProvider('');
        setRekening('');
        setIsPopupOpen(true);
    };

    useEffect(() => {
        if (profileData && Array.isArray(profileData.rekening)) {
            const account = profileData.rekening.find(acc => acc.provider === selectedProvider);
            setDisplayNumber(account ? account.number : '-');
        } else {
            setDisplayNumber('-');
        }
    }, [profileData, selectedProvider]);

    const handleDisplayProviderChange = (e) => {
        setSelectedProvider(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleProviderSelectInPopup = (e) => {
        const providerName = e.target.value;
        setProvider(providerName);
        const existingAccount = Array.isArray(editData.rekening) ? editData.rekening.find(r => r.provider === providerName) : null;
        setRekening(existingAccount ? existingAccount.number : '');
    };

    const handleUpdateRekeningList = () => {
        if (!provider || !rekening) {
            alert("Pilih provider dan isi nomor rekening.");
            return;
        }
        const updatedList = Array.isArray(editData.rekening) ? [...editData.rekening] : [];
        const existingAccountIndex = updatedList.findIndex(r => r.provider === provider);

        if (existingAccountIndex > -1) {
            updatedList[existingAccountIndex] = { provider: provider, number: rekening };
        } else {
            updatedList.push({ provider: provider, number: rekening });
        }
        setEditData(prev => ({ ...prev, rekening: updatedList }));
        
        setProvider('');
        setRekening('');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const payload = {
                nama_foundation: editData.nama_foundation,
                username: editData.username,
                email: editData.email,
                no_telp: editData.no_telp,
                no_pajak: editData.no_pajak,
                rekeningList: editData.rekening
            };

            const response = await fetch('http://localhost:8081/api/profile/foundation', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${authState.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error((await response.json()).message || "Failed to update profile.");
            
            setProfileData(editData);
            setIsPopupOpen(false);

        } catch (err) {
            setError(err.message);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error && !profileData) return <div>Error: {error}</div>;
    if (!profileData) return <div>No profile data found.</div>;



    return (
        <div>
            <Headeruser />
            <div className="foundation-profile">
                {/* Profile Section */}
                <div className="profile-section">
                    <h2 className="profile-title-foundation">Profil Yayasan</h2>
                    <div className="profile-box-foundation">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <div className="profile-form">
                            <div className="form-rows">
                                <div className="left-fields-foundation">
                                    <div className="field-foundation">
                                        <label className='profile-label'>Nama Yayasan</label>
                                        <input className='input-profile-foundation' type="text" value={profileData.nama_foundation} readOnly />
                                    </div>
                                    <div className="field-foundation">
                                        <label className='profile-label'>Username:</label>
                                        <input className='input-profile-foundation' type="text" value={profileData.username} readOnly />
                                    </div>
                                    <div className="field-foundation">
                                        <label className='profile-label'>Email</label>
                                        <input className='input-profile-foundation' type="text" value={profileData.email} readOnly />
                                    </div>
                                    <div className="field-foundation">
                                        <label className='profile-label'>No. Telepon</label>
                                        <input className='input-profile-foundation' type="text" value={profileData.no_telp} readOnly />
                                    </div>
                                </div>
                                <div className="right-fields-foundation">
                                    <div className="field-foundation">
                                        <label className='profile-label'>No. Pajak (NPWP)</label>
                                        <input className='input-profile-foundation' type="text" value={profileData.no_pajak} readOnly />
                                    </div>
                                    <div className="field-foundation">
                                        <label className='profile-label'>Rekening Pembayaran</label>
                                        <select className='select-profile-foundation' value={selectedProvider} onChange={handleDisplayProviderChange}>
                                            {providerOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </div>
                                    <div className="field-foundation">
                                        <label className='profile-label'>Nomor Rekening</label>
                                        <input className='input-profile-foundation' type="text" value={displayNumber} readOnly />
                                    </div>
                                </div>
                            </div>
                            <button className="edit-button" onClick={handleOpenPopup}>Edit Profil</button>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="history-section">
                    <h2 className="history-title">Riwayat Kampanye Anda</h2>
                    <div className="history-list">
                        {campaignHistory.length > 0 ? (
                            campaignHistory.map(campaign => {
                                const percentage = campaign.targetAmount > 0 ? Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100) : 0;
                                const isFinished = campaign.status !== 'Active';
                                let daysLeftText = '';
                                if (!isFinished) {
                                    const days = Math.ceil((new Date(campaign.enDate) - new Date()) / (1000 * 60 * 60 * 24));
                                    daysLeftText = days > 0 ? `${days} hari lagi` : 'Hari terakhir';
                                }

                                return (
                                    <div key={campaign.donationId} className="history-card" onClick={() => navigate(`/donationcheck/${campaign.donationId}`)}>
                                        <div className="history-img-container">
                                            <img className="history-img" src={campaign.donationImg || 'https://placehold.co/400x200?text=Campaign'} alt={campaign.donationTitle} />
                                        </div>
                                        <div className="history-content">
                                            <h3 className="history-title">{campaign.donationTitle}</h3>
                                            <div className="progress-section">
                                                <div className="progress-labels">
                                                    <span>{formatRupiah(campaign.currentAmount)}</span>
                                                    <span>Target: {formatRupiah(campaign.targetAmount)}</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="history-details">
                                                <span>{campaign.donors} Donatur</span>
                                                <b>{isFinished ? 'Selesai' : daysLeftText}</b>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Anda belum memiliki riwayat kampanye.</p>
                        )}
                    </div>
                </div>

                {/* Edit Profile Popup */}
                {isPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>&times;</button>
                            <h2 className='edit-profile-title'>Edit Profil Yayasan</h2>
                            {error && <p className="error-message">{error}</p>}
                            <form onSubmit={handleSubmit} className="editprofile-form-user">
                                <input name="nama_foundation" className='input-editprofile' placeholder="Nama Yayasan" value={editData.nama_foundation} onChange={handleInputChange} required />
                                <input name="username" className='input-editprofile' placeholder="Nama Pengguna" value={editData.username} onChange={handleInputChange} required />
                                <input name="email" className='input-editprofile' placeholder="email pengguna" value={editData.email} onChange={handleInputChange} required />
                                <input name="no_telp" className='input-editprofile' placeholder="No. Telepon" value={editData.no_telp} onChange={handleInputChange} required />
                                <input name="no_pajak" className='input-editprofile' placeholder="No. Pajak (NPWP)" value={editData.no_pajak} onChange={handleInputChange} required />
                                
                                <div className="rekening-section">
                                    <div className="rekening-fields">
                                        <select className="input-editprofile" value={provider} onChange={handleProviderSelectInPopup}>
                                            <option value="" disabled>Pilih Provider</option>
                                            {providerOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <input className="input-editprofile" placeholder="Nomor Rekening" value={rekening} onChange={(e) => setRekening(e.target.value)} />
                                    </div>
                                    <button type="button" className='rekening-button' onClick={handleUpdateRekeningList}>Tambah / Perbarui Rekening</button>
                                </div>
                                <p style={{fontSize: '0.8rem', color: '#6c757d', textAlign: 'center'}}>Data rekening yang tersimpan: {editData.rekening.map(r => r.provider).join(', ') || 'Belum ada'}</p>
                                
                                <button type="submit" className='submit-button'>Simpan Perubahan</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profilefoundation;