import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import "./styles.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export function SearchMenu() {
  const [state, setState] = React.useState({
    bottom: false,
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
  return (
    <div className="search_drawer">
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="menu_btn_icon"
            id="demo-customized-button"
            disableRipple
            style={{ backgroundColor: "transparent" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <SearchIcon className="menu_icon" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            className="menu_inner_form"
            onClose={toggleDrawer(anchor, false)}
          >
            <form action="">
              <div className="form_group c_flex">
                <span className="input_width">
                  <input type="search" />
                  <SearchIcon className="icon"/>
                </span>
                <CloseOutlinedIcon
                  className="icon"
                  onClose={toggleDrawer(anchor, false)}
                />
              </div>
            </form>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export function CartMenu() {
  return <div>Menu</div>;
}
export function UserMenu() {
  return <div>Menu</div>;
}
export function ContactMenu() {
  return <div>Menu</div>;
}
