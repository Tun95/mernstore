import React from "react";
import { Helmet } from "react-helmet-async";

import { Divider } from "@mui/material";
import Customer from "../../../components/orders/orderdetails/customer/Customer";
import Delivery from "../../../components/orders/orderdetails/delivery/Delivery";
import Payment from "../../../components/orders/orderdetails/payment/Payment";
import Notes from "../../../components/orders/orderdetails/notes/Notes";
import Summary from "../../../components/orders/orderdetails/summary/Summary";

function OrderDetailScreen() {
  return (
    <div className="checkout_screen order_details_screen">
      <Helmet>
        <title>Order :: AGSHSDGJD3DF</title>
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

export default OrderDetailScreen;
