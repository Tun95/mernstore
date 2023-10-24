import React from "react";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import Summary from "../../components/checkout/summary/Summary";
import Customer from "../../components/checkout/customer/Customer";
import Delivery from "../../components/checkout/delivery/Delivery";
import Payment from "../../components/checkout/payment/Payment";
import Notes from "../../components/checkout/notes/Notes";
import { Divider } from "@mui/material";

function CheckoutScreen() {
  return (
    <div className="checkout_screen">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="d_grid">
            <div>
              <Customer />
              <Divider />
              <Delivery />
              <Divider />
              <Payment />
              <Divider />
              <Notes />
            </div>
            <div className="summary_scroll">
              <Summary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
