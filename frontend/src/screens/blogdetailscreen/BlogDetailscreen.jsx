import React, { useEffect, useReducer, useState } from "react";
import "./styles.scss";
import BlogDetails from "../../components/blog/BlogDetails";
import RecentPost from "../../components/blog/RecentPost";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import Comments from "../../components/blog/Comments";
import { getError } from "../../components/utilities/util/Utils";
import LoadingBox from "../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../components/utilities/message loading/MessageBox";

const initialState = {
  blog: null,
  loading: true,
  error: "",
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

    default:
      return state;
  }
};
function BlogDetailScreen() {
  const params = useParams();
  const { slug } = params;
  const [recentPosts, setRecentPosts] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, blog } = state;

  //=======================
  // FETCH BLOG DETAILS
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
        console.error(getError(error));
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
        console.error(getError(err));
      }
    };

    fetchData();
    fetchRecentPosts();
  }, [slug]);

  //BLOG ID
  let blogId = blog?._id;

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
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="main_content ">
            <div className="full_width">
              <BlogDetails blog={blog} />

              <Comments blogId={blogId} />
            </div>
            <div className="scroll_box">
              <RecentPost recentPosts={recentPosts} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetailScreen;
