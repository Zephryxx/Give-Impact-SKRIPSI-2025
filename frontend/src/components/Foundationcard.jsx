import React from 'react'
import '../styles/Foundationcard.css'
import { useNavigate } from 'react-router-dom';

const Foundationcard = ({ donationTitle, donors, daysLeft, currentAmount, targetAmount }) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
    const navigate = useNavigate();

    return (
        <div className="foundation-card" onClick={() => navigate('/donationcheck')}>
            <div className="foundationcard-image" />
            <div className="foundationcard-title">{donationTitle}</div>
            <div className="foundationcard-name">Nama Yayasan</div>
            <div className="foundationcard-label">Dana Terkumpul</div>
            <div className="foundationcard-amount">Rp. {currentAmount.toLocaleString()}</div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="foundationcard-donors-info">{donors} Donatur</div>
            <div className="foundationcard-days-left">{daysLeft} hari lagi</div>
        </div>
    )
}

export default Foundationcard;