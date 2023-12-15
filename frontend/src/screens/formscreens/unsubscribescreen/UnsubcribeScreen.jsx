import React, { useContext, useReducer } from "react";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import { toast } from "react-toastify";
import { getError } from "../../../components/utilities/util/Utils";
import { Context } from "../../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../../../components/utilities/message loading/LoadingBox";
import { Helmet } from "react-helmet-async";
import "../styles/style.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "UNSUBSCRIBE_REQUEST":
      return { ...state, loading: true };
    case "UNSUBSCRIBE_SUCCESS":
      return { ...state, loading: false };
    case "UNSUBSCRIBE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};
function UnSubscribeScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    order: {},
    error: "",
  });

  //===================
  //Unsubscribe Handler
  //===================
  const UnsubscribeHandler = async () => {
    try {
      dispatch({ type: "UNSUBSCRIBE_REQUEST" });

      // Replace 'userEmail@example.com' with the actual email address
      const userEmail = userInfo.email;

      const { data } = await axios.post(`${request}/api/message/unsubscribe`, {
        email: userEmail,
      });

      dispatch({ type: "UNSUBSCRIBE_SUCCESS", payload: data.message });
      // Display a success toast message
      toast.success(data.message, { position: "bottom-center" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      dispatch({ type: "UNSUBSCRIBE_FAIL" });
      toast.error(getError(err), { position: "bottom-center" });
    }
  };
  return (
    <div className="form-box">
      <Helmet>
        <title>Unsubscribe</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>&#160; Unsubscribe</p>
          </div>
        </div>
        <div className="form-box-content">
          <div className="inner-form inner-form-small">
            <div className="unsubscribe_text">
              <h2>Unsubscribe Now</h2>
              <p>
                Proceeding with your request to unsubscribe from our newsletter.
                We sincerely appreciate your past engagement and support. Should
                you choose to reconnect with us in the future, you're always
                welcome back. Thank you for staying connected.
              </p>
            </div>
            <div className="form-btn">
              <button
                className="form-submit-btn a_flex"
                onClick={UnsubscribeHandler}
                disabled={loading} // Disable the button while loading
              >
                {loading ? <LoadingBox /> : "Unsubscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnSubscribeScreen;
