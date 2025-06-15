import React from 'react';
import '../styles/Artikelpage.css';
import Headeruser from '../components/Headeruser';
import { useParams, Link } from 'react-router-dom';
import { articleData } from '../components/Articledata';
const Artikelepage = () => {
    const { slug } = useParams();

    const article = articleData.find(article => article.slug === slug);

    if (!article) {
        return (
            <div className="article-container">
                {/* <Headeruser /> */}
                <div className="artikel-content">
                    <h1>Artikel Tidak Ditemukan</h1>
                    <p>Maaf, artikel yang Anda cari tidak ada.</p>
                    <Link to="/home">Kembali ke Homepage</Link>
                </div>
            </div>
        );
    }

  return (
    <div className="article-container">
        <Headeruser/>
        <div className="artikel-content">

            {/* Gambar di atas */}
            <div className="article-image-wrapper">
                <img
                        src={article.image}
                        alt={article.title}
                        className="article-image"
                    />
                </div>

                {/* Judul Artikel */}
                <h1 className="article-title">{article.title}</h1>
                <p className="article-date">Dipublikasikan pada: {article.date}</p>

                {/* Isi Artikel */}
                <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
  );
};

export default Artikelepage;
