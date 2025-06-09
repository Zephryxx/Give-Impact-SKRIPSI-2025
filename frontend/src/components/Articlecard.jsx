import React from "react";
import "../styles/Articlecard.css"
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({articleTitle, articleDate}) => {

  const navigate = useNavigate();
  return(
    <div className="article-card" onClick={() => navigate('/artikel')}>
      <div className="image-article-placeholder" />
      <div className="article-title-card">{articleTitle}</div>
      <div className="article-date-card">{articleDate}</div>
    </div>
  )
};

export default ArticleCard;