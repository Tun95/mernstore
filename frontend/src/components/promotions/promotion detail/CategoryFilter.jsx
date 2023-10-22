import React, { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    subCategories: ["Computers", "Smartphones", "Accessories"],
  },
  {
    id: 2,
    name: "Sports & Outdoors",
    subCategories: ["Outdoor Gear", "Athletic Clothing", "Footwear"],
  },
  {
    id: 3,
    name: "Apparel",
    subCategories: ["Men's Clothing", "Women's Clothing", "Kids' Clothing"],
  },
  {
    id: 4,
    name: "Office Supplies",
    subCategories: ["Stationery", "Office Furniture"],
  },
  {
    id: 5,
    name: "Multimedia",
    subCategories: ["Movies", "Music", "Video Games"],
  },
  {
    id: 6,
    name: "AB: Sports and outdoors",
    subCategories: ["Outdoor Equipment", "Sports Clothing", "Footwear"],
  },
];

function CategoryFilter() {
  //==================
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    if (activeCategory === categoryId) {
      // Clicked on the same category, close it
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };
  return (
    <div className="side_filter">
      <div className="content">
        <div className="category_header">
          <ul>
            <div className="title">
              <small>Categories</small>
            </div>
            {categoriesData.map((category) => (
              <li key={category.id}>
                <div
                  className={`main_category ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.name}</span>
                  {activeCategory === category.id && (
                    <FiberManualRecordIcon className="icon" />
                  )}
                </div>
                {activeCategory === category.id && (
                  <ul className="sub_category">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory}>
                        <span>{subCategory}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
