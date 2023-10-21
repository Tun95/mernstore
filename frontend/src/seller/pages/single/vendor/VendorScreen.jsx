import React from "react";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Vendor from "../../../../components/vendor/Vendor";

function VendorProductScreen() {
  return (
    <div className="vendor_product_screen">
      <Helmet>
        <title>All vendors :: BestBuy</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/vendors">All vendors /</Link>
            <p> BestBuy</p>
          </div>
        </div>
        <div className="content">
          <Vendor />
        </div>
      </div>
    </div>
  );
}

export default VendorProductScreen;
