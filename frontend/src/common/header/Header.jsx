import React from "react";
import Head from "./Head";
import Navbar from "./Navbar";
import "./styles.scss";
import BottomNav from "../bottom nav/BottomNav";

function Header() {
  return (
    <>
      <Head />
      <Navbar />
      <BottomNav />
    </>
  );
}

export default Header;
