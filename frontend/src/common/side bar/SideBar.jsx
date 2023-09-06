import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import CallIcon from "@mui/icons-material/Call";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SettingsIcon from "@mui/icons-material/Settings";
import { Context } from "../../context/Context";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import { styled } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { LocationModal, LoginModals } from "../../components/modals/Modals";

const StyledDivider = styled(Divider)(({ theme, darkMode }) => ({
  backgroundColor: darkMode ? "#ffffff" : "", // Change colors accordingly
}));

function SideBar() {
  const {
    state: states,
    dispatch: ctxDispatch,
    darkMode,
    toggle,
    currencies,
    toCurrencies,
    setToCurrencies,
  } = useContext(Context);
  const { cart, userInfo, settings } = states;

  const { logo } =
    (settings &&
      settings
        .map((s) => ({
          logo: s.logo,
        }))
        .find(() => true)) ||
    {};

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
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

  const webItemList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      to: "/", // <-- add link targets
    },
    {
      text: "Store",
      icon: <StoreIcon />,
      to: "/store",
    },
    {
      text: "Cart",
      icon: (
        <span>
          <ShoppingCartIcon className="cart_badge_icon" />
        </span>
      ),
      to: "/cart",
    },
    {
      text: "Contact",
      icon: <CallIcon />,
      to: "/contact",
    },
  ];

  //TOGGLE
  const [shopSectionExpanded, setShopSectionExpanded] = useState(false);
  const [adminSectionExpanded, setAdminSectionExpanded] = useState(false);
  const [vendorSectionExpanded, setVendorSectionExpanded] = useState(false);

  const toggleShopSection = () => {
    setShopSectionExpanded(!shopSectionExpanded);
  };

  const toggleAdminSection = () => {
    setAdminSectionExpanded(!adminSectionExpanded);
  };

  const toggleVendorSection = () => {
    setVendorSectionExpanded(!vendorSectionExpanded);
  };

  return (
    <div>
      {["left"]?.map((anchor, index) => (
        <React.Fragment key={index}>
          <Button
            className="menu_btn_icon"
            id="demo-customized-button"
            disableRipple
            style={{ backgroundColor: "transparent" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon className="menu_icon" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className="side_bar_drawer"
            PaperProps={{
              sx: {
                backgroundColor: darkMode ? "rgb(0,0,0,0.8)" : "",
              },
            }}
          >
            <div className="main">
              <span className="toggle_width">
                <span className="logo_span d_flex">
                  <img src={logo} alt="logo" className="logo" />
                  <CloseIcon
                    className="icon"
                    onClick={toggleDrawer(anchor, false)}
                  />
                </span>
              </span>
              <div className="login_reg">
                <div className="content a_flex">
                  <div className="user l_flex">
                    <AccountCircleOutlinedIcon className="icon" />
                  </div>
                  <div className="link_small">
                    <div className="link a_flex">
                      <LoginModals
                        toggleDrawer={toggleDrawer}
                        anchor={anchor}
                      />
                      <span>|</span>
                      <Link
                        to="/register"
                        onClick={toggleDrawer(anchor, false)}
                      >
                        Register
                      </Link>
                    </div>
                    <small>Log in to get more opportunities</small>
                  </div>
                </div>
              </div>
              <div className="category_btn">
                <button className="l_flex">
                  <span className="a_flex">
                    <GridViewIcon className="icon" />
                    <span>Categories</span>
                  </span>
                </button>
              </div>
              <div className="lang_currency_locate">
                <div className="language  a_flex">
                  <span className="label">Language: </span>
                  <div className="btn">
                    <button className="disabled" disabled>
                      RU
                    </button>
                    <button className="active">EN</button>
                    <button className="disabled" disabled>
                      AR
                    </button>
                  </div>
                </div>
                <div className="currency a_flex">
                  <span className="label">Currencies: </span>
                  <div className="currency_state">
                    <select
                      className={darkMode ? "dark_mode" : ""}
                      value={toCurrencies}
                      onChange={(e) => {
                        const selectedCurrency = e.target.value;
                        localStorage.setItem("toCurrencies", selectedCurrency);
                        setToCurrencies(selectedCurrency);
                      }}
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol} &#160;&#160; {currency.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="location a_flex">
                  <span className="label">City: </span>
                  <LocationModal />
                </div>
              </div>
              <StyledDivider darkMode={darkMode} />
              <div className="store_info">
                <ul>
                  <li>
                    <Link onClick={toggleDrawer(anchor, false)} to="/">
                      Delivery and payment
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggleDrawer(anchor, false)} to="/">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggleDrawer(anchor, false)} to="/">
                      Store locator
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggleDrawer(anchor, false)} to="/contact">
                      Contacts
                    </Link>
                  </li>
                </ul>
              </div>
              <StyledDivider darkMode={darkMode} />
              <div className="shop">
                <label
                  htmlFor=""
                  className="c_flex"
                  onClick={toggleShopSection}
                >
                  <span>Shop</span>
                  {shopSectionExpanded ? (
                    <RemoveIcon className="icon" />
                  ) : (
                    <AddIcon className="icon" />
                  )}
                </label>
                {shopSectionExpanded && (
                  <ul>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/store">
                        Store
                      </Link>
                    </li>
                    <li className="c_flex">
                      <Link onClick={toggleDrawer(anchor, false)} to="/cart">
                        Cart
                      </Link>
                      <span>
                        <ShoppingCartIcon className="icon" />
                        <span className="cart_badge_side l_flex">
                          <span className="cart_badge">
                            {cart.cartItems?.length}
                          </span>
                        </span>
                      </span>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/">
                        Delivery and payment
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/">
                        Returns
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/">
                        Store locator
                      </Link>
                    </li>
                    <li>
                      <Link onClick={toggleDrawer(anchor, false)} to="/contact">
                        Contacts
                      </Link>
                    </li>
                  </ul>
                )}
              </div>{" "}
              {userInfo && userInfo.isAdmin ? (
                <>
                  <StyledDivider darkMode={darkMode} />
                  <div className="shop admin">
                    <label
                      htmlFor=""
                      className="c_flex"
                      onClick={toggleAdminSection}
                    >
                      <span>Admin</span>
                      {adminSectionExpanded ? (
                        <RemoveIcon className="icon" />
                      ) : (
                        <AddIcon className="icon" />
                      )}
                    </label>
                    {adminSectionExpanded && (
                      <ul onClick={toggleDrawer(anchor, false)}>
                        <li className="c_flex">
                          <Link className="c_flex" to="/admin/dashboard">
                            <span>Dashboard</span>
                            <LineStyleIcon className="icon" />
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link className="c_flex" to="/admin/products">
                            <span>Products</span>
                            <Inventory2Icon className="icon" />
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link className="c_flex" to="/admin/users">
                            <span>Users</span>
                            <PeopleIcon className="icon" />{" "}
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link className="c_flex" to="/admin/vendors">
                            <span> Vendors</span>
                            <BadgeIcon className="icon" />
                          </Link>
                        </li>{" "}
                        <li className="c_flex">
                          <Link className="c_flex" to="/admin/orders">
                            <span>Orders</span>
                            <WarehouseIcon className="icon" />
                          </Link>
                        </li>{" "}
                        <li className="c_flex">
                          <Link
                            className="c_flex"
                            to="/admin/withdrawal-request"
                          >
                            <span> Withdrawals</span>
                            <AccountBalanceWalletIcon className="icon" />
                          </Link>
                        </li>{" "}
                        <li>
                          <Link to="/admin/settings" className="c_flex">
                            <span> Settings</span>
                            <SettingsIcon className="icon" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
              {userInfo && userInfo.isSeller ? (
                <>
                  {" "}
                  <StyledDivider darkMode={darkMode} />
                  <div className="shop seller">
                    <label
                      htmlFor=""
                      className="c_flex"
                      onClick={toggleVendorSection}
                    >
                      <span>Vendor</span>
                      {vendorSectionExpanded ? (
                        <RemoveIcon className="icon" />
                      ) : (
                        <AddIcon className="icon" />
                      )}
                    </label>
                    {vendorSectionExpanded && (
                      <ul onClick={toggleDrawer(anchor, false)}>
                        <li className="c_flex">
                          <Link className="c_flex" to="/vendor/dashboard">
                            <span>Dashboard</span>
                            <LineStyleIcon className="icon" />
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link className="c_flex" to="/vendor/products">
                            <span>Products</span>
                            <Inventory2Icon className="icon" />
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link
                            className="c_flex"
                            to={
                              userInfo ? `/vendor-profile/${userInfo._id}` : ""
                            }
                          >
                            <span>My Profile</span>
                            <AccountCircleOutlinedIcon className="icon" />{" "}
                          </Link>
                        </li>
                        <li className="c_flex">
                          <Link className="c_flex" to="/vendor/orders">
                            <span>Orders</span>
                            <WarehouseIcon className="icon" />
                          </Link>
                        </li>{" "}
                        <li className="c_flex">
                          <Link className="c_flex" to="/vendor/withdraw">
                            <span> Withdraw</span>
                            <AccountBalanceWalletIcon className="icon" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
              <StyledDivider darkMode={darkMode} />
            </div>

            <StyledDivider darkMode={darkMode} />
            <span
              className={darkMode ? "dark_mode lower_drawer" : "lower_drawer"}
            >
              <span className="toggle_width">
                {darkMode === false && (
                  <Button className="toggle_btn" onClick={toggle}>
                    <LightModeIcon /> Light
                  </Button>
                )}
                {darkMode === true && (
                  <Button className="toggle_btn" onClick={toggle}>
                    <DarkModeIcon /> Dark
                  </Button>
                )}
              </span>
              <StyledDivider darkMode={darkMode} />
              <StyledDivider darkMode={darkMode} />
            </span>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SideBar;
