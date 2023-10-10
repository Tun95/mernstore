import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className="category_card">
      {data.map((item, index) => (
        <Link to="/store" className="category_content p_flex" key={index}>
          <div className="cards">
            <img src={item.img} alt="" className="img" />
            <p>{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryCard;
