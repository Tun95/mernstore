import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function RecentPost({ recentPosts }) {
  return (
    <div className="recent_post">
      <div className="content">
        <div className="header">
          <h3>RECENT POSTS</h3>
        </div>
        <div className="list">
          {recentPosts.map((recent, index) => (
            <ul key={index}>
              <li>
                <Link to={`/blog-detail/${recent.slug}`}>{recent.title}</Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
