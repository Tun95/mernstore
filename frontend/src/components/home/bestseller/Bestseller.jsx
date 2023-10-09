import React, { useState } from "react";
import "./styles.scss";
import BestSellerCard from "./BestSellerCard";
import data from "./data";

function Bestseller() {
  const { products } = data;

  //=== BSET SELLER ==//
  const [bestSeller, setBestSeller] = useState(true);
  const closeBestSeller = () => {
    setBestSeller(false);
    document.body.style.overflow = "unset";
  };
  const showBestSeller = () => {
    setBestSeller(true);
  };
  const BestSellerDetail = () => {
    showBestSeller();
    closeOnSale();
    closePopular();
  };

  // ===ON SALE===//
  const [onSale, setOnSale] = useState(false);
  const closeOnSale = () => {
    setOnSale(false);
    document.body.style.overflow = "unset";
  };
  const showOnSale = () => {
    setOnSale(true);
  };
  const OnSaleDetail = () => {
    showOnSale();
    closeBestSeller();
    closePopular();
  };

  // ===ON SALE===//
  const [popular, setPopular] = useState(false);
  const closePopular = () => {
    setPopular(false);
    document.body.style.overflow = "unset";
  };
  const showPopular = () => {
    setPopular(true);
  };
  const PopularDetail = () => {
    showPopular();
    closeBestSeller();
    closeOnSale();
  };

  return (
    <div className="best_seller product_main margin_top">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>On sale / Bestsellers</h2>
            </div>
            <div className="sub_heading mt">
              <ul className="f_flex">
                <li
                  onClick={BestSellerDetail}
                  className={bestSeller ? "active" : ""}
                >
                  Bestsellers
                </li>
                <li onClick={OnSaleDetail} className={onSale ? "active" : ""}>
                  On Sale
                </li>
                <li onClick={PopularDetail} className={popular ? "active" : ""}>
                  Most Popular
                </li>
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
