import React from 'react'
import '../styles/Homepagefoundation.css'
import Headeruser from '../components/Headeruser';
import Foundationcard from '../components/Foundationcard';
import ops from '../img/images.jpeg'
import banjir from '../img/img_bantuan_korban_banjir.jpeg'
import kebakaran from '../img/kebakaran.jpeg'
import { useNavigate } from 'react-router-dom';

function Homepagefoundation() {

    const navigate = useNavigate();
  return (
    <div className="homepage-container">
        <Headeruser/>
        <div className="homepage-content">
  
            <div className="buatkampanye-button" onClick={() => navigate('/buatkampanye')}>
            Buat Kampanye
            </div>
            <h3 className="homefoundation-title">Kampanye yang berlangsung</h3>

            <div className="card-container">
              <Foundationcard donationImg ={ops} donationTitle="Bantuan Operasi Kesehatan Bu Yani" foundationName={"PT Sejahtera"} currentAmount={50000000} targetAmount={100000000} donors="100" enDate="2025-08-20" />
              <Foundationcard donationImg ={kebakaran} donationTitle="Kebakaran Pasar" foundationName={"PT Sejahtera"} currentAmount={1000000} targetAmount={5000000} donors="10" enDate="2025-07-20"/>
              <Foundationcard donationImg ={banjir} donationTitle="Bantu Korban Banjir" foundationName={"PT Sejahtera"} currentAmount={3000000} targetAmount={10000000} donors="100" enDate="2025-09-20"/>
        
            </div>
          </div>
        </div>
  );
}

export default Homepagefoundation;