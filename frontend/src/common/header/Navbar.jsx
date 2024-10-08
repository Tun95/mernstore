import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../../context/Context";
import SideBar from "../side bar/SideBar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import { Box, Divider } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { CallRequestModals } from "../../components/modals/Modals";
import { CategoryMenu, SearchMenu } from "../../components/menus/Menu";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import controller from "../../assets/bestsellers/controller.webp";

function Navbar() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo, categories, settings } = state;
  const { logo } =
    (settings &&
      settings
        .map((s) => ({
          logo: s.logo,
        }))
        .find(() => true)) ||
    {};

  //CONTACT MENU
  const [anchorEle, setAnchorEle] = React.useState(null);
  const openInfo = Boolean(anchorEle);
  const handleClickNav = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorEle(null);
  };

  //USER MENU
  const [anchorUser, setAnchorUser] = React.useState(null);
  const openUserInfo = Boolean(anchorUser);
  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  //CART MENU
  const [anchorCart, setAnchorCart] = React.useState(null);
  const openCartInfo = Boolean(anchorCart);
  const handleClickCart = (event) => {
    setAnchorCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorCart(null);
  };

  //=========
  //SEARCH BOX
  //=========
  const [query, setQuery] = useState("");
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/store/?query=${query}` : "/store");
  };

  useEffect(() => {
    const statements = ["Search here", "For example PlayStation"];

    let statementIndex = 0;
    let currentIndex = 0;
    let typingTimer;
    let cursorTimer;

    // Simulate typing effect
    const typeText = () => {
      const currentStatement = statements[statementIndex];

      if (currentIndex <= currentStatement.length) {
        setTypedText(currentStatement.substring(0, currentIndex));
        currentIndex += 1;
      } else {
        // Reset index for the next statement
        currentIndex = 0;
        statementIndex = (statementIndex + 1) % statements.length;
      }

      // Toggle cursor visibility
      setShowCursor((prev) => !prev);

      // Repeat typing with a delay
      typingTimer = setTimeout(typeText, 250); // Adjust the typing speed
    };

    // Toggle cursor blinking
    cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000); // Adjust the blinking speed

    // Trigger typing effect when the component mounts
    typeText();

    // Simulate backspace key clearing effect
    setTimeout(() => {
      currentIndex = Math.max(0, currentIndex - 1);
      typeText();
    }, 10000); // Adjust the delay before the backspace effect

    // Clear the timers on component unmount
    return () => {
      clearTimeout(typingTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  //========
  //SIGN OUT
  //========
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("!userInfo" && "cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shipmentData");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="nav_bar light_header">
        <div className="container ">
          <div className="navBar c_flex">
            <div className="categories ">
              <div className="c_flex">
                <div className="menu_bar">
                  <SideBar />
                </div>
                <div className="logo width">
                  <Link to="/">
                    <img src={logo} alt="" className="logo_img" />
                  </Link>
                </div>
                <div className="category_modal">
                  <CategoryMenu />
                </div>
              </div>
            </div>

            <form action="" onSubmit={submitHandler} className="search ">
              <i className="fa fa-search" onClick={submitHandler}></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder={typedText + (showCursor ? "|" : "")}
              />
            </form>

            <div className="left_icons c_flex">
              <div className="drawer_search">
                <SearchMenu />
              </div>
              <div className="nav_call_request">
                <React.Fragment>
                  <Box>
                    <Tooltip>
                      <IconButton
                        onClick={handleClickNav}
                        disableRipple
                        size="small"
                        className="icon-button"
                        disableElevation
                        aria-controls={openInfo ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openInfo ? "true" : undefined}
                      >
                        <span className="a_flex default_num">
                          <PhoneInTalkOutlinedIcon />
                          <span className="">+0 123-456-7890</span>
                          <KeyboardArrowDownIcon className="icon" />
                        </span>
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Menu
                    anchorEl={anchorEle}
                    id="account-menu"
                    open={openInfo}
                    onClose={handleCloseNav}
                    disableScrollLock={true}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        borderRadius: "10px",
                        overflow: "visible",
                        zIndex: 1,
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        ml: 2,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 28,
                          width: 15,
                          height: 15,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
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
                      <div className="social_icons f_flex">
                        <div className="icon l_flex">
                          <a href="/#">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                        </div>
                        <div className="icon l_flex">
                          <a href="/#">
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        </div>
                        <div className="icon l_flex">
                          <a href="/#">
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        </div>
                        <div className="icon l_flex">
                          <a href="/#">
                            <i className="fa-brands fa-skype"></i>
                          </a>
                        </div>
                      </div>
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
                  </Menu>
                </React.Fragment>
              </div>
              <div className="icons c_flex">
                <Tooltip title="View comparison list" className="view">
                  <Link to="/compare" className="l_flex">
                    <EqualizerIcon className="icon" />
                  </Link>
                  <span className="badge ">
                    <span className="badge_count_num l_flex">0</span>
                  </span>
                </Tooltip>
                <Tooltip title="View wish list" className="view">
                  <Link to="/wish-list" className="l_flex">
                    <FavoriteBorderIcon className="icon" />
                  </Link>
                  <span className="badge ">
                    <span className="badge_count_num l_flex">0</span>
                  </span>
                </Tooltip>
                <div className="user">
                  <React.Fragment>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      className="user_menu_box"
                    >
                      <Tooltip>
                        <IconButton
                          onClick={handleClickUser}
                          disableRipple
                          size="small"
                          className="icon-button"
                          disableElevation
                          aria-controls={
                            openUserInfo ? "account-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openUserInfo ? "true" : undefined}
                        >
                          <span className="l_flex">
                            <AccountCircleOutlinedIcon className="icon" />
                          </span>
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Menu
                      anchorEl={anchorUser}
                      id="account-menu"
                      open={openUserInfo}
                      onClose={handleCloseUser}
                      disableScrollLock={true}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          zIndex: 1,
                          borderRadius: "10px",
                          overflow: "visible",
                          padding: 0,
                          margin: 0,
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          ml: 1,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: 1.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 26,
                            width: 15,
                            height: 15,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <div className="user_menu_content">
                        <div className="upper">
                          <div className="user_head c_flex">
                            <h4>My Account</h4>
                            <CloseOutlinedIcon
                              onClick={handleCloseUser}
                              className="icon"
                            />
                          </div>
                          <Divider />
                          <div className="menu_item">
                            <MenuItem
                              key="orders"
                              component={Link}
                              to="/orders"
                              className="list"
                              onClick={handleCloseUser}
                              disableRipple
                            >
                              Orders
                            </MenuItem>
                            <MenuItem
                              key="comparison"
                              component={Link}
                              to="/compare"
                              className="list"
                              onClick={handleCloseUser}
                              disableRipple
                            >
                              Comparison list
                            </MenuItem>
                            <MenuItem
                              key="orders"
                              component={Link}
                              to="/wish-list"
                              className="list"
                              onClick={handleCloseUser}
                              disableRipple
                            >
                              Wish list
                            </MenuItem>
                          </div>
                        </div>
                        <div className="lower">
                          <div className="content">
                            <div className="track">
                              <small>Track my order(s)</small>
                              <form action="" className="a_flex">
                                <input
                                  type="text"
                                  placeholder="Order Tracking ID"
                                />
                                <button>
                                  <ArrowRightOutlinedIcon />
                                </button>
                              </form>
                            </div>
                            <div className="reg_login c_flex">
                              <button
                                onClick={() => {
                                  handleCloseUser();
                                  navigate("/login");
                                }}
                                className="login"
                              >
                                Login
                              </button>
                              <button
                                onClick={() => {
                                  handleCloseUser();
                                  navigate("/register");
                                }}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Menu>
                  </React.Fragment>
                </div>
                <div className="cart">
                  <React.Fragment>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      className="user_menu_box"
                    >
                      <Tooltip>
                        <IconButton
                          onClick={handleClickCart}
                          disableRipple
                          size="small"
                          className="icon-button"
                          disableElevation
                          aria-controls={
                            openCartInfo ? "account-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openCartInfo ? "true" : undefined}
                        >
                          <span className="cart_icon">
                            <ShoppingCartIcon className="icon" />
                            <span className="badge ">
                              <span className="badge_count_num l_flex">0</span>
                            </span>
                          </span>
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Menu
                      anchorEl={anchorCart}
                      id="account-menu"
                      open={openCartInfo}
                      onClose={handleCloseCart}
                      disableScrollLock={true}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          zIndex: 1,
                          borderRadius: "10px",
                          overflow: "visible",
                          padding: 0,
                          margin: 0,
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          ml: 1,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: 1.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 24,
                            width: 15,
                            height: 15,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <div className="cart_popover">
                        <div className="upper">
                          <div className="cart_head c_flex">
                            <h4>Cart items: </h4>
                            <CloseOutlinedIcon
                              onClick={handleCloseCart}
                              className="icon"
                            />
                          </div>
                          <Divider />
                          <div className="content c_flex">
                            <div className="img">
                              <img src={controller} alt="" />
                            </div>
                            <div className="name_qty">
                              <div className="name">
                                <Link to="">
                                  <h3>
                                    Sony - DualShock 4 Wireless Controller for
                                    Sony PlayStation 4
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
                        </div>
                        <div className="drawer_btn c_flex">
                          <button
                            className="view"
                            onClick={() => {
                              handleCloseCart();
                              navigate("/cart");
                            }}
                          >
                            View cart
                          </button>
                          <button
                            onClick={() => {
                              handleCloseCart();
                              navigate("/checkout");
                            }}
                            className="c_flex checkout"
                          >
                            <CheckCircleOutlineOutlinedIcon className="icon" />
                            <span>Checkout</span>
                          </button>
                        </div>
                      </div>
                    </Menu>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
