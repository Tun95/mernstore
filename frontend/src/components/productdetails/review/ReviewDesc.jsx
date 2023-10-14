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
import { styled, alpha } from "@mui/material/styles";
import { ProductReviewModal } from "../../modals/Modals";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      margin: "5px 0px",
      fontSize: "15px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        //  backgroundColor: alpha(
        //     theme.palette.primary.main,
        //     theme.palette.action.selectedOpacity
        //   ),
      },
    },
  },
}));

function ReviewDesc({ product, userInfo, handleDelete, dispatch }) {
  // ===Description===//
  const [description, setDescription] = useState(true);
  const closeDescription = () => {
    setDescription(false);
    document.body.style.overflow = "unset";
  };
  const showDescription = () => {
    setDescription(true);
  };
  const DescriptionDetail = () => {
    showDescription();
    closeReview();
    closeFeature();
  };

  //=== Review ==//
  const [review, setReview] = useState(false);
  const closeReview = () => {
    setReview(false);
    document.body.style.overflow = "unset";
  };
  const showReview = () => {
    setReview(true);
  };
  const ReviewDetail = () => {
    showReview();
    closeDescription();
    closeFeature();
  };

  // ===Features===//
  const [feature, setFeature] = useState(false);
  const closeFeature = () => {
    setFeature(false);
    document.body.style.overflow = "unset";
  };
  const showFeature = () => {
    setFeature(true);
  };
  const FeatureDetail = () => {
    showFeature();
    closeReview();
    closeDescription();
  };

  // ==== REVIEW DRAWER ====//
  const [anchorUsr, setAnchorUsr] = useState(null);
  const openUsr = Boolean(anchorUsr);
  const handleClickUsr = (event) => {
    setAnchorUsr(event.currentTarget);
  };
  const handleCloseUsr = () => {
    setAnchorUsr(null);
  };

  return (
    <>
      <section className="review_section ">
        <div className="container ">
          <div className="rev_style">
            <div className="switch f_flex">
              <span
                className={description ? "active" : ""}
                onClick={DescriptionDetail}
              >
                Description
              </span>
              <span className={review ? "active" : ""} onClick={ReviewDetail}>
                Reviews
              </span>
              <span className={feature ? "active" : ""} onClick={FeatureDetail}>
                Features
              </span>
            </div>

            {description && (
              <div className="description mt">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ratione magni facilis pariatur quaerat distinctio eveniet
                  omnis animi placeat veritatis dolore! Quod velit dolore atque
                  ipsa, ea nesciunt corporis possimus recusandae, excepturi odit
                  vero natus, repellendus nam unde esse animi rerum!
                </p>
              </div>
            )}
            {review && (
              <>
                <div className="review mt">
                  <div className="d_flex">
                    <div className="list">
                      <div className="no_post l_flex">
                        <h3>No reviews found</h3>
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
            {feature && <></>}
          </div>
        </div>
      </section>
    </>
  );
}

export default ReviewDesc;
