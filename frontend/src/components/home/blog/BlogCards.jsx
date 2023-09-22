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

function BlogCards({ index, post }) {
  //==============
  // TEXT TRUNCATE
  //==============
  const [truncatedName, setTruncatedName] = useState(
    truncateText(post.name, 9)
  );

  useEffect(() => {
    // Update the truncation value based on screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setTruncatedName(truncateText(post.name, 9)); // Adjust the number of words for larger screens
      } else if (screenWidth >= 992) {
        setTruncatedName(truncateText(post.name, 7)); // Adjust the number of words for medium screens
      } else if (screenWidth >= 320) {
        setTruncatedName(truncateText(post.name, 7)); // Adjust the number of words for medium screens
      } else {
        setTruncatedName(truncateText(post.name, 8)); // Default truncation for smaller screens
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [post.name]);
  return (
    <div className={`blog_card ${index === 0 ? "first" : ""}`} key={index}>
      <div className="cards">
        <div className="img_date">
          <div className="img">
            <Link to="">
              <img src={post.img} alt={post.name} />
            </Link>
          </div>
          <div className="date">
            <span>{post.date}</span>
          </div>
        </div>
        <div className="name">
          <Link to="">{truncatedName}</Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
