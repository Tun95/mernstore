import React, { useState } from "react";
import "./styles.scss";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import bestbuy from "../../../../assets/vendors/bestbuy.webp";
import Rating from "../../../../components/utilities/rating/Ratings";
import { ReviewModal } from "../../../../components/modals/Modals";

function CompanyViewScreen() {
  const reviews = [
    {
      id: 1,
      name: "Michael J",
      date: "08/10/2023",
      time: "11:25",
      rating: 5,
      title: "Helpful customer service",
      description:
        "Yes they are more expensive than Amazon, but honestly their customer service is very accomodating and helpful, at least when it comes to returns. I never had any issue with them. I even returned some items that were beyond the return policy and they accepted them. I have my loyalty card now and i am collecting points. Id rather shop at bestbuy and support them, than shopping with Amazon who will soon rule the world and make us all out of business.",
    },
    {
      id: 2,
      name: "Carol Johnson",
      date: "08/10/2023",
      time: "11:25",
      rating: 3.5,
      title: "",
      description:
        "Always thought well of Best Buy until yesterday. Been a long-time customer. Yesterday I attempted to use two E-gift cards totally $200 only to find they had already been used. Someone had stolen them. I was asked if I knew anyone in Brooklyn named Alex. Of course not, I'm in upstate NY. They could tell me that much but had excuses for why they didn't have access to further information. The other E-gift card was used and item was to be shipped yesterday. Suppose to put a stop shipment but item went on its way. Won't tell me address of that one either. PROTECT THE CRIMINAL!! Never mind the victim. Best Buy says to file a police report and have it faxed to them. They will tell the police the address. No police unit would do this. YOU SOBs that stole the e-gift cards may your computer blow up in your face. Best Buy! THANKS FOR NOTHING!",
    },
  ];

  //=== Review ==//
  const [review, setReview] = useState(true);
  const closeReview = () => {
    setReview(false);
    document.body.style.overflow = "unset";
  };
  const showReview = () => {
    setReview(true);
  };
  const ReviewDetail = () => {
    showReview();
    closeDescription();
  };

  // ===Description===//
  const [description, setDescription] = useState(false);
  const closeDescription = () => {
    setDescription(false);
    document.body.style.overflow = "unset";
  };
  const showDescription = () => {
    setDescription(true);
  };
  const DescriptionDetail = () => {
    showDescription();
    closeReview();
  };
  return (
    <div className="company">
      <Helmet>
        <title>All vendors :: BestBuy</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <Link to="/vendors">All vendors /</Link>
            <p> BestBuy</p>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <h2>BestBuy</h2>
            <Link to="/vendor-products/:id">
              View vendor products (673 item(s))
            </Link>
          </div>
          <div className="about f_flex">
            <div className="img">
              <img src={bestbuy} alt="" />
            </div>
            <div className="info f_flex">
              <div className="contact">
                <h4>Contact information</h4>
                <small>
                  <ul>
                    <li className="c_flex">
                      <label>Company:</label>
                      <span>BestBuy</span>
                    </li>
                    <li className="c_flex">
                      <label>Email: </label>&#160;&#160;
                      <span>
                        <a href="mailto:BestBuy@example.com">
                          BestBuy@example.com
                        </a>
                      </span>
                    </li>
                    <li className="c_flex">
                      <label>Country:</label>
                      <span>United States</span>
                    </li>
                    <li className="c_flex">
                      <label>State/Province:</label>
                      <span>Massachusetts</span>
                    </li>
                  </ul>
                </small>
              </div>
              <div className="shipping">
                <h4>Shipping address</h4>
                <small>
                  <ul>
                    <li>Massachusetts</li>
                    <li>United States</li>
                  </ul>
                </small>
              </div>
            </div>
          </div>
          <div className="lower">
            <div className="switch f_flex">
              <span
                className={description ? "active" : ""}
                onClick={DescriptionDetail}
              >
                Description
              </span>
              <span className={review ? "active" : ""} onClick={ReviewDetail}>
                Reviews
              </span>
            </div>
            <div className="lower_main">
              {description && (
                <small className="description">
                  Best Buy Co., Inc. is an American multinational consumer
                  electronics retailer headquartered in Richfield, Minnesota. It
                  was originally founded by Richard M. Schulze and James Wheeler
                  in 1966 as an audio specialty store called Sound of Music. In
                  1983, it was re-branded under its current name with an
                  emphasis placed on consumer electronics.
                </small>
              )}
              {review && (
                <small className="reviews">
                  <ul>
                    {reviews.map((item, index) => (
                      <li className="d_flex" key={index}>
                        <div className="user_info l_flex">
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
                            <div className="rating">
                              <Rating rating={item.rating} />
                            </div>
                          </div>
                        </div>
                        <div className="text">
                          <p className="topic">{item.title}</p>
                          <p>{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </small>
              )}
            </div>
          </div>
          <div className="btn">
            <ReviewModal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyViewScreen;
