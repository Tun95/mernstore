import React, { useState } from "react";
import "./styles.scss";
import WrapperForm from "../wrapper/Wrappers";
import Announcement from "../show room/Announcement";

function Home() {
  //============
  //TOGGLE BOX
  //============
  const [openBox, setOpenBox] = useState(null);

  const toggleBox = (index) => {
    if (openBox === index) {
      setOpenBox(null);
    } else {
      setOpenBox(index);
    }
  };
  return (
    <div className="home_settings">
      <span className="show_room_home">
        <Announcement toggleBox={toggleBox} openBox={openBox} />
      </span>
      <span className="wrapper">
        <WrapperForm toggleBox={toggleBox} openBox={openBox} />
      </span>
    </div>
  );
}

export default Home;
