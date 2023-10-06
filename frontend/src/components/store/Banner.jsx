import React, { useEffect, useRef } from "react";
import video from "../../assets/announ/video.mp4";

function StoreBanner() {
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
    <div className="store_banner">
      <div className="platform">
        <div className="video_platform">
          <video
            className="video"
            ref={videoRef}
            src={video}
            loop
            muted
            autoPlay
          />
        </div>
      </div>
      <div className="container">
        <div className="content">
          <h1 className="a_flex">
            HERO12 PRO <span> PRESALE</span>{" "}
          </h1>
          <h1>The Official Camera of Fun.</h1>
          <h3>
            All-new HDR video, up to 2x longer runtimes, even better HyperSmooth
            video stabilization + so much more.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default StoreBanner;
