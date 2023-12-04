import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import "./styles.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import controller from "../../assets/bestsellers/controller.webp";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { CallRequestModals } from "../modals/Modals";
import GridViewIcon from "@mui/icons-material/GridView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import { Box, Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import data from "./data";
import { Context } from "../../context/Context";

export function CategoryMenu() {
  // const { categories } = data;

  const { state } = useContext(Context);
  const { categories } = state;

  console.log("MAP CATEGORY:", categories);

  //CONTACT MENU
  const [anchorEle, setAnchorEle] = React.useState(null);
  const openInfo = Boolean(anchorEle);
  const handleClickNav = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorEle(null);
  };

  return (
    <div className="category_menu_popover ">
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
              <div className="c_flex ctg_btn">
                <GridViewIcon className="align_left" />
                <h5>Categories</h5>
                <KeyboardArrowDownIcon className="icon" />
              </div>
            </IconButton>
          </Tooltip>
        </Box>

        {openInfo && (
          <div className="overlay-backdrop" onClick={handleCloseNav} />
        )}
        <div className="centered_menu_container">
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
                mt: 0.4,
                height: "540px",
                width: "100%",
                pt: -5,
                "& .MuiAvatar-root": {
                  ml: -0.5,
                  mr: -1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: "23%",
                  width: 14,
                  height: 14,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          >
            <div className="category_drop_menu">
              <div className="cat_border">
                <div className="border">
                  {categories?.slice(0, 7).map((categoryGroup, groupIndex) => (
                    <div className="list" key={groupIndex}>
                      <ul>
                        {Array.isArray(categoryGroup.categories) ? (
                          categoryGroup.categories.map((category, index) => (
                            <li className="category" key={index}>
                              <Link
                                to="/store"
                                className="main_list"
                                onClick={handleCloseNav}
                              >
                                <div className="c_flex">
                                  <div className="img">
                                    <img
                                      src={category.icon}
                                      alt={category.name}
                                    />
                                  </div>
                                  <div className="name_desc">
                                    <span className="name">
                                      <h4>{category.name}</h4>
                                    </span>
                                    <span className="description">
                                      <p>{category.description}</p>
                                    </span>
                                  </div>
                                  <div className="icon_box">
                                    <KeyboardArrowRightIcon className="icon" />
                                  </div>
                                </div>
                              </Link>
                              <div className="sub_list">
                                <ul className="sub_category">
                                  <img
                                    className="background_img"
                                    src={category.background}
                                    alt=""
                                  />
                                  {category.subCategories.map(
                                    (subCategory, subIndex) => (
                                      <li
                                        key={subIndex}
                                        className="sub_category_list"
                                      >
                                        <Link to="">
                                          <div className="sub_img">
                                            <div className="img">
                                              <img
                                                src={subCategory.img}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                          <div className="name">
                                            <h4>{subCategory.name}</h4>
                                          </div>
                                        </Link>
                                        <ul>
                                          {subCategory.subItems.map(
                                            (subItem, subItemIndex) => (
                                              <li key={subItemIndex}>
                                                <Link to="">
                                                  {subItem.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="category" key={groupIndex}>
                            {/* Render your single category code here */}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </React.Fragment>
    </div>
  );
}

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
                  <Link
                    onClick={toggleDrawer(anchor, false)}
                    to="/cart"
                    className="view"
                  >
                    View cart
                  </Link>
                  <Link
                    onClick={toggleDrawer(anchor, false)}
                    to="/checkout"
                    className="c_flex checkout"
                  >
                    <CheckCircleOutlineOutlinedIcon className="icon" />
                    <span>Checkout</span>
                  </Link>
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
                      <Link onClick={toggleDrawer(anchor, false)} to="/orders">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/compare">
                        Comparison list
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={toggleDrawer(anchor, false)}
                        to="/wish-list"
                      >
                        Wish list
                      </Link>
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
                  <Link
                    onClick={toggleDrawer(anchor, false)}
                    to="/login"
                    className="view"
                  >
                    Sign in
                  </Link>
                  <Link
                    onClick={toggleDrawer(anchor, false)}
                    to="/register"
                    className="checkout"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

//CONTACT MENU
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
