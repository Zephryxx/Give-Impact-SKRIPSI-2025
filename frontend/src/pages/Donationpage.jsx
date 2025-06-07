import React, { useState } from "react";
import "../styles/Donationpage.css";
import Donationpagecard from "../components/Donationpagecard";
import { useNavigate } from 'react-router-dom';
import Headeruser from "../components/Headeruser";

const kategoriList = ['Semua', 'Kesehatan', 'Bencana Alam', 'Darurat', 'Pendidikan', 'Bantuan Sosial'];

// Contoh data kampanye (bisa nanti diganti dengan data dari API)
const allCampaigns = [
  { id: 1, title: "Bantu Operasi Anak", category: "Kesehatan" },
  { id: 2, title: "Bantu Korban Gempa", category: "Bencana Alam" },
  { id: 3, title: "Donasi Darurat Kebakaran", category: "Darurat" },
  { id: 4, title: "Beasiswa Anak Desa", category: "Pendidikan" },
  { id: 5, title: "Bantuan Pangan", category: "Bantuan Sosial" },
  { id: 6, title: "Pengobatan Gratis", category: "Kesehatan" }
];

const KategoriButton = ({ text, onClick, isActive }) => {
  return (
    <button
      className={`kategori-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

function Donationpage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredCampaigns = selectedCategory === "Semua"
    ? allCampaigns
    : allCampaigns.filter(campaign => campaign.category === selectedCategory);

  return (
    <div className="donationpage-container">
      <Headeruser />
      
      <div className="kategori-container">
        {kategoriList.map((item, index) => (
          <KategoriButton
            key={index}
            text={item}
            onClick={() => setSelectedCategory(item)}
            isActive={selectedCategory === item}
          />
        ))}
      </div>

      <div className="donasi-list">
        {filteredCampaigns.map((item) => (
          <div key={item.id} onClick={() => navigate('/donationdetail')}>
            <Donationpagecard campaign={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Donationpage;
