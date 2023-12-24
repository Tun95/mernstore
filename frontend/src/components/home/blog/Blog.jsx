import React, { useEffect, useReducer } from "react";
import "./styles.scss";
import BlogCards from "./BlogCards";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, blogs: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function Blog() {
  const [{ loading, error, blogs }, dispatch] = useReducer(reducer, {
    blogs: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();

  //==============
  //FETCH BLOG POST
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}/api/blog/blog-list`);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blog_section">
      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="content">
            <div className="header">
              <div className="main_header">
                <h2>Reviews / News</h2>
              </div>
            </div>
            <div className="blog_list">
              {blogs.map((blog, index) => (
                <BlogCards index={index} blog={blog} key={index} />
              ))}
            </div>

            <div className="btn">
              <button onClick={() => navigate("/blog")}>
                All blog articles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
