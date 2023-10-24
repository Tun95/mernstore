import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./styles.scss";
import airpod from "../../assets/bestsellers/airpod.webp";
import controller from "../../assets/bestsellers/controller.webp";
import { CalculateShippingModals, CartDiscountModal } from "../modals/Modals";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import { Context } from "../../context/Context";

function Cart() {
  const { convertCurrency } = useContext(Context);

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
    },
    {
      name: `AB: Apple MacBook Air 13.6" M2 256GB 2022 (MLXW3UA/A) Space Gray`,
      img: controller,
      features: [],
    },
  ];
  return (
    <div className="cart_container">
      <div className="cart_table">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>&nbsp;</th>
              <th>Unit price</th>
              <th>Quantity</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="table_row">
                <td>
                  <th className="small_device">Product</th>
                  <div className="cart_content_img">
                    <Link to="">
                      <img src={item.img} alt="" />
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="cart_content_product f_flex">
                    <Link to="">{item.name}</Link>
                    <span>
                      <CloseOutlinedIcon className="icon" />
                    </span>
                  </div>
                  <div className="cart_content_code">
                    <span>CODE: </span>
                    <span>MLXW3UA/A</span>
                  </div>
                  <div className="features_box">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="features c_flex">
                        <span>{feature.name}: </span>
                        <span>
                          <select name="select" className="select">
                            {feature.subFeatures.map(
                              (subFeature, subFeatureIndex) => (
                                <option
                                  key={subFeatureIndex}
                                  value={subFeature}
                                >
                                  {subFeature}
                                </option>
                              )
                            )}
                          </select>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="group_block">
                    <div className="group_block_arrow">
                      <span className="caret_info">
                        <span className="caret_outer"></span>
                        <div className="caret_inner"></div>
                      </span>
                    </div>
                    <div className="discount_vendor">
                      <p>
                        <CartDiscountModal />
                      </p>
                    </div>
                    <div className="vendor_name">
                      <label>Vendor: </label>
                      <span>
                        <Link to="/company-view">BestBuy</Link>
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <th className="small_device">Unit Price</th>
                  <span className="price">{convertCurrency(594)}</span>
                </td>
                <td>
                  <th className="small_device">Quantity</th>
                  <div className="quantity a_flex">
                    <span className="c_flex">
                      <RemoveOutlinedIcon className="icon" />
                      <input type="text" value={1} />
                      <AddOutlinedIcon className="icon" />
                    </span>
                  </div>
                </td>
                <td>
                  <th className="small_device">Price</th>
                  <span className="price">{convertCurrency(594)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="summary">
        <div className="summary_top d_flex">
          <form action="" className="inner_form">
            <small>Gift certificate or promo code</small>
            <div className="form_group a_flex">
              <input type="text" />
              <button>Apply</button>
            </div>
          </form>
          <div className="list">
            <ul>
              <li className="c_flex">
                <span>Subtotal</span>
                <span>{convertCurrency(1191.2)}</span>
              </li>
              <li className="c_flex">
                <span>Shipping cost</span>
                <span className="a_flex">
                  <FlightOutlinedIcon className="icon" />
                  <CalculateShippingModals />
                </span>
              </li>
              <li className="discount c_flex">
                <span>Including discount</span>
                <span>-{convertCurrency(1786.8)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="summary_bottom c_flex">
          <span>&nbsp;</span>
          <span>
            <ul>
              <li className="c_flex">
                <h3>Total cost </h3>
                <h3>{convertCurrency(1191.2)}</h3>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
