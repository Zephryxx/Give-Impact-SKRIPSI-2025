import React, {useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'; 
import '../styles/Profilefoundation.css'
import Headeruser from '../components/Headeruser';
function Profilefoundation() {
    
    const { authState } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const providerOptions = ["BCA", "OVO", "DANA", "GOPAY", "Mandiri", "BNI"];

    const [selectedProvider, setSelectedProvider] = useState(providerOptions[0]);
    const [displayNumber, setDisplayNumber] = useState('-');

    const [rekening, setRekening] = useState('-');
    const [provider, setProvider] = useState('');

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

    /* Pop Up Edit*/
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editData, setEditData] = useState('');

    useEffect(() => {
    
        const fetchProfileData = async () => {
            if (!authState.token) return;
            try {
                const response = await fetch('http://localhost:8081/api/profile/foundation', {
                    headers: { 'Authorization': `Bearer ${authState.token}` },
                });
                if (!response.ok) throw new Error('Failed to fetch profile.');
                const data = await response.json();
                setProfileData(data);
                setEditData(data); 

                if (!Array.isArray(data.rekening)) {
                    data.rekening = [];
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
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
        const { foundation, value } = e.target;
        setEditData(prev => ({ ...prev, [foundation]: value }));
    };

    const handleProviderSelectInPopup = (e) => {
        const providerName = e.target.value;
        setProvider(providerName);
        const existingAccount = Array.isArray(editData.rekening) ? editData.rekening.find(r => r.provider === providerName) : null;
        setRekening(existingAccount ? existingAccount.number : '');
    };

    const handleUpdateRekeningList = () => {
        if (!provider || !rekening) {
            alert("Please select a provider and enter an account number.");
            return;
        }
        const updatedList = [...editData.rekening];
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
        <div className="foundation-profile">
            {/* Header */}
            <Headeruser/>

            {/* Profile Section */}
            <div className="profile-section">

                <h2 className="profile-title-foundation">Profile</h2>

                <div className="profile-box-foundation">

                    <svg xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    
                    <div className="profile-form">
                        <div className="form-rows">

                            <div className="left-fields-foundation">
                                <div className="field-foundation">
                                <label className='profile-label'>Foundation:</label>
                                <input className='input-profile-foundation' type="text" value={profileData.nama_foundation} readOnly/>
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>Username:</label>
                                <input className='input-profile-foundation' type="text" value={profileData.username} readOnly/>
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile-foundation' type="text" value={profileData.email} readOnly />
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile-foundation' type="number" value={profileData.no_telp} readOnly />
                                </div>

                            </div>

                            <div className="right-fields-foundation">
                                <div className="field-foundation">
                                    <label className='profile-label'>No. Pajak:</label>
                                    <input className='input-profile-foundation' type="number" value={profileData.no_pajak} readOnly />
                                </div>

                                <div className="field-foundation">
                                    <label className='profile-label'>Jenis Provider:</label>
                                    <select className='select-profile-foundation' value={selectedProvider} onChange={handleDisplayProviderChange} disabled>
                                        {providerOptions.map(provider => (
                                            <option key={provider} value={provider}>{provider}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="field-foundation">
                                    <label className='profile-label'>No. Rekening:</label>
                                    <input className='input-profile-foundation' type="text" value={displayNumber} readOnly />
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
                                    <form onSubmit={handleSubmit} className="editprofile-form-user">

                                        <input
                                            className='input-editprofile'
                                            type="text"
                                            name="name"
                                            placeholder="Foundation"
                                            value={editData.nama_foundation}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <input
                                            className='input-editprofile'
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={editData.username}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <input
                                            className='input-editprofile'
                                            type="text"
                                            name="Email"
                                            placeholder="Email"
                                            value={editData.email}
                                            onChange={handleInputChange}
                                            required
                                        />

                                        <input
                                            className='input-editprofile'
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={editData.no_telp}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                        />

                                        <input
                                            className='input-editprofile'
                                            type='number'w
                                            name="pajak"
                                            placeholder="No.Pajak"
                                            value={editData.no_pajak}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                        <select 
                                            className="input-editprofile" 
                                            placeholder="Jenis Provider" 
                                            value={provider} 
                                            onChange={handleProviderSelectInPopup}>
                                            <option value="" disabled>Pilih Jenis Provider</option>
                                            {providerOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <input 
                                            className="input-editprofile"
                                            placeholder="No. Rekening"
                                            value={rekening} 
                                            onChange={(e) => setRekening(e.target.value)} 
                                        />
                                        <button type="button" className='rekening-button' onClick={handleUpdateRekeningList}>Add / Update Rekening</button>
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