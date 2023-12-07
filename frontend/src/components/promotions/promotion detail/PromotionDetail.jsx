import React from "react";

function formatDate(dateString) {
  // Check if the date string is valid
  if (isNaN(new Date(dateString))) {
    return "N/A";
  }
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    new Date(dateString)
  );
  return formattedDate;
}

function PromotionDetail({ promotion, countdown }) {
  return (
    <div className="promotion_detail">
      <div className="img">
        <img src={promotion?.image} alt={promotion?.title} />
      </div>
      <div className="details">
        <div className="name">
          <h2>{promotion?.title}</h2>
        </div>
        <div className="short_name">
          <h2>{promotion?.subTitle}</h2>
        </div>
        <div className="description">
          <p>{promotion?.description}</p>
        </div>
        <div className="time_period">
          <div className="">
            <h4>Promotions expires within:</h4>
          </div>
          <div className="time">
            <span>
              <ul>
                <li>
                  <span>{countdown.days}</span>
                  <small>days</small>
                </li>
                <li>
                  <span>{countdown.hours}</span>
                  <small>hours</small>
                </li>
                <li>
                  <span>{countdown.minutes}</span>
                  <small>minutes</small>
                </li>
                <li>
                  <span className="seconds">{countdown.seconds}</span>
                  <small>seconds</small>
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="period">
          <small className="a_flex">
            <span>Promotion period:</span>
            <span> to {formatDate(promotion?.expirationDate)}</span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default PromotionDetail;
