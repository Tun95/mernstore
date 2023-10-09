import React from "react";
import Head from "./Head";
import Navbar from "./Navbar";
import "./styles.scss";
import BottomNav from "../bottom nav/BottomNav";

function Header() {
  return (
    <div>
      <Head />
      <Navbar />
      <BottomNav />
    </div>
  );
}

export default Header;
