import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Slider, InputNumber, Checkbox } from "antd";
import { styled } from "@mui/system";
import { Checkbox as MyCheckbox, FormControlLabel } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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

const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    subCategories: ["Computers", "Smartphones", "Accessories"],
  },
  {
    id: 2,
    name: "Sports & Outdoors",
    subCategories: ["Outdoor Gear", "Athletic Clothing", "Footwear"],
  },
  {
    id: 3,
    name: "Apparel",
    subCategories: ["Men's Clothing", "Women's Clothing", "Kids' Clothing"],
  },
  {
    id: 4,
    name: "Office Supplies",
    subCategories: ["Stationery", "Office Furniture"],
  },
  {
    id: 5,
    name: "Multimedia",
    subCategories: ["Movies", "Music", "Video Games"],
  },
  {
    id: 6,
    name: "AB: Sports and outdoors",
    subCategories: ["Outdoor Equipment", "Sports Clothing", "Footwear"],
  },
];

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="filter_list">
      <div className="filter_header" onClick={toggleSection}>
        <span>{title}</span>
        {isOpen ? <RemoveIcon className="remove_icon"/> : <AddIcon />}
      </div>
      {isOpen && children}
    </li>
  );
};
function Filter(props) {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(20);
  const [sliderValue, setSliderValue] = useState([minValue, maxValue]);

  const onChangeMinInput = (value) => {
    if (isNaN(value)) {
      return;
    }
    setMinValue(value);
    updateSliderValue([value, sliderValue[1]]);
  };

  const onChangeMaxInput = (value) => {
    if (isNaN(value)) {
      return;
    }
    setMaxValue(value);
    updateSliderValue([sliderValue[0], value]);
  };

  const onChangeSlider = (value) => {
    setSliderValue(value);
  };

  const updateSliderValue = (value) => {
    setSliderValue(value);
  };

  //==================
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    if (activeCategory === categoryId) {
      // Clicked on the same category, close it
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };
  return (
    <div className="side_filter">
      <div className="content">
        <div className="category_header">
          <ul>
            <div className="title">
              <small>Subcategories</small>
            </div>
            {categoriesData.map((category) => (
              <li key={category.id}>
                <div
                  className={`main_category ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.name}</span>
                  {activeCategory === category.id && (
                    <FiberManualRecordIcon className="icon" />
                  )}
                </div>
                {activeCategory === category.id && (
                  <ul className="sub_category">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory}>
                        <span>{subCategory}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="product_filter">
          <ul>
            <div className="title">
              <small>Product filters</small>
            </div>

            <FilterSection title="Brand">
              <ul className="lower_list">
                {/* Brand filter content */}
                <span className="search_box">
                  <input type="search" placeholder="Search" />
                </span>
                <li className="check">
                  <Checkbox>Panasonic</Checkbox>
                </li>
              </ul>
            </FilterSection>

            <FilterSection title="Color">
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
            </FilterSection>

            <FilterSection title="Price">
              <div className="lower_list">
                {/* Price filter content */}
                <span className="c_flex">
                  <InputNumber
                    min={1}
                    max={20}
                    style={{ margin: "0 16px" }}
                    value={minValue}
                    onChange={onChangeMinInput}
                  />
                  <InputNumber
                    min={1}
                    max={20}
                    style={{ margin: "0 16px" }}
                    value={maxValue}
                    onChange={onChangeMaxInput}
                  />
                </span>
                <Slider
                  range
                  min={1}
                  max={20}
                  onChange={onChangeSlider}
                  value={sliderValue}
                />
              </div>
            </FilterSection>

            <FilterSection title="Size">
              <ul className="lower_list">
                {/* Size filter content */}
                <li>
                  <Checkbox>71.8 W X 50.8 H X 33.6 D (MM)</Checkbox>
                </li>
              </ul>
            </FilterSection>

            <FilterSection title="Operating System">
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
            </FilterSection>

            <FilterSection title="Display">
              <ul className="lower_list">
                {/* Display filter content */}
                <li>
                  <Checkbox>Panasonic</Checkbox>
                  <Checkbox>Samsung</Checkbox>
                </li>
              </ul>
            </FilterSection>

            <FilterSection title="Storage Capacity">
              <ul className="lower_list">
                {/* Storage Capacity filter content */}
                <span className="search_box">
                  <input type="search" placeholder="Search" />
                </span>
                <li>
                  <Checkbox>Panasonic</Checkbox>
                  <Checkbox>Samsung</Checkbox>
                </li>
              </ul>
            </FilterSection>
          </ul>

          <div className="btn">
            <button className="c_flex">
              <RestartAltIcon className="icon" /> <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
