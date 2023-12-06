import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Promotions from "../../../components/promotions/promotion detail/Promotions";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";

const initialState = {
  blog: null,
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, promotion: action.payload, loading: true };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, promotion: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
function PromotionDetailScreen() {
  const params = useParams();
  const { slug } = params;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, promotion } = state;

  //=======================
  // FETCH BLOG DETAILS
  //=======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${request}/api/promotions/slug/${slug}`
        );

        if (result.data.promotion) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data.promotion });
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching promotion details:", error);
        dispatch({
          type: "FETCH_FAIL",
          payload: "Error fetching promotion details",
        });
      }
    };

    fetchData();
  }, [slug]);

  console.log(promotion);

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
        <div className="content">
          <Promotions />
        </div>
      </div>
    </div>
  );
}

export default PromotionDetailScreen;
