import React, { useState } from 'react';
import Headeruser from '../components/Headeruser'
import '../styles/Donationcheck.css'
import { useNavigate } from 'react-router-dom';

const Donationcheck = () => {
    const navigate = useNavigate();
    const goalAmount = 200000000;
    const [donations, setDonations] = useState([
        { id: 1, name: 'nama donor', amount: 25000000, date: '23/05/2025', confirmed: false },
        { id: 2, name: 'nama donor', amount: 15000000, date: '23/05/2025', confirmed: false },
        { id: 3, name: 'nama donor', amount: 10000000, date: '23/05/2025', confirmed: false },
    ]);

    const handleToggle = (id) => {
        setDonations((prev) =>
        prev.map((donation) =>
            donation.id === id ? { ...donation, confirmed: !donation.confirmed } : donation
        )
        );
    };

    const confirmedAmount = donations
        .filter((donation) => donation.confirmed)
        .reduce((sum, d) => sum + d.amount, 0);

    const progress = Math.min((confirmedAmount / goalAmount) * 100, 100);

    const confirmFunds = () => {
        alert(`Dana sebesar Rp ${confirmedAmount.toLocaleString()} berhasil dikonfirmasi.`);
    };

    const rejectFunds = () => {
        alert('Dana tidak masuk.');
    };

    return (
        <div className="donationcheck-container">
            <Headeruser/>
            <h3 className='kampanye-title'>Nama Kampanye</h3>
            <div className="detaildonation-card">
                <h1 className="campaign-amount">Rp {confirmedAmount.toLocaleString()}</h1>
                <button className="detail-button" onClick={() => navigate('/kampanyedetail')}>detail Kampanye</button>
                <div className="progress-section">
                    <div className="donationcheck-progress-bar">
                        <div
                        className="donationcheck-progress-fill"
                        style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="progress-goal">Rp {goalAmount.toLocaleString()}</div>
                </div>

                <p><strong>Perlu dikonfirmasi</strong></p>

                {donations.map((donation) => (
                    <div key={donation.id} className="donation-row">
                        <span>{donation.name}</span>
                        <span>{`Rp ${donation.amount.toLocaleString('id-ID')}`}</span>
                        <span>{donation.date}</span>
                        <input
                            type="checkbox"
                            checked={donation.confirmed}
                            onChange={() => handleToggle(donation.id)}
                        />
                    </div>
                ))}

                <div className="button-group">
                    <button onClick={confirmFunds} className="action-button">Konfirmasi dana masuk</button>
                    <button onClick={rejectFunds} className="action-button">Dana tidak masuk</button>
                </div>
            </div>
        </div>
    );
};

export default Donationcheck;