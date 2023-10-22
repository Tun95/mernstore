import React from "react";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import Summary from "../../components/checkout/summary/Summary";
import Customer from "../../components/checkout/customer/Customer";
import Delivery from "../../components/checkout/delivery/Delivery";
import Payment from "../../components/checkout/payment/Payment";
import Notes from "../../components/checkout/notes/Notes";

function CheckoutScreen() {
  return (
    <div className="checkout_screen">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="productTitleContainer ">
            <h2 className="uppercase">Checkout</h2>
          </div>
          <div className="d_flex">
            <div>
              <Customer />
              <Delivery />
              <Payment />
              <Notes />
            </div>
            <div>
              <Summary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
