import React, { useContext, useState } from "react";
import { Context } from "../../../context/Context";

function Summary() {
  const { convertCurrency } = useContext(Context);

  const [details, setDetails] = useState({
    promo: false,
    main: false,
    bestbuy: false,
    newegg: false,
  });
  const handleDetailToggle = (checkboxName) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [checkboxName]: !prevDetails[checkboxName],
    }));
  };

  return (
    <div className="summary">
      <div className="promo_box">
        <div className="promo c_flex">
          <small>Promo code</small>
          <small
            onClick={handleDetailToggle.bind(null, "promo")}
            className="link"
          >
            {details.promo ? "Hide" : "Add"}
          </small>
        </div>
        {details.promo && (
          <form action="" className="inner_form">
            <small>Gift certificate or promo code</small>
            <div className="form_group a_flex">
              <input type="text" />
              <button>Apply</button>
            </div>
          </form>
        )}
      </div>
      <div className="order_summary">
        <div className="header">
          <h3>Order summary</h3>
        </div>
        <div className="order_status">
          <ul>
            <li className="c_flex">
              <small>Product quantity:</small>
              <small>3 item(s)</small>
            </li>
            <li className="c_flex">
              <small>Amount: </small>
              <small>{convertCurrency(1845.97)}</small>
            </li>
            <li className="c_flex">
              <small>Shipping:</small>
              <small>{convertCurrency(56.0)}</small>
            </li>
            <li className="c_flex">
              <small>Including discount:</small>
              <small className="discount">-{convertCurrency(2768.95)}</small>
            </li>
            <li className="c_flex">
              <small>Taxes: VAT (10% included)</small>
              <small>{convertCurrency(5.1)}</small>
            </li>
          </ul>
          <div className="total">
            <ul>
              <li className="c_flex">
                <small>Order Total</small>
                <h2>{convertCurrency(1901.97)}</h2>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn p_flex">
          <button className="l_flex">
            <span>
              <span className="place">Place order</span>
              <span>({convertCurrency(1901.97)})</span>
            </span>
          </button>
        </div>
        <div className="check">
          <span className="main_term">
            <label htmlFor="main" className="check_box f_flex">
              <span>
                <input type="checkbox" id="main" />
              </span>
              <small>
                Select this check box to accept the{" "}
                <span
                  className={`link ${details.main ? "detail" : ""}`}
                  onClick={() => handleDetailToggle("main")}
                >
                  Terms and Conditions
                </span>
              </small>
            </label>
            {details.main && (
              <div className="detail">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate blanditiis reprehenderit totam commodi voluptatem
                  architecto dolore quis sit adipisci autem.
                </small>
              </div>
            )}
          </span>
          <span className="main_term">
            <label htmlFor="bestbuy" className="check_box f_flex">
              <span>
                <input type="checkbox" id="bestbuy" />
              </span>
              <small>
                I accept the{" "}
                <span
                  className={`link ${details.bestbuy ? "detail" : ""}`}
                  onClick={() => handleDetailToggle("bestbuy")}
                >
                  Terms & conditions
                </span>{" "}
                of BestBuy
              </small>
            </label>
            {details.bestbuy && (
              <div className="detail">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate blanditiis reprehenderit totam commodi voluptatem
                  architecto dolore quis sit adipisci autem.
                </small>
              </div>
            )}
          </span>
          <span className="main_term">
            <label htmlFor="newegg" className="check_box f_flex">
              <span>
                <input type="checkbox" id="newegg" />
              </span>
              <small>
                I accept the{" "}
                <span
                  className={`link ${details.newegg ? "detail" : ""}`}
                  onClick={() => handleDetailToggle("newegg")}
                >
                  Terms & conditions
                </span>{" "}
                of Newegg
              </small>
            </label>
            {details.newegg && (
              <div className="detail">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate blanditiis reprehenderit totam commodi voluptatem
                  architecto dolore quis sit adipisci autem.
                </small>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Summary;
