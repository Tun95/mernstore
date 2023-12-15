import React, { useContext, useEffect, useReducer, useState } from "react";
import "../styles/style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage, Field, Form } from "formik";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { basicSchema } from "../../../components/schemas/Index";
import { Context } from "../../../context/Context";
import axios from "axios";
import { getError } from "../../../components/utilities/util/Utils";
import { toast } from "react-toastify";
import { request } from "../../../base url/BaseUrl";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Helmet } from "react-helmet-async";

function RegisterScreen() {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectUnUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUnUrl ? redirectUnUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    subscribeCheckbox: false,
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
  //TOGGLE PASSWOD VIEW
  const [typeCom, setTypeCom] = useState("password");
  const [iconCom, setIconCom] = useState(eyeOff);

  const handleComToggle = () => {
    if (typeCom === "password") {
      setIconCom(eye);
      setTypeCom("text");
    } else {
      setIconCom(eyeOff);
      setTypeCom("password");
    }
  };

  //==================================
  //REGISTER AND VERIFICATION HANDLER
  //==================================
  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(`${request}/api/users/signup`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("temporaryUserInfo", JSON.stringify(data));

      // Check if the subscribeCheckbox is checked
      if (values.subscribeCheckbox) {
        // Subscribe only if the checkbox is checked
        handleCheckbox(values.email, actions);
      }

      // Send OTP verification email
      const otpResponse = await axios.post(
        `${request}/api/users/otp-verification`,
        {
          email: values.email,
        }
      );

      if (otpResponse.status === 200) {
        // Redirect to OTP verification screen
        setTimeout(() => {
          actions.resetForm();
        }, 1000);
        navigate("/otp-verification");
        toast.success(
          "An OTP Verification email has been sent to your email.",
          {
            position: "bottom-center",
          }
        );
      } else {
        // Handle error
        toast.error("Failed to send verification email", {
          position: "bottom-center",
        });
      }
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center", limit: 1 });
    }
  };

  //===========
  // Subscribe
  //===========
  const handleCheckbox = async (email, actions) => {
    try {
      const response = await axios.post(`${request}/api/message/subscribe`, {
        email: email, // or email directly if the variable is named email
      });

      const data = await response.data; // Use response.data directly instead of response.json()

      if (response.status === 200) {
        toast.success(data.message);
        console.log("Subscription successful:", data.message);
      } else {
        toast.error(data.message);
        console.error("Subscription failed:", data.message);
      }
    } catch (error) {
      toast.error(getError(error));
      console.error("Error during subscription:", error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="form-box">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p> Registration</p>
          </div>
        </div>
        <div className="form-box-content">
          <Formik
            initialValues={initialValues}
            validationSchema={basicSchema}
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
                  <h1>Register for a new account</h1>
                  <div className="inline_input d_flex">
                    <div className="form-group">
                      <label
                        htmlFor="firstName"
                        className={
                          errors.firstName && touched.firstName ? "error" : ""
                        }
                      >
                        First Name<span className="red">*</span>
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.firstName && touched.firstName
                            ? "input-error"
                            : ""
                        }
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="lastName"
                        className={
                          errors.lastName && touched.lastName ? "error" : ""
                        }
                      >
                        Last Name<span className="red">*</span>
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.lastName && touched.lastName
                            ? "input-error"
                            : ""
                        }
                        id="lastName"
                        placeholder="Enter your last name"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
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
                    <label
                      htmlFor="password"
                      className={
                        errors.password && touched.password ? "error" : ""
                      }
                    >
                      Password<span className="red">*</span>
                    </label>
                    <Field
                      name="password"
                      type={type}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? "input-error" : ""
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
                  <div className="form-group">
                    <label
                      htmlFor="cpassword"
                      className={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                          ? "error"
                          : ""
                      }
                    >
                      Comfirm Password<span className="red">*</span>
                    </label>
                    <Field
                      name="passwordConfirmation"
                      type={typeCom}
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                          ? "input-error"
                          : ""
                      }
                      id="cpassword"
                      placeholder="Comfirm password"
                    />
                    <span onClick={handleComToggle}>
                      <Icon icon={iconCom} size={20} className="eye-icon" />
                    </span>
                    <ErrorMessage
                      name="passwordConfirmation"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="mailing">
                    <h1>Mailing lists</h1>
                    <p>Sign up for our newsletters!</p>
                    <label
                      htmlFor="subscribeCheckbox"
                      className="remember a_flex"
                    >
                      <Field
                        type="checkbox"
                        id="subscribeCheckbox"
                        name="subscribeCheckbox"
                        checked={values.subscribeCheckbox}
                        onChange={handleChange}
                      />
                      <small>
                        Company news and unique discounts for subscribers
                      </small>
                    </label>
                  </div>
                  <div className="form-btn">
                    <button disabled={isSubmitting} className="form-submit-btn">
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-lower-text">
            <div className="register_now">
              <h2>Benefits of becoming a registered member</h2>
              <small>
                <ul>
                  <li>Log in at any time to check order statuses</li>
                  <li>Personalize your shopping</li>
                  <li>Speed up future purchases</li>
                </ul>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
