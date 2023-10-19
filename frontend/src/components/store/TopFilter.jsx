import React from "react";
import { Button, Popover } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Slider, Checkbox, InputNumber } from "antd";
import { styled } from "@mui/system";
import { Checkbox as MyCheckbox } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const text = (
  <span className="float_icon">
    <CloseOutlined className="icon" />
  </span>
);

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

  //===========
  // POPOVERS
  //===========
  const brand = (
    <div className="top_popover">
      <ul className="lower_list">
        {/* Brand filter content */}
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li className="check">
          <Checkbox>Panasonic</Checkbox>
        </li>
      </ul>
    </div>
  );

  const color = (
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
    </div>
  );
  const price = (
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
    </div>
  );

  const size = (
    <div className="top_popover">
      <ul className="lower_list" style={{ marginLeft: 5 }}>
        {/* Size filter content */}
        <li>
          <Checkbox>71.8 W X 50.8 H X 33.6 D (MM)</Checkbox>
        </li>
      </ul>
    </div>
  );

  const system = (
    <div className="top_popover">
      <ul className="lower_list">
        {/* Operating System filter content */}
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>
  );

  const display = (
    <div className="top_popover">
      <ul className="lower_list" style={{ marginLeft: 5 }}>
        {/* Display filter content */}
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>
  );
  const storage = (
    <div className="top_popover">
      <ul className="lower_list">
        {/* Operating System filter content */}
        <span className="search_box">
          <input type="search" placeholder="Search" />
        </span>
        <li>
          <Checkbox>Panasonic</Checkbox>
          <Checkbox>Samsung</Checkbox>
        </li>
      </ul>
    </div>
  );

  //=============
  // SORT BY
  //=============
  const sortList = (
    <div className="sort_show_list">
      <ul>
        <li>from A to Z</li>
        <li>from Z to A</li>
        <li> Price: Low to High</li>
        <li> Price: High to Low</li>
        <li>Popular First</li>
      </ul>
    </div>
  );
  const pageList = (
    <div className="sort_show_list">
      <ul>
        <li>16 Per Page </li>
        <li>19 Per Page </li>
        <li> 20 Per Page</li>
      </ul>
    </div>
  );

  return (
    <div className="top_filter">
      <div className="content">
        <div className="list_items a_flex">
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={brand}
              trigger="click"
            >
              <Button>
                <span>Brand</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={color}
              trigger="click"
            >
              <Button>
                <span>Color</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={price}
              trigger="click"
            >
              <Button>
                <span>Price</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={size}
              trigger="click"
            >
              <Button>
                <span>Size</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={system}
              trigger="click"
            >
              <Button>
                <span>Operating System</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={display}
              trigger="click"
            >
              <Button>
                <span>Display</span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
          <div className="list">
            <Popover
              placement="bottomLeft"
              title={text}
              content={storage}
              trigger="click"
            >
              <Button>
                <span>Storage Capacity </span>
                <DownOutlined className="icon" />
              </Button>
            </Popover>
          </div>
        </div>
        <div className="sort_show">
          <small className="small a_flex">
            <span className="sort a_flex">
              <span className="a_flex">
                <SortIcon className="icon" />
              </span>
              <Popover
                placement="bottom"
                title={<span className="header">sort by</span>}
                content={sortList}
                trigger="click"
              >
                <span className="a_flex">
                  <label>Sort by:</label>
                  <Link to="" className="a_flex">
                    <p>Newest Items First</p>
                    <KeyboardArrowDownIcon className="icon" />
                  </Link>
                </span>
              </Popover>
            </span>
            <Popover
              placement="bottom"
              title={<span className="header">19 Per Page</span>}
              content={pageList}
              style={{ padding: 0 }}
              trigger="click"
            >
              <span className="show a_flex">
                <label>Show: </label>
                <Link to="" className="a_flex">
                  <p>19</p>
                  <KeyboardArrowDownIcon className="icon" />
                </Link>
              </span>
            </Popover>
          </small>
        </div>
      </div>
    </div>
  );
}

export default TopFilter;
