import React, { useContext, useState } from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { Fade } from "react-awesome-reveal";
import paypal from "../../assets/smallpaypal.png";
import stripe from "../../assets/smallstripe.png";
import razor from "../../assets/smallrazor.jpeg";
import paystack from "../../assets/smallpaystack.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Footer() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings, userInfo } = state;
  const { storeAddress, email, whatsapp } =
    (settings &&
      settings
        .map((s) => ({
          storeAddress: s.storeAddress,
          whatsapp: s.whatsapp,
          email: s.email,
        }))
        .find(() => true)) ||
    {};

  // Separate state variables for each menu section
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showCustomerCare, setShowCustomerCare] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  // Toggle function for each menu section
  const toggleMyAccount = () => {
    setShowMyAccount(!showMyAccount);
  };

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
  };

  const toggleCustomerCare = () => {
    setShowCustomerCare(!showCustomerCare);
  };

  const toggleContactUs = () => {
    setShowContactUs(!showContactUs);
  };
  return (
    <>
      <footer>
        <div className="container ">
          <div className="grid2 footer-wrap">
            <div className="box float">
              <h4>My Account</h4>
              <ul>
                {userInfo ? (
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      <Link to={`/user-profile/${userInfo._id}`}>
                        My profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                      <Link to="/wish-list">Wishlist</Link>
                    </li>
                  </Fade>
                ) : (
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Create account</Link>
                    </li>
                  </Fade>
                )}
              </ul>
            </div>

            <div className="box float">
              <h4>About Us</h4>
              <ul>
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <li>
                    <Link to="/careers"> Careers</Link>
                  </li>
                  <li>
                    <Link to="/store-locations">Our Stores</Link>
                  </li>
                  <li>
                    <Link to="/our-cares">Our Cares</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditons">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </Fade>
              </ul>
            </div>
            <div className="box float">
              <h4>Customer Care</h4>
              <ul>
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <li>
                    <Link to="/contact">Help Center </Link>
                  </li>
                  <li>
                    <Link to="/how-to-buy">How to Buy </Link>
                  </li>
                  <li>
                    <Link to="/orders">About Your Order </Link>
                  </li>
                  <li>
                    <Link to="/bulk-purchases">
                      Corporate & Bulk Purchasing{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns & Refunds </Link>
                  </li>
                </Fade>
              </ul>
            </div>
            <div className="box float">
              <h4>Contact Us</h4>
              <ul>
                <Fade direction="down" triggerOnce damping={0.4}>
                  <li>{storeAddress}</li>
                </Fade>
                <div>
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      Email:{" "}
                      <a href={`mailto:${email}`} className="email">
                        {email}
                      </a>
                    </li>
                    <li>
                      Phone: <a href={`tel:${whatsapp}`}>{whatsapp}</a>
                    </li>{" "}
                  </Fade>
                </div>{" "}
              </ul>
            </div>
          </div>
          <div className="faq footer-wrap">
            <div className="box float">
              <h4 onClick={toggleMyAccount} className="c_flex">
                <span>My Account</span>{" "}
                {showMyAccount ? (
                  <KeyboardArrowUpIcon className="icon" />
                ) : (
                  <KeyboardArrowDownIcon className="icon" />
                )}
              </h4>
              <ul style={{ display: showMyAccount ? "block" : "none" }}>
                {userInfo ? (
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      <Link to={`/user-profile/${userInfo._id}`}>
                        My profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                      <Link to="/wish-list">Wishlist</Link>
                    </li>
                  </Fade>
                ) : (
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Create account</Link>
                    </li>
                  </Fade>
                )}
              </ul>
            </div>

            <div className="box float">
              <h4 onClick={toggleAboutUs} className="c_flex">
                <span> About Us </span>
                {showAboutUs ? (
                  <KeyboardArrowUpIcon className="icon" />
                ) : (
                  <KeyboardArrowDownIcon className="icon" />
                )}
              </h4>
              <ul style={{ display: showAboutUs ? "block" : "none" }}>
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <li>
                    <Link to="/careers"> Careers</Link>
                  </li>
                  <li>
                    <Link to="/store-locations">Our Stores</Link>
                  </li>
                  <li>
                    <Link to="/our-cares">Our Cares</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditons">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                </Fade>
              </ul>
            </div>

            <div className="box float">
              <h4 onClick={toggleCustomerCare} className="c_flex">
                <span>Customer Care</span>
                {showCustomerCare ? (
                  <KeyboardArrowUpIcon className="icon" />
                ) : (
                  <KeyboardArrowDownIcon className="icon" />
                )}
              </h4>
              <ul style={{ display: showCustomerCare ? "block" : "none" }}>
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <li>
                    <Link to="/contact">Help Center </Link>
                  </li>
                  <li>
                    <Link to="/how-to-buy">How to Buy </Link>
                  </li>
                  <li>
                    <Link to="/orders">About Your Order </Link>
                  </li>
                  <li>
                    <Link to="/bulk-purchases">
                      Corporate & Bulk Purchasing{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns & Refunds </Link>
                  </li>
                </Fade>
              </ul>
            </div>

            <div className="box float">
              <h4 onClick={toggleContactUs} className="c_flex">
                <span>Contact Us</span>
                {showContactUs ? (
                  <KeyboardArrowUpIcon className="icon" />
                ) : (
                  <KeyboardArrowDownIcon className="icon" />
                )}
              </h4>
              <ul style={{ display: showContactUs ? "block" : "none" }}>
                <Fade direction="down" triggerOnce damping={0.4}>
                  <li>{storeAddress}</li>
                </Fade>
                <div>
                  <Fade cascade direction="down" triggerOnce damping={0.4}>
                    <li>
                      Email:{" "}
                      <a href={`mailto:${email}`} className="email">
                        {email}
                      </a>
                    </li>
                    <li>
                      Phone: <a href={`tel:${whatsapp}`}>{whatsapp}</a>
                    </li>{" "}
                  </Fade>
                </div>{" "}
              </ul>
            </div>
          </div>
          <div className="footer_base c_flex">
            <div className="since">
              <p>© 2023 Mernstore | Powered by MERN Stack</p>
            </div>
            <div className="payment_gateway">
              <img src={paypal} alt="" className="img" />
              <img src={stripe} alt="" className="img" />
              <img src={paystack} alt="" className="img" />
              <img src={razor} alt="" className="img" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
