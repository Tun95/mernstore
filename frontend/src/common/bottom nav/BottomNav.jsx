import React from "react";
import "./styles.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import SideBar from "../side bar/SideBar";
import { SearchMenu } from "../../components/menus/Menu";

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
            icon={<ShoppingCartIcon />}
          />
          <BottomNavigationAction
            disableRipple
            label="Account"
            icon={<AccountCircleOutlinedIcon />}
          />
          <BottomNavigationAction
            disableRipple
            label="Contact"
            icon={<CallOutlinedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default BottomNav;
