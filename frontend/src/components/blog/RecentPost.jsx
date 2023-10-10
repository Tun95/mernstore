import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

function RecentPost() {
  return (
    <div className="recent_post">
      <div className="content">
        <div className="header">
          <h3>RECENT POSTS</h3>
        </div>
        <div className="list">
          <ul>
            <li>
              <Link>
                For those who love sound quality we have awesome Pioneer
                speakers! (Demo)
              </Link>
            </li>
            <li>
              <Link>
                For those who love sound quality we have awesome Pioneer
                speakers! (Demo)
              </Link>
            </li>
            <li>
              <Link>
                For those who love sound quality we have awesome Pioneer
                speakers! (Demo)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
