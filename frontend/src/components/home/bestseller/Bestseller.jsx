import React from "react";
import "./styles.scss";
import BestSellerCard from "./BestSellerCard";
import data from "./data";

function Bestseller() {
  const { products } = data;
  return (
    <div className="best_seller product_main margin_top">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>On sale / Bestsellers</h2>
            </div>
            <div className="sub_heading mt">
              <ul className="a_flex">
                <li className="active">Bestsellers</li>
                <li>On Sale</li>
                <li>Most Popular</li>
              </ul>
            </div>
          </div>
          <div className="product_list">
            <div className="product_card">
              {products.map((product, index) => (
                <BestSellerCard key={index} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bestseller;
