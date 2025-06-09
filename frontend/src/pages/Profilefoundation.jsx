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
        foundation:"",
        name: "",
        email: "",
        phone: "",
        pajak: "",
        provider: "",
        rekeneing:"",
        address:"",

    });
        
    const handleInputChange = (e) => {
        const { foundation, value } = e.target;
        setFormData(prev => ({ ...prev, [foundation]: value }));
    };
        
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setFormData(prev => ({
    //          ...prev,
    //         }));
    //     }
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
        alert("Form submitted!");

        setFormData({
            foundation:"",
            name: "",
            email: "",
            phone: "",
            pajak: "",
            provider: "",
            rekeneing:"",
            address:"",
        });
        setIsPopupOpen(false);
    };
    
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
                                <input className='input-profile-foundation' type="text" value="Sejahtera" readOnly/>
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>Username:</label>
                                <input className='input-profile-foundation' type="text" value="Masbro" readOnly/>
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>Email:</label>
                                <input className='input-profile-foundation' type="text" value="masbro@gmail.com" readOnly />
                                </div>

                                <div className="field-foundation">
                                <label className='profile-label'>No. Telpon:</label>
                                <input className='input-profile-foundation' type="number" value="08112999291" readOnly />
                                </div>

                            </div>

                            <div className="right-fields-foundation">
                                <div className="field-foundation">
                                    <label className='profile-label'>No. Pajak:</label>
                                    <input className='input-profile-foundation' type="number" value="0811299232" readOnly />
                                </div>

                                <div className="field-foundation">
                                    <label className='profile-label'>Jenis Provider:</label>
                                    <select
                                        className='input-profile-foundation'
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

                                <div className="field-foundation">
                                    <label className='profile-label'>No. Rekening:</label>
                                    <input className='input-profile-foundation' type="number" value="081121491" readOnly />
                                </div>

                                <div className="field-foundation">
                                    <label className='profile-label'>Alamat:</label>
                                    <textarea className='input-profile-foundation' value="Jl anggrek"readOnly></textarea>
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
                                            value={formData.foundation}
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

                                        <input
                                            className='input-editprofile'
                                            type='number'w
                                            name="pajak"
                                            placeholder="No.Pajak"
                                            value={formData.pajak}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                        <select
                                            className='input-editprofile'
                                            type='text'
                                            name="provider"
                                            placeholder="Jenis Provider"
                                            value={formData.provider}
                                            onChange={handleInputChange}
                                            required
                                            >
                                            <option value="">Pilih Jenis Provider</option>
                                            <option value="Telkomsel">Telkomsel</option>
                                            <option value="Indosat">Indosat</option>
                                            <option value="XL">XL</option>
                                            <option value="Tri">Tri</option>
                                            <option value="Smartfren">Smartfren</option>

                                        </select>
                                        <input
                                            className='input-editprofile'
                                            type='number'
                                            name="rek"
                                            placeholder="No. Rekening"
                                            value={formData.rekeneing}
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

                                        {/* <input type="file" accept="image/*" onChange={handleImageChange} />

                                        {formData.previewImage && (
                                        <img
                                            src={formData.previewImage}
                                            alt="Preview"
                                            className="preview-image-editprofile"
                                        />
                                        )} */}

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