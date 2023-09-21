import React from "react";
import "./styles.scss";
import BlogCards from "./BlogCards";
import data from "./data";

function Blog() {
  const { posts } = data;
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
        </div>
      </div>
    </div>
  );
}

export default Blog;
