import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import "./styles.scss";
import Subscribe from "../../components/home/subscribe/Subscribe";
import { Context } from "../../context/Context";
import LoadingBox from "../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../components/utilities/message loading/MessageBox";
import Slider from "../../components/home/slider/Slider";
import Category from "../../components/home/category/Category";
import Bestseller from "../../components/home/bestseller/Bestseller";
import Demand from "../../components/home/ondemand/Demand";
import Announcement from "../../components/home/announcement/Announcement";
import Discount from "../../components/home/discount/Discount";
import Blog from "../../components/home/blog/Blog";
import Promotion from "../../components/home/promotion/Promotion";

function HomeScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { loading, error } = state;
  // window.scrollTo(0, 0);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="home_outline">
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : ( */}
        <>
          <Slider />
          <Category />
          <Bestseller />
          <Demand />
          <Announcement />
          <Discount />
          <Blog />
          <Promotion />
          <Subscribe />
        </>
        {/* )} */}
      </div>
    </>
  );
}

export default HomeScreen;
