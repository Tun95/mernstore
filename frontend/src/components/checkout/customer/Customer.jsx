import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link, useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "../styles.scss";
import airpod from "../../../assets/bestsellers/airpod.webp";
import controller from "../../../assets/bestsellers/controller.webp";
import { LoginModals } from "../../modals/Modals";

function Customer() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const cartItems = [
    {
      name: "AB: Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3RX/A)",
      img: airpod,
      features: [
        { name: "RAM", subFeatures: ["8 GB DDR", "16 GB DDR", "32 GB DDR"] },
        { name: "Processor Count", subFeatures: ["1", "2"] },
        {
          name: "Processor",
          subFeatures: [
            "2.7 GHz Intel Core i5",
            "2.7 GHz Intel Core i7",
            "3.1 GHz Intel Core i5",
          ],
        },
      ],
      seller: "Newegg",
    },
    {
      name: `AB: Apple MacBook Air 13.6" M2 256GB 2022 (MLXW3UA/A) Space Gray`,
      img: controller,
      features: [],
      seller: "BestBuy",
    },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [billingDifferent, setBillingDifferent] = useState(false);

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
            <span>
              <LoginModals toggleDrawer={toggleDrawer} />
            </span>
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
                <input
                  type="checkbox"
                  id="billing"
                  onChange={() => setBillingDifferent(!billingDifferent)}
                />{" "}
                <small>
                  My billing address is different from shipping address
                </small>
              </label>
            </div>
            {billingDifferent && (
              <span className="checked">
                {" "}
                <div className="inline_input  c_flex">
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
                      country={selectedCountry}
                      name="state"
                      value={selectedState}
                      onChange={(val) => setSelectedState(val)}
                      className="select_styles"
                    />
                  </div>
                </div>
                <div className="form_group">
                  <CountryDropdown
                    name="country"
                    value={selectedCountry}
                    onChange={(val) => setSelectedCountry(val)}
                    className="select_styles"
                  />
                </div>
              </span>
            )}
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
                            </div>
                            <div className="code">
                              <small>Code: MLXW3UA/A</small>
                            </div>
                            <div className="features_box">
                              {item.features.map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="features a_flex"
                                >
                                  <small>{feature.name}: </small>
                                  <small>
                                    <strong>
                                      &#160; {feature.subFeatures[0]}
                                    </strong>
                                  </small>
                                </div>
                              ))}
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
