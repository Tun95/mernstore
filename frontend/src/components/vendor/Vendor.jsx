import React, { useState } from "react";
import "./styles.scss";
import VendorDetails from "./VendorDetails";
import TopFilters from "./TopFilters";
import Filters from "./Filters";
import VendorItems from "./VendorItems";
import { Link } from "react-router-dom";
import data from "../home/bestseller/data";
import { Pagination } from "antd";

function Vendor() {
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
    <div className="vendor_products store product_main f_flex">
      <div className="vendor_img_details_filters ">
        <VendorDetails />
        <Filters
          minValue={minValue}
          onChangeMinInput={onChangeMinInput}
          maxValue={maxValue}
          onChangeMaxInput={onChangeMaxInput}
          onChangeSlider={onChangeSlider}
          sliderValue={sliderValue}
        />
      </div>
      <div className="top_filters_product_list content">
        <span>
          <TopFilters />
        </span>
        <div className="filter_items">
          <div className="product_list">
            <div className="product_card">
              {products.map((product, index) => (
                <VendorItems key={index} product={product} index={index} />
              ))}
            </div>
            <div className="ant_pagination l_flex mt">
              <Pagination total={500} itemRender={itemRender} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
