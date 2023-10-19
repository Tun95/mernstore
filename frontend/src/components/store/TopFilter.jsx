import React, { useState } from "react";
import { Button, Popover } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Slider, Checkbox, InputNumber } from "antd";
import { styled } from "@mui/system";
import { Checkbox as MyCheckbox } from "@mui/material";
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

//===================
const colorData = [
  { label: "Red", color: "#FF0000" },
  { label: "Green", color: "#00FF00" },
  { label: "Blue", color: "#0000FF" },
  { label: "Yellow", color: "#FFFF00" },
  // Add more colors as needed
];
const BpIcon = styled("span")(({ theme, color }) => ({
  borderRadius: 20,
  width: 25,
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: color,
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: color,
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ color }) => ({
  backgroundColor: color, // Use the color prop here
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: color, // Use the color prop here
  },
}));

function TopFilter(props) {
  const {
    minValue,
    onChangeMinInput,
    maxValue,
    onChangeMaxInput,
    onChangeSlider,
    sliderValue,
  } = props;

  //=============
  // HANDLE CLOSE
  //=============
  const [popovers, setPopovers] = useState(new Array(7).fill(false));

  const togglePopover = (index) => {
    const newPopovers = [...popovers];
    newPopovers[index] = !newPopovers[index];
    setPopovers(newPopovers);
  };

  const closePopover = (index) => {
    const newPopovers = [...popovers];
    newPopovers[index] = false;
    setPopovers(newPopovers);
  };

  //=================
  // POPOVERS CONTENT
  //=================
  const contentList = [
    // Brand filter content
    <div className="top_popover">
      <ul className="lower_list">
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li className="check">
          <Checkbox>Panasonic</Checkbox>
        </li>
      </ul>
    </div>,
    // Color filter content
    <div className="top_popover">
      <ul className="lower_list color_check a_flex">
        {colorData.map((colorItem, index) => (
          <li key={index}>
            <MyCheckbox
              sx={{
                padding: 0,
                marginRight: 1,
                "&:hover": { bgcolor: "transparent" },
              }}
              disableRipple
              color="default"
              checkedIcon={<BpCheckedIcon color={colorItem.color} />}
              icon={<BpIcon color={colorItem.color} />}
              inputProps={{ "aria-label": "Checkbox demo" }}
              {...props}
            />
          </li>
        ))}
      </ul>
    </div>,
    // Price filter content
    <div className="top_popover">
      <div className="lower_list " style={{ marginLeft: 0 }}>
        {/* Price filter content */}
        <span className="c_flex input_price">
          <InputNumber
            min={1}
            max={20}
            value={minValue}
            onChange={onChangeMinInput}
          />
          <InputNumber
            min={1}
            max={20}
            value={maxValue}
            onChange={onChangeMaxInput}
          />
        </span>
        <span className="slider">
          <Slider
            range
            trackStyle={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
            handleStyle={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
            min={1}
            max={20}
            onChange={onChangeSlider}
            value={sliderValue}
          />
        </span>
      </div>
    </div>,
    // Size filter content
    <div className="top_popover">
      <ul className="lower_list" style={{ marginLeft: 5 }}>
        <li>
          <Checkbox>71.8 W X 50.8 H X 33.6 D (MM)</Checkbox>
        </li>
      </ul>
    </div>,
    // Operating System filter content
    <div className="top_popover">
      <ul className="lower_list">
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>,
    // Display filter content
    <div className="top_popover">
      <ul className="lower_list" style={{ marginLeft: 5 }}>
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>,
    // Storage Capacity filter content
    <div className="top_popover">
      <ul className="lower_list">
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>,
  ];

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
  // PAGE BY
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
        <div className="list_items a_flex">
          {popovers.map((popover, index) => (
            <div className="list" key={index}>
              <Popover
                placement="bottomLeft"
                title={
                  <span className="float_icon">
                    <CloseOutlined
                      className="icon"
                      onClick={() => closePopover(index)}
                    />
                  </span>
                }
                content={contentList[index]}
                trigger="click"
                open={popovers[index]}
                onOpenChange={() => togglePopover(index)}
              >
                <Button>
                  <span>
                    {index === 0
                      ? "Brand"
                      : index === 1
                      ? "Color"
                      : index === 2
                      ? "Price"
                      : index === 3
                      ? "Size"
                      : index === 4
                      ? "System"
                      : index === 5
                      ? "Display"
                      : index === 6
                      ? "Storage"
                      : null}
                  </span>
                  <DownOutlined className="icon" />
                </Button>
              </Popover>
            </div>
          ))}
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

export default TopFilter;
