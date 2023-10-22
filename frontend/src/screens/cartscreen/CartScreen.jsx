import React from "react";
import "./styles.scss";
import Cart from "../../components/cart/Cart";
import { Link } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Helmet } from "react-helmet-async";

function CartScreen() {
  return (
    <div className="cart_screen wish_container">
      <Helmet>
        <title>Cart contents</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Cart contents</p>
          </div>
        </div>
        <div className="content">
          <div className="productTitleContainer ">
            <h2 className="uppercase">Cart contents</h2>
          </div>
          <div className="clear_continue_btn c_flex">
            <span className="flex_direction a_flex">
              <Link to="/store" className="shopping">
                Continue shopping
              </Link>
            </span>
            <span className="flex_direction a_flex">
              <Link to="/checkout" className="checkout checkout_top a_flex">
                <CheckCircleOutlineOutlinedIcon className="icon" />{" "}
                <span>Proceed to checkout</span>
              </Link>
            </span>
          </div>

          {/* <div className="empty">
            <div className="empty_box">
              <span>Your cart is empty</span>
            </div>
          </div> */}

          <div>
            <Cart />
          </div>
          <div className="clear_continue_btn c_flex">
            <span className="flex_direction a_flex">
              <Link to="/store" className="shopping">
                Continue shopping
              </Link>
              <button className="c_flex clear">
                <span>Clear list</span>
              </button>
            </span>
            <span className="flex_direction a_flex">
              <Link to="/checkout" className="checkout a_flex">
                <CheckCircleOutlineOutlinedIcon className="icon" />{" "}
                <span>Proceed to checkout</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
