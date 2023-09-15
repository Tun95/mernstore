import React from "react";

function CategoryCard({ data }) {
  return (
    <div className="category_card">
      {data.map((item, index) => (
        <div className="category_content p_flex" key={index}>
          <div className="cards">
            <img src={item.img} alt="" className="img" />
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryCard;
