import React from 'react'
import '../styles/Foundationcard.css'
import { useNavigate } from 'react-router-dom';

const Foundationcard = ({ donationId, donationImg, donationTitle, foundationName, donors, enDate, currentAmount, targetAmount, baseUrl }) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
    const navigate = useNavigate();
    const today = new Date();
    const end = new Date(enDate);
    const timeDiff = end - today;
    const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    const handleCardClick = () => {
        navigate(`${baseUrl}/${donationId}`); 
    };
    return (
        <div className="foundation-card" onClick={handleCardClick}>
            <img className="foundationcard-image" src={donationImg} />
            <div className="foundationcard-title">{donationTitle}</div>
            <div className="foundationcard-name">{foundationName}</div>
            <div className="foundationcard-label">Dana Terkumpul</div>
            <div className="foundationcard-amount">Rp. {currentAmount.toLocaleString('id-ID')}</div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="foundationcard-donors-info">{donors} Donatur</div>
            <div className="foundationcard-days-left">{daysLeft} hari lagi</div>
        </div>
    )
}

export default Foundationcard;