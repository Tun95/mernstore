import React, { useContext, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Context } from "../../../context/Context.js";

function SliderCard() {
  const { state } = useContext(Context);
  const { banners } = state;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
    responsive: [
      {
        breakpoint: 839,
        settings: {
          dots: false,
        },
      },
    ],
  };
  // const { banners } = data;

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
      <Slider {...settings} className="slick_banner_slider">
        {banners?.map((bannersGroup, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {Array.isArray(bannersGroup.banners) &&
              bannersGroup.banners.map((item, index) => {
                const textColor = item.color;
                const paragraphColor = item.pColor;

                return (
                  <div className="content" key={index}>
                    {item.videoBackground ? (
                      <>
                        {item.videoBackground && (
                          <div className="video">
                            <div className="video_width">
                              <video
                                loop
                                muted
                                autoPlay
                                src={item.videoBackground}
                                ref={videoRef}
                                className="video_tag"
                                width="100%"
                              ></video>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {item.imgBackground && (
                          <div className="background">
                            <div className="img_background">
                              <img
                                src={item.imgBackground}
                                alt={item.imgBackground}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="width">
                      <div className="main_content">
                        <div className="container">
                          <div className="a_flex">
                            <div className="img">
                              {item.img && <img src={item.img} alt="" />}
                            </div>

                            <div
                              className={`text ${
                                item.img === "" ? "img_none" : ""
                              }`}
                            >
                              <div className="header">
                                <h1 style={{ color: textColor || "" }}>
                                  {item.title}
                                </h1>
                              </div>
                              <div className="description">
                                <p style={{ color: paragraphColor || "" }}>
                                  {item.description}
                                </p>
                              </div>
                              {item.buttonText && (
                                <div className="btn">
                                  <button>{item.buttonText}</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </React.Fragment>
        ))}
      </Slider>
    </>
  );
}

export default SliderCard;
