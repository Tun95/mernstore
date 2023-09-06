import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import NearMeIcon from "@mui/icons-material/NearMe";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import "./styles.scss";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utilities/util/Utils";
import { loginSchema } from "../schemas/Index";

export function LocationModal() {
  //GOOGLE MAP
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <Button onClick={handleOpen} className="button-text a_flex">
        <NearMeIcon className="icon" />
        <span>My Location</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_location">
          <div className="map_header c_flex">
            <h1>Customer location</h1>
            <CloseIcon onClick={handleClose} className="map_icon" />
          </div>
          <div className="map"></div>
          <div className="map_btn">
            <button>OK</button>
          </div>
        </Box>
      </Modal>
    </span>
  );
}

//REQUEST CALL
const initialValues = {
  name: "",
  phone: "",
  convenientTimeFrom: "09:00", // Default start time
  convenientTimeTo: "17:00", // Default end time
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  convenientTimeFrom: Yup.string().required("Start time is required"),
  convenientTimeTo: Yup.string()
    .required("End time is required")
    .when("convenientTimeFrom", (convenientTimeFrom, schema) => {
      return schema.test({
        test: (convenientTimeTo) => convenientTimeTo > convenientTimeFrom,
        message: "End time must be later than start time",
      });
    }),
});
export function CallRequestModals() {
  //CALL MODAL
  const [openCall, setOpenCall] = React.useState(false);
  const handleOpenCall = () => setOpenCall(true);
  const handleCloseCall = () => setOpenCall(false);

  //============
  //CALL HANDLER
  //============
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  return (
    <>
      <button onClick={handleOpenCall}>Request call</button>
      <Modal
        open={openCall}
        onClose={handleCloseCall}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call">
          <div className="call_header c_flex">
            <h1>Request a call</h1>
            <CloseIcon onClick={handleCloseCall} className="call_icon" />
          </div>
          <div className="call">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="call_request">
                    <div
                      className={`form_group ${
                        touched.name && errors.name ? "error" : ""
                      }`}
                    >
                      <label htmlFor="name">
                        Name<span className="red">*</span>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`input_box ${
                          touched.name && errors.name ? "error-border" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div
                      className={`form_group ${
                        touched.phone && errors.phone ? "error" : ""
                      }`}
                    >
                      <label htmlFor="phone">
                        Phone<span className="red">*</span>
                      </label>
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        className={`input_box ${
                          touched.phone && errors.phone ? "error-border" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="time">
                      <label htmlFor="time">Convenient time</label>
                      <div className="request_time mb">
                        <label htmlFor="convenientTimeFrom">From:</label>
                        <Field
                          type="time"
                          id="convenientTimeFrom"
                          name="convenientTimeFrom"
                          className={`time_input ${
                            touched.convenientTimeFrom &&
                            errors.convenientTimeFrom
                              ? "error-border"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="convenientTimeFrom"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="request_time">
                        <label htmlFor="convenientTimeTo">To:</label>
                        <Field
                          type="time"
                          id="convenientTimeTo"
                          name="convenientTimeTo"
                          className={`time_input ${
                            touched.convenientTimeTo && errors.convenientTimeTo
                              ? "error-border"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="convenientTimeTo"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="call_btn">
                    <button type="submit">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </>
  );
}

const initialLoginValues = {
  email: "",
  password: "",
};

export function LoginModals({ toggleDrawer, anchor }) {
  const { state, dispatch: ctxDispatch } = useContext(Context);

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUnUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUnUrl ? redirectUnUrl : "/";

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

  //LOGIN MODAL
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

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
      toggleDrawer(anchor, false);
      navigate(redirect || "/");
      toast.success("Sign in successfully", { position: "bottom-center" });
      handleCloseLogin();
    } catch (err) {
      toast.error(getError(err), {
        position: "bottom-center",
        limit: 1,
      });
    }
  };

  return (
    <>
      <button className="modal_login_btn" onClick={handleOpenLogin}>
        Log In
      </button>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call login_modal">
          <div className="call_header c_flex">
            <h1>Log In</h1>
            <CloseIcon onClick={handleCloseLogin} className="call_icon" />
          </div>
          <div className="call login_form">
            <Formik
              initialValues={initialLoginValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="call_request">
                    <div
                      className={`form_group ${
                        touched.email && errors.email ? "error" : ""
                      }`}
                    >
                      <label htmlFor="email">
                        E-mail<span className="red">*</span>
                      </label>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        className={`input_box ${
                          touched.email && errors.email ? "error-border" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className={`form_group `}>
                      <div className="d_flex">
                        <label
                          htmlFor="password"
                          className={
                            errors.password && touched.password ? "error" : ""
                          }
                        >
                          Password<span className="red">*</span>
                        </label>
                        <Link
                          to="/forgot-password"
                          onClick={toggleDrawer(anchor, false)}
                        >
                          Forgot Your Password?
                        </Link>
                      </div>
                      <Field
                        type={type}
                        id="password"
                        name="password"
                        className={`input_box ${
                          touched.password && errors.password
                            ? "error-border"
                            : ""
                        }`}
                      />
                      <span onClick={handleToggle}>
                        <Icon
                          icon={icon}
                          size={20}
                          className={`eye-icon ${
                            touched.password && errors.password ? "error" : ""
                          }`}
                        />
                      </span>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="call_btn c_flex">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                    <label htmlFor="rememberModal" className="remember a_flex">
                      <input type="checkbox" id="rememberModal" />
                      <small>Remember me</small>
                    </label>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </>
  );
}
