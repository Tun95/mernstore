import React from "react";
import Wish from "../../components/wish list/Wish";
import { Helmet } from "react-helmet-async";
import "./styles.scss";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import data from "../../components/home/bestseller/data";

function WishlistScreen() {
  const { products } = data;
  const empty = [
    {
      name: "Empty",
    },
    {
      name: "Empty",
    },
    {
      name: "Empty",
    },
    {
      name: "Empty",
    },
  ];
  return (
    <div className="container wish_container product_main">
      <Helmet>
        <title>Wish list content</title>
      </Helmet>
      <div className="quick_link ">
        <div className="page a_flex">
          <Link to="/">Home /</Link>
          <p>&#160; Wish list content</p>
        </div>
      </div>
      <div className="content">
        <div className="productTitleContainer ">
          <h2 className="uppercase">Wish list content</h2>
        </div>
        {/* <div className="empty">
          {empty.map((item, index) => (
            <div className="empty_box" key={index}>
              <span>{item.name}</span>
            </div>
          ))}
        </div> */}
        <div className="product_list">
          <div className="product_card">
            {products.map((product, index) => (
              <Wish product={product} index={index} />
            ))}
          </div>
        </div>
        <div className="clear_continue_btn a_flex">
          <button className="c_flex clear">
            <DeleteForeverOutlinedIcon className="icon" />
            <span>Clear wish list</span>
          </button>
          <Link to="/store">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default WishlistScreen;
