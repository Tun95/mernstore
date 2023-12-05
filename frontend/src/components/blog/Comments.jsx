import React from "react";
import { CommentModal } from "../modals/Modals";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Comments() {
  const reviews = [
    {
      id: 1,
      name: "Michael J",
      date: "08/10/2023",
      time: "11:25",
      description:
        "Yes they are more expensive than Amazon, but honestly their customer service is very accomodating and helpful, at least when it comes to returns. I never had any issue with them. I even returned some items that were beyond the return policy and they accepted them. I have my loyalty card now and i am collecting points. Id rather shop at bestbuy and support them, than shopping with Amazon who will soon rule the world and make us all out of business.",
    },
  ];
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
          <small className="reviews">
            <ul>
              {reviews.map((item, index) => (
                <li className="" key={index}>
                  <div className="c_flex span_header">
                    <div className="user_info a_flex">
                      <div className="short l_flex">
                        <h2>M</h2>
                      </div>
                      <div className="user">
                        <span>
                          <h4 className="name a_flex">{item.name}</h4>
                          <small className="date_time">
                            {item.date},&#160;&#160;{item.time}
                          </small>
                        </span>
                      </div>
                    </div>
                    <div className="icons a_flex">
                      <span className="l_flex">
                        <DeleteForeverOutlinedIcon className="icon mui_icon" />
                      </span>
                      <span className="l_flex">
                        <i class="fa-solid fa-pen-to-square icon"></i>
                      </span>
                    </div>
                  </div>
                  <div className="text">
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </small>
        </div>
        <div className="btn">
          <CommentModal />
        </div>
      </div>
    </div>
  );
}

export default Comments;
