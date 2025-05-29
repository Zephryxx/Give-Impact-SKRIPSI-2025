import React from "react"
import Headeruser from "../Components/Headeruser";
import ArticleCard from "../Components/Articlecard";
import DonationCard from "../Components/Donationcard";
import { useNavigate } from 'react-router-dom';
import "../Style/Homepage.css";

function Homepage (){

    const navigate = useNavigate();
    
    return(
      <div className="homepage-container">
        <Headeruser/>
        <div className="homepage-content">
  
          <div className="donasipage-button" onClick={() => navigate('/donationpage')}>
            lihat Donasi
          </div>
            {/* Donasi Darurat */}
          <div className="donation-box">
            <h2 className="section-title">Donasi Darurat</h2>
            <div className="card-container">
              <DonationCard donors="100" daysLeft="100" donationTitle="Bantuan Gempa" currentAmount={5000000} targetAmount={10000000} />
              <DonationCard donors="20" daysLeft="120" donationTitle="Banjir Jakarta" currentAmount={2000000} targetAmount={8000000} />
              <DonationCard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
            </div>
          </div>
            {/* Donasi Bencana */}
          <div className="donation-box">
            <h2 className="section-title">Donasi Bencana</h2>
            <div className="card-container">
              <DonationCard donors="100" daysLeft="100" donationTitle="Erupsi Gunung" currentAmount={3000000} targetAmount={10000000} />
              <DonationCard donors="20" daysLeft="120" donationTitle="Longsor Desa A" currentAmount={2500000} targetAmount={7000000} />
              <DonationCard donors="10" daysLeft="60" donationTitle="Tsunami Pesisir" currentAmount={4000000} targetAmount={9000000} />
            </div>
          </div>

          {/* Artikel */}
          <div className="article-box">
            <h2 className="section-title">Artikel</h2>
            <div className="card-container">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Homepage;