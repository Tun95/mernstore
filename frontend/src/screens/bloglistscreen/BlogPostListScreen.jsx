import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./styles.scss";
import BlogPost from "../../components/blog/BlogPost";
import RecentPost from "../../components/blog/RecentPost";
import { request } from "../../base url/BaseUrl";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        blogs: action.payload.blogs,
        totalPages: action.payload.totalPages,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}
function BlogPostListScreen() {
  const [recentPosts, setRecentPosts] = useState([]);

  const [{ blogs, loading, error, currentPage, totalPages }, dispatch] =
    useReducer(reducer, {
      blogs: [],
      loading: true,
      error: "",
      currentPage: 1,
      totalPages: 1,
    });

  //================
  // FETCH BLOG LIST
  //================
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        const { data } = await axios.get(
          `${request}/api/blog?page=${currentPage}`
        );

        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const { data } = await axios.get(`${request}/api/blog/recent`);
        setRecentPosts(data);
      } catch (err) {
        console.error("Error fetching recent posts", err);
      }
    };

    fetchData();
    fetchRecentPosts();
  }, [currentPage]);
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
          <div className="full_width">
            <BlogPost
              blogs={blogs}
              totalPages={totalPages}
              currentPage={currentPage}
              dispatch={dispatch}
            />
          </div>
          <div className="scroll_box">
            <RecentPost recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostListScreen;
