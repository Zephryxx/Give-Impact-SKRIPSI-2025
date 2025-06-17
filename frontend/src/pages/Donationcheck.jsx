import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Headeruser from '../components/Headeruser';
import '../styles/Donationcheck.css';

const formatRupiah = (amount) => {
    if (typeof amount !== 'number') {
        amount = Number(amount) || 0;
    }
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const Donationcheck = () => {
    const { kampanyeId } = useParams();

    const [campaign, setCampaign] = useState(null);
    const [pendingDonations, setPendingDonations] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionMessage, setActionMessage] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Sesi tidak valid. Silakan login kembali.");
            }
            
            const campaignRes = await fetch(`http://localhost:8081/api/kampanye/${kampanyeId}`);
            if (!campaignRes.ok) throw new Error('Gagal memuat detail kampanye.');
            const campaignData = await campaignRes.json();
            setCampaign(campaignData);

            const pendingRes = await fetch(`http://localhost:8081/api/campaigns/${kampanyeId}/pending-donations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!pendingRes.ok) {
                const errData = await pendingRes.json();
                throw new Error(errData.message || 'Gagal memuat data konfirmasi.');
            }
            const pendingData = await pendingRes.json();
            setPendingDonations(pendingData);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [kampanyeId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSelect = (donationId) => {
        setSelectedIds(prev =>
            prev.includes(donationId)
                ? prev.filter(id => id !== donationId)
                : [...prev, donationId]
        );
    };

    const handleUpdateStatus = async (newStatus) => {
        if (selectedIds.length === 0) {
            setActionMessage('Pilih minimal satu donasi untuk diproses.');
            return;
        }
        setLoading(true);
        setActionMessage('');

        try {
            const token = localStorage.getItem('token');
            
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/donations/update-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    donationIds: selectedIds,
                    newStatus: newStatus,
                    kampanyeId: kampanyeId
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Proses gagal.');
            }

            setActionMessage(result.message);
            setSelectedIds([]);
            fetchData();
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    
    const progress = useMemo(() => {
        if (!campaign) return 0;
        return Math.min((campaign.donasi_saat_ini / campaign.target_donasi) * 100, 100);
    }, [campaign]);

    if (loading && !campaign) return <div className="loading-container">Loading...</div>;
    if (error) return <div className="error-container">Error: {error} <button onClick={fetchData}>Coba lagi</button></div>;
    if (!campaign) return <div className="error-container">Kampanye tidak ditemukan.</div>;
    
    return (
        <div>
            <Headeruser />
            <div className="donationcheck-container">
                <h3 className='kampanye-title'>{campaign.judul}</h3>
                <div className="detaildonation-card">
                    <h1 className="campaign-amount">{formatRupiah(campaign.donasi_saat_ini)}</h1>
                    <Link to={`/kampanyedetail/${kampanyeId}`} className="detail-button">Detail Kampanye</Link>
                    <div className="progress-section">
                        <div className="donationcheck-progress-bar">
                            <div className="donationcheck-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="progress-goal">{formatRupiah(campaign.target_donasi)}</div>
                    </div>

                    <p><strong>Perlu dikonfirmasi</strong></p>

                    {actionMessage && <p className="action-message">{actionMessage}</p>}

                    <div className="donation-list">
                        {pendingDonations.length > 0 ? pendingDonations.map((donation) => (
                            <div key={donation.Donasi_ID} className={`donation-row ${selectedIds.includes(donation.Donasi_ID) ? 'selected' : ''}`}>
                                <div className="donation-info">
                                    <strong>{donation.donorName}</strong> ({donation.paymentMethod})
                                    <br />
                                    <small>
                                        {donation.transactionCode ? `Kode: ${donation.transactionCode} | ` : ''}
                                        {formatDate(donation.tgl_donasi)}
                                    </small>
                                </div>
                                <span className="donation-amount">{formatRupiah(donation.jumlah)}</span>
                                <input
                                    className="donation-checkbox"
                                    type="checkbox"
                                    checked={selectedIds.includes(donation.Donasi_ID)}
                                    onChange={() => handleSelect(donation.Donasi_ID)}
                                    disabled={loading}
                                />
                            </div>
                        )) : <p>Belum ada donasi masuk yang perlu dikonfirmasi saat ini.</p>}
                    </div>

                    <div className="button-group">
                        <button onClick={() => handleUpdateStatus('Success')} className="action-button confirm" disabled={loading || selectedIds.length === 0}>
                            {loading ? 'Memproses...' : 'Konfirmasi Dana Masuk'}
                        </button>
                        <button onClick={() => handleUpdateStatus('Failed')} className="action-button reject" disabled={loading || selectedIds.length === 0}>
                            {loading ? 'Memproses...' : 'Tolak (Dana Tidak Masuk)'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donationcheck;
