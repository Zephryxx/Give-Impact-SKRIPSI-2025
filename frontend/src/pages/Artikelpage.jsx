import React from 'react';
import '../styles/Artikelpage.css';
import Headeruser from '../components/Headeruser';
const Artikelepage = () => {
  return (
    <div className="article-container">
        <Headeruser/>
        <div className="artikel-content">

            {/* Gambar di atas */}
            <div className="article-image-wrapper">
                <img
                    src=""
                    alt="Gambar Artikel"
                    className="article-image"
                />
                </div>

                {/* Judul Artikel */}
                <h1 className="article-title">Judul Artikel</h1>

                {/* Isi Artikel */}
                <div className="article-content">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Minus dolor cumque assumenda commodi, nobis recusandae. 
                    Sunt rem nesciunt quae hic laborum odio dolores, modi ab nihil earum blanditiis dolor laudantium!
                </p>
            </div>
        </div>
    </div>
  );
};

export default Artikelepage;
