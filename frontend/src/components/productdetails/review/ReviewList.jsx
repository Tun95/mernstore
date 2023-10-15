import React from "react";
import { LineProgressBar } from "@frogress/line";
import Rating from "../../utilities/rating/Ratings";

function ReviewList() {
  return (
    <div className="review_list_box l_flex">
      <div className="reviewList f_flex">
        <div className="rating">
          <div className="box l_flex">
            <h2>3</h2>
            <small>out of 5</small>
          </div>
          <Rating rating={3} />
          <span className="num_reviews l_flex">
            <small className="a_flex">
              Reviews: <span>20</span>
            </small>
          </span>
        </div>
        <div className="rating_bars">
          <div className="bar a_flex">
            <small className="a_flex">
              5 <span>stars</span>
            </small>
            <LineProgressBar
              percent={20}
              rounded={36}
              className="LineProgressBar"
              height={10}
              progressColor="var(--color-rating)"
            />
            <small className="percentage">20%</small>
          </div>
          <div className="bar a_flex">
            <small className="a_flex">
              4<span>stars</span>
            </small>
            <LineProgressBar
              percent={30}
              rounded={36}
              className="LineProgressBar"
              height={10}
              progressColor="var(--color-rating)"
            />
            <small className="percentage">30%</small>
          </div>
          <div className="bar a_flex">
            <small className="a_flex">
              3 <span>stars</span>
            </small>
            <LineProgressBar
              percent={5}
              rounded={36}
              className="LineProgressBar"
              height={10}
              progressColor="var(--color-rating)"
            />
            <small className="percentage">5%</small>
          </div>
          <div className="bar a_flex">
            <small className="a_flex">
              2 <span>stars</span>
            </small>
            <LineProgressBar
              percent={15}
              rounded={36}
              className="LineProgressBar"
              height={10}
              progressColor="var(--color-rating)"
            />
            <small className="percentage">15%</small>
          </div>
          <div className="bar a_flex">
            <small className="a_flex">
              1 <span>stars</span>
            </small>
            <LineProgressBar
              percent={30}
              rounded={36}
              className="LineProgressBar"
              height={10}
              progressColor="var(--color-rating)"
            />
            <small className="percentage">30%</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
