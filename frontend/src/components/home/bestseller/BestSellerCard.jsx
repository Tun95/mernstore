import React, { useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import black from "../../..//assets/bestsellers/black.webp";
import AddchartIcon from "@mui/icons-material/Addchart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}
function BestSellerCard({ products }) {
  const { convertCurrency } = useContext(Context);

  return (
    <div className="product_card">
      {products.map((product, index) => (
        <div className="card_content" key={index}>
          <div className="info_top d_flex">
            <div className="left f_flex">
              {product.discount > 0 ? (
                <span className="num_discount l_flex">
                  -{product.discount}%
                </span>
              ) : (
                ""
              )}
              {product.status ? <span className="new l_flex">New</span> : ""}
              <span className="most_popular l_flex">Most popular</span>
              <span>
                {product.blackFriday ? (
                  <img src={black} alt="black friday l_flex" />
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="right f_flex">
              <span className="favorite right_background l_flex">
                <Checkbox
                  className="icon"
                  {...label}
                  disableRipple
                  disableFocusRipple
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              </span>
              <span className="compare right_background l_flex">
                <AddchartIcon className="icon" />
              </span>
            </div>
          </div>
          <Link to="" className="img">
            <img src={product.img} alt="" />
          </Link>
          <Link to="" className="name">
            <Tooltip className="tooltip" title={product.name}>
              <h5>{truncateText(product.name, 9)}</h5>
            </Tooltip>
          </Link>
          <small className="ratings a_flex">
            <span className="star">
              <i
                className={
                  product.rating > 0
                    ? "fa-sharp fa-solid fa-star rated"
                    : "fa-sharp fa-solid fa-star not_rated"
                }
              ></i>
            </span>

            <span className="num_rating">{product.rating?.toFixed(1)}</span>
            <span className="num_review">(Reviews: {product.numReviews})</span>
          </small>
          <div className="countInStock">
            {product.countInStock > 0 ? (
              <span className="available">In stock</span>
            ) : (
              <span>unavailable</span>
            )}
          </div>
          <div className="lower_bottom c_flex">
            <div className="price_discount">
              {product.discount > 0 ? (
                <div className="a_flex">
                  <div className="price">
                    {convertCurrency(
                      product.price - (product.price * product.discount) / 100
                    )}
                  </div>
                  <s className="discounted">{convertCurrency(product.price)}</s>
                </div>
              ) : (
                <div className="price">{convertCurrency(product.price)}</div>
              )}
            </div>
            <div className="add_to_cart_btn a_flex">
              <div className="quantity a_flex">
                <button>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="qty p_flex">10</span>
                <button>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="btn l_flex">
                <ShoppingCartIcon className="icon" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BestSellerCard;
