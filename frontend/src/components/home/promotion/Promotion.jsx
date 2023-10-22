import React, { useEffect, useState } from "react";
import PromotionCard from "./PromotionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "./styles.scss";
import data from "./data";
import { useNavigate } from "react-router-dom";

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
function Promotion() {
  const { promotions } = data;

  const navigate = useNavigate();

  //===========
  //REACT SLICK
  //===========
  const [slidesToShow, setSlidesToShow] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1250) {
        setSlidesToShow(Math.min(4, promotions.length));
      } else if (screenWidth >= 800) {
        setSlidesToShow(Math.min(3, promotions.length));
      } else if (screenWidth >= 380) {
        setSlidesToShow(Math.min(2, promotions.length));
      } else {
        setSlidesToShow(Math.min(1, promotions.length));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [promotions.length]);

  const SliderSettings = {
    dots: false,
    infinite: false,
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
    <div className="promotion product_main">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>Promotions</h2>
            </div>
          </div>
          <div className="product_list">
            <Slider {...SliderSettings}>
              {promotions.map((item, index) => (
                <PromotionCard key={index} item={item} index={index} />
              ))}
            </Slider>
          </div>
          <div className="btn">
            <button onClick={() => navigate("/promotions")}>
              All promotions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
