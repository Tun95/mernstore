import React from "react";
import banner from "../../../assets/details/banner.webp";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="product_page_banner mt">
      <div className="container">
        <div className="content">
          <div className="img">
            <img src={banner} alt="" />
          </div>
          <div className="text">
            <h1>Meet LG ThinQ™</h1>
            <p>
              Discover how LG ThinQ™ products with AI take the smart living
              experience to the next level.
            </p>
            <div className="btn">
              <Link to="/store" className="link_btn">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
