import React from "react";
import PromotionList from "../../../components/promotions/promotion list/PromotionList";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./styles.scss";
import data from "../../../components/home/promotion/data";

function PromotionListScreen() {
  const { promotions } = data;
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
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>Promotions</h2>
            </div>
          </div>
          <div className="product_list">
            <div className="product_card">
              {promotions.map((item, index) => (
                <PromotionList key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionListScreen;
