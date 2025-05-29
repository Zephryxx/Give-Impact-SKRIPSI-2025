import React from "react";
import "../Style/Articlecard.css"
const ArticleCard = ({articleTitle}) => {
  return(
    <div className="article-card">
      <div className="image-article-placeholder" />
      <div className="article-title">{articleTitle}</div>
      <div className="article-date">Tanggal</div>
    </div>
  )
};

export default ArticleCard;