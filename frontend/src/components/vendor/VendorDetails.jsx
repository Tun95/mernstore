import React from "react";
import bestbuy from "../../assets/vendors/bestbuy.webp";
import { Link } from "react-router-dom";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

let description =
  " Best Buy Co., Inc. is an American multinational consumer electronicsretailer headquartered in Richfield, Minnesota. It was originallyfounded by Richard M. Schulze and James Wheeler in 1966 as an audiospecialty store called Sound of Music. In 1983, it was re-brandedunder its current name with an emphasis placed on consumerelectronics.";
function VendorDetails() {
  return (
    <div className="vendor_details">
      <div className="img">
        <img src={bestbuy} alt="" />
      </div>
      <div className="name">
        <h4>
          <Link to="">BestBuy</Link>
        </h4>
      </div>
      <div className="desc_details">
        <p>{truncateText(description, 20)}</p>
      </div>
      <div className="btn">
        <button>Extra</button>
      </div>
      <div className="questions">
        <span className="a_flex link">
          <AnnouncementOutlinedIcon className="icon" />
          <span className="ask">Ask a question</span>
        </span>
      </div>
    </div>
  );
}

export default VendorDetails;
