import React, { useEffect, useReducer, useState } from "react";
import data from "../bestseller/data";
import DemandCard from "./DemandCard";
import Slider from "react-slick";
import "./styles.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getError } from "../../utilities/util/Utils";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";
import MessageBox from "../../utilities/message loading/MessageBox";
import LoadingBox from "../../utilities/message loading/LoadingBox";

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
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
};

function Demand() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  //==============
  //FETCH PRODUCTS
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `${request}/api/products/countinstock`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

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
              <h2>Now in demand</h2>
            </div>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="product_list">
              <Slider {...SliderSettings} className="slick-slider">
                {products?.map((product, index) => (
                  <DemandCard key={index} product={product} index={index} />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Demand;
