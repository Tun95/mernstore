import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import FlashDeals from "../../components/home/flashdeals/FlashDeals";
import Home from "../../components/home/mainpage/Home";
import NewArrival from "../../components/home/newArrival/NewArrival";
import Shop from "../../components/home/shop/Shop";
import TopCate from "../../components/home/top/TopCate";
import Wrapper from "../../components/home/wrapper/Wrapper";
import "./styles.scss";
import Subscribe from "../../components/home/subscribe/Subscribe";
import { Context } from "../../context/Context";
import LoadingBox from "../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../components/utilities/message loading/MessageBox";
import Category from "../../components/home/category/Category";
import Bestseller from "../../components/home/bestseller/Bestseller";
import Demand from "../../components/home/ondemand/Demand";
import Announcement from "../../components/home/announcement/Announcement";
import Discount from "../../components/home/discount/Discount";
import Blog from "../../components/home/blog/Blog";

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
          <Home />
          <Category />
          <Bestseller />
          <Demand />
          <Announcement />
          <Discount />
          <Blog />

          {/* <FlashDeals />
          <TopCate />
          <NewArrival />

          <Shop />

          <Wrapper /> */}
          <Subscribe />
        </>
        {/* )} */}
      </div>
    </>
  );
}

export default HomeScreen;
