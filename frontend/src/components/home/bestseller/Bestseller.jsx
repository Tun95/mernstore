import React from "react";
import "./styles.scss";
import img1 from "../../../assets/bestsellers/airpod.webp";
import img2 from "../../../assets/bestsellers/controller.webp";
import img3 from "../../../assets/bestsellers/headset.webp";
import img4 from "../../../assets/bestsellers/watch.webp";
import img5 from "../../../assets/bestsellers/xbox.webp";
import BestSellerCard from "./BestSellerCard";

function Bestseller() {
  const data = [
    {
      id: 1,
      name: "Apple AirPods Pro with Wireless Charging Case",
      img: img1,
      price: 18245,
      discount: 10,
      rating: 3.5,
      numReviews: 2,
      status: true,
      countInStock: 2,
    },
    {
      id: 2,
      name: "Apple AirPods Pro with Wireless Charging Case",
      img: img2,
      price: 2245,
      discount: 10,
      rating: 3,
      numReviews: 2,
      status: true,
      blackFriday: true,
      countInStock: 2,
    },
    {
      id: 3,
      name: "Sony - Platinum Wireless 7.1 Virtual Surround Sound Gaming Headset for PlayStation 4 - Black",
      img: img3,
      price: 10245,
      discount: 10,
      rating: 4.5,
      numReviews: 2,
      status: false,
      countInStock: 2,
    },
    {
      id: 4,
      name: "Apple AirPods Pro with Wireless Charging Case",
      img: img4,
      price: 18245,
      discount: 6,
      rating: 2.5,
      numReviews: 2,
      status: false,
      countInStock: 2,
    },
    {
      id: 5,
      name: "Apple AirPods Pro with Wireless Charging Case",
      img: img5,
      price: 10005,
      discount: 0,
      rating: 0,
      numReviews: 0,
      status: false,
      countInStock: 2,
    },
  ];
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
            <BestSellerCard products={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bestseller;
