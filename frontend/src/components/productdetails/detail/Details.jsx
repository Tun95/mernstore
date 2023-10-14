import React, { useContext, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import phone1 from "../../../assets/details/phone1.webp";
import phone2 from "../../../assets/details/phone2.webp";
import phone3 from "../../../assets/details/phone3.webp";
import phone4 from "../../../assets/details/phone4.webp";
import phone5 from "../../../assets/details/phone5.webp";
import s1 from "../../../assets/details/s1.webp";
import s2 from "../../../assets/details/s2.webp";
import s3 from "../../../assets/details/s3.webp";
import s4 from "../../../assets/details/s4.webp";
import s5 from "../../../assets/details/s5.webp";
import s6 from "../../../assets/details/s6.webp";

import Slider from "react-slick";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReactImageMagnify from "react-image-magnify";
import Rating from "../../utilities/rating/Ratings";
import black from "../../../assets/bestsellers/black.webp";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { FormControlLabel } from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";
import ShareIcon from "@mui/icons-material/Share";
import bestbuy from "../../../assets/vendors/bestbuy.webp";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="product_control_btn l_flex" onClick={onClick}>
      <button className="next l_flex">
        <KeyboardArrowDownIcon className="icon" />
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="product_control_btn l_flex" onClick={onClick}>
      <button className="prev l_flex">
        <KeyboardArrowUpIcon className="icon" />
      </button>
    </div>
  );
};

function Details() {
  let days = "00";
  let hours = "00";
  let minutes = "00";
  let seconds = "00";
  let desc =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, laborum Lorem ipsumdolor sit amet consectetur, adipisicing elit. Mollitia,laborum!";

  const product = {
    id: 1,
    name: "Apple AirPods Pro with Wireless Charging Case",
    slug: "Apple AirPods Pro with Wireless Charging Case",
    images: [
      {
        id: 1,
        img: phone1,
      },
      {
        id: 2,
        img: phone2,
      },
      {
        id: 3,
        img: phone3,
      },
      {
        id: 4,
        img: phone4,
      },
      {
        id: 5,
        img: phone5,
      },
      {
        id: 6,
        img: phone5,
      },
    ],
    specification: [
      { img: s1 },
      { img: s2 },
      { img: s3 },
      { img: s4 },
      { img: s5 },
      { img: s6 },
    ],
    price: 1245,
    discount: 10,
    rating: 0,
    numReviews: 2,
    status: true,
    countInStock: 2,
  };
  const { convertCurrency } = useContext(Context);

  const SliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0].img);

  const save =
    product.price - (product.price - (product.price * product.discount) / 100);

  return (
    <div className="details">
      <div className="content">
        <div className="img_slides">
          <div className="image">
            <div className="f_flex">
              <div className="thumbnail_slider">
                <Slider {...SliderSettings} className="slick-slider">
                  {product.images.map((image) => (
                    <div key={image.id}>
                      <img
                        src={image.img}
                        alt={product.name}
                        className="small_images"
                        onClick={() => setSelectedImage(image.img)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="main_image">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: selectedImage,
                    },
                    largeImage: {
                      src: selectedImage,
                      width: 1600,
                      height: 1600,
                    },

                    enlargedImageContainerStyle: {
                      zIndex: 5,
                    },
                    enlargedImageContainerDimensions: {
                      width: "70%",
                      height: "70%",
                    },
                    shouldUsePositiveSpaceLens: true,
                  }}
                />
                <div className="specifications l_flex">
                  <div className="a_flex">
                    {product.specification.map((item, index) => (
                      <img
                        src={item.img}
                        alt={product.name}
                        key={index}
                        className="img"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="top_info">
              <div className="black">
                <img src={black} alt="" />
              </div>
              <div className="popular">Bestseller</div>
            </div>
          </div>
        </div>
        <div className="product_details">
          <div className="rating_code c_flex">
            <div className="rating c_flex">
              <div className="ratings c_flex">
                <Rating
                  rating={product.rating}
                  className={product.rating === 0 ? "rating_color" : ""}
                />
                <span className="count">5</span>
              </div>
              <div className="reviews c_flex">
                <a href="/#" className="rev_count">
                  Reviews: 5
                </a>
                <Link to="">Write a review</Link>
              </div>
            </div>
            <div className="code c_flex">
              <span>CODE: </span>
              <span>MQ0G3RX/A</span>
            </div>
          </div>
          <div className="name">
            <h2>AB: Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3RX/A)</h2>
          </div>
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
          <bdi className="save a_flex">
            <span>You save: </span>
            <span>{convertCurrency(save)}</span>
          </bdi>
          <div className="countInStock">
            {product.countInStock > 0 ? (
              <span className="available">In stock</span>
            ) : (
              <span>unavailable</span>
            )}
          </div>
          <div className="size f_flex">
            <label htmlFor="size">Screen Size: </label>
            <select name="" id="size">
              <option value="50">50 in</option>
              <option value="40">40 in</option>
              <option value="30">50 in</option>
            </select>
          </div>
          <div className="promotion d_flex">
            <div className="left">
              <h3>
                It’s Black Friday all month long with new deals each week.
              </h3>
              <Link to="" className="a_flex">
                Promotion details <ArrowRightAltIcon className="icon" />
              </Link>
            </div>
            <div className="right">
              <div className="time_period">
                <div className="time">
                  <span className="c_flex">
                    <small className="">
                      <p>Promotions expires within:</p>
                    </small>
                    <ul>
                      <li>
                        <span>{days}</span>
                        <small>days</small>
                      </li>
                      <li>
                        <span>{hours}</span>
                        <small>hours</small>
                      </li>
                      <li>
                        <span>{minutes}</span>
                        <small>minutes</small>
                      </li>
                      <li>
                        <span className="seconds">{seconds}</span>
                        <small>seconds</small>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="btn a_flex">
            <div className="qty c_flex">
              <button>
                <RemoveIcon className="icon" />
              </button>
              <span className="count">1</span>
              <button>
                <AddIcon className="icon" />
              </button>
            </div>
            <div className="add_to_cart">
              <button className="l_flex">
                <ShoppingCartIcon /> <span>Add to cart</span>
              </button>
            </div>
            <div className="buy_now">
              <button>Buy now with 1-click</button>
            </div>
          </div>
          <div className="add_compare_share l_flex">
            <div className="a_flex">
              <label htmlFor="icon" className="wish a_flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      {...label}
                      disableRipple
                      className="icon"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 20,
                          borderColor: "var(--color-tab)",
                        },
                      }}
                      disableFocusRipple
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                  }
                  label={<small>Add to wish list</small>}
                />
              </label>
              <Link to="" className="a_flex">
                <AddchartIcon className="icon" />
                <small>Compare</small>
              </Link>
              <Link to="" className="a_flex share">
                <ShareIcon className="icon" />
                <small>Share</small>
              </Link>
            </div>
          </div>
          <div className="seller a_flex">
            <div className="img">
              <img src={bestbuy} alt="" />
            </div>
            <div className="info">
              <div className="name a_flex">
                <h5>Vendor:</h5>
                <Link to="/company-view">BestBuy</Link>
              </div>
              <div className="desc">
                <p>{truncateText(desc, 10)}</p>
              </div>
              <div className="question">
                <span className="link a_flex">
                  <AnnouncementOutlinedIcon className="icon" />
                  <span>Ask a question</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
