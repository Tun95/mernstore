import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Filter() {
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
              <small>Subcategories</small>
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
                    <FiberManualRecordIcon className="icon red" />
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
        <div className="product_filter">
          <ul>
            <li>
              <div>
                <span>Brand</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              <div>
                <span>Color</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              {" "}
              <div>
                <span>Price</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              <div>
                <span>Size</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              <div>
                <span>Operating System</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              <div>
                <span>Display</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
            <li>
              <div>
                <span>Storage Capacity</span>
                <AddIcon />
              </div>
              <ul>
                <li></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
