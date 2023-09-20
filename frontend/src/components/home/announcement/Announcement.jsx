import React from "react";
import "./styles.scss";
import AnnouncementCard from "./AnnouncementCard";

function Announcement() {
  return (
    <div className="announcement">
      <div className="container">
        <AnnouncementCard />
      </div>
    </div>
  );
}

export default Announcement;
