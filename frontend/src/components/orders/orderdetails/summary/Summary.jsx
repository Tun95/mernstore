import React, { useContext, useState } from "react";
import { Context } from "../../../../context/Context";

function Summary() {
  const { convertCurrency } = useContext(Context);

  return (
    <div className="summary">
      <div className="order_summary">
        <div className="header">
          <h3>Order summary</h3>
        </div>
        <div className="order_status">
          <ul>
            <li className="c_flex">
              <small>Product quantity:</small>
              <small>3 item(s)</small>
            </li>
            <li className="c_flex">
              <small>Amount: </small>
              <small>{convertCurrency(1845.97)}</small>
            </li>
            <li className="c_flex">
              <small>Shipping:</small>
              <small>{convertCurrency(56.0)}</small>
            </li>
            <li className="c_flex">
              <small>Including discount:</small>
              <small className="discount">-{convertCurrency(2768.95)}</small>
            </li>
            <li className="c_flex">
              <small>Taxes: VAT (10% included)</small>
              <small>{convertCurrency(5.1)}</small>
            </li>
          </ul>
          <div className="total">
            <ul>
              <li className="c_flex">
                <small>Order Total</small>
                <h2>{convertCurrency(1901.97)}</h2>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn p_flex">
          <button className="l_flex">
            <span>
              <span className="place">Place order</span>
              <span>({convertCurrency(1901.97)})</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
