import React, { useState } from "react";
import { LineProgressBar } from "@frogress/line";
import Rating from "../../utilities/rating/Ratings";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SortIcon from "@mui/icons-material/Sort";
import { Pagination } from "antd";

function ReviewList() {
  const [displayText, setDisplayText] = useState("Newest Items First");
  const handleMenuClick = (text) => {
    setDisplayText(text);
    handleClose();
  };
  //INFO
  const [anchor, setAnchor] = React.useState(null);
  const openInfo = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  //===========
  // PAGINATION
  //===========
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Link to="">Previous</Link>;
    }
    if (type === "next") {
      return <Link to="">Next</Link>;
    }
    return originalElement;
  };

  return (
    <section className="review_list_box">
      <div className=" l_flex">
        <div className="reviewList f_flex">
          <div className="rating">
            <div className="box l_flex">
              <h2>3</h2>
              <small>out of 5</small>
            </div>
            <Rating rating={3} />
            <span className="num_reviews l_flex">
              <small className="a_flex">
                Reviews: <span>20</span>
              </small>
            </span>
          </div>
          <div className="rating_bars">
            <div className="bar a_flex">
              <small className="a_flex">
                5 <span>stars</span>
              </small>
              <LineProgressBar
                percent={20}
                rounded={36}
                className="LineProgressBar"
                height={10}
                progressColor="var(--color-rating)"
              />
              <small className="percentage">20%</small>
            </div>
            <div className="bar a_flex">
              <small className="a_flex">
                4<span>stars</span>
              </small>
              <LineProgressBar
                percent={30}
                rounded={36}
                className="LineProgressBar"
                height={10}
                progressColor="var(--color-rating)"
              />
              <small className="percentage">30%</small>
            </div>
            <div className="bar a_flex">
              <small className="a_flex">
                3 <span>stars</span>
              </small>
              <LineProgressBar
                percent={5}
                rounded={36}
                className="LineProgressBar"
                height={10}
                progressColor="var(--color-rating)"
              />
              <small className="percentage">5%</small>
            </div>
            <div className="bar a_flex">
              <small className="a_flex">
                2 <span>stars</span>
              </small>
              <LineProgressBar
                percent={15}
                rounded={36}
                className="LineProgressBar"
                height={10}
                progressColor="var(--color-rating)"
              />
              <small className="percentage">15%</small>
            </div>
            <div className="bar a_flex">
              <small className="a_flex">
                1 <span>stars</span>
              </small>
              <LineProgressBar
                percent={30}
                rounded={36}
                className="LineProgressBar"
                height={10}
                progressColor="var(--color-rating)"
              />
              <small className="percentage">30%</small>
            </div>
          </div>
        </div>
      </div>
      <div className="sort_bar">
        <small className="a_flex">
          <span className="a_flex">
            <SortIcon className="icon" />
            <label>Sort by:</label>
          </span>
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
              className="user_menu_box"
            >
              <Tooltip>
                <IconButton
                  onClick={handleClick}
                  disableRipple
                  size="small"
                  className="icon-button"
                  disableElevation
                  aria-controls={openInfo ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openInfo ? "true" : undefined}
                >
                  <Link to="" className="sort_list a_flex">
                    <p>{displayText}</p>
                    <KeyboardArrowDownIcon className="icon" />
                  </Link>
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchor}
              id="account-menu"
              open={openInfo}
              onClose={handleClose}
              disableScrollLock={true}
              PaperProps={{
                elevation: 0,
                sx: {
                  zIndex: 1,
                  borderRadius: "10px",
                  overflow: "visible",
                  padding: 0,
                  margin: 0,
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  ml: 2,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: 1.5,
                    mr: 1,
                  },
                  "&:after": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 24,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              <div className="user_menu_content">
                <div className="upper">
                  <div className="user_head c_flex">
                    <h4>Sort by</h4>
                    <CloseOutlinedIcon onClick={handleClose} className="icon" />
                  </div>
                  <Divider />
                  <div className="menu_item">
                    <MenuItem
                      key="alphabetical-az"
                      className="list"
                      onClick={() => handleMenuClick("Newest Items First")}
                      disableRipple
                    >
                      Newest Items First
                    </MenuItem>
                    <MenuItem
                      key="alphabetical-za"
                      className="list"
                      onClick={() => handleMenuClick("Oldest Items First")}
                      disableRipple
                    >
                      Oldest Items First
                    </MenuItem>
                    <MenuItem
                      key="rating-low-high"
                      className="list"
                      onClick={() => handleMenuClick("Helpful Last")}
                      disableRipple
                    >
                      Helpful Last
                    </MenuItem>
                    <MenuItem
                      key="rating-high-low"
                      className="list"
                      onClick={() => handleMenuClick("Helpful First")}
                      disableRipple
                    >
                      Helpful First
                    </MenuItem>
                    <MenuItem
                      key="low-rated"
                      className="list"
                      onClick={() => handleMenuClick("Low rated")}
                      disableRipple
                    >
                      Low rated
                    </MenuItem>{" "}
                    <MenuItem
                      key="high-rated"
                      className="list"
                      onClick={() => handleMenuClick("Highly rated")}
                      disableRipple
                    >
                      Highly rated
                    </MenuItem>
                  </div>
                </div>
              </div>
            </Menu>
          </React.Fragment>
        </small>
      </div>
      <div className="comment_list">
        <div className="list">
          <div className="header c_flex">
            <div className="name_rating">
              <div className="name">
                <h5>Tunji Akande</h5>
              </div>
              <div className="rating a_flex">
                <span>
                  <Rating rating={2} />
                </span>
                <small>2</small>
              </div>
            </div>
            <div className="date_time">
              <small className="date">19/10/2023,</small>
              <small>12:46</small>
            </div>
          </div>
          <div className="comment">
            <h5>Comment</h5>
            <p>
              Arrived, boxed well with balloon cushions. Power adapter looked
              clean but had scratches. Opened up the Lid of the MacBookPro and
              it looked like it had some sort of disease or cancer &amp; it
              smelled quite strange too. It had over 50% battery so I carried on
              with a reset which resulted in an error. Luckily it booted back
              into Yosemite OS that it had installed years ago, after 3 failed
              attempts managed to update to Mojave. Of course first things first
              copy music etc onto, USB stick struggled to go in either of the
              USB Ports (look at the photos) was also stuck after insertion but
            </p>
          </div>
          <div className="like_dislike a_flex">
            <div className="like">
              <i className="fa-regular fa-thumbs-up"></i>
              <span>0</span>
            </div>
            <div className="dislike">
              <i className="fa-regular fa-thumbs-down"></i>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ant_pagination l_flex mt">
        <Pagination total={500} itemRender={itemRender} />
      </div>
    </section>
  );
}

export default ReviewList;
