import React from "react";
import Compare from "../../components/compare/Compare";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "./styles.scss";
import CompareBtn from "../../components/compare/CompareBtn";
import data from "../../components/home/bestseller/data";
import CompareTable from "../../components/compare/CompareTable";

function ComparisonScreen() {
  const { products } = data;

  return (
    <div className="container wish_container comparison_container product_main">
      <Helmet>
        <title>Feature comparison</title>
      </Helmet>
      <div className="quick_link ">
        <div className="page a_flex">
          <Link to="/">Home /</Link>
          <p>&#160; Feature comparison</p>
        </div>
      </div>
      <div className="content">
        <div className="productTitleContainer ">
          <h2 className="uppercase">Compare</h2>
        </div>
        {/* <div className="empty">
          <div className="empty_box">
            <span>No products selected</span>
          </div>
        </div> */}
        <div className="compare_btn_list d_flex">
          <div className="left">
            <CompareBtn />
          </div>
          <div className="right">
            <div className="product_list">
              <div className="product_card">
                {products.slice(0, 4)?.map((product, index) => (
                  <Compare product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="compare_list_table">
          <CompareTable />
        </div>

        <div className="clear_continue_btn c_flex">
          <Link to="/store">Continue shopping</Link>
          <button className="c_flex clear">
            <DeleteForeverOutlinedIcon className="icon" />
            <span>Clear list</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComparisonScreen;
