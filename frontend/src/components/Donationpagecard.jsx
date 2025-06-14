import React from "react";
import "../styles/Donationpagecard.css"

const Donationpagecard = ({ campaign }) => {
  
  const percentage = campaign.target > 0 ? Math.min((campaign.amount / campaign.target) * 100, 100) : 0;

  return (
    <div className="donasipage-card">
      <div className="donasipage-content">
        <img className="donasipage-image" src={campaign.donationpageImg}/>
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
        <span>Berakhir pada: {new Date(campaign.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
    </div>
  );
};



export default Donationpagecard;
