import React, { useContext, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import GridViewIcon from "@mui/icons-material/GridView";
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
import { SearchMenu } from "../../components/menus/Menu";
import { Popover } from "antd";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import controller from "../../assets/bestsellers/controller.webp";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    PaperProps={{
      elevation: 0,
      sx: {
        zIndex: 1, // Set a lower z-index value
        // Other styles...
      },
    }}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme, darkMode }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(3),
    height: "400px",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    backgroundColor: darkMode ? "rgb(0,0,0,0.8)" : "",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "15px",
      // margin: "0px 15px",
    },
    "& .MuiMenuItem-root": {
      margin: "5px 0px",
      color: darkMode ? "#ffffff" : "#2e2e2e",
      padding: "5px 60px",
      fontWeight: "500",
      transition: "all 500ms ease",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        backgroundColor: darkMode ? "#2e2e2e" : "", // Change to the desired hover color
      },
    },
  },
}));

function Navbar() {
  const navbar = document.querySelector(".navBar");

  const navigate = useNavigate();

  let storeRef = useRef(null);

  const { state, dispatch: ctxDispatch, darkMode } = useContext(Context);
  const { userInfo, categories, settings } = state;
  const { logo } =
    (settings &&
      settings
        .map((s) => ({
          logo: s.logo,
        }))
        .find(() => true)) ||
    {};

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (event, category) => {
    event.preventDefault();

    // Close the menu
    handleClose();

    // Log storeRef and its current value
    console.log("storeRef:", storeRef.current);

    // Scroll to the "store" section
    if (storeRef.current) {
      console.log("Scrolling to:", storeRef.current.offsetTop);
      window.scrollTo({
        behavior: "smooth",
        top: storeRef.current.offsetTop,
      });
    }

    navigate(`/store?category=${category}`);
  };

  const handleOpen = () => {
    if (!userInfo) {
      toast.error("You need to login first", { position: "bottom-center" });
      navigate(`/login?redirect=/application`);
    } else {
      navigate(`/application`);
    }
  };

  //INFO
  const [anchorEle, setAnchorEle] = React.useState(null);
  const openInfo = Boolean(anchorEle);
  const handleClickNav = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorEle(null);
  };

  //INFO
  const [anchorUser, setAnchorUser] = React.useState(null);
  const openUserInfo = Boolean(anchorUser);
  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  //=========
  //SEARCH BOX
  //=========
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/store/?query=${query}` : "/store");
  };

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

  // ===========
  // CART MENU
  // ===========
  const cartMenu = (
    <div className="top_popover cart_popover">
      <div className="drawers">
        <div className="cart">
          <div className="header c_flex">
            <h3>Cart items:</h3>
            <CloseOutlinedIcon className="icon" />
          </div>
          <div className="content c_flex">
            <div className="img">
              <img src={controller} alt="" />
            </div>
            <div className="name_qty">
              <div className="name">
                <Link to="">
                  <h3>
                    Sony - DualShock 4 Wireless Controller for Sony PlayStation
                    4
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
            <button className="view">View cart</button>
            <button className="c_flex checkout">
              <CheckCircleOutlineOutlinedIcon className="icon" />
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <nav>
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
                  <div className="c_flex ctg_btn" onClick={handleClick}>
                    <GridViewIcon className="align_left" />
                    <h5>Categories</h5>
                    <KeyboardArrowDownIcon className="icon" />
                  </div>
                  {categories?.length > 0 ? (
                    <StyledMenu
                      darkMode={darkMode}
                      id="demo-customized-menu"
                      className="demo_customized_menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      {categories?.map((c, index) => (
                        <MenuItem
                          key={index}
                          component={Link}
                          to={`/store?category=${c.category}`}
                          onClick={(e) => handleCategoryClick(e, c.category)}
                          disableRipple
                        >
                          {c.category}
                        </MenuItem>
                      ))}
                    </StyledMenu>
                  ) : null}
                </div>
              </div>
            </div>

            <form action="" onSubmit={submitHandler} className="search ">
              <i className="fa fa-search" onClick={submitHandler}></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search and hit enter..."
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
                  <span className="l_flex">
                    <EqualizerIcon className="icon" />
                  </span>
                </Tooltip>
                <Tooltip title="View wish list" className="view">
                  <span className="l_flex">
                    <FavoriteBorderIcon className="icon" />
                  </span>
                </Tooltip>
                <div className="user">
                  {" "}
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
                              to="/track-order"
                              className="list"
                              onClick={handleCloseUser}
                              disableRipple
                            >
                              Orders
                            </MenuItem>
                            <MenuItem
                              key="orders"
                              component={Link}
                              to="/track-order"
                              className="list"
                              onClick={handleCloseUser}
                              disableRipple
                            >
                              Comparison list
                            </MenuItem>
                            <MenuItem
                              key="orders"
                              component={Link}
                              to="/track-order"
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
                              <button className="login">Login</button>
                              <button>Register</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Menu>
                  </React.Fragment>
                </div>
                <Popover
                  placement="bottomRight"
                  content={cartMenu}
                  style={{ padding: 0 }}
                  trigger="click"
                >
                  <span>
                    <span className="l_flex">
                      <ShoppingCartIcon className="icon" />
                    </span>
                    <span className="badge ">
                      <span className="badge_count_num l_flex">0</span>
                    </span>
                  </span>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
