import React, { useEffect, useReducer } from "react";
import PromotionList from "../../../components/promotions/promotion list/PromotionList";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./styles.scss";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";
import io from "socket.io-client";
import { getError } from "../../../components/utilities/util/Utils";
import { toast } from "react-toastify";
import LoadingBox from "../../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../../components/utilities/message loading/MessageBox";

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
function PromotionListScreen() {
  const [{ loading, error, promotions, countdowns }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
      promotions: [],
      countdowns: [],
    }
  );

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
        toast.error(getError(err));
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
  return (
    <div className="promotion promotions_list_screen product_main">
      <Helmet>
        <title>Promotions</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Promotions</p>
          </div>
        </div>
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
              <div className="product_card">
                {promotions.map((item, index) => (
                  <PromotionList
                    key={index}
                    item={item}
                    index={index}
                    calculateDaysUntilExpiration={calculateDaysUntilExpiration}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromotionListScreen;
