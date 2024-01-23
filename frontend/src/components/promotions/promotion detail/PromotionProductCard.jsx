import React, { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import AddchartIcon from "@mui/icons-material/Addchart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import black from "../../../assets/bestsellers/black.webp";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TruncateMarkup from "react-truncate-markup";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function PromotionProductCard({ product, index }) {
  const { convertCurrency } = useContext(Context);

  //===========
  //IMAGE WHEEL
  //===========
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    if (isHovered) {
      const containerWidth = e.currentTarget.clientWidth;
      const totalImages = product.images.length;

      // Calculate the index based on the mouse position
      const offsetIndex = Math.floor(
        (e.nativeEvent.clientX - e.currentTarget.getBoundingClientRect().left) /
          (containerWidth / totalImages)
      );

      // Ensure the offset index is within the valid range
      const imageIndex = Math.max(0, Math.min(offsetIndex, totalImages - 1));

      if (imageIndex !== selectedImage) {
        setSelectedImage(imageIndex);
      }
    }
  };

  //TOOLTIP
  const mergedArrow = useMemo(() => {
    return {
      pointAtCenter: true,
    };
  }, []);
  return (
    <div className="card_content" key={index}>
      <div className="info_top d_flex">
        <div className="left f_flex">
          {product.discount > 0 ? (
            <span className="num_discount l_flex">-{product.discount}%</span>
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
        <div className="favorite small_device right_background l_flex">
          <Checkbox
            className="icon"
            {...label}
            disableRipple
            disableFocusRipple
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
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
      <div className="product-image">
        <Link
          to={`/product/${product.slug}`}
          className="img"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {product.images ? (
            <>
              <div className="image_img ">
                <span className={`image-list image-list-${index}`}>
                  {product.images.map((item, imageIndex) => (
                    <span key={imageIndex} className="image-bar"></span>
                  ))}
                </span>
              </div>

              <img
                src={product.images[selectedImage] || product.images}
                alt=""
                className="main-image"
              />
            </>
          ) : (
            ""
          )}
        </Link>
      </div>

      <div className="relative_position">
        <span className="span_bottom">
          {" "}
          <Link to={`/product/${product.slug}`} className="name">
            <Tooltip
              placement="bottom"
              title={<span className="tooltip">{product.name}</span>}
              arrow={mergedArrow}
            >
              <TruncateMarkup lines={2}>
                <h5>{product.name}</h5>
              </TruncateMarkup>
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
            {product.numReviews === 0 ? (
              ""
            ) : (
              <span className="num_review">
                (Reviews: {product.numReviews})
              </span>
            )}
            <span className="a_flex promo_youtube">
              {product.promotion && (
                <Tooltip
                  placement="bottomRight"
                  title={<span className="tooltip">Promotion</span>}
                  arrow={mergedArrow}
                >
                  <LocalActivityOutlinedIcon className="icon" />
                </Tooltip>
              )}
              {product?.video?.length > 0 && <YouTubeIcon className="icon" />}
            </span>
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
            <div className="add_to_cart_btn c_flex">
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
        </span>
      </div>
    </div>
  );
}

export default PromotionProductCard;
