import "../style/style.css";
import MoonLoader from "react-spinners/MoonLoader";

function LoadingBox() {
  return (
    <div id="load-err">
      <div style={{ padding: "10px 0px" }}>
        <MoonLoader size={45} color="#be0318" />
      </div>
    </div>
  );
}

export default LoadingBox;
