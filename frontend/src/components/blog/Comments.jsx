import React from "react";
import { CommentModal } from "../modals/Modals";

function Comments() {
  return (
    <div className="comments">
      <div className="content">
        <div className="header">
          <h2>Comments</h2>
        </div>
        <div className="list">
          <div className="no_post l_flex">
            <h3>No comment found</h3>
          </div>
        </div>
        <div className="btn">
          <CommentModal />
        </div>
      </div>
    </div>
  );
}

export default Comments;
