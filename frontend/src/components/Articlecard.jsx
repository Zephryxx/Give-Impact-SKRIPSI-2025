import React from "react";
import "../styles/Articlecard.css"
import { useNavigate } from 'react-router-dom';
import gempa from '../img/img_bantuan_korban_gempa.jpeg'
import banjir from '../img/img_bantuan_donasi_pembangunan.jpeg'
import longsor from '../img/longsor.jpeg'

const ArticleCard = ({articleImg, articleTitle, articleDate}) => {

  const navigate = useNavigate();
  return(
    <div className="article-card" onClick={() => navigate('/artikel')}>
      <img className="image-article-placeholder" src={articleImg} />
      <div className="article-title-card">{articleTitle}</div>
      <div className="article-date-card">{articleDate}</div>
    </div>
  )
};

export default ArticleCard;