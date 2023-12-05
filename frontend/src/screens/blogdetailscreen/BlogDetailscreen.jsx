import React, { useContext, useEffect, useReducer, useState } from "react";
import "./styles.scss";
import BlogDetails from "../../components/blog/BlogDetails";
import RecentPost from "../../components/blog/RecentPost";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Context } from "../../context/Context";
import Comments from "../../components/blog/Comments";

const initialState = {
  blog: null,
  loading: true,
  error: "",
  loadingCreateReview: false,
  successCreate: false,
  successDelete: false,
  loadingDelete: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, blog: action.payload, loading: true };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, blog: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };

    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true, successCreate: false };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false, successCreate: true };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false, successCreate: false };
    case "CREATE_RESET":
      return { ...state, loadingCreateReview: false, successCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};
function BlogDetailScreen() {
  const params = useParams();
  const { slug } = params;
  const [recentPosts, setRecentPosts] = useState([]);

  const { state: cState, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = cState;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, blog, successDelete, successCreate } = state;

  //=======================
  // FETCH PRODUCT DETAILS
  //=======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${request}/api/blog/slug/${slug}`);

        if (result.data.blog) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data.blog });
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        dispatch({
          type: "FETCH_FAIL",
          payload: "Error fetching blog details",
        });
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
    if (successCreate || successDelete) {
      dispatch({ type: "CREATE_RESET" });
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
      fetchRecentPosts();
    }
  }, [slug, successDelete, successCreate]);

  console.log("Blog Details:", blog);

  return (
    <div className="blog_list_screen blog_details_screen">
      <Helmet>
        <title>{`Blog details :: ${blog?.title}`}</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/blog"> &#160; Blog /</Link>
            <p>&#160; {blog?.title}</p>
          </div>
        </div>
        <div className="main_content ">
          <div className="full_width">
            <BlogDetails blog={blog} />

            <Comments />
          </div>
          <div className="scroll_box">
            <RecentPost recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailScreen;
