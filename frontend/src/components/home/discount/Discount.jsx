import React, { useEffect, useReducer, useState } from "react";
import DiscountCard from "./DiscountCard";
import { Link, useNavigate } from "react-router-dom";
import data from "../bestseller/data";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "./styles.scss";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";
import { getError } from "../../utilities/util/Utils";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, promotions: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
};
function Discount() {
  const { products } = data;

  const navigate = useNavigate();
  const [{ loading, error, promotions }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    banners: [],
  });

  //===============
  //FETCH ALL BANNERS
  //===============
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${request}/api/promotions`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  console.log(promotions);

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
            {promotions?.map((promotion, index) => (
              <div key={index} className="main_content">
                <div className="header">
                  <h2>{promotion.title}</h2>
                </div>
                <div className="description">
                  <p>{promotion.description}</p>
                </div>
                <div className="time_period">
                  <div className="">
                    <h4>Promotions expires within:</h4>
                  </div>
                  <div className="time">
                    <span>
                      <ul>
                        <li>
                          <span>{promotion.countDownTimer?.days}</span>
                          <small>days</small>
                        </li>
                        <li>
                          <span>{promotion.countDownTimer?.hours}</span>
                          <small>hours</small>
                        </li>
                        <li>
                          <span>{promotion.countDownTimer?.minutes}</span>
                          <small>minutes</small>
                        </li>
                        <li>
                          <span className="seconds">
                            {promotion.countDownTimer?.seconds}
                          </span>
                          <small>seconds</small>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
                <div className="btn a_flex">
                  <div className="btn_btn">
                    <button
                      onClick={() => navigate(`/promotions/${promotion.slug}`)}
                    >
                      More
                    </button>
                  </div>
                  <div className="link">
                    <Link to={`/promotions/${promotion.slug}`}>
                      All promotion
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="product_list contentWidth">
            <Slider {...SliderSettings} className="slick-slider">
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
