import React from "react";
import "../styles/Donationpage.css";
import Donationpagecard from "../components/Donationpagecard";
import { useNavigate } from 'react-router-dom';
import Headeruser from "../components/Headeruser";
const kategori = ['Kesehatan', 'Bencana Alam', 'Darurat', 'Pendidikan', 'Bantuan Sosial'];

const KategoriButton = ({ text }) => {
  return (
    <button className="kategori-button">
      {text}
    </button>
  );
};

function Donationpage (){

  const navigate = useNavigate();
  
  return(
    <div className="donationpage-container">
        <Headeruser/>
      <div className="kategori-container">
          {kategori.map((item, index) => (
            <KategoriButton key={index} text={item} />
          ))}
      </div>

      <div className="donasi-list" onClick={() => navigate('/donationdetail')}>
        {[1, 2, 3, 4].map((item) => (
          <Donationpagecard key={item} />
        ))}
      </div>
    </div> 
  )
}

export default Donationpage;