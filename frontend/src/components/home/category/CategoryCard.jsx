import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";

function CategoryCard({ data }) {
  const { state } = useContext(Context);
  const { categories } = state;
  return (
    <div className="category_card">
      {categories?.map((categoryGroup, groupIndex) => (
        <>
          {Array.isArray(categoryGroup.categories) ? (
            categoryGroup.categories.map((category, index) => (
              <Link to="/store" className="category_content " key={index}>
                <div className="cards">
                  <img src={category.img} alt="" className="img" />
                  <div className="text l_flex">
                    <p>{category.name}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <span className="category" key={groupIndex}>
              {/* Render your single category code here */}
            </span>
          )}
        </>
      ))}
    </div>
  );
}

export default CategoryCard;
