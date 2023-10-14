import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import NearMeIcon from "@mui/icons-material/NearMe";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import "./styles.scss";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utilities/util/Utils";
import {
  commentSchema,
  loginSchema,
  reviewSchema,
  validationSchema,
} from "../schemas/Index";
import { Rating } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

//MAP MODAL
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

//SELECT LOCATION MODAL
export function SelectLocationModal() {
  //GOOGLE MAP
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <Button disableRipple onClick={handleOpen} className="button-text a_flex">
        <NearMeIcon className="icon" />
        <small>My Location</small>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_location">
          <div className="map_header c_flex">
            <h1>Select your city</h1>
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

//CALL MODAL
const initialValues = {
  name: "",
  phone: "",
  convenientTimeFrom: "09:00", // Default start time
  convenientTimeTo: "17:00", // Default end time
};
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

//LOGIN MODAL
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

//REVIEW MODAL
const initialReviewValues = {
  name: "",
  rating: "",
  description: "",
};
export function RatingInput({ field, form }) {
  const { name, value } = field;

  return (
    <div className="review_rating">
      <Rating
        name="rating"
        className="rating"
        value={value}
        onChange={(event, newValue) => {
          form.setFieldValue(name, newValue);
        }}
      />
    </div>
  );
}
export function ReviewModal() {
  //REVIEW MODAL
  const [openReview, setOpenReview] = React.useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  //=========
  // REVIEW
  //=========
  const handleSubmit = () => {};
  return (
    <>
      <button onClick={handleOpenReview}>Write a review</button>
      <Modal
        open={openReview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call login_modal review_modal">
          <div className="call_header c_flex">
            <h1>Write a review</h1>
            <CloseIcon onClick={handleCloseReview} className="call_icon" />
          </div>
          <div className="call login_form">
            <Formik
              initialValues={initialReviewValues}
              validationSchema={reviewSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="call_request">
                    <div
                      className={`form_group ${
                        touched.name && errors.name ? "error" : ""
                      }`}
                    >
                      <label
                        htmlFor="name"
                        className={errors.name && touched.name ? "error" : ""}
                      >
                        Your name:<span className="red">*</span>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="your name"
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
                    <div className="form_group">
                      <label
                        htmlFor="rating"
                        className={
                          errors.rating && touched.rating ? "error" : ""
                        }
                      >
                        Your rating:<span className="red">*</span>
                      </label>
                      <Field
                        name="rating"
                        component={RatingInput} // Use the custom RatingInput component
                      />
                      <ErrorMessage
                        name="rating"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form_group">
                      <label
                        htmlFor="description"
                        className={
                          errors.description && touched.description
                            ? "error"
                            : ""
                        }
                      >
                        Description:<span className="red">*</span>
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        type="description"
                        className={
                          errors.description && touched.description
                            ? "textarea input-error"
                            : "textarea"
                        }
                        placeholder="Tell us about your products and store..."
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="call_btn c_flex">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
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

//COMMENT MODAL
const initialCommentValues = {
  name: "",
  comment: "",
};
export function CommentModal() {
  //COMMENT MODAL
  const [openReview, setOpenReview] = React.useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  //=========
  // COMMENT
  //=========
  const handleSubmit = () => {};
  return (
    <>
      <button onClick={handleOpenReview}>Write a review</button>
      <Modal
        open={openReview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call login_modal review_modal">
          <div className="call_header c_flex">
            <h1>Write a review</h1>
            <CloseIcon onClick={handleCloseReview} className="call_icon" />
          </div>
          <div className="call login_form">
            <Formik
              initialValues={initialCommentValues}
              validationSchema={commentSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="call_request">
                    <div
                      className={`form_group ${
                        touched.name && errors.name ? "error" : ""
                      }`}
                    >
                      <label
                        htmlFor="name"
                        className={errors.name && touched.name ? "error" : ""}
                      >
                        Your name:<span className="red">*</span>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="your name"
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

                    <div className="form_group">
                      <label
                        htmlFor="comment"
                        className={
                          errors.comment && touched.comment ? "error" : ""
                        }
                      >
                        Your message:<span className="red">*</span>
                      </label>
                      <Field
                        as="textarea"
                        id="comment"
                        name="comment"
                        type="comment"
                        className={
                          errors.comment && touched.comment
                            ? "textarea input-error"
                            : "textarea"
                        }
                        placeholder="your message here..."
                      />
                      <ErrorMessage
                        name="comment"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="call_btn c_flex">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
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

//SHIPPING MODAL
export function ShippingModal() {
  //SHIPPING MODAL
  const [openShipping, setOpenShipping] = React.useState(false);
  const handleOpenShipping = () => setOpenShipping(true);
  const handleCloseShipping = () => setOpenShipping(false);

  //============
  //SHIPPING HANDLER
  //============
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  return (
    <>
      <Button
        disableRipple
        onClick={handleOpenShipping}
        className="button-text a_flex"
      >
        <LocalShippingOutlinedIcon className="icon" />
        <small>Shipping: </small>
      </Button>
      <Modal
        open={openShipping}
        onClose={handleCloseShipping}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call  shipping_modal">
          <div className="call_header c_flex">
            <span></span>
            <CloseIcon onClick={handleCloseShipping} className="call_icon" />
          </div>
          <div className="shipping">
            <div className="content">
              <div className="rate a_flex">
                <h5>Shipping time and rates: </h5>
                <SelectLocationModal />
              </div>
              <div className="table">
                {" "}
                <table>
                  <thead>
                    <tr>
                      <th>Shipping method</th>
                      <th>Shipping time</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Standard Shipping</td>
                      <td>2-5 days</td>
                      <td>$5.99</td>
                    </tr>
                    <tr>
                      <td>Express Shipping</td>
                      <td>1-2 days</td>
                      <td>$12.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="shipping_btn">
              <button onClick={handleCloseShipping}>Close</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
