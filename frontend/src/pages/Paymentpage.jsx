import React,{useState, useEffect, useContext} from 'react';
import '../styles/Paymentpage.css'
import Headeruser from '../components/Headeruser';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Paymentpage = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    const [campaign, setCampaign] = useState(null);
    const [paymentOptions, setPaymentOptions] = useState([]);

    const [selectedAmount, setSelectedAmount] = useState(10000);
    const [customAmount, setCustomAmount] = useState('');
    const [prayer, setPrayer] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            setError("ID Kampanye tidak ditemukan di URL.");
            return;
        }

        const fetchCampaignData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/kampanye/${id}`);
                if (!response.ok) {
                    throw new Error('Gagal memuat detail kampanye.');
                }
                const data = await response.json();
                setCampaign(data);

                if (data.rekening && data.rekening.length > 0) {
                    setPaymentOptions(data.rekening);
                    setSelectedProvider(data.rekening[0].provider); // Set default ke provider pertama
                } else {
                    setError("Metode pembayaran untuk kampanye ini tidak tersedia.");
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaignData();
    }, [id]);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(Number(angka) || 0);
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setCustomAmount(value);
        setSelectedAmount('');
    };

    const handleSelectAmount = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const getTotalAmount = () => {
        return selectedAmount || Number(customAmount) || 0;
    };

    const handleSubmit = async () => {
        setError('');
        setSuccessMessage('');
        const total = getTotalAmount();

        if (total < 10000) {
            setError('Jumlah donasi minimal adalah Rp 10.000.');
            return;
        }
        if (!authState.token) {
            setError("Sesi Anda telah berakhir. Silakan login kembali.");
            return;
        }

        setIsLoading(true);

        const donationData = {
            jumlah: total,
            pesan: prayer,
            tipe_pemb: selectedProvider,
            provider: selectedProvider,
            kampanyeId: id
        };

        try {
            const response = await fetch('http://localhost:8081/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
                body: JSON.stringify(donationData)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Gagal memproses donasi.');

            setSuccessMessage(result.message);
            setTimeout(() => {
                navigate(`/donationdetail/${id}`);
            }, 2500);

        } catch (err) {
            setError(err.message || "Gagal terhubung ke server.");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedAccount = paymentOptions.find(opt => opt.provider === selectedProvider);

    if (isLoading) return <div>Memuat halaman pembayaran...</div>;
    if (error && !campaign) return <div>Error: {error}</div>

    return (
        <div className="payment-page">
            <Headeruser />
            <main className="payment-content">
                <div className="payment-header">
                    <h1>{campaign?.judul || 'Halaman Pembayaran'}</h1>
                    <p>Terima kasih telah memilih untuk berdonasi. Setiap kontribusi Anda sangat berarti.</p>
                </div>

                <div className="payment-grid">
                    {/* Kolom Kiri */}
                    <div className="payment-form">
                        <div className="box">
                            <label className="section-title">1. Pilih Nominal Donasi</label>
                            <div className="donation-amounts">
                                {[10000, 30000, 50000, 100000].map((amount) => (
                                    <button
                                        key={amount}
                                        className={`amount-box ${selectedAmount === amount ? 'selected' : ''}`}
                                        onClick={() => handleSelectAmount(amount)}
                                    >
                                        {formatRupiah(amount)}
                                    </button>
                                ))}
                            </div>
                            <label className='label-info'>Atau masukkan nominal lain</label>
                            <div className="custom-donation-input">
                                <span>Rp</span>
                                <input
                                    type="text"
                                    placeholder="20.000"
                                    className="donation-input"
                                    value={customAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    onChange={handleCustomAmountChange}
                                />
                            </div>
                        </div>

                        <div className="box">
                            <label className="section-title">2. Dukungan atau Doa (Opsional)</label>
                            <textarea
                                className="prayer-textarea"
                                placeholder="Tuliskan doa atau dukungan tulusmu di sini..."
                                value={prayer}
                                onChange={(e) => setPrayer(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div className="payment-summary">
                        <div className="box">
                            <label className="section-title">3. Pilih Metode Pembayaran</label>
                            <select
                                className="payment-select"
                                value={selectedProvider}
                                onChange={(e) => setSelectedProvider(e.target.value)}
                                disabled={paymentOptions.length === 0}
                            >
                                {paymentOptions.length > 0 ? (
                                    paymentOptions.map(opt => (
                                        <option key={opt.provider} value={opt.provider}>
                                            {opt.provider}
                                        </option>
                                    ))
                                ) : (
                                    <option>Tidak ada pilihan</option>
                                )}
                            </select>
                        </div>
                        <div className="box box-va">
                            <label className='label-info'>Silakan transfer ke rekening berikut:</label>
                            <strong>{selectedAccount?.provider || 'Bank'}</strong>
                            <div className='va-account-number'>
                                <h3>{selectedAccount?.number || 'Nomor rekening tidak tersedia'}</h3>
                            </div>
                            <span>A/N: {campaign?.nama_foundation || 'Nama Yayasan'}</span>
                        </div>
                        
                        <div className="box total-box">
                            <div>
                                <label className='label-info'>Total Donasi</label>
                                <span className="total-amount">{formatRupiah(getTotalAmount())}</span>
                            </div>
                            <button className="pay-button" onClick={handleSubmit} disabled={isLoading || getTotalAmount() < 10000}>
                                {isLoading ? 'Memproses...' : `Donasi Sekarang`}
                            </button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Paymentpage;