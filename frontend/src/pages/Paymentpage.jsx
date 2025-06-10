import React,{useState} from 'react';
import '../styles/Paymentpage.css'
import Headeruser from '../components/Headeruser';

const Paymentpage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [prayer, setPrayer] = useState('');
  const [paymentType, setPaymentType] = useState('Transfer VA BCA');

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

  const handleSubmit = () => {
    const total = getTotalAmount();
    if (total <= 0) {
      alert('Mohon masukkan jumlah donasi.');
      return;
    }

    // Simulasi proses pembayaran
    console.log('Donasi:', total);
    console.log('Doa:', prayer);
    console.log('Metode Pembayaran:', paymentType);

    alert(`Terima kasih atas donasi sebesar Rp ${total.toLocaleString()}!`);
  };

  const getVirtualAccount = () => {
    switch (paymentType) {
      case 'Transfer VA BCA':
        return { bank: 'Virtual Account BCA', account: '081837502273' };
      case 'Transfer VA BNI':
        return { bank: 'Virtual Account BNI', account: '081837509999' };
      case 'Transfer VA Mandiri':
        return { bank: 'Virtual Account Mandiri', account: '081837508888' };
      default:
        return { bank: '-', account: '-' };
    }
  };

  const va = getVirtualAccount();

  return (
    <div className="payment-page">
      <Headeruser/>
      <main className="payment-content">
        <section className="payment-section box-nominal">
          <label className="section-title-payment">Nominal Donasi</label>
          <div className="donation-amounts">
            {[10000, 30000, 50000, 100000].map((amount, index) => (
              <button
                key={index}
                className={`amount-box ${selectedAmount === amount ? 'selected' : ''}`}
                onClick={() => handleSelectAmount(amount)}
              >
                {amount.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="custom-donation-input">
            <label className='label-info'>Masukkan Donasi dana lainnya</label>
            <input
              type="number"
              placeholder="Contoh: 20000"
              className="donation-input"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
          </div>

          <div className="prayer-section">
            <label className='label-info'>Dukungan atau Doa(*Opsional)</label>
            <textarea
              className="prayer-textarea"
              placeholder="Tuliskan doa atau dukunganmu..."
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
            />
          </div>
        </section>

        <div className="payment-methods">
          <div className="payment-type box-tipe-pembayaran">
            <label className='label-info'>tipe pembayaran</label>
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

          <div className="recipient-account box-va">
            <p>Rekening Penerima Donasi</p>
            <strong>{va.bank}</strong>
            <h3>{va.account}</h3>
          </div>
        </div>

        <div className="total-payment box-total-pembayaran">
          <label className='label-info'>Total Pembayaran</label>
          <input
            type="text"
            readOnly
            className="total-input"
            value={`Rp ${getTotalAmount().toLocaleString()}`}
          />
        </div>

        <div className="pay-button-container">
          <button className="pay-button" onClick={handleSubmit}>
            Bayar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Paymentpage;