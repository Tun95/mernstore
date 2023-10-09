import React from "react";
import "./styles.scss";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import SideBar from "../side bar/SideBar";
import {
  CartMenu,
  ContactMenu,
  SearchMenu,
  UserMenu,
} from "../../components/menus/Menu";

function BottomNav() {
  const [value, setValue] = React.useState(0);
  return (
    <div className="bottom_nav">
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          className="menus"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            disableRipple
            label="Menu"
            icon={<SideBar />}
          />
          <BottomNavigationAction
            disableRipple
            label="Search"
            icon={<SearchMenu />}
          />
          <BottomNavigationAction
            disableRipple
            label="Cart"
            icon={<CartMenu />}
          />
          <BottomNavigationAction
            disableRipple
            label="Account"
            icon={<UserMenu />}
          />
          <BottomNavigationAction
            disableRipple
            label="Contact"
            icon={<ContactMenu />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default BottomNav;
