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
function PromotionCard({ item, index }) {
  //==============
  // TEXT TRUNCATE
  //==============
  const [truncatedName, setTruncatedName] = useState(
    truncateText(item.name, 9)
  );

  useEffect(() => {
    // Update the truncation value based on screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setTruncatedName(truncateText(item.name, 9)); // Adjust the number of words for larger screens
      } else if (screenWidth >= 992) {
        setTruncatedName(truncateText(item.name, 7)); // Adjust the number of words for medium screens
      } else {
        setTruncatedName(truncateText(item.name, 5)); // Default truncation for smaller screens
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [item.name]);
  return (
    <div className="promotion_card" key={index}>
      <div className="content">
        <div className="img">
          <Link to="">
            <img src={item.img} alt={item.name} />
          </Link>
        </div>
        <div className="name_date f_flex">
          <div className="days a_flex">
            <h3 className="count">{item.daysLeft}</h3> <small>days left</small>
          </div>
          <div className="name_to ">
            <div className="name">
              <Link to="">
                <p>{truncatedName}</p>
              </Link>
            </div>
            <div className="expire">
              <small>to {item.date}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionCard;
