import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./styles.scss";
import BlogPost from "../../components/blog/BlogPost";
import RecentPost from "../../components/blog/RecentPost";

function BlogPostListScreen() {
  return (
    <div className="blog_list_screen">
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Blog</p>
          </div>
        </div>
        <div className="main_content ">
          <div>
            <BlogPost />
          </div>
          <div>
            <RecentPost />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostListScreen;
