import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

export function formatDate(dateString) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    new Date(dateString)
  );
  return formattedDate;
}

function BlogCards({ index, blog }) {
  //==============
  // TEXT TRUNCATE
  //==============
  const [truncatedTitle, setTruncatedTitle] = useState(
    truncateText(blog.title, 9)
  );

  useEffect(() => {
    // Update the truncation value based on screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setTruncatedTitle(truncateText(blog.title, 9)); // Adjust the number of words for larger screens
      } else if (screenWidth >= 992) {
        setTruncatedTitle(truncateText(blog.title, 7)); // Adjust the number of words for medium screens
      } else if (screenWidth >= 320) {
        setTruncatedTitle(truncateText(blog.title, 7)); // Adjust the number of words for medium screens
      } else {
        setTruncatedTitle(truncateText(blog.title, 8)); // Default truncation for smaller screens
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [blog.title]);
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
          <Link to={`/blog-detail/${blog.slug}`}>{truncatedTitle}</Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
