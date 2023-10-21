import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
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

function TopFilters() {
  //=============
  // SORT BY
  //=============
  const [displayText, setDisplayText] = useState("from A to Z");
  const handleMenuClick = (text) => {
    setDisplayText(text);
    handleClose();
  };

  //SORT INFO
  const [anchor, setAnchor] = React.useState(null);
  const openInfo = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  //=========
  //  BY PAGE
  //=========
  const [displayPageText, setDisplayPageText] = useState("19 Per Page");
  const handlePageMenuClick = (text) => {
    setDisplayPageText(text);
    handlePageClose();
  };
  //PAGE INFO
  const [pageAnchor, setPageAnchor] = React.useState(null);
  const pageInfo = Boolean(pageAnchor);
  const handlePage = (event) => {
    setPageAnchor(event.currentTarget);
  };
  const handlePageClose = () => {
    setPageAnchor(null);
  };

  return (
    <div className="top_filter">
      <div className="content">
        <div className="header c_flex">
          <div className="">
            <h2>Vendor products</h2>
          </div>
          <div className="product_count">
            <h3>
              <span>Product found: 1130</span>
            </h3>
          </div>
        </div>
        <div className="sort_show">
          <small className="small a_flex">
            <div className="sort_bar">
              <span className="a_flex">
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
                            onClick={() => handleMenuClick("from A to Z")}
                            disableRipple
                          >
                            from A to Z
                          </MenuItem>
                          <MenuItem
                            key="alphabetical-za"
                            className="list"
                            onClick={() => handleMenuClick("from Z to A")}
                            disableRipple
                          >
                            from Z to A
                          </MenuItem>
                          <MenuItem
                            key="rating-low-high"
                            className="list"
                            onClick={() =>
                              handleMenuClick("Price: Low to High")
                            }
                            disableRipple
                          >
                            Price: Low to High
                          </MenuItem>
                          <MenuItem
                            key="rating-high-low"
                            className="list"
                            onClick={() =>
                              handleMenuClick("Price: High to Low")
                            }
                            disableRipple
                          >
                            Price: High to Low
                          </MenuItem>
                          <MenuItem
                            key="low-rated"
                            className="list"
                            onClick={() => handleMenuClick("Popular First")}
                            disableRipple
                          >
                            Popular First
                          </MenuItem>{" "}
                        </div>
                      </div>
                    </div>
                  </Menu>
                </React.Fragment>
              </span>
            </div>
            <div className="sort_bar">
              <span className="a_flex">
                <span className="a_flex">
                  <label>Show:</label>
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
                        onClick={handlePage}
                        disableRipple
                        size="small"
                        className="icon-button"
                        disableElevation
                        aria-controls={pageInfo ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={pageInfo ? "true" : undefined}
                      >
                        <Link to="" className="sort_list a_flex">
                          <p>{displayPageText}</p>
                          <KeyboardArrowDownIcon className="icon" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Menu
                    anchorEl={pageAnchor}
                    id="account-menu"
                    open={pageInfo}
                    onClose={handlePageClose}
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
                          <h4>{displayPageText}</h4>
                          <CloseOutlinedIcon
                            onClick={handlePageClose}
                            className="icon"
                          />
                        </div>
                        <Divider />
                        <div className="menu_item">
                          <MenuItem
                            key="16-per"
                            className="list"
                            onClick={() => handlePageMenuClick("16 Per Page")}
                            disableRipple
                          >
                            16 Per Page
                          </MenuItem>
                          <MenuItem
                            key="19-per"
                            className="list"
                            onClick={() => handlePageMenuClick("19 Per Page")}
                            disableRipple
                          >
                            19 Per Page
                          </MenuItem>{" "}
                          <MenuItem
                            key="30-per"
                            className="list"
                            onClick={() => handlePageMenuClick("30 Per Page")}
                            disableRipple
                          >
                            30 Per Page
                          </MenuItem>
                        </div>
                      </div>
                    </div>
                  </Menu>
                </React.Fragment>
              </span>
            </div>
          </small>
        </div>
      </div>
    </div>
  );
}

export default TopFilters;
