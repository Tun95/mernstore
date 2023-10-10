import React from "react";
import VendorPlans from "../../../../components/vendor plan/VendorPlans";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./styles.scss";

function VendorPlanScreen() {
  return (
    <div className="vendor_plans">
      <Helmet>
        <title>Choose your plan</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Choose your plan</p>
          </div>
        </div>
        <div className="content">
          <VendorPlans />
        </div>
      </div>
    </div>
  );
}

export default VendorPlanScreen;
