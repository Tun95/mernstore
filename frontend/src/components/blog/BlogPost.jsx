import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import img from "../../assets/blog/blog1.webp";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import Comments from "./Comments";

function BlogPost() {
  return (
    <div className="blog_post">
      <div className="content">
        <div className="header">
          <h1>Blog</h1>
        </div>
        <div className="list f_flex">
          <div className="img">
            <Link to="/blog-detail">
              <img src={img} alt="" />
            </Link>
          </div>
          <div className="left">
            <div className="title">
              <h2>
                <Link to="/blog-detail">
                  For those who love sound quality we have awesome Pioneer
                  speakers! (Demo)
                </Link>
              </h2>
            </div>
            <div className="date ">
              <span className="a_flex">
                <EventOutlinedIcon className="icon" />
                <span>October 3, 2023</span>
              </span>
            </div>
            <div className="description">
              <p>
                Demo article title h2 But I must explain to you how all this
                mistaken idea of denouncing pleasure and praising pain was born
                and I will give you a complete account of the system, and
                expound the actual teachings of the great explorer of the truth,
                the master-builder of human happiness. No one rejects, dislikes,
                or avoids pleasure itself, because it is...
              </p>
            </div>
            <div className="link">
              <Link to="/blog-detail">Read more</Link>
            </div>
          </div>
        </div>
        <div>
          <Comments />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
