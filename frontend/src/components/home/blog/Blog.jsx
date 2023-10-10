import React from "react";
import "./styles.scss";
import BlogCards from "./BlogCards";
import data from "./data";
import { useNavigate } from "react-router-dom";

function Blog() {
  const { posts } = data;
  const navigate = useNavigate();

  return (
    <div className="blog_section">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>Reviews / News</h2>
            </div>
          </div>
          <div className="blog_list">
            {posts.map((post, index) => (
              <BlogCards index={index} post={post} key={index} />
            ))}
          </div>
          <div className="btn">
            <button onClick={() => navigate("/blog")}>All blog articles</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
