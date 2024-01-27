import React, { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import data from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { request } from "../../../base url/BaseUrl";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, announcement: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function AnnouncementCard() {
  const [{ loading, error, announcement }, dispatch] = useReducer(reducer, {
    announcement: [],
    loading: true,
    error: "",
  });

  const { sliders, fifthCard } = announcement;

  //==============
  //FETCH BLOG POST
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/announcement/all`);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  console.log("ANNOUN:", announcement);

  const videoRef = useRef(null);
  useEffect(() => {
    // Check if the video element exists
    if (videoRef.current) {
      // Play the video
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="announ_cards">
          <div className="content">
            <div className="cards">
              <div className="left">
                <div className="top slides1">
                  <Carousel
                    transitionTime={800}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    interval={5000}
                    showArrows={false}
                    swipeable={true}
                  >
                    {announcement?.sliders?.slice(6, 8).map((slide, index) => (
                      <Link
                        to={`/store?category=${slide.category}`}
                        className="box"
                      >
                        <div className="img">
                          <img src={slide.image} alt={slide.title} />
                        </div>
                        <div
                          className={`content`}
                          style={
                            index === 0
                              ? {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                              : {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                          }
                        >
                          <h2
                            style={
                              index === 0
                                ? { color: slide.hColor }
                                : { color: slide.hColor }
                            }
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="description"
                            style={
                              index === 0
                                ? { color: slide.pColor }
                                : { color: slide.pColor }
                            }
                          >
                            {slide.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </Carousel>
                </div>
                <div className="bottom_Slide slides2">
                  <Carousel
                    transitionTime={800}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    interval={5000}
                    showArrows={false}
                    swipeable={true}
                  >
                    {announcement?.sliders?.slice(4, 6).map((slide, index) => (
                      <Link
                        to={`/store?category=${slide.category}`}
                        className="box"
                        key={index}
                      >
                        <div className="img">
                          <img src={slide.image} alt={slide.title} />
                        </div>
                        <div
                          className={`content`}
                          style={
                            index === 0
                              ? {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                              : {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                          }
                        >
                          <h2
                            style={
                              index === 0
                                ? { color: slide.hColor }
                                : { color: slide.hColor }
                            }
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="description"
                            style={
                              index === 0
                                ? { color: slide.pColor }
                                : { color: slide.pColor }
                            }
                          >
                            {slide.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="middle">
                <div className="video_content">
                  <Link
                    to={`/product/${fifthCard?.productSlug}`}
                    className="video"
                  >
                    <video
                      ref={videoRef}
                      src={fifthCard?.videoUrl}
                      loop
                      muted
                      autoPlay
                    />

                    <div
                      className="content"
                      style={{
                        right: "",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        top: "355px",
                        bottom: "0px",
                        textAlign: "center",
                      }}
                    >
                      <h1 style={{ width: "80%", color: fifthCard?.hColor }}>
                        {fifthCard?.title}
                      </h1>
                      <p className="description">
                        <span
                          style={{
                            color: fifthCard?.pColor,
                            backgroundColor: fifthCard?.bColor,
                            width: "auto",
                          }}
                        >
                          {fifthCard?.description}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="right">
                <div className="top slides">
                  <Carousel
                    transitionTime={800}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    interval={5000}
                    showArrows={false}
                    swipeable={true}
                  >
                    {announcement?.sliders?.slice(2, 4).map((slide, index) => (
                      <Link
                        to={`/store?category=${slide.category}`}
                        className="box"
                        key={index}
                      >
                        <div className="img">
                          <img src={slide.image} alt={slide.title} />
                        </div>
                        <div
                          className={`content`}
                          style={
                            index === 0
                              ? {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                              : {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                          }
                        >
                          <h2
                            style={
                              index === 0
                                ? { color: slide.hColor }
                                : { color: slide.hColor }
                            }
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="description"
                            style={
                              index === 0
                                ? { color: slide.pColor }
                                : { color: slide.pColor }
                            }
                          >
                            {slide.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </Carousel>
                </div>
                <div className="bottom_Slide slides">
                  <Carousel
                    transitionTime={800}
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    interval={5000}
                    showArrows={false}
                    swipeable={true}
                  >
                    {announcement?.sliders?.slice(0, 2).map((slide, index) => (
                      <Link
                        to={`/store?category=${slide.category}`}
                        className="box"
                        key={index}
                      >
                        <div className="img">
                          <img src={slide.image} alt={slide.title} />
                        </div>
                        <div
                          className={`content`}
                          style={
                            index === 0
                              ? {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                }
                              : {
                                  width: slide.width,
                                  right: slide.right,
                                  left: slide.left,
                                  top: slide.top,
                                  bottom: slide.bottom,
                                  textAlign: slide.textAlign,
                                  paddingRight: "10px",
                                }
                          }
                        >
                          <h2
                            style={
                              index === 0
                                ? { color: slide.hColor }
                                : { color: slide.hColor }
                            }
                          >
                            {slide.title}
                          </h2>
                          <p
                            className="description"
                            style={
                              index === 0
                                ? { color: slide.pColor }
                                : { color: slide.pColor }
                            }
                          >
                            {slide.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnnouncementCard;
