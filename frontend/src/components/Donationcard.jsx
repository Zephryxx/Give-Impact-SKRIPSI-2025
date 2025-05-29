import React from 'react'
import '../Style/Donationcard.css'
import { useNavigate } from 'react-router-dom';

const DonationCard = ({ donationTitle, donors, daysLeft, currentAmount, targetAmount }) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const navigate = useNavigate();
  return(
    <div className="donation-card" onClick={() => navigate('/donationdetail')}>
      <div className="donation-image" />
      <div className="donation-title">{donationTitle}</div>
      <div className="yayasan-name">Nama Yayasan</div>
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