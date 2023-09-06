import React, { useContext, useEffect, useState } from "react";
import "../styles/style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from "formik";

import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { loginSchema } from "../../../components/schemas/Index";
import { Context } from "../../../context/Context";
import { getError } from "../../../components/utilities/util/Utils";
import { request } from "../../../base url/BaseUrl";
import { Helmet } from "react-helmet-async";
import { GoogleLogin } from "@react-oauth/google";

function LoginScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUnUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUnUrl ? redirectUnUrl : "/";

  const initialValues = {
    email: "",
    password: "",
  };

  //TOGGLE PASSWOD VIEW
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  //=========
  // LOG IN
  //=========
  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(`${request}/api/users/signin`, {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setTimeout(() => {
        actions.resetForm();
      }, 1000);
      navigate(redirect || "/");
      toast.success("Sign in successfully", { position: "bottom-center" });
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-center",
        limit: 1,
      });
    }
  };

  //============
  //GOOGLE LOGIN
  //============
  // const handleGoogleLoginSuccess = (response) => {
  //   // Send the Google access token to your backend for validation
  //   // Here, you can use an API endpoint to handle the communication with your backend
  //   fetch(`${request}/api/users/auth/google`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${response.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Data returned from the backend (including JWT token)
  //       console.log(data);

  //       // Save the token to localStorage or handle it securely based on your needs
  //       localStorage.setItem("userInfo", JSON.stringify(data.token));

  //       // Redirect the user to the dashboard or any other protected route
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Error during Google login:", error);
  //     });
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.log("Google login failed:", error);
  // };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="form-box  mb">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p> Sign In</p>
          </div>
        </div>
        <div className="form-box-content">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
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
                  <div className="inner-form">
                    <h1>Login</h1>
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className={errors.email && touched.email ? "error" : ""}
                      >
                        E-mail<span className="red">*</span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email ? "input-error" : ""
                        }
                        id="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <div className="d_flex">
                        <label
                          htmlFor="password"
                          className={
                            errors.password && touched.password ? "error" : ""
                          }
                        >
                          Password<span className="red">*</span>
                        </label>
                        <Link to="/forgot-password">Forgot Your Password?</Link>
                      </div>
                      <Field
                        name="password"
                        type={type}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password
                            ? "input-error"
                            : ""
                        }
                        id="password"
                        placeholder="Enter your password"
                      />
                      <span onClick={handleToggle}>
                        <Icon icon={icon} size={20} className="eye-icon" />
                      </span>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-btn c_flex">
                      <button
                        className="form-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                      <label htmlFor="remember" className="remember a_flex">
                        <input type="checkbox" id="remember" />
                        <small>Remember me</small>
                      </label>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <div className="form-lower-text">
              <div className="register_now">
                <h2>Not a registered member?</h2>
                <p>
                  Creating a new account is easy and takes less than a minute.
                </p>
                <Link to="/register">Register for a new account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
