import React from "react"
import Headeruser from "../components/Headeruser";
import ArticleCard from "../components/Articlecard";
import DonationCard from "../components/Donationcard";
import ops from '../img/images.jpeg'
import banjir from '../img/img_bantuan_korban_banjir.jpeg'
import { useNavigate } from 'react-router-dom';
import "../styles/Homepage.css";

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
            <h2 className="section-title-card">Donasi Darurat</h2>
            <div className="card-container">
              <DonationCard donationImg ={ops} donationTitle="Bantuan Operasi Kesehatan Bu Yani" foundationName={"PT Sejahtera"} currentAmount={5000000} targetAmount={10000000} donors="100" daysLeft="100"/>
              <DonationCard donationImg ={banjir} donationTitle="Banjir Jakarta" foundationName={"PT Sejahtera"} currentAmount={2000000} targetAmount={8000000} donors="20" daysLeft="120"/>
              <DonationCard donationTitle="Kebakaran Pasar" foundationName={"PT Sejahtera"} currentAmount={1000000} targetAmount={5000000} donors="10" daysLeft="60"/>
            </div>
          </div>
            {/* Donasi Bencana */}
          <div className="donation-box">
            <h2 className="section-title-card">Donasi Bencana</h2>
            <div className="card-container">
              <DonationCard donationTitle="Erupsi Gunung" foundationName={"PT Sejahtera"} currentAmount={3000000} targetAmount={10000000} donors="100" daysLeft="100"/>
              <DonationCard donationTitle="Longsor Desa A" foundationName={"PT Sejahtera"} currentAmount={2500000} targetAmount={7000000} donors="20" daysLeft="120"/>
              <DonationCard donationTitle="Tsunami Pesisir" foundationName={"PT Sejahtera"} currentAmount={4000000} targetAmount={9000000} donors="10" daysLeft="60"/>
            </div>
          </div>

          {/* Artikel */}
          <div className="article-box">
            <h2 className="section-title-card">Artikel</h2>
            <div className="card-container">
              <ArticleCard articleTitle="Perkembangan donasi" articleDate={'20 - 12 - 2025'}/>
              <ArticleCard articleTitle="Perkembangan donasi" articleDate={'20 - 12 - 2025'}/>
              <ArticleCard articleTitle="Perkembangan donasi" articleDate={'20 - 12 - 2025'}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Homepage;