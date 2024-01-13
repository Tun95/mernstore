import React, { useEffect, useReducer, useState } from "react";
import "./styles.scss";
import BestSellerCard from "./BestSellerCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getError } from "../../utilities/util/Utils";
import { request } from "../../../base url/BaseUrl";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
function Bestseller() {
  //============
  //PRODUCT FILTER
  //============
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const query = sp.get("query") || "all";
  const discount = sp.get("discount") || "all";
  const page = parseInt(sp.get("page") || 1);

  // New state for tracking the current filter type
  const [filterType, setFilterType] = useState("bestseller");

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      products: [],
      simProducts: [],
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let orderFilter = "";

        // Determine the order filter based on the selected sub-heading
        if (filterType === "bestseller") {
          orderFilter = "bestseller";
        } else if (filterType === "discount") {
          orderFilter = "discount";
        } else if (filterType === "toprated") {
          orderFilter = "toprated";
        }

        const result = await axios.get(
          `${request}/api/products/shop?page=${page}&query=${query}&order=${orderFilter}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [page, query, filterType, discount]);

  const toggleBox = (type) => {
    setFilterType(type);
  };

  return (
    <div className="best_seller product_main margin_top">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>On sale / Bestsellers</h2>
            </div>
            <div className="sub_heading mt">
              <ul className="f_flex">
                <li
                  onClick={() => toggleBox("bestseller")}
                  className={filterType === "bestseller" ? "active" : ""}
                >
                  Bestsellers
                </li>
                <li
                  onClick={() => toggleBox("discount")}
                  className={filterType === "discount" ? "active" : ""}
                >
                  On Sale
                </li>
                <li
                  onClick={() => toggleBox("toprated")}
                  className={filterType === "toprated" ? "active" : ""}
                >
                  Most Popular
                </li>
              </ul>
            </div>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="product_list">
              <div className="product_card">
                {products.map((product, index) => (
                  <BestSellerCard key={index} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bestseller;
