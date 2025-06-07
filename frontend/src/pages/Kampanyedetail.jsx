import React from 'react'
import '../styles/Kampanyedetail.css'
import Headeruser from '../components/Headeruser'

function Kampanyedetail() {
  return (
    <div className="kampanyedetail-container">
        <Headeruser/>
        <div className="kampanyedetail-content">
            <div className="kampanyedetail-image" />

            <h2 className="kampanyedetail-title">Judul Donasi</h2>

            <div className="kampanyedetail-info-grid">
                <div><strong>Nama Yayasan</strong></div>
                <div><strong>Nama Penerima</strong></div>
                <div><strong>Kategori Donasi</strong></div>
            </div>

            <div className="kampanyedetail-info-grid info-subtext">
                <div>Jumlah donatur</div>
                <div>Waktu Mulai</div>
                <div>Waktu Berakhir</div>
            </div>

            <div className="progress-bar">
            <   div className="progress-fill" />
            </div>

            <div className="progress-labels">
                <span>Uang terkumpul</span>
                <span>Target Uang</span>
            </div>

            <div className="donation-section">
                <label>Deskripsi penerima donasi</label>
                <textarea className='kampanyedetail-input' readOnly 
                value="Deskripsi singkat mengenai penerima donasi." />
            </div>

            <div className="donation-section">
                <label>Rincian Dana</label>
                <textarea className='kampanyedetail-input' readOnly 
                value="Rincian alokasi dana yang akan digunakan." />
            </div>
        </div>
    </div>
  )
}

export default Kampanyedetail