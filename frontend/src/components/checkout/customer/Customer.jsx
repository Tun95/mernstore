import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link, useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../styles.scss";
import airpod from "../../../assets/bestsellers/airpod.webp";
import controller from "../../../assets/bestsellers/controller.webp";

function Customer() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const cartItems = [
    {
      name: "AB: Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3RX/A)",
      img: airpod,
    },
    {
      name: `AB: Apple MacBook Air 13.6" M2 256GB 2022 (MLXW3UA/A) Space Gray`,
      img: controller,
    },
  ];
  return (
    <div className="customer">
      <div className="productTitleContainer ">
        <h2 className="uppercase">Checkout</h2>
      </div>
      <div className="content d_flex">
        <div className="number ">
          <span className="l_flex">1</span>
        </div>
        <div className="main_content">
          <div className="header c_flex">
            <h2>Customer</h2>
            <button onClick={() => navigate("/login")}>Sign in</button>
          </div>
          <div className="inner_form">
            <div className="inline_input c_flex">
              <div className="form_group">
                <input type="text" placeholder="First Name and Last Name" />
              </div>
              <div className="form_group">
                <input type="text" placeholder="Phone" />
              </div>{" "}
              <div className="form_group">
                <input type="text" placeholder="E-mail" />
              </div>
            </div>
            <div className="check_form">
              <label htmlFor="billing" className="a_flex">
                <input type="checkbox" id="billing" />
                <small>
                  My billing address is different from shipping address
                </small>
              </label>
            </div>
            <div className="inline_input c_flex">
              <div className="form_group">
                <input type="text" placeholder="First Name and Last Name" />
              </div>
              <div className="form_group">
                <input type="text" placeholder="Phone" />
              </div>{" "}
              <div className="form_group">
                <input type="text" placeholder="address" />
              </div>
            </div>{" "}
            <div className="inline_input c_flex">
              <div className="form_group">
                <input type="text" placeholder="Zip/postal code" />
              </div>
              <div className="form_group">
                <input type="text" placeholder="city" />
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
          <div className="cart_order">
            <div className="head c_flex">
              <h3>Your order:</h3>
              <Link to="/cart" className="edit">
                <i className="fa-regular fa-pen-to-square"></i>
                <small>Edit</small>
              </Link>
            </div>

            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cart_table_list">
                  <div className="cart_table f_flex">
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="content_value">
                      <ul className="main_ul d_flex">
                        <li className="name__amount d_flex">
                          <div className="name_code_vendor_icon">
                            <small></small>
                            <div className="name_icon">
                              <div className="name">
                                <Link to="">{item.name}</Link>
                              </div>
                              {/* <div className="icon_btn">
                      <CloseOutlinedIcon className="icon" />
                      </div> */}
                            </div>
                            <div className="code">
                              <small>Code: MLXW3UA/A</small>
                            </div>
                            <div className="vendor">
                              <small>
                                Vendor: <Link to="">BestBuy</Link>
                              </small>
                            </div>
                          </div>
                          <ul className="d_flex qty_price_amount">
                            <li>
                              <small>Price</small>

                              <span>$595.60</span>
                              <s className="discount">$1,489.00</s>
                            </li>
                            <li>
                              <small>Qty</small>
                              <span>1</span>
                            </li>
                            <li>
                              <small>Amount</small>
                              <span>$595.60</span>
                            </li>
                          </ul>
                        </li>
                        <li className="close_icon">
                          <span className="icon_btn l_flex">
                            <CloseOutlinedIcon className="icon" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
