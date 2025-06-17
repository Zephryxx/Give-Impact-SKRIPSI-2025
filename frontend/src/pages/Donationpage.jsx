import React, { useState, useEffect } from "react";
import "../styles/Donationpage.css";
import Donationpagecard from "../components/Donationpagecard";
import { useNavigate } from 'react-router-dom';
import Headeruser from "../components/Headeruser";


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

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const kategoriList = ['Semua', 'Kesehatan', 'Bencana Alam', 'Darurat', 'Pendidikan', 'Bantuan Sosial'];
  
  const filteredCampaigns = selectedCategory === "Semua"
  ? allCampaigns
  : allCampaigns.filter(campaign => campaign.category === selectedCategory);

  useEffect(() => {
      const fetchCampaigns = async () => {
          try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await fetch(`${apiUrl}/api/campaigns`);
              if (!response.ok) {
                  throw new Error('Failed to fetch campaigns from the server.');
              }
              const data = await response.json();

              const formattedData = data.map(campaign => ({
                  id: campaign.donationId,
                  donationpageImg: campaign.donationImg,
                  title: campaign.donationTitle,
                  category: campaign.jenis,
                  foundationName: campaign.foundationName,
                  amount: campaign.currentAmount,
                  target: campaign.targetAmount,
                  date: campaign.enDate
              }));
                
              setAllCampaigns(formattedData);

          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchCampaigns();
  }, []);
  
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
        {loading && <p>Loading campaigns...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && (
            filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((item) => (
                    // Make each card a clickable link to its detail page
                    <div key={item.id} onClick={() => navigate(`/donationdetail/${item.id}`)}>
                        <Donationpagecard campaign={item} />
                    </div>
                ))
            ) : (
                <p>Tidak ada kampanye yang cocok dengan kategori ini.</p>
            )
        )}
      </div>
    </div>
  );
}

export default Donationpage;
