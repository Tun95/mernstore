import React, { useState } from "react";
import google from "../../../assets/checkout/google.svg";
import paypal from "../../../assets/checkout/paypal.svg";
import card from "../../../assets/checkout/card.svg";
import razor from "../../../assets/checkout/razor.png";
import paystack from "../../../assets/checkout/paystack.png";
import cash from "../../../assets/checkout/cash.png";

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const payment = [
    {
      name: "Card",
      label: "Credit Card",
      img: card,
    },
    {
      name: "PayPal",
      label: "PayPal",
      img: paypal,
    },
    {
      name: "Google",
      label: "Google Pay",
      img: google,
    },
    {
      name: "RazorPay",
      label: "RazorPay",
      img: razor,
    },
    {
      name: "PayStack",
      label: "PayStack",
      img: paystack,
    },
    {
      name: "Cash",
      label: "Cash",
      img: cash,
    },
  ];

  const handlePaymentSelection = (event, paymentName) => {
    setSelectedPayment(paymentName);
  };

  return (
    <div className="customer payment">
      <div className="content d_flex">
        <div className="number ">
          <span className="l_flex">3</span>
        </div>
        <div className="main_content">
          <div className="header ">
            <h2>Payment methods</h2>
          </div>
          <div className="payment_methods">
            {payment.map((item, index) => (
              <label
                key={index}
                htmlFor={item.name}
                className={`methods ${
                  selectedPayment === item.name ? "active" : ""
                } c_flex`}
                onClick={(e) => handlePaymentSelection(e, item.name)}
              >
                <span className="a_flex">
                  <input
                    type="radio"
                    id={item.name}
                    name="payment"
                    checked={selectedPayment === item.name}
                  />
                  <h4>{item.label}</h4>
                </span>
                <div className="img">
                  <img src={item.img} alt="" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
