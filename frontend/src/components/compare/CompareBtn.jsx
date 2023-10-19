import React, { useState } from "react";

function CompareBtn() {
  // ===Features===//
  const [feature, setFeature] = useState(true);
  const closeFeature = () => {
    setFeature(false);
    document.body.style.overflow = "unset";
  };
  const showFeature = () => {
    setFeature(true);
  };
  const featureDetail = () => {
    showFeature();
    closeDifferent();
    closeSimilar();
  };

  // ===Description===//
  const [similar, setSimilar] = useState(false);
  const closeSimilar = () => {
    setSimilar(false);
    document.body.style.overflow = "unset";
  };
  const showSimilar = () => {
    setSimilar(true);
  };
  const similarDetail = () => {
    showSimilar();
    closeDifferent();
    closeFeature();
  };

  //=== Different ==//
  const [different, setDifferent] = useState(false);
  const closeDifferent = () => {
    setDifferent(false);
    document.body.style.overflow = "unset";
  };
  const showDifferent = () => {
    setDifferent(true);
  };
  const differentDetail = () => {
    showDifferent();
    closeSimilar();
    closeFeature();
  };

  return (
    <div className="compare_btn">
      <ul className="btn_list">
        <li>
          <button onClick={featureDetail} className={feature ? "active" : ""}>
            All features
          </button>
        </li>
        <li>
          <button onClick={similarDetail} className={similar ? "active" : ""}>
            Similar only
          </button>
        </li>
        <li>
          <button
            onClick={differentDetail}
            className={different ? "active" : ""}
          >
            Different only
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CompareBtn;
