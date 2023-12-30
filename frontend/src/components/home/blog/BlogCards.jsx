import React from "react";
import { Link } from "react-router-dom";
import TruncateMarkup from "react-truncate-markup";

export function formatDate(dateString) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    new Date(dateString)
  );
  return formattedDate;
}

function BlogCards({ index, blog }) {
  return (
    <div className={`blog_card ${index === 0 ? "first" : ""}`} key={index}>
      <div className="cards">
        <div className="img_date">
          <div className="img">
            <Link to={`/blog-detail/${blog.slug}`}>
              <img src={blog.image} alt={blog.title} />
            </Link>
          </div>
          <div className="date">
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
        <div className="name">
          <Link to={`/blog-detail/${blog.slug}`}>
            <TruncateMarkup lines={2}>
              <p>{blog.title}</p>
            </TruncateMarkup>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
