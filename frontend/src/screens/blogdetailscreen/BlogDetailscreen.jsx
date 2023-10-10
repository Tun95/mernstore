import React from "react";
import "./styles.scss";
import BlogDetails from "../../components/blog/BlogDetails";
import RecentPost from "../../components/blog/RecentPost";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function BlogDetailScreen() {
  return (
    <div className="blog_list_screen blog_details_screen">
      <Helmet>
        <title>Blog details</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/blog"> &#160; Blog /</Link>
            <p>
              &#160; For those who love sound quality we have awesome Pioneer
              speakers! (Demo)
            </p>
          </div>
        </div>
        <div className="main_content ">
          <div>
            <BlogDetails />
          </div>
          <div>
            <RecentPost />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailScreen;
