import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Pagination } from "antd";
import Truncate from "react-truncate-html";
import { useRef } from "react";

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

//===========
// DATE FORMAT
//===========
export function formatDate(dateString) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

function BlogPost({
  blogs,
  dispatch,
  currentPage,
  totalPages,
}) {
  const headerRef = useRef(null);
  const handlePageChange = (page) => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  return (
    <div className="blog_post">
      <div className="content">
        <div className="header" ref={headerRef}>
          <h1>Blog</h1>
        </div>

        {blogs?.map((blog, index) => (
          <div className="list f_flex" key={index}>
            <div className="img">
              <Link to={`/blog-detail/${blog.slug}`}>
                <img src={blog.image} alt={blog.title} />
              </Link>
            </div>
            <div className="left">
              <div className="title">
                <h2>
                  <Link to={`/blog-detail/${blog.slug}`}>{blog.title}</Link>
                </h2>
              </div>
              <div className="date ">
                <span className="a_flex">
                  <EventOutlinedIcon className="icon" />
                  <span>{formatDate(blog.createdAt)}</span>
                </span>
              </div>
              <div className="description">
                <Truncate
                  lines={8}
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              </div>

              <div className="link">
                <Link to={`/blog-detail/${blog.slug}`}>Read more</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="ant_pagination l_flex mt">
          <Pagination
            total={totalPages * 5}
            itemRender={itemRender}
            current={currentPage}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
