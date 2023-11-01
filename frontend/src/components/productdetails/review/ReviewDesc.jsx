import React, { useState } from "react";
import Rating from "../../utilities/rating/Ratings";
import ReviewBox from "./ReviewBox";
import MessageBox from "../../utilities/message loading/MessageBox";
import ReactTimeAgo from "react-time-ago";
import parse from "html-react-parser";
import me from "../../../assets/me.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ProductReviewModal, VideoModal } from "../../modals/Modals";
import Description from "./Description";
import ReviewList from "./ReviewList";
import v1 from "../../../assets/details/v1.jpg";

//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}
function ReviewDesc({ userInfo, handleDelete, dispatch }) {
  //============
  //TOGGLE BOX
  //============
  const [openBox, setOpenBox] = useState(0);

  const toggleBox = (index) => {
    if (openBox === index) {
      // Clicking on the currently open box; do nothing
      return;
    }
    setOpenBox(index);
  };

  const product = {
    name: "Phone",
    features: [
      { label: "Battery capacity", value: "3700 mAh" },
      { label: "Number of cores", value: "6" },
      { label: "Operating System", value: "iOS" },
      { label: "Processor", value: "Apple A16 Bionic" },
      { label: "RAM", value: "6 GB" },
      { label: "Screen diagonal", value: "6.1" },
    ],
  };

  const video = [
    {
      videoTitle: "The new MacBook Pro | Supercharged for pros | Apple",
      videoThumbnail: "",
      videoLink:
        "https://www.youtube.com/embed/hs1HoLs4SD0?list=TLGGtmam0DIpMrIzMTEwMjAyMw",
      videoDescription:
        "The iPhone 14 Pro and iPhone 14 Pro Max are smartphones designed and marketed by Apple Inc. They are the sixteenth generation flagship iPhones, succeeding the iPhone",
    },
    {
      videoTitle: "Introducing the new MacBook Air — Apple",
      videoThumbnail: v1,
      videoLink:
        "https://www.youtube.com/embed/hs1HoLs4SD0?list=TLGGtmam0DIpMrIzMTEwMjAyMw",
      videoDescription:
        "The iPhone 14 Pro and iPhone 14 Pro Max are smartphones designed and marketed by Apple Inc. They are the sixteenth generation flagship iPhones, succeeding the iPhone",
    },
  ];
  return (
    <>
      <section className="review_section ">
        <div className="container ">
          <div className="rev_style">
            <div className="switch f_flex">
              <span
                className={openBox === 0 ? "active" : ""}
                onClick={() => toggleBox(0)}
              >
                Description
              </span>
              <span
                className={openBox === 1 ? "active d_flex" : "d_flex"}
                onClick={() => toggleBox(1)}
              >
                Reviews
                <span className="count l_flex">
                  <small>1</small>
                </span>
              </span>
              <span
                className={openBox === 2 ? "active" : ""}
                onClick={() => toggleBox(2)}
              >
                Features
              </span>
              <span
                className={openBox === 3 ? "active" : ""}
                onClick={() => toggleBox(3)}
              >
                Video gallery
              </span>
            </div>

            {openBox === 0 && (
              <div className="description mt">
                <Description />
              </div>
            )}
            {openBox === 1 && (
              <>
                <div className="review mt">
                  <div className="d_flex">
                    <div className="list">
                      {/* <div className="no_post l_flex">
                        <h3>No reviews found</h3>
                      </div> */}
                      <div className="review_list ">
                        <ReviewList />
                      </div>
                    </div>
                    <div className="review_box">
                      <h3>Review this product</h3>
                      <small>Share your thoughts with other customers</small>
                      <div className="btn">
                        <ProductReviewModal />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {openBox === 2 && (
              <>
                <div className="features mt">
                  <ul>
                    {product.features.map((item, index) => (
                      <li className="feature_list c_flex" key={index}>
                        <span className="spec">{item.label}</span>
                        <span>{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {openBox === 3 && (
              <div className="video_reviews  mt">
                {video.map((item, index) => (
                  <div className="video_list" key={index}>
                    <div className="thumbnail_box">
                      <VideoModal item={item} />
                    </div>
                    <div className="text">
                      <div className="name">
                        <h4>{item.videoTitle}</h4>
                      </div>
                      <div className="video_description">
                        <p>{truncateText(item.videoDescription, 13)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ReviewDesc;
