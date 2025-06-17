import React, { useState, useEffect } from 'react';
import Headeruser from "../components/Headeruser";
import ArticleCard from "../components/Articlecard";
import { useNavigate } from 'react-router-dom';
import { articleData } from '../components/Articledata';
import Foundationcard from '../components/Foundationcard';
import { Link } from 'react-router-dom';
import "../styles/Homepage.css";

function Homepage (){

    const navigate = useNavigate();
    const [allCampaigns, setAllCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // Fetch from the public, randomized endpoint
                const response = await fetch('http://localhost:8081/api/campaigns');
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign data.');
                }
                const data = await response.json();
                setAllCampaigns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    const daruratCampaigns = allCampaigns.filter(c => c.jenis === 'Kesehatan').slice(0, 3); // Show max 3
    const bencanaCampaigns = allCampaigns.filter(c => c.jenis === 'Bencana Alam').slice(0, 3); // Show max 3

    return(
      <div className="homepage-container">
        <Headeruser/>
        <div className="homepage-content">
  
          <div className="donasipage-button" onClick={() => navigate('/donationpage')}>
            lihat Donasi
          </div>

          {loading && <p>Loading campaigns...</p>}
          {error && <p className="error-message">Error: {error}</p>}
            {!loading && !error && (
                <>
                    {/* Donasi Darurat Section */}
                    <div className="donation-box">
                        <h2 className="section-title-card">Donasi Darurat</h2>
                        <div className="card-container">
                            {daruratCampaigns.length > 0 ? (
                              daruratCampaigns.map(campaign => (
                                    <Foundationcard
                                        key={campaign.donationId}
                                        {...campaign}
                                        baseUrl="/donationdetail"
                                    />
                                ))
                            ) : <p>Tidak ada donasi darurat saat ini.</p>}
                        </div>
                    </div>

                        {/* Donasi Bencana Section */}
                    <div className="donation-box">
                        <h2 className="section-title-card">Donasi Bencana</h2>
                        <div className="card-container">
                            {bencanaCampaigns.length > 0 ? (
                                bencanaCampaigns.map(campaign => (
                                    <Foundationcard
                                        key={campaign.donationId}
                                        {...campaign}
                                        baseUrl="/donationdetail"
                                    />
                                ))
                            ) : <p>Tidak ada donasi bencana saat ini.</p>}
                        </div>
                    </div>
                </>
            )}

          {/* Artikel */}
          <div className="article-box">
            <h2 className="section-title-card">Artikel</h2>
            <div className="card-container">
                        {articleData.slice(0, 3).map(article => (
                            <Link 
                                to={`/artikel/${article.slug}`} 
                                key={article.id} 
                                className="article-card-link"
                                replace
                            >
                                <ArticleCard 
                                    articleImg={article.image} 
                                    articleTitle={article.title} 
                                    articleDate={article.date}
                                />
                            </Link>
                        ))}
                    </div>
          </div>
        </div>
      </div>
    )
  }
  
export default Homepage;