import React from "react";
import "../styles/Donationpagecard.css"

const Donationpagecard = ({ campaign }) => {
  
  const percentage = Math.min((campaign.amount / campaign.target) * 100, 100);

  return (
    <div className="donasipage-card">
      <div className="donasipage-content">
        <div className="donasipage-image"></div>
        <div>
          <h3>{campaign.title}</h3>
          <p>Kategori: {campaign.category}</p>
          <p>{campaign.foundationName}</p>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="donasi-bottom">
        <span>Rp. {campaign.amount.toLocaleString("id-ID")}</span>
        <span>{campaign.date}</span>
      </div>
    </div>
  );
};



export default Donationpagecard;
