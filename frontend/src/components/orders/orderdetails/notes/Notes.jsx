import React from "react";

function Notes() {
  return (
    <div className="customer customer_notes">
      <div className="content d_flex">
        <div className="number ">
          <span className="l_flex"></span>
        </div>
        <div className="main_content">
          <div className="header ">
            <h2>Customer's notes</h2>
          </div>
          <div className="text">
            <textarea
              disabled
              name="text"
              className="textarea"
              placeholder="Your note here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
