import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./styles.scss";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { LocationModal } from "../../components/modals/Modals";

function Head() {
  const { darkMode, state, toggle, currencies, toCurrencies, setToCurrencies } =
    useContext(Context);
  const { settings } = state;

  //THEME SWITCH
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 30,
    padding: 7,
    position: "relative",
    left: 15,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === darkMode ? "#8796A5 " : "#aab4be dark",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor:
        theme.palette.mode === darkMode ? "#003892 " : "#001e3c ",
      width: 22,
      height: 22,
      marginTop: 2.5,

      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor:
        theme.palette.mode === darkMode ? "#8796A5 " : "#aab4be ",
      borderRadius: 20 / 2,
    },
  }));

  //INFO
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openInfo = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEl(null);
  };

  const { email, whatsapp } =
    (settings &&
      settings
        .map((s) => ({
          whatsapp: s.whatsapp,
          email: s.email,
        }))
        .find(() => true)) ||
    {};

  return (
    <div>
      <section className="head">
        <div className="container  head-position">
          <div className="c_flex">
            <div className="left">
              <LocationModal />
            </div>
            <div className="right a_flex">
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ minWidth: 100 }}>
                    <Link to="">Delivery and payment</Link>
                  </Typography>
                  <Typography sx={{ minWidth: 100 }}>
                    <Link to="">Returns</Link>
                  </Typography>
                  <Typography sx={{ minWidth: 100 }}>
                    <Link to="">Store locators</Link>
                  </Typography>{" "}
                  <Typography sx={{ minWidth: 100 }}>
                    <Link to="/contact">Contact</Link>
                  </Typography>
                  <Tooltip title="Information">
                    <IconButton
                      onClick={handleClick}
                      disableRipple
                      size="small"
                      sx={{ ml: 2 }}
                      className="icon-button"
                      aria-controls={openInfo ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openInfo ? "true" : undefined}
                    >
                      <span className="a_flex">
                        <ArticleOutlinedIcon className="icon" />
                        <KeyboardArrowDownIcon className="icon" />
                      </span>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openInfo}
                  onClose={handleCloseInfo}
                  onClick={handleCloseInfo}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: "10px",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      ml: 0.8,
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
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    component={Link}
                    to="/track-order"
                    onClick={handleCloseInfo}
                  >
                    Delivery and payment
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/track-order"
                    onClick={handleCloseInfo}
                  >
                    Returns
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/track-order"
                    onClick={handleCloseInfo}
                  >
                    Store locators
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/contact"
                    onClick={handleCloseInfo}
                  >
                    Contact
                  </MenuItem>
                </Menu>
              </React.Fragment>
              <label htmlFor="" id="display-none" className="language">
                EN
              </label>
              <div className="currency_state">
                <select
                  className={
                    darkMode ? "dark_mode currency_symbol" : "currency_symbol"
                  }
                  value={toCurrencies}
                  onChange={(e) => {
                    const selectedCurrency = e.target.value;
                    localStorage.setItem("toCurrencies", selectedCurrency);
                    setToCurrencies(selectedCurrency);
                  }}
                >
                  {currencies.map((currency) => (
                    <option
                      className="currency_symbol_option"
                      key={currency.code}
                      value={currency.code}
                    >
                      {currency.symbol} &#160;&#160; {currency.code}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FormControlLabel
                  onClick={toggle}
                  control={<MaterialUISwitch checked={darkMode} />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Head;
