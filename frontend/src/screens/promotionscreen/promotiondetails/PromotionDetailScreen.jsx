import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Promotions from "../../../components/promotions/promotion detail/Promotions";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";
import io from "socket.io-client"; // Import Socket.IO client library
import { toast } from "react-toastify";
import { getError } from "../../../components/utilities/util/Utils";
import LoadingBox from "../../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../../components/utilities/message loading/MessageBox";
import { useNavigate, useLocation } from "react-router-dom";

const initialState = {
  promotion: null,
  loading: true,
  error: "",
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 }, // Initialize countdown
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        promotion: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    case "UPDATE_COUNTDOWN":
      return { ...state, countdown: action.payload };

    default:
      return state;
  }
};

function PromotionDetailScreen() {
  const params = useParams();
  const { slug } = params;

  //============
  //PRODUCT FILTER
  //============
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const subcategory = sp.get("subcategory") || "all";
  const subitem = sp.get("subitem") || "all";
  const page = parseInt(sp.get("page") || 1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, promotion, countdown, pages, countProducts } = state;

  const socket = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    // Establish socket connection
    // Connect to the dynamic namespace for this promotion
    socket.current = io(`${request}/promotion-by-slug/${slug}`);

    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          `${request}/api/promotions/slug/${slug}`,
          {
            params: {
              page,
              category,
              subcategory,
              subitem,
            },
          }
        );

        if (result.data.promotion) {
          const fetchedPromotion = result.data.promotion;
          dispatch({ type: "FETCH_SUCCESS", payload: fetchedPromotion });

          const expirationDate = new Date(
            fetchedPromotion.expirationDate
          ).getTime();
          console.log("Expiration Date:", new Date(expirationDate));

          if (expirationDate) {
            startCountdown(expirationDate);
          }
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }

        window.scrollTo(0, 0);
      } catch (error) {
        console.error(getError(error));
        dispatch({
          type: "FETCH_FAIL",
          payload: "Error fetching promotion details",
        });
        toast.error(getError(error));
      }
    };

    fetchData();

    socket.current.on("promotionUpdate", ({ promotion }) => {
      if (promotion && promotion.slug && promotion.slug === slug) {
        const countdownTime = new Date(promotion.expirationDate).getTime();
        startCountdown(countdownTime);
      } else {
        console.warn("Invalid promotion data received:", promotion);
      }
    });

    return () => {
      clearInterval(intervalIdRef.current);
      socket.current.disconnect();
    };
  }, [category, countProducts, page, pages, slug, subcategory, subitem]);



  console.log("PROMOTION PRODUCTS:", promotion);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterSubcategory = filter.subcategory || subcategory;
    const filterSubitem = filter.subitem || subitem;

    const url = `/promotions/${slug}?category=${filterCategory}&subcategory=${filterSubcategory}&subitem=${filterSubitem}`;

    navigate(url); // Update the URL in the browser

    return url; // Return the constructed URL
  };

  const startCountdown = (targetTime) => {
    clearInterval(intervalIdRef.current);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (isNaN(now) || isNaN(targetTime) || isNaN(distance)) {
        console.error("Invalid date or distance calculation.");
      }

      if (distance <= 0) {
        clearInterval(intervalIdRef.current);
        dispatch({
          type: "UPDATE_COUNTDOWN",
          payload: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        dispatch({
          type: "UPDATE_COUNTDOWN",
          payload: { days, hours, minutes, seconds },
        });
      }
    };

    updateCountdown();

    intervalIdRef.current = setInterval(updateCountdown, 1000);
  };

  return (
    <div className="promotion_detail_screen store product_main">
      <Helmet>
        <title>{promotion?.title}</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/promotions">&#160; Promotions /</Link>
            <p>&#160; {promotion?.title}</p>
          </div>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="content">
            <Promotions
              promotion={promotion}
              countdown={countdown}
              page={page}
              pages={pages}
              countProducts={countProducts}
              getFilterUrl={getFilterUrl}
              dispatch={dispatch}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PromotionDetailScreen;
