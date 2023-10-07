import React, { useState } from "react";
import StoreBanner from "./Banner";
import "./styles.scss";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import TopFilter from "./TopFilter";
import StoreItems from "./StoreItems";
import data from "../home/bestseller/data";
import { Pagination } from "antd";

function Store() {
  const { products } = data;

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
    <div className="store product_main">
      <StoreBanner />
      <div className="container">
        <div className="content">
          <div className="category_selected">
            <h2>Electronics</h2>
          </div>
          <div className="quick_link ">
            <div className="page a_flex">
              <Link to="/">Home /</Link>
              <p>&#160; Electronics</p>
            </div>
          </div>
          <div className="filter_items f_flex">
            <div className="filter_style">
              <Filter
                minValue={minValue}
                onChangeMinInput={onChangeMinInput}
                maxValue={maxValue}
                onChangeMaxInput={onChangeMaxInput}
                onChangeSlider={onChangeSlider}
                sliderValue={sliderValue}
              />
            </div>
            <div className="mt">
              <TopFilter
                minValue={minValue}
                onChangeMinInput={onChangeMinInput}
                maxValue={maxValue}
                onChangeMaxInput={onChangeMaxInput}
                onChangeSlider={onChangeSlider}
                sliderValue={sliderValue}
              />
              <div className="product_list">
                <div className="product_card">
                  {products.map((product, index) => (
                    <StoreItems key={index} product={product} index={index} />
                  ))}
                </div>
                <div className="ant_pagination l_flex mt">
                  <Pagination total={500} itemRender={itemRender} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
