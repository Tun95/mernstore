import React from "react";
import StoreBanner from "./Banner";
import "./styles.scss";
import Filter from "./Filter";
import { Link } from "react-router-dom";

function Store() {
  return (
    <div className="store">
      <StoreBanner />
      <div className="container">
        <div className="category_selected">
          <h2>Electronics</h2>
        </div>
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Electronics</p>
          </div>
        </div>
        <div className="filter_items">
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default Store;
