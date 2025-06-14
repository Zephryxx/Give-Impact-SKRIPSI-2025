import React,{useState, useContext} from 'react';
import '../styles/Paymentpage.css'
import Headeruser from '../components/Headeruser';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Paymentpage = () => {
    const { id } = useParams();
    const { authState } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [prayer, setPrayer] = useState('');
    const [paymentType, setPaymentType] = useState('Transfer VA BCA');

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    if (!id) {
        setIsLoading(false);
        setError("ID Kampanye tidak ditemukan di URL.");
        return;
    }

    const formatRupiah = (angka) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(angka);
        };

    const handleSelectAmount = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const getTotalAmount = () => {
        return selectedAmount || parseInt(customAmount) || 0;
    };

    const handleSubmit = async () => {
        setError('');
        setSuccessMessage('');

        const total = getTotalAmount();
        if (total <= 0) {
        alert('Mohon masukkan jumlah donasi.');
        return;
        }

        const token = authState.token;
        if (!token) {
            setError("Sesi Anda telah berakhir. Silakan login kembali untuk berdonasi.");
            return;
        }

        setIsLoading(true);

        const donationData = {
            jumlah: total,
            pesan: prayer,
            tipe_pemb: paymentType,
            provider: '',
            kampanyeId: id
        };

        try {
        const response = await fetch('http://localhost:8081/api/donate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(donationData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Gagal memproses donasi.');
        }

        setSuccessMessage(result.message);
        setSelectedAmount('');
        setCustomAmount('');
        setPrayer('');
        
        
            setTimeout(() => {
                    navigate(`/donationdetail/${id}`);
                }, 2000);

        } catch (err) {
            setError(err.message || "Gagal terhubung ke server. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const getVirtualAccount = () => {
            switch (paymentType) {
                case 'Transfer VA BCA': return { bank: 'Virtual Account BCA', account: '081837502273' };
                case 'Transfer VA BNI': return { bank: 'Virtual Account BNI', account: '081837509999' };
                case 'Transfer VA Mandiri': return { bank: 'Virtual Account Mandiri', account: '081837508888' };
                default: return { bank: '-', account: '-' };
            }
        };

    const va = getVirtualAccount();

    return (
        <div className="payment-page">
            <Headeruser/>
            <main className="payment-content">
                <div className="payment-grid">
                    <section className="box box-nominal">
                        <label className="section-title">Nominal Donasi</label>
                        <div className="donation-amounts">
                            {[10000, 30000, 50000, 100000].map((amount) => (
                                <button
                                    key={amount}
                                    className={`amount-box ${selectedAmount === amount ? 'selected' : ''}`}
                                    onClick={() => handleSelectAmount(amount)}
                                >
                                    {formatRupiah(amount).replace('Rp ', '')}
                                </button>
                            ))}
                        </div>
                        <div className="custom-donation-input">
                            <label className='label-info'>Masukkan Donasi dana lainnya</label>
                            <input
                                type="text"
                                placeholder="Contoh: 20000"
                                className="donation-input"
                                value={formatRupiah(customAmount)}
                                onChange={handleCustomAmountChange}
                            />
                        </div>
                        <div className="prayer-section">
                            <label className='label-info'>Dukungan atau Doa (Opsional)</label>
                            <textarea
                                className="prayer-textarea"
                                placeholder="Tuliskan doa atau dukunganmu..."
                                value={prayer}
                                onChange={(e) => setPrayer(e.target.value)}
                            />
                        </div>
                    </section>

                    <div className="box box-tipe-pembayaran">
                        <label className='label-info'>Tipe Pembayaran</label>
                        <select
                            className="payment-select"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <option>Transfer VA BCA</option>
                            <option>Transfer VA BNI</option>
                            <option>Transfer VA Mandiri</option>
                        </select>
                    </div>
                    <div className="box box-va">
                        <label className='label-info'>Rekening Penerima Donasi</label>
                        <strong>{va.bank}</strong>
                        <h3>{va.account}</h3>
                    </div>

                    <div className="box box-total-pembayaran" style={{ gridColumn: 'span 2' }}>
                        <label className='label-info'>Total Pembayaran</label>
                        <input
                            type="text"
                            readOnly
                            className="total-input"
                            value={formatRupiah(getTotalAmount())}
                        />
                    </div>

                    <div className="pay-button-container">
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <button className="pay-button" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? 'Memproses...' : 'Bayar'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Paymentpage;