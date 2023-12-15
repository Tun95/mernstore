import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { request } from "../../../base url/BaseUrl";
import { toast } from "react-toastify";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { getError } from "../../../components/utilities/util/Utils";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { otpSchema } from "../../../components/schemas/Index";
import { Context } from "../../../context/Context";
import { io } from "socket.io-client";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_REQUEST":
      return { ...state, loading: true };
    case "SUBMIT_SUCCESS":
      return { ...state, loading: false };
    case "SUBMIT_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};
function VerifyOtpScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Context);

  const { search } = useLocation();
  const redirectUnUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUnUrl ? redirectUnUrl : "/";

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const initialValues = {
    otp: "",
  };

  //================
  const handleVerifiedOTP = () => {
    // Save temporary user info to context
    const temporaryUserInfo = JSON.parse(
      localStorage.getItem("temporaryUserInfo")
    );
    ctxDispatch({ type: "USER_SIGNIN", payload: temporaryUserInfo });
    localStorage.setItem("userInfo", JSON.stringify(temporaryUserInfo));

    // Clear temporary user info from local storage
    localStorage.removeItem("temporaryUserInfo");
  };

  const handleSubmit = async (values, actions) => {
    try {
      dispatch({ type: "SUBMIT_REQUEST" });

      // Retrieve temporary user info from local storage
      const temporaryUserInfo = JSON.parse(
        localStorage.getItem("temporaryUserInfo")
      );
      console.log(values.otp);

      const { data } = await axios.put(
        `${request}/api/users/verify-otp/${temporaryUserInfo._id}`,
        {
          otp: values.otp,
        },
        {
          headers: { Authorization: `Bearer ${temporaryUserInfo.token}` },
        }
      );

      dispatch({ type: "SUBMIT_SUCCESS", payload: data });
      toast.success("OTP verified, login successfully", {
        position: "bottom-center",
      });
      setTimeout(() => {
        actions.resetForm();
      }, 2000);

      // Call the function here as well
      handleVerifiedOTP();

      navigate(redirect || "/");
    } catch (err) {
      dispatch({ type: "SUBMIT_FAIL" });
      console.log(getError(err));
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  // Function to handle OTP resend
  const handleResendOtp = async () => {
    try {
      // Retrieve temporary user info from local storage
      const temporaryUserInfo = JSON.parse(
        localStorage.getItem("temporaryUserInfo")
      );

      if (temporaryUserInfo && temporaryUserInfo.email) {
        // Your logic to resend OTP
        await axios.post(`${request}/api/users/otp-verification`, {
          email: temporaryUserInfo.email,
        });

        toast.success("Verification email resent successfully", {
          position: "bottom-center",
        });
      } else {
        // Handle the case where email is not found in local storage
        toast.error("Email not found in local storage", {
          position: "bottom-center",
        });
      }
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  return (
    <div className="form-box">
      <Helmet>
        <title>OTP verification</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>Verifying OTP code</p>
          </div>
        </div>
        <div className="form-box-content">
          <Formik
            initialValues={initialValues}
            validationSchema={otpSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              values,
            }) => (
              <Form action="" onSubmit={handleSubmit}>
                <div className="inner-form inner-form-small">
                  <h1>Enter OTP Code below</h1>
                  <div className="form-group">
                    <div className="d_flex">
                      <label
                        htmlFor="password"
                        className={
                          errors.password && touched.password ? "error" : ""
                        }
                      >
                        OTP<span className="red">*</span>
                      </label>
                      <span className="resend" onClick={handleResendOtp}>
                        Resend OTP
                      </span>
                    </div>

                    <Field
                      name="otp"
                      type="number"
                      value={values.otp}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.otp && touched.otp ? "input-error" : ""}
                      id="otp"
                      placeholder="Enter your otp code"
                    />

                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-btn">
                    <button className="form-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Verifying..." : " Verify OTP"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-lower-text">
            <div className="register_now">
              <h2>OTP Verification</h2>
              <p>
                Enter otp code in the field and click{" "}
                <span className="italics">Verify OTP</span> to verify otp code
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpScreen;
