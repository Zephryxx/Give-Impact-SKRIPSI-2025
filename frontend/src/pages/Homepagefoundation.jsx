import React from 'react'
import '../styles/Homepagefoundation.css'
import Headeruser from '../components/Headeruser';
import Foundationcard from '../components/Foundationcard';
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
              <Foundationcard donors="100" daysLeft="100" donationTitle="Bantuan Gempa" currentAmount={5000000} targetAmount={10000000} />
              <Foundationcard donors="20" daysLeft="120" donationTitle="Banjir Jakarta" currentAmount={2000000} targetAmount={8000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
              <Foundationcard donors="10" daysLeft="60" donationTitle="Kebakaran Pasar" currentAmount={1000000} targetAmount={5000000} />
            </div>
          </div>
        </div>
  );
}

export default Homepagefoundation;