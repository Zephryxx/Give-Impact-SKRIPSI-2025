import React from 'react'
import '../styles/Donationcard.css'

import { useNavigate } from 'react-router-dom';

const DonationCard = ({ donationId, donationImg, donationTitle, foundationName, donors, enDate, currentAmount, targetAmount }) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const today = new Date();
  const end = new Date(enDate);
  const timeDiff = end - today;
  const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));


  const navigate = useNavigate();
  return(
    <div className="donation-card" onClick={() => navigate('/donationdetail')}>
      <img className="donation-image" src={donationImg} alt={donationTitle} />

      <div className="donation-title">{donationTitle}</div>
      <div className="yayasan-name">{foundationName}</div>
      <div className="donation-label">Dana Terkumpul</div>
      <div className="donation-amount">Rp. {currentAmount.toLocaleString()}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="donors-info">{donors} Donatur</div>
      <div className="days-left">{daysLeft} hari lagi</div>
    </div>
  );
}

export default DonationCard;