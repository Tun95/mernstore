import React, { useState } from "react";
import black from "../../../assets/promotion/black.webp";

function PromotionDetail() {
  //TIMER
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  return (
    <div className="promotion_detail">
      <div className="img">
        <img src={black} alt="" />
      </div>
      <div className="details">
        <div className="name">
          <h2>It’s Black Friday all month long with new deals each week.</h2>
        </div>
        <div className="short_name">
          <h2>Black Friday Ad details.</h2>
        </div>
        <div className="description">
          <p>
            Unless otherwise noted, Black Friday Ad items are available for sale
            November 22, 2020–November 28, 2022. Prices and offers are subject
            to change and are valid online during, but may start before and end
            after, the Ad dates. Product quantities are limited. Rainchecks are
            NOT available for advertised products in the Black Friday Ad. We
            reserve the right to limit quantities (no dealers). Online pricing
            and store pricing may vary.
          </p>
        </div>
        <div className="time_period">
          <div className="">
            <h4>Promotions expires within:</h4>
          </div>
          <div className="time">
            <span>
              <ul>
                <li>
                  <span>{days}</span>
                  <small>days</small>
                </li>
                <li>
                  <span>{hours}</span>
                  <small>hours</small>
                </li>
                <li>
                  <span>{minutes}</span>
                  <small>minutes</small>
                </li>
                <li>
                  <span className="seconds">{seconds}</span>
                  <small>seconds</small>
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="period">
          <small className="a_flex">
            <span>Promotion period:</span>
            <span> to 02/07/2024</span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default PromotionDetail;
