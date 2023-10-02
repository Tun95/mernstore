import React from "react";
import { Helmet } from "react-helmet-async";
import "./styles.scss";
import Store from "../../components/store/Store";

function StoreScreen({ productItems, onAdd }) {
  return (
    <>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <div className="store-pages ">
        <Store />
      </div>
    </>
  );
}

export default StoreScreen;
