import React from "react";
import { Link } from "react-router-dom";
import Promotions from "../../../components/promotions/promotion detail/Promotions";
import "./styles.scss";
import { Helmet } from "react-helmet-async";

function PromotionDetailScreen() {
  return (
    <div className="promotion_detail_screen store product_main">
      <Helmet>
        <title>
          It’s Black Friday all month long with new deals each week.
        </title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/promotions">&#160; Promotions /</Link>
            <p>
              &#160; It’s Black Friday all month long with new deals each week.
            </p>
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
