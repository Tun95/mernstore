import React from "react";
import "./styles.scss";
import airpod1 from "../../../assets/bestsellers/airpod1.webp";
import airpod2 from "../../../assets/bestsellers/airpod2.webp";
import airpod3 from "../../../assets/bestsellers/airpod3.webp";
import airpod4 from "../../../assets/bestsellers/airpod4.webp";
import airpod5 from "../../../assets/bestsellers/airpod5.webp";
import airpod6 from "../../../assets/bestsellers/airpod.webp";

import controller from "../../../assets/bestsellers/controller.webp";
import controller1 from "../../../assets/bestsellers/controller1.webp";
import controller2 from "../../../assets/bestsellers/controller2.webp";
import controller3 from "../../../assets/bestsellers/controller3.webp";

import headset from "../../../assets/bestsellers/headset.webp";
import headset1 from "../../../assets/bestsellers/headset1.webp";
import headset2 from "../../../assets/bestsellers/headset2.webp";
import headset3 from "../../../assets/bestsellers/headset3.webp";
import headset4 from "../../../assets/bestsellers/headset4.webp";
import headset5 from "../../../assets/bestsellers/headset5.webp";

import watch from "../../../assets/bestsellers/watch.webp";
import watch1 from "../../../assets/bestsellers/watch1.webp";
import watch2 from "../../../assets/bestsellers/watch2.webp";
import watch3 from "../../../assets/bestsellers/watch3.webp";

import xbox from "../../../assets/bestsellers/xbox.webp";
import xbox1 from "../../../assets/bestsellers/xbox1.webp";
import xbox2 from "../../../assets/bestsellers/xbox2.webp";
import xbox3 from "../../../assets/bestsellers/xbox3.webp";
import xbox4 from "../../../assets/bestsellers/xbox4.webp";

import BestSellerCard from "./BestSellerCard";

function Bestseller() {
  const products = [
    {
      id: 1,
      name: "Apple AirPods Pro with Wireless Charging Case",
      images: [
        {
          id: 1,
          img: airpod6, // Add one more image
        },
        {
          id: 2,
          img: airpod1,
        },
        {
          id: 3,
          img: airpod2,
        },
        {
          id: 4,
          img: airpod3,
        },
        {
          id: 5,
          img: airpod4,
        },
        {
          id: 6,
          img: airpod5,
        },
      ],

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
      images: [
        {
          id: 1,
          img: controller,
        },
        {
          id: 2,
          img: controller1,
        },
        {
          id: 3,
          img: controller2,
        },
        {
          id: 4,
          img: controller3,
        },
      ],
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
      images: [
        {
          id: 1,
          img: headset,
        },
        {
          id: 2,
          img: headset1,
        },
        {
          id: 3,
          img: headset2,
        },
        {
          id: 4,
          img: headset3,
        },
        {
          id: 5,
          img: headset4,
        },
        {
          id: 6,
          img: headset5,
        },
      ],

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
      images: [
        {
          id: 1,
          img: watch,
        },
        {
          id: 2,
          img: watch1,
        },
        {
          id: 3,
          img: watch2,
        },
        {
          id: 4,
          img: watch3,
        },
      ],
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
      images: [
        {
          id: 1,
          img: xbox,
        },
        {
          id: 2,
          img: xbox1,
        },
        {
          id: 3,
          img: xbox2,
        },
        {
          id: 4,
          img: xbox3,
        },
        {
          id: 5,
          img: xbox4,
        },
      ],
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
