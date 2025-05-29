import React from 'react';
import '../styles/Donationdetail.css';
import Headeruser from '../components/Headeruser';
import { useNavigate } from 'react-router-dom';

const DonationDetail = () => {

  const navigate = useNavigate();

  return (
    <div className="donation-page">
      {/* Header */}
      <Headeruser/>

      {/* Main Content */}
      <main className="main-content">
        <div className="card">
          <div className="image-placeholder" />

          <h3 className="donationdetail-title">Judul Donasi</h3>

          <div className="donation-info">
            <div>
              <div>Nama Yayasan</div>
              <div className="sub-info">Jumlah donatur</div>
            </div>
            <div>
              <div>Nama Penerima</div>
              <div className="sub-info">Waktu Mulai</div>
            </div>
            <div>
              <div>Kategori Donasi</div>
              <div className="sub-info">Waktu Berakhir</div>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-bar-fill" />
            </div>
            <div className="progress-text">
              <span>Uang Terkumpul</span>
              <span>Target Uang</span>
            </div>
          </div>
        </div>

        <div className="section">
          <label>Deskripsi penerima donasi</label>
          <textarea className="textarea" readOnly placeholder="Deskripsi..." />
        </div>

        <div className="section">
          <label>Rincian Dana</label>
          <textarea className="textarea" readOnly placeholder="Rincian dana..." />
        </div>

        <div className="button-container" onClick={() => navigate('/payment')}>
          <button className="donate-button">Donasi Sekarang</button>
        </div>
      </main>
    </div>
  );
};

export default DonationDetail;