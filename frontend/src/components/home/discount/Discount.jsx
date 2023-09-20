import React, { useEffect, useState } from "react";
import DiscountCard from "./DiscountCard";
import { Link } from "react-router-dom";
import data from "../bestseller/data";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "./styles.scss";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn l_flex" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowRightIcon className="icon" />
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn l_flex" onClick={onClick}>
      <button className="prev l_flex">
        <KeyboardArrowLeftIcon className="icon" />
      </button>
    </div>
  );
};
function Discount() {
  const { products } = data;

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1250) {
        setSlidesToShow(Math.min(4, products.length));
      } else if (screenWidth >= 1120) {
        setSlidesToShow(Math.min(3, products.length));
      } else if (screenWidth >= 800) {
        setSlidesToShow(Math.min(2, products.length));
      } else if (screenWidth >= 660) {
        setSlidesToShow(Math.min(3, products.length));
      } else if (screenWidth >= 330) {
        setSlidesToShow(Math.min(2, products.length));
      } else {
        setSlidesToShow(Math.min(1, products.length));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products.length]);

  const SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="discount_section product_main">
      <div className="container">
        <div className="content box_shadow d_flex">
          <div className="left">
            <div className="main_content">
              <div className="header">
                <h2>AB: Only today you can buy a camera with - 20% discount</h2>
              </div>
              <div className="description">
                <p>
                  Buy a camera of a well-known brand with 20% discount during
                  this period. Buying promotional models of cameras or Canon
                  lenses, you get a free one-year subscription to a plan for
                  photographers from Adobe Creative Cloud and one of the online
                  courses.
                </p>
              </div>
              <div className="time_period">
                <div className="">
                  <h4>Promotions expires within:</h4>
                </div>
                <div className="time">
                  <span>
                    <ul>
                      <li>
                        <span>111</span>
                        <small>days</small>
                      </li>
                      <li>
                        <span>4</span>
                        <small>hours</small>
                      </li>
                      <li>
                        <span>57</span>
                        <small>minutes</small>
                      </li>
                      <li>
                        <span className="seconds">36</span>
                        <small>seconds</small>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
              <div className="btn a_flex">
                <div className="btn_btn">
                  <button>More</button>
                </div>
                <div className="link">
                  <Link to="">All promotion</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="product_list contentWidth">
            <Slider {...SliderSettings}>
              {products.map((product, index) => (
                <DiscountCard key={index} product={product} index={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;
