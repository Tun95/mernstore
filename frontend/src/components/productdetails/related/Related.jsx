import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../styles/styles.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import data from "../../home/bestseller/data";
import RelatedCard from "./RelatedCard";

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
function Related() {
  const { products } = data;

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setSlidesToShow(Math.min(5, products.length));
      } else if (screenWidth >= 992) {
        setSlidesToShow(Math.min(4, products.length));
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
    <div className="on_demand product_main margin_top">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>Possibly you may be interested</h2>
            </div>
          </div>
          <div className="product_list">
            <Slider {...SliderSettings} className="slick-slider">
              {products.map((product, index) => (
                <RelatedCard key={index} product={product} index={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Related;
