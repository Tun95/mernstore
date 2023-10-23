import React, { useState } from "react";
import "../styles.scss";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

function Delivery() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="customer delivery">
      <div className="content d_flex">
        <div className="number ">
          <span className="l_flex">2</span>
        </div>
        <div className="main_content">
          <div className="header ">
            <h2>Delivery</h2>
          </div>
          <div className="inner_form">
            <div className="inline_input c_flex">
              <div className="form_group">
                <input type="text" placeholder="City" />
              </div>
              <div className="form_group">
                <RegionDropdown
                  country={selectedCountry} // Use selectedCountry state
                  name="state"
                  value={selectedState} // Use selectedState state
                  onChange={(val) => setSelectedState(val)} // Update selectedState state
                  // onBlur={handleBlur}
                  className="select_styles"
                />
              </div>
              <div className="form_group">
                <CountryDropdown
                  name="country"
                  value={selectedCountry} // Use selectedCountry state
                  onChange={(val) => setSelectedCountry(val)} // Update selectedCountry state
                  // onBlur={handleBlur}
                  className="select_styles"
                />
              </div>
            </div>
            <div className="inline_input c_flex">
              <div className="form_group">
                <input type="text" placeholder="address" />
              </div>
              <div className="form_group">
                <input type="text" placeholder="Zip/postal cade" />
              </div>
            </div>
          </div>
          <div className="shipping_methods">
            <div className="header">
              <small>Shipping methods</small>
            </div>
            <div className="methods">
              <div className="head">
                <h3>Shipping method for BestBuy</h3>
              </div>
              <div className="method_box">
                <div className="box">
                  <label htmlFor="custom" className="box_head c_flex c_flex">
                    <span>
                      <h4>Custom shipping method — $28.00</h4>
                      <div className="day">
                        <small>(3-5 days)</small>
                      </div>
                    </span>
                    <span>
                      <input type="radio" id="custom" checked />
                    </span>
                  </label>
                  <div className="text">
                    <p>
                      Delivery time is calculated in business days. Products in
                      stock will be sent after the payment is verified. Mail
                      service is responsible for the goods during
                      transportation. Please, open the package delivered under
                      your order the moment you receive it. If any damage is
                      revealed, make claims against mail service. Any questions?
                      Contact our Customer Service at 123-12-23
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="methods">
              <div className="head">
                <h3>Shipping method for Newegg</h3>
              </div>
              <div className="method_box">
                <div className="box">
                  <label htmlFor="custom1" className="box_head c_flex">
                    <span>
                      <h4>Custom shipping method — $28.00</h4>
                      <div className="day">
                        <small>(3-5 days)</small>
                      </div>
                    </span>
                    <span>
                      <input type="radio" id="custom1" checked />
                    </span>
                  </label>
                  <div className="text">
                    <p>
                      Delivery time is calculated in business days. Products in
                      stock will be sent after the payment is verified. Mail
                      service is responsible for the goods during
                      transportation. Please, open the package delivered under
                      your order the moment you receive it. If any damage is
                      revealed, make claims against mail service. Any questions?
                      Contact our Customer Service at 123-12-23
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
