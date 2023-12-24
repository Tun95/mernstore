import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./styles.scss";
import BlogPost from "../../components/blog/BlogPost";
import RecentPost from "../../components/blog/RecentPost";
import { request } from "../../base url/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../components/utilities/util/Utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Reducer function
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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Initialize currentPage from URL parameter
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [recentPosts, setRecentPosts] = useState([]);

  const [{ blogs, loading, error, currentPage, totalPages }, dispatch] =
    useReducer(reducer, {
      blogs: [],
      loading: true,
      error: "",
      currentPage: initialPage, // Initialize with the page from URL
      totalPages: 1,
    });

  // Fetch recent posts and blog list
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

        // Update the URL with the current page
        navigate(`/blog?page=${currentPage}`);
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
  }, [currentPage, navigate]);

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
