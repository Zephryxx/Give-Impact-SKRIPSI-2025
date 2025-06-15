import '../styles/Kampanyedetail.css'; 
import Headeruser from '../components/Headeruser';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = Number(angka) || 0;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(angka);
};

function Kampanyedetail() {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);

    const navigate = useNavigate();

    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (authState.isAuthenticated && authState.user.tipe_akun !== 'Foundation') {
            setError('Akses ditolak. Halaman ini hanya untuk Foundation.');
            setLoading(false);
            return;
        }

        if (!id) {
            setLoading(false);
            setError("ID Kampanye tidak ditemukan di URL.");
            return;
        }

        const fetchCampaignDetail = async () => {
            try {
                // Gunakan 'id' yang didapat dari useParams untuk fetch ke backend
                const response = await fetch(`http://localhost:8081/api/kampanye/${id}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal memuat data kampanye.');
                }

                const data = await response.json();
                setCampaign(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchCampaignDetail();
    }, [id, authState]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!campaign) return <div>Kampanye tidak ditemukan.</div>;

    const progressPercentage = (campaign.donasi_saat_ini / campaign.target_donasi) * 100;

    return (
        <div className="kampanyedetail-container">
            <Headeruser/>
            <main className="kampanyedetail-content">
                <img 
                    src={`${campaign.gambar}`} 
                    alt={campaign.judul}
                    className="kampanyedetail-image" 
                />
                <h1 className="kampanyedetail-title">{campaign.judul}</h1>
                
                <div className="kampanyedetail-info-grid">
                    <div className="info-item">
                        <span className="info-label">Nama Yayasan</span>
                        <strong className="info-value">{campaign.nama_foundation}</strong>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Nama Penerima</span>
                        <strong className="info-value">{campaign.nm_penerima || campaign.nm_penetima}</strong>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Kategori Donasi</span>
                        <strong className="info-value">{campaign.jenis}</strong>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Jumlah Donatur</span>
                        <strong className="info-value">12 Donatur</strong> {/* Placeholder */}
                    </div>
                    <div className="info-item">
                        <span className="info-label">Waktu Mulai</span>
                        <strong className="info-value">{new Date(campaign.tgl_mulai).toLocaleDateString('id-ID')}</strong>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Waktu Berakhir</span>
                        <strong className="info-value">{new Date(campaign.tgl_selesai).toLocaleDateString('id-ID')}</strong>
                    </div>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>{formatRupiah(campaign.donasi_saat_ini)}</span>
                        <span>Target {formatRupiah(campaign.target_donasi)}</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
                    </div>
                </div>

                <div className="donation-section">
                    <label>Deskripsi penerima donasi</label>
                    <p className='kampanyedetail-text'>{campaign.deskripsi || campaign.deksripsi}</p>
                </div>

                <div className="donation-section">
                    <label>Rincian Penggunaan Dana</label>
                    <p className='kampanyedetail-text'>{campaign.perincian}</p>
                </div>
            </main>
        </div>
    );
}

export default Kampanyedetail;