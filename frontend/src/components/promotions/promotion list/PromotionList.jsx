import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../home/promotion/PromotionCard";
import TruncateMarkup from "react-truncate-markup";

function PromotionList({ item, index, calculateDaysUntilExpiration }) {
  const [countdown, setCountdown] = useState({
    days: calculateDaysUntilExpiration(item.expirationDate),
  });

  useEffect(() => {
    const targetTime = new Date(item.expirationDate).getTime();
    let intervalId;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(intervalId);
        setCountdown({ days: 0 });
      } else {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        });
      }
    };

    updateCountdown();

    intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [item.expirationDate]);

  return (
    <div className="promotion_card cards" key={index}>
      <div className="content">
        <div className="img">
          <Link to={`/promotions/${item.slug}`}>
            <img src={item.image} alt={item.title} />
          </Link>
        </div>
        <div className="name_date f_flex">
          <div className="days a_flex">
            {countdown && countdown.days !== undefined && (
              <>
                <h3 className="count">{countdown.days}</h3>{" "}
                <small>days left</small>
              </>
            )}{" "}
          </div>
          <div className="name_to ">
            <div className="name">
              <Link to={`/promotions/${item.slug}`}>
                <TruncateMarkup lines={2}>
                  <p>{item.title}</p>
                </TruncateMarkup>
              </Link>
            </div>
            <div className="expire">
              <small>to {formatDate(item.expirationDate)}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionList;
