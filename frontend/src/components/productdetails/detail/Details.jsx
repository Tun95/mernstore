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
import { SelectLocationModal, ShippingModal } from "../../modals/Modals";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

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

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="drop_list">
      <div className="drop_header c_flex" onClick={toggleSection}>
        <span>{title}</span>
        {isOpen ? <RemoveIcon className="remove_icon" /> : <AddIcon />}
      </div>
      {isOpen && children}
    </li>
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
    description:
      "The iPhone 14 Pro and iPhone 14 Pro Max are smartphones designed and marketed by Apple Inc. They are the sixteenth generation flagship iPhones, succeeding the iPhone 13 Pro and iPhone 13 Pro Max.",
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
        breakpoint: 1024,
        settings: {
          vertical: false,
        },
      },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     arrows: false,
      //   },
      // },
    ],
  };

  const [activeThumb, setActiveThumb] = useState(null);

  const save =
    product.price - (product.price - (product.price * product.discount) / 100);

  return (
    <div className="details">
      <div className="container">
        <div className="content">
          <div className="img_slides">
            <div className="image">
              <div className="product_gallery_container ">
                <div className="img_large l_flex">
                  <Swiper
                    loop={false}
                    spaceBetween={10}
                    modules={[Navigation, Thumbs]}
                    grabCursor={true}
                    thumbs={{
                      swiper:
                        activeThumb && !activeThumb.destroyed
                          ? activeThumb
                          : null,
                    }}
                    className="product_main_image_slider"
                  >
                    {product.images.map((item, index) => (
                      <SwiperSlide key={index} className="swiper_slide">
                        <div className="magnifier">
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: product.name,
                                isFluidWidth: true,
                                src: item.img,
                              },
                              largeImage: {
                                src: item.img,
                                width: 1600,
                                height: 1600,
                              },

                              enlargedImageContainerStyle: {
                                position: "absolute",
                                left: "50%",
                                zIndex: 10,
                                transform: "translateX(-50%)",
                              },
                              enlargedImageContainerDimensions: {
                                width: "70%",
                                height: "70%",
                                zIndex: 10,
                              },
                              shouldUsePositiveSpaceLens: true,
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="horizontal_img">
                  <div className="img_small ">
                    <Swiper
                      style={{
                        "--swiper-navigation-size": "20px",
                      }}
                      onSwiper={setActiveThumb}
                      loop={false}
                      slidesPerView={5}
                      breakpoints={{
                        0: { direction: "horizontal" },
                        600: { direction: "vertical" },
                      }}
                      className="product_main_image_thumbs"
                      navigation={true}
                      modules={[Navigation, Thumbs]}
                    >
                      {product.images.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="img l_flex">
                            <img src={item.img} alt="product images" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
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
            <div className="box">
              <div className="delivery">
                <FilterSection
                  title={
                    <span className="a_flex">
                      <LocalShippingOutlinedIcon className="icon" />
                      <h4>Delivery</h4>
                    </span>
                  }
                >
                  <ul className="lower_list">
                    <li className="list">— For USA - $10</li>
                    <li className="list">— Worldwide - from $30</li>
                  </ul>
                </FilterSection>
              </div>
              <div className="payment">
                <FilterSection
                  title={
                    <span className="a_flex">
                      <CreditCardOutlinedIcon className="icon" />
                      <h4>Payment options</h4>
                    </span>
                  }
                >
                  <ul className="lower_list">
                    <li className="list">— Cash on delivery</li>
                    <li className="list">— Visa and MasterCard</li>
                    <li className="list">— Cashless payments</li>
                    <li className="list">— Invoices</li>
                  </ul>
                </FilterSection>
              </div>
              <div className="advantages">
                <FilterSection
                  title={
                    <span className="a_flex">
                      <NewReleasesOutlinedIcon className="icon" />
                      <h4>Our advantages</h4>
                    </span>
                  }
                >
                  <ul className="lower_list">
                    <li className="list">— 12 months warranty</li>
                    <li className="list">— SMS notification</li>
                    <li className="list">— Return and exchange</li>
                    <li className="list">— Different payment methods</li>
                    <li className="list">— Best price</li>
                  </ul>
                </FilterSection>
              </div>
            </div>
            <div className="lower_text">
              <div className="location">
                <small className="a_flex">
                  <span>Shipping time and rates: </span>
                  <SelectLocationModal />
                </small>
              </div>
              <div className="shipping a_flex">
                <small className="link a_flex">
                  <ShippingModal />
                </small>
                <small>about 3-5 days, from $25.45</small>
              </div>
              <div className="desc">
                <p>{truncateText(product.description, 27)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
