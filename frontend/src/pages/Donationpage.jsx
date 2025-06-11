import React, { useState } from "react";
import "../styles/Donationpage.css";
import Donationpagecard from "../components/Donationpagecard";
import { useNavigate } from 'react-router-dom';
import Headeruser from "../components/Headeruser";
import ops from '../img/images.jpeg'
import banjir from '../img/img_bantuan_korban_banjir.jpeg'
import kebakaran from '../img/kebakaran.jpeg'
import gempa from '../img/img_bantuan_korban_gempa.jpeg'
import longsor from "../img/longsor.jpeg"
import bangunan from '../img/img_bantuan_donasi_pembangunan.jpeg'


const kategoriList = ['Semua', 'Kesehatan', 'Bencana Alam', 'Darurat', 'Pendidikan', 'Bantuan Sosial'];
// Contoh data kampanye (bisa nanti diganti dengan data dari API)
const allCampaigns = [
  {
    id: 1,
    donationpageImg:ops,
    title: "Bantuan Operasi Kesehatan Bu Yani",
    category: "Kesehatan",
    foundationName: "Yayasan Kasih Sehat",
    amount: 50000000,
    target: 100000000,
    date: "2025-08-20"
  },
  {
    id: 2,
    donationpageImg:gempa,
    title: "Bantu Korban Gempa",
    category: "Bencana Alam",
    foundationName: "PT peduli kasih",
    amount: 4000000,
    target: 9000000,
    date: "2025-10-20"
  },
  {
    id: 3,
    donationpageImg:banjir,
    title: "Bantuan Korban Banjir",
    category: "Bencana Alam",
    foundationName: "PT Sejahtera",
    amount: 3000000,
    target: 10000000,
    date: "2025-09-20"
  },
  {
    id: 4,
    donationpageImg:bangunan,
    title: "Bangun MCK di pelosok Negeri",
    category: "Bantuan Sosial",
    foundationName: "PT cinta kasih",
    amount: 2000000,
    target: 8000000,
    date: "2025-07-20"
  },
  {
    id: 5,
    donationpageImg:longsor,
    title: "Bantuan Korban Longsor",
    category: "Bencana Alam",
    foundationName: "PT cinta sesama",
    amount: 2500000,
    target: 7000000,
    date: "2025-06-20"
  },
  {
    id: 6,
    donationpageImg:kebakaran,
    title: "Bantuan Korban kebakaran Pasar",
    category: "Bantuan Sosial",
    foundationName: "PT Sejahtera",
    amount: 1000000,
    target: 5000000,
    date: "2025-07-20"
  },
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
