import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import data from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function AnnouncementCard() {
  const { sliders, videoCard } = data;

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
                {sliders[0].slides.map((slide, index) => (
                  <Link
                    to={`/store?order=${slide.category}`}
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
                              width: "40%",
                              right: "20px",
                              top: "40px",
                              textAlign: "left",
                            }
                          : {
                              width: "40%",
                              left: "20px",
                              top: "40px",
                              textAlign: "left",
                            }
                      }
                    >
                      <h2
                        style={
                          index === 0
                            ? { color: "var(--color-black)" }
                            : { color: "var(--color-black)" }
                        }
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="description"
                        style={
                          index === 0
                            ? { color: "var(--color-gray)" }
                            : { color: "var(--color-gray)" }
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
                {sliders[1].slides.map((slide, index) => (
                  <Link
                    to={`/store?order=${slide.category}`}
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
                              width: "40%",
                              left: "20px",
                              top: "20px",
                              textAlign: "left",
                            }
                          : {
                              width: "100%",
                              left: "",
                              top: "20px",
                              textAlign: "center",
                            }
                      }
                    >
                      <h2
                        style={
                          index === 0
                            ? { color: "var(--color-black)" }
                            : { color: "var(--color-black)" }
                        }
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="description"
                        style={
                          index === 0
                            ? { color: "var(--color-gray)" }
                            : { color: "var(--color-gray)" }
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
              <Link to={`/product=${videoCard.slug}`} className="video">
                <video
                  ref={videoRef}
                  src={videoCard.videoUrl}
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
                  <h1 style={{ width: "80%", color: "var(--color-white)" }}>
                    {videoCard.title}
                  </h1>
                  <p className="description">
                    <span
                      style={{
                        color: "var(--color-black)",
                        backgroundColor: "var(--color-tab)",
                        width: "auto",
                      }}
                    >
                      {videoCard.description}
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
                {sliders[2].slides.map((slide, index) => (
                  <Link
                    to={`/store?order=${slide.category}`}
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
                              width: "40%",
                              right: "20px",
                              top: "40px",
                              textAlign: "left",
                            }
                          : {
                              width: "40%",
                              left: "20px",
                              top: "40px",
                              textAlign: "left",
                            }
                      }
                    >
                      <h2
                        style={
                          index === 0
                            ? { color: "var(--color-black)" }
                            : { color: "var(--color-black)" }
                        }
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="description"
                        style={
                          index === 0
                            ? { color: "var(--color-white)" }
                            : { color: "var(--color-gray)" }
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
                {sliders[3].slides.map((slide, index) => (
                  <Link
                    to={`/store?order=${slide.category}`}
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
                              width: "40%",
                              left: "20px",
                              top: "20px",
                              textAlign: "left",
                            }
                          : {
                              width: "100%",
                              left: "20px",
                              top: "50%",
                              textAlign: "left",
                              paddingRight: "10px",
                            }
                      }
                    >
                      <h2
                        style={
                          index === 0
                            ? { color: "var(--color-black)" }
                            : { color: "var(--color-white)" }
                        }
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="description"
                        style={
                          index === 0
                            ? { color: "var(--color-gray)" }
                            : { color: "var(--color-border)" }
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
  );
}

export default AnnouncementCard;
