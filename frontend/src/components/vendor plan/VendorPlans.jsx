import React, { useContext, useEffect, useReducer } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Context } from "../../context/Context";
import { getError } from "../utilities/util/Utils";
import LoadingBox from "../utilities/message loading/LoadingBox";
import MessageBox from "../utilities/message loading/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, plans: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

function VendorPlans() {
  const navigate = useNavigate();
  const { convertCurrency } = useContext(Context);

  const [{ loading, error, plans }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    plans: [],
  });

  //==============
  //FETCH VENDOR PLANS
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}/api/plans`);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
        console.error(getError(error));
      }
    };

    fetchData();
  }, []);

  console.log("PLANS MAP", plans);

  return (
    <div className="vendorPlan">
      <div className="content">
        <div className="header">
          <h2>Choose your plan</h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
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
                {plans?.map((item, index) => (
                  <div
                    className={`list ${item.isChecked ? "box_shadow" : ""}`}
                    key={index}
                  >
                    {item.isChecked ? (
                      <div className="best_choice">
                        <small>Best Choice</small>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="head">
                      <h2>{item.name}</h2>
                    </div>
                    <div className="price_per_year l_flex">
                      <span className="a_flex">
                        <h2>{convertCurrency(item.price)}</h2>
                        <small className="a_flex">/{item.range}</small>
                      </span>
                    </div>
                    <div className="btn">
                      <button onClick={() => navigate("/apply-for-vendor")}>
                        Choose
                      </button>
                    </div>
                    <div className="text">
                      <small>{item.description}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorPlans;
