import React, { useRef } from "react";
import "./styles.scss";
import CategoryFilter from "./CategoryFilter";
import PromotionDetail from "./PromotionDetail";
import PromotionProductCard from "./PromotionProductCard";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

function Promotions({
  promotion,
  countdown,
  page,
  pages,
  countProducts,
  getFilterUrl,
  dispatch,
}) {
  //===========
  // PAGINATION
  //===========
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Link to="">Previous</Link>;
    }
    if (type === "next") {
      return <Link to="">Next</Link>;
    }
    return originalElement;
  };

  //PAGE REF
  const headerRef = useRef(null);
  const handlePageChange = (page) => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  // console.log("PROMOTION PRODUCTS:", promotion);
  return (
    <div className="promotions_main  f_flex">
      <div className="filter_promotion">
        <CategoryFilter promotion={promotion} getFilterUrl={getFilterUrl} />
      </div>
      <div className="promotion_detail_products">
        <span>
          <PromotionDetail promotion={promotion} countdown={countdown} />
        </span>
        <div className="filter_items">
          <div className="header">
            <h2>All Product</h2>
          </div>
          {promotion?.products?.length === 0 ? (
            <div className="no_post l_flex">
              <h3>No product found</h3>
            </div>
          ) : (
            <div className="product_list">
              <div className="product_card">
                {promotion?.products?.map((product, index) => (
                  <PromotionProductCard
                    key={index}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
              <div className="ant_pagination l_flex mt">
                <Pagination
                  total={pages}
                  current={page}
                  pageSize={12}
                  itemRender={itemRender}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Promotions;
