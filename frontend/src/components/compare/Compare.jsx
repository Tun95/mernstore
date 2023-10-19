import React, { useContext, useEffect, useMemo, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import { Tooltip } from "antd";
import { Context } from "../../context/Context";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./styles.scss";


//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

function Compare({ product, index }) {
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

  //==============
  // TEXT TRUNCATE
  //==============
  const [truncatedName, setTruncatedName] = useState(
    truncateText(product.name, 7)
  );

  useEffect(() => {
    // Update the truncation value based on screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setTruncatedName(truncateText(product.name, 6)); // Adjust the number of words for larger screens
      } else if (screenWidth >= 992) {
        setTruncatedName(truncateText(product.name, 5)); // Adjust the number of words for medium screens
      } else {
        setTruncatedName(truncateText(product.name, 4)); // Default truncation for smaller screens
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [product.name]);

  //TOOLTIP
  const mergedArrow = useMemo(() => {
    return {
      pointAtCenter: true,
    };
  }, []);

  return (
    <div className="card_content" key={index}>
      <div className="remove l_flex">
        <button className="a_flex">
          <CloseOutlinedIcon className="icon" />
          <span>Remove</span>
        </button>
      </div>
      <div className="product-image">
        <Link
          to="/product/:slug"
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
                src={product.images[selectedImage]?.img || product.img}
                alt=""
                className="main-image"
              />
            </>
          ) : (
            ""
          )}
        </Link>
      </div>

      <Link to="/product/:slug" className="name">
        <Tooltip
          placement="bottom"
          title={<span className="tooltip">{product.name}</span>}
          arrow={mergedArrow}
        >
          <h5>{truncatedName}</h5>
        </Tooltip>
      </Link>
      <div className="price_discount l_flex">
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
      <small className="ratings l_flex">
        <div className="a_flex">
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
          <span className="a_flex promo_youtube">
            <Tooltip
              placement="bottomRight"
              title={<span className="tooltip">Promotion</span>}
              arrow={mergedArrow}
            >
              <LocalActivityOutlinedIcon className="icon" />
            </Tooltip>
          </span>
        </div>
      </small>
      <div className="lower_bottom ">
        <div className="add_to_cart_btn l_flex">
          <button className="btn c_flex">
            <ShoppingCartIcon className="icon" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Compare;
