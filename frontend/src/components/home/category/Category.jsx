import React from "react";
import "./styles.scss";
import CategoryCard from "./CategoryCard";
import img1 from "../../../assets/category/electronics.webp";
import img2 from "../../../assets/category/tv.webp";
import img3 from "../../../assets/category/games.webp";
import img4 from "../../../assets/category/cameras.webp";
import img5 from "../../../assets/category/phones.webp";
import img6 from "../../../assets/category/sports.webp";
import img7 from "../../../assets/category/apparel.webp";
import img8 from "../../../assets/category/car.webp";

function Category() {
  const data = [
    { id: 1, img: img1, name: "Electronics" },
    { id: 2, img: img2, name: "TVs / Video" },
    { id: 3, img: img3, name: "Video games" },
    { id: 4, img: img4, name: "Cameras & Photo" },
    { id: 5, img: img5, name: "Cell Phones" },
    { id: 6, img: img6, name: "Sports & Outdoors" },
    { id: 7, img: img7, name: "Apparel" },
    { id: 8, img: img8, name: "Car Electronics" },
  ];
  return (
    <div className="main_category mb">
      <div className="container">
        <CategoryCard data={data} />
      </div>
    </div>
  );
}

export default Category;
