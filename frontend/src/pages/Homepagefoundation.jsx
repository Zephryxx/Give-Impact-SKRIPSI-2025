import React, { useState, useEffect, useContext } from 'react';
import '../styles/Homepagefoundation.css'
import Headeruser from '../components/Headeruser';
import Foundationcard from '../components/Foundationcard';
import ops from '../img/images.jpeg'
import banjir from '../img/img_bantuan_korban_banjir.jpeg'
import kebakaran from '../img/kebakaran.jpeg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Homepagefoundation() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [myCampaigns, setMyCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCampaigns = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/foundation/my-campaigns', {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch your campaigns from the server.');
                }

                const data = await response.json();
                setMyCampaigns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (authState.token) {
            fetchMyCampaigns();
        }
    }, [authState.token]);

  return (
    <div className="homepage-container">
        <Headeruser/>
        <div className="homepage-content">
  
            <div className="buatkampanye-button" onClick={() => navigate('/buatkampanye')}>
            Buat Kampanye
            </div>
            <h3 className="homefoundation-title">Kampanye yang berlangsung</h3>

            <div className="card-container">
                {loading && <p>Loading your campaigns...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {!loading && !error && (
                    myCampaigns.length > 0 ? (
                        myCampaigns.map(campaign => (
                            <Foundationcard
                                key={campaign.donationId}
                                donationId={campaign.donationId}
                                donationImg={campaign.donationImg}
                                donationTitle={campaign.donationTitle}
                                foundationName={campaign.foundationName}
                                donors={campaign.donors}
                                enDate={campaign.enDate}
                                currentAmount={campaign.currentAmount}
                                targetAmount={campaign.targetAmount}
                                baseUrl="/donationcheck"
                            />
                        ))
                    ) : (
                        <p>Anda belum membuat kampanye apapun.</p>
                    )
                )}
            </div>
          </div>
        </div>
  );
}

export default Homepagefoundation;