import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./styles.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import map from "../../../../assets/map.png";
import adorama from "../../../../assets/vendors/adorama.webp";
import bestbuy from "../../../../assets/vendors/bestbuy.webp";
import buydig from "../../../../assets/vendors/buydig.webp";
import Rating from "../../../../components/utilities/rating/Ratings";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function VendorListScreen() {
  const [searchExpanded, setSearchExpanded] = useState(true);
  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

  const [displayText, setDisplayText] = useState(
    "Sort by alphabetical: A to Z"
  );
  const handleMenuClick = (text) => {
    setDisplayText(text);
    handleClose();
  };

  const vendors = [
    {
      id: 1,
      img: adorama,
      name: "Adorama",
      description:
        "Serving customers for more than 35 years, Adorama has grown from its flagship NYC store to include the leading online destination for photography, imaging and consumer electronics. Adorama's vast product offerings encompass home entertainment, mobile computing, and professional video and audio, while its services include an in-house photo lab, AdoramaPix, pro equipment rental at Adorama Rental Company and the award-winning Adorama Learning Center, which offers free education for photographers in video channels such as the popular AdoramaTV.",
      rating: 4.5,
      numReviews: 13,
    },
    {
      id: 2,
      img: bestbuy,
      name: "BestBuy",
      description:
        "Best Buy Co., Inc. is an American multinational consumer electronics retailer headquartered in Richfield, Minnesota. It was originally founded by Richard M. Schulze and James Wheeler in 1966 as an audio specialty store called Sound of Music . In 1983, it was re-branded under its current name with an emphasis placed on consumer electronics.",
      rating: 3.5,
      numReviews: 7,
    },
    {
      id: 3,
      img: buydig,
      name: "Buydig",
      description:
        "Buydig is an authorized retailer of all of the major electronics brands. They only collect sales tax in New Jersey, so when a price is fixed (say a new Samsung TV), you can save a little bit of money going with Buydig vs. a big box store like Best Buy.",
      rating: 0,
      numReviews: 0,
    },
  ];

  //INFO
  const [anchor, setAnchor] = React.useState(null);
  const openInfo = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <div className="vendor_list">
      <Helmet>
        <title>All vendors</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p> All vendors</p>
          </div>
        </div>
        <div className="content">
          <form action="" className="map_box">
            <div className="search_box">
              <div className="header c_flex" onClick={toggleSearch}>
                <h5>Search for vendors</h5>
                {searchExpanded ? (
                  <KeyboardArrowUpIcon className="icon" />
                ) : (
                  <KeyboardArrowDownIcon className="icon" />
                )}
              </div>
              {searchExpanded && (
                <>
                  <div className="form-group">
                    <input type="text" placeholder="Enter a location" />
                    <GpsFixedIcon className="icon" />
                  </div>
                  <div className="btn c_flex">
                    <button>Choose</button>
                    <button className="a_flex">
                      <RestartAltIcon className="icon" />
                      <span>Reset</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="map">
              <img src={map} alt="" />
            </div>
          </form>
          <div className="lower_section">
            <div className="header">
              <div>
                <h2>All vendors</h2>
              </div>
              <div className="sort">
                <small className="a_flex">
                  <label>Sort by:</label>

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
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <div className="user_menu_content">
                        <div className="upper">
                          <div className="user_head c_flex">
                            <h4>Sort by</h4>
                            <CloseOutlinedIcon
                              onClick={handleClose}
                              className="icon"
                            />
                          </div>
                          <Divider />
                          <div className="menu_item">
                            <MenuItem
                              key="alphabetical-az"
                              className="list"
                              onClick={() =>
                                handleMenuClick("Sort by alphabetical: A to Z")
                              }
                              disableRipple
                            >
                              Sort by alphabetical: A to Z
                            </MenuItem>
                            <MenuItem
                              key="alphabetical-za"
                              className="list"
                              onClick={() =>
                                handleMenuClick("Sort by alphabetical: Z to A")
                              }
                              disableRipple
                            >
                              Sort by alphabetical: Z to A
                            </MenuItem>
                            <MenuItem
                              key="rating-low-high"
                              className="list"
                              onClick={() =>
                                handleMenuClick("Sort by rating: Low to High")
                              }
                              disableRipple
                            >
                              Sort by rating: Low to High
                            </MenuItem>
                            <MenuItem
                              key="rating-high-low"
                              className="list"
                              onClick={() =>
                                handleMenuClick("Sort by rating: High to Low")
                              }
                              disableRipple
                            >
                              Sort by rating: High to Low
                            </MenuItem>
                          </div>
                        </div>
                      </div>
                    </Menu>
                  </React.Fragment>
                </small>
              </div>
            </div>
            <div className="list">
              <ul>
                {vendors?.map((item, index) => (
                  <li key={index} className="d_flex">
                    <div className="img_rating l_flex">
                      <Link to={`/vendors/:slug`} className="img">
                        <img src={item.img} alt={item.name} />
                      </Link>
                      <Link
                        to={`/vendors/:slug`}
                        className={`num_rating ${
                          item.rating === 0 ? "no_rating" : ""
                        }`}
                      >
                        <Rating rating={item.rating} />
                        <span>{item.numReviews} reviews</span>
                      </Link>
                    </div>
                    <div className="name_desc a_flex">
                      <Link to={`/vendors/:slug`}>
                        <h3>{item.name}</h3>
                      </Link>
                      <small>{item.description}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorListScreen;
