import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

function VendorPlans() {
  const navigate = useNavigate();
  return (
    <div className="vendorPlan">
      <div className="content">
        <div className="header">
          <h2>Choose your plan</h2>
        </div>
        <div className="plans">
          <div className="top_header">
            <h2>Choose your plan</h2>
            <small>
              You will be charged for the plan after the admin approves your
              vendor account
            </small>
          </div>
          <div className="plan">
            <div className="plan_list l_flex">
              <div className="list">
                <div className="head">
                  <h2>Start</h2>
                </div>
                <div className="price_per_year l_flex">
                  <h2>$100.00</h2>
                  <small>&#160;/ year</small>
                </div>
                <div className="btn">
                  <button onClick={() => navigate("/apply-for-vendor")}>
                    Choose
                  </button>
                </div>
                <div className="text">
                  <small>
                    2500 products Revenue up to $1,000.00 Transaction fee: 2%
                    Vendor microstore
                  </small>
                </div>
              </div>
              <div className="list box_shadow">
                <div className="best_choice">
                  <small>Best Choice</small>
                </div>
                <div className="head">
                  <h2>Middle</h2>
                </div>
                <div className="price_per_year l_flex">
                  <h2>$100.00</h2>
                  <small>&#160;/ month</small>
                </div>
                <div className="btn">
                  <button onClick={() => navigate("/apply-for-vendor")}>
                    Choose
                  </button>
                </div>
                <div className="text">
                  <small>
                    5000 products Revenue up to $10,000.00 Transaction fee: 1.5%
                    Vendor microstore
                  </small>
                </div>
              </div>
              <div className="list">
                <div className="head">
                  <h2>Pro</h2>
                </div>
                <div className="price_per_year l_flex">
                  <h2>$1,000.00 </h2>
                  <small>&#160;/ month</small>
                </div>
                <div className="btn">
                  <button onClick={() => navigate("/apply-for-vendor")}>
                    Choose
                  </button>
                </div>
                <div className="text">
                  <small>
                    Unlimited products Unlimited revenue Transaction fee: 1%
                    Vendor microstore
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorPlans;
