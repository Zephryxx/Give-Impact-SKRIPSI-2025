import React from "react";
import "../styles/Articlecard.css"
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({articleTitle}) => {

  const navigate = useNavigate();
  return(
    <div className="article-card" onClick={() => navigate('/artikel')}>
      <div className="image-article-placeholder" />
      <div className="article-title">{articleTitle}</div>
      <div className="article-date">Tanggal</div>
    </div>
  )
};

export default ArticleCard;