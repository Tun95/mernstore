import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import "./styles.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import controller from "../../assets/bestsellers/controller.webp";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { Divider } from "@mui/material";
import { CallRequestModals } from "../modals/Modals";

//SEARCH MENU
export function SearchMenu() {
  const [searchState, setSearchState] = React.useState({
    bottom: false,
  });
  const [isRotating, setIsRotating] = React.useState(false);

  // Function to start the rotation animation
  const startRotationAnimation = () => {
    setIsRotating(true);

    // Stop the rotation after 2 seconds
    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSearchState({ ...searchState, bottom: open });

    if (open) {
      startRotationAnimation(); // Start the rotation animation when the drawer is opened
    }
  };

  return (
    <div className="search_drawer">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SearchIcon
            className="menu_icon"
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            anchor={anchor}
            open={searchState[anchor]}
            className="menu_inner_form"
            onClose={toggleDrawer(false)}
          >
            <form action="" className="drawers">
              <div className="form_group c_flex">
                <span className="input_width">
                  <input type="search" placeholder="Search products" />
                  <SearchIcon className="icon" />
                </span>
                <CloseOutlinedIcon
                  className={`icon  close_icon ${
                    isRotating ? "rotate-icon" : ""
                  }`}
                  onClick={(event) => {
                    event.preventDefault(); // Prevent default behavior (e.g., if the icon is inside a link)
                    startRotationAnimation(); // Start the rotation animation when the icon is clicked
                    toggleDrawer(false)();
                  }}
                />
              </div>
            </form>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

//CART MENU
export function CartMenu() {
  const navigate = useNavigate();

  const [cartState, setCartState] = React.useState({
    bottom: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCartState({ ...cartState, [anchor]: open });
  };

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="menu_btn_icon" onClick={toggleDrawer(anchor, true)}>
            <ShoppingCartIcon className="menu_icon" />
            <span className="badge l_flex">
              <span>1</span>
            </span>
          </div>
          <Drawer
            anchor={anchor}
            open={cartState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawers">
              <div className="cart">
                <div className="header c_flex">
                  <h3>Cart</h3>
                  <CloseOutlinedIcon
                    className="icon"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </div>
                <div className="content c_flex">
                  <div className="img">
                    <img src={controller} alt="" />
                  </div>
                  <div className="name_qty">
                    <div className="name">
                      <Link to="">
                        <h3>
                          Sony - DualShock 4 Wireless Controller for Sony
                          PlayStation 4
                        </h3>
                      </Link>
                    </div>
                    <div className="qty_price">
                      <span>1 x $2000</span>
                    </div>
                  </div>
                  <div className="close">
                    <CloseOutlinedIcon className="icon" />
                  </div>
                </div>
                <div className="drawer_btn c_flex">
                  <button onClick={() => navigate("/cart")} className="view">
                    View cart
                  </button>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="c_flex checkout"
                  >
                    <CheckCircleOutlineOutlinedIcon className="icon" />
                    <span>Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

//USER MENU
export function UserMenu() {
  const [userState, setUserState] = React.useState({
    bottom: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setUserState({ ...userState, [anchor]: open });
  };

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <AccountCircleOutlinedIcon
            className="menu_icon"
            onClick={toggleDrawer(anchor, true)}
          />

          <Drawer
            anchor={anchor}
            open={userState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawers">
              <div className="account">
                <div className="header c_flex">
                  <h3>Account</h3>
                  <CloseOutlinedIcon
                    className="icon"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </div>
                <div className="content">
                  <ul className="list">
                    <li>
                      <Link to="">Orders</Link>
                    </li>
                    <li>
                      <Link to="">Comparison list</Link>
                    </li>
                    <li>
                      <Link to="">Wish list</Link>
                    </li>
                  </ul>
                  <div className="track">
                    <small>Track my order(s)</small>
                    <form action="" className="a_flex">
                      <input type="text" placeholder="Order Tracking ID" />
                      <button>
                        <ArrowRightOutlinedIcon />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="drawer_btn c_flex">
                  <button className="view">Sign in</button>
                  <button className="checkout">Register</button>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export function ContactMenu() {
  const [contactState, setContactState] = React.useState({
    bottom: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setContactState({ ...contactState, [anchor]: open });
  };

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <CallOutlinedIcon
            className="menu_icon"
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            anchor={anchor}
            open={contactState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawers">
              <div className="contact">
                <div className="header c_flex">
                  <h3>Contact us</h3>
                  <CloseOutlinedIcon
                    className="icon"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </div>
                <div className="content">
                  <div className="menu-content">
                    <div className="numbers">
                      <div className="phone_num">
                        <h3>
                          <a href="tel:+01334567890">+0 133-456-7890</a>
                        </h3>
                        <small>Mon-Fr 9a.m.-6p.m.</small>
                      </div>
                      <div className="phone_num">
                        <h3>
                          <a href="tel:+01334567890">+0 133-456-7890</a>
                        </h3>
                        <small>Mon-Fr 9a.m.-6p.m.</small>
                      </div>
                    </div>
                    <div className="btn">
                      <CallRequestModals />
                    </div>
                    <Divider />
                    <div className="address_email">
                      <small>Email</small>
                      <h5>
                        <a href="mailto:info@example.com">info@example.com</a>
                      </h5>
                    </div>
                    <div className="address_email">
                      <small>Address</small>
                      <h5 className="address">
                        United States, Boston, 44 Main street
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
