import React from "react";
import "./styles.scss";
import Slider from "./Slider";

function Home() {
  return (
    <>
      <section className="store_home">
        <span className="container display_grid slider_cate">
          <Slider />
        </span>
      </section>
    </>
  );
}

export default Home;
