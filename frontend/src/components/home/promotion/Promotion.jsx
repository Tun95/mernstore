import React, { useEffect, useReducer, useState } from "react";
import PromotionCard from "./PromotionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import io from "socket.io-client";
import { getError } from "../../utilities/util/Utils";
import { toast } from "react-toastify";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn control_display l_flex" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowRightIcon className="icon" />
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn control_display l_flex" onClick={onClick}>
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
    case "UPDATE_COUNTDOWNS":
      return { ...state, countdowns: action.payload };
    default:
      return state;
  }
};

function Promotion() {
  const [{ loading, error, promotions, countdowns }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
      promotions: [],
      countdowns: [],
    }
  );

  const navigate = useNavigate();

  // Fetch promotions and initial countdown on component mount
  useEffect(() => {
    const socket = io(request);

    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${request}/api/promotions`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });

        // Fetch countdowns for all promotions
        const countdownData = data.map((promotion) => ({
          id: promotion.id,
          days: calculateDaysUntilExpiration(promotion.expirationDate),
        }));

        dispatch({ type: "UPDATE_COUNTDOWNS", payload: countdownData });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();

    // Listen for real-time updates
    socket.on("promotionUpdate", ({ promotion }) => {
      if (promotion) {
        const countdownTime = new Date(promotion[0]?.expirationDate).getTime();
        startCountdown(promotion[0]?.id, countdownTime);
      }
    });

    return () => {
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  let intervalId;

  const calculateDaysUntilExpiration = (expirationDate) => {
    const targetTime = new Date(expirationDate).getTime();
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      return 0;
    } else {
      return Math.floor(distance / (1000 * 60 * 60 * 24));
    }
  };

  const startCountdown = (promotionId, targetTime) => {
    clearInterval(intervalId);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (isNaN(now) || isNaN(targetTime) || isNaN(distance)) {
        console.error("Invalid date or distance calculation.");
      }

      const days =
        distance <= 0 ? 0 : Math.floor(distance / (1000 * 60 * 60 * 24));

      const updatedCountdowns = countdowns.map((countdown) =>
        countdown.id === promotionId ? { ...countdown, days } : countdown
      );

      dispatch({ type: "UPDATE_COUNTDOWNS", payload: updatedCountdowns });

      if (distance <= 0) {
        clearInterval(intervalId);
      }
    };

    updateCountdown();

    intervalId = setInterval(updateCountdown, 1000);
  };

  //=============
  // REACT SLICK
  //=============
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
  };

  return (
    <div className="promotion product_main">
      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="content">
            <div className="header">
              <div className="main_header">
                <h2>Promotions</h2>
              </div>
            </div>
            <div className="product_list">
              <Slider {...SliderSettings}>
                {promotions.map((item, index) => (
                  <PromotionCard
                    key={index}
                    item={item}
                    index={index}
                    calculateDaysUntilExpiration={calculateDaysUntilExpiration}
                  />
                ))}
              </Slider>
            </div>
            <div className="btn">
              <button onClick={() => navigate("/promotions")}>
                All promotions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Promotion;
