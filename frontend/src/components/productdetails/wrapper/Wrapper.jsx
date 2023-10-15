import React from "react";

function Wrapper() {
  const wrappers = [
    {
      icon: "fa-solid fa-truck",
      header: "Fast and high quality delivery",
      description: "Our company makes delivery all over the country",
    },
    {
      icon: "fa-solid fa-shield",
      header: "Quality assurance and service",
      description: "We offer only those goods, in which quality we are sure",
    },
    {
      icon: "fa-solid fa-box-archive",
      header: "Returns within 30 days",
      description: "You have 30 days to test your purchase",
    },
  ];
  return (
    <div className="wrapper">
      <div className="container">
        <div className="content d_flex">
          {wrappers.map((wrapper, index) => (
            <span key={index}>
              <div className="icon_circle l_flex">
                <span className="l_flex">
                  <i className={wrapper.icon}></i>
                </span>
              </div>
              <h4>{wrapper.header}</h4>
              <small>{wrapper.description}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
