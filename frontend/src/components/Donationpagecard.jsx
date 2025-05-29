import React from "react";
import "../Style/Donationpagecard.css"
const DonasiCard = ({currentAmount, targetAmount}) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

    return (
      <div className="donasipage-card">
        <div className="donasipage-content">
          <div className="donasipage-image"></div>
          <div>
            <h4>Judul Donasi</h4>
            <p>Nama Yayasan</p>
          </div>
        </div>
  
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>

        </div>
  
        <div className="donasi-bottom">
          <span>Rp. xxx.xxxx</span>
          <span>Tanggal</span>
        </div>
      </div>
    );
  };

export default DonasiCard;
