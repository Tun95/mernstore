import React from "react";
import img from "../../assets/blog/blog1.webp";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

function BlogDetails() {
  return (
    <div className="blog_details">
      <div className="content">
        <div className="detail">
          <div className="title">
            <h1>
              For those who love sound quality we have awesome Pioneer speakers!
              (Demo)
            </h1>
          </div>
          <div className="date">
            <span className="a_flex">
              <EventOutlinedIcon className="icon" />
              <span>October 3, 2023</span>
            </span>
          </div>
          <div className="img">
            <img src={img} alt="" />
          </div>
          <div className="description">
            <p>
              Demo article title h2 But I must explain to you how all this
              mistaken idea of denouncing pleasure and praising pain was born
              and I will give you a complete account of the system, and expound
              the actual teachings of the great explorer of the truth, the
              master-builder of human happiness. No one rejects, dislikes, or
              avoids pleasure itself, because it is...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
