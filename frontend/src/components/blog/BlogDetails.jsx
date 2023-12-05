import React from "react";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { formatDate } from "./BlogPost";
import parse from "html-react-parser";

function BlogDetails(props) {
  const { blog } = props;
  return (
    <div className="blog_details">
      <div className="content">
        <div className="detail">
          <div className="title">
            <h1>{blog?.title}</h1>
          </div>
          <div className="date">
            <span className="a_flex">
              <EventOutlinedIcon className="icon" />
              <span>{formatDate(blog?.createdAt)}</span>
            </span>
          </div>
          <div className="img">
            <img src={blog?.image} alt={blog?.title} />
          </div>
          <div className="description">
            <p>{parse(`<p>${blog?.description}</p>`)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
