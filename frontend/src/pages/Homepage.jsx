import React from "react"
import Headeruser from "../components/Headeruser";
import ArticleCard from "../components/Articlecard";
import DonationCard from "../components/Donationcard";
import ops from '../img/images.jpeg'
import banjir from '../img/img_bantuan_korban_banjir.jpeg'
import kebakaran from '../img/kebakaran.jpeg'
import gempa from '../img/img_bantuan_korban_gempa.jpeg'
import longsor from "../img/longsor.jpeg"
import bangunan from '../img/img_bantuan_donasi_pembangunan.jpeg'
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
              <DonationCard donationImg ={ops} donationTitle="Bantuan Operasi Kesehatan Bu Yani" foundationName={"PT Sejahtera"} currentAmount={50000000} targetAmount={100000000} donors="100" enDate="2025-08-20"/>
              <DonationCard donationImg ={bangunan} donationTitle="Bangun MCK di pelosok Negeri" foundationName={"PT cinta kasih"} currentAmount={2000000} targetAmount={8000000} donors="20" enDate="2025-07-20"/>
              <DonationCard donationImg ={kebakaran} donationTitle="Kebakaran Pasar" foundationName={"PT Sejahtera"} currentAmount={1000000} targetAmount={5000000} donors="10" enDate="2025-07-20"/>
            </div>
          </div>
            {/* Donasi Bencana */}
          <div className="donation-box">
            <h2 className="section-title-card">Donasi Bencana</h2>
            <div className="card-container">
              <DonationCard donationImg ={banjir} donationTitle="Bantu Korban Banjir" foundationName={"PT Sejahtera"} currentAmount={3000000} targetAmount={10000000} donors="100" enDate="2025-09-20"/>
              <DonationCard donationImg ={longsor} donationTitle="Bantu Korban Longsor" foundationName={"PT cinta sesama"} currentAmount={2500000} targetAmount={7000000} donors="20" enDate="2025-06-20"/>
              <DonationCard donationImg ={gempa} donationTitle="Bantu Korban Gempa" foundationName={"PT peduli kasih"} currentAmount={4000000} targetAmount={9000000} donors="10" enDate="2025-10-20"/>
            </div>
          </div>

          {/* Artikel */}
          <div className="article-box">
            <h2 className="section-title-card">Artikel</h2>
            <div className="card-container">
              <ArticleCard articleImg={banjir} articleTitle="Perkembangan donasi banjir" articleDate={'02 - 10 - 2025'}/>
              <ArticleCard articleImg={longsor} articleTitle="Perkembangan donasi Longsor" articleDate={'01 - 07 - 2025'}/>
              <ArticleCard articleImg={gempa} articleTitle="Perkembangan donasi Gempa" articleDate={'27 - 10 - 2025'}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
export default Homepage;