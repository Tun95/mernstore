import React from "react";
import { Link } from "react-router-dom";

function BlogCards({ index, post }) {
  return (
    <div className="blog_card" key={index}>
      <div className="cards">
        <div className="ing">
          <Link to="">
            <img src={post.img} alt={post.name} />
          </Link>
        </div>
        <div className="date">
          <span>{post.date}</span>
        </div>
        <div className="name">
          <Link to="">{post.name}</Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
