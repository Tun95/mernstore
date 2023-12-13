import React, { useContext, useEffect, useRef, useState } from "react";
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
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import no from "../../assets/details/no.jpg";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

//TEXT TRUNCATE
function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + " ...";
}

mapboxgl.accessToken =
  "pk.eyJ1IjoidHVuOTUiLCJhIjoiY2xxMjF6aWl0MDEzOTJpb3A1cTF2NWRkcyJ9.jrO6QTfve13cZ81zHpCSOw";

// MAP MODAL
export function LocationModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    return () => {
      // Cleanup the map when the component is unmounted
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lat, lng, open, zoom]);
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
          <div className="map">
            {/* map here please */}
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
          </div>
          {/* <div className="map_btn">
            <button>OK</button>
          </div> */}
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

//PRODUCT REVIEW MODAL
const initialProductReviewValues = {
  name: "",
  rating: "",
  description: "",
};
export function ProductRatingInput({ field, form }) {
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
export function ProductReviewModal() {
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
      <button onClick={handleOpenReview} className="review_btn">
        Write a review
      </button>
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
              initialValues={initialProductReviewValues}
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
                        component={ProductRatingInput} // Use the custom RatingInput component
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
                        placeholder="Write your experience here..."
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
export function CommentModal({ blogId, fetchComments }) {
  const { state } = useContext(Context);
  const { userInfo } = state;

  // COMMENT MODAL
  const [openReview, setOpenReview] = React.useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  // COMMENT
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { name, comment } = values;

      await axios.post(
        `${request}/api/blog/${blogId}/create-comment`,
        {
          name,
          comment,
          email: userInfo.email,
          image: userInfo.image,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      fetchComments();
      resetForm(initialCommentValues);
      handleCloseReview();
      toast.success("Comment created successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(getError(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={handleOpenReview}>Write a comment</button>
      <Modal
        open={openReview}
        onClose={handleCloseReview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call login_modal review_modal">
          <div className="call_header c_flex">
            <h1>Write your comment</h1>
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

//SHIPPING METHOD MODAL
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

//DISCOUNT MODAL
export function CartDiscountModal() {
  //DISCOUNT MODAL
  const [openDiscount, setOpenDiscount] = React.useState(false);
  const handleOpenDiscount = () => setOpenDiscount(true);
  const handleCloseDiscount = () => setOpenDiscount(false);

  //============
  //DISCOUNT HANDLER
  //============
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  return (
    <>
      <Button
        disableRipple
        onClick={handleOpenDiscount}
        className="button-text a_flex"
      >
        <small>Discount</small>
      </Button>
      <Modal
        open={openDiscount}
        onClose={handleCloseDiscount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call  shipping_modal cart_discount_modal">
          <div className="call_header c_flex">
            <span>Discount</span>
            <CloseIcon onClick={handleCloseDiscount} className="call_icon" />
          </div>
          <div className="shipping">
            <div className="content">
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Discount</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$1,489.00</td>
                      <td className="qty">1</td>
                      <td>$893.40</td>
                      <td>$595.60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

//CALCULATE SHIPPING MODAL
const initialShippingValues = { city: "", zipCode: "" };
export function CalculateShippingModals() {
  const { convertCurrency } = useContext(Context);
  //CALCULATE MODAL
  const [openCalculate, setOpenCalculate] = React.useState(false);
  const handleOpenCalculate = () => setOpenCalculate(true);
  const handleCloseCalculate = () => setOpenCalculate(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  //============
  //CALCULATE HANDLER
  //============
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  return (
    <>
      <Button
        disableRipple
        onClick={handleOpenCalculate}
        className="button-text a_flex"
      >
        <small>Calculate</small>
      </Button>
      <Modal
        open={openCalculate}
        onClose={handleCloseCalculate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_call calculate_shipping_modal">
          <div className="call_header c_flex">
            <h1>Calculate shipping cost</h1>
            <CloseIcon onClick={handleCloseCalculate} className="call_icon" />
          </div>
          <div className="call">
            <Formik
              initialValues={initialShippingValues}
              onSubmit={handleSubmit}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting,
                values,
              }) => (
                <Form action="" onSubmit={handleSubmit} className="over_flow">
                  <div className="inner_form">
                    <div className="form-group c_flex">
                      <label htmlFor="country">
                        Country: <span className="red">*</span>
                      </label>
                      <CountryDropdown
                        name="country"
                        value={selectedCountry} // Use selectedCountry state
                        onChange={(val) => setSelectedCountry(val)} // Update selectedCountry state
                        onBlur={handleBlur}
                        className="select_styles"
                      />
                    </div>
                    <div className="form-group c_flex">
                      <label htmlFor="state">State/Province:</label>
                      <RegionDropdown
                        country={selectedCountry} // Use selectedCountry state
                        name="state"
                        value={selectedState} // Use selectedState state
                        onChange={(val) => setSelectedState(val)} // Update selectedState state
                        onBlur={handleBlur}
                        className="select_styles"
                      />
                    </div>
                    <div className="form-group c_flex">
                      <label htmlFor="city">City:</label>
                      <Field
                        name="city"
                        type="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="city"
                        placeholder="City"
                      />
                    </div>
                    <div className="form-group c_flex">
                      <label htmlFor="zipCode">ZipCode:</label>
                      <Field
                        name="zipCode"
                        type="zipCode"
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="zipCode"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                  <div className="details">
                    <div className="header">
                      <h3>Select shipping method</h3>
                      <h4>BestBuy</h4>
                    </div>
                    <div className="list">
                      <ul>
                        <li>
                          AB: Apple MacBook Air 13.6" M2 256GB 2022 (MLXW3UA/A)
                          Space Gray
                        </li>
                        <li>
                          AB: Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3RX/A)
                        </li>
                      </ul>
                    </div>
                    <div className="shipping_method">
                      <label htmlFor="custom" className="custom a_flex">
                        <input type="radio" id="custom" />
                        <p>
                          Custom shipping method (3-5 days){" "}
                          {convertCurrency(25.45)}
                        </p>
                      </label>
                      <div className="total a_flex">
                        <h5>Total: </h5>
                        <small>{convertCurrency(25.45)}</small>
                      </div>
                    </div>
                  </div>
                  <div className="btn call_btn c_flex">
                    {/* <button>Get rate</button> */}
                    <button>Recalculate rates</button>
                    <button>Select shipping method</button>
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

//VIDEO REVIEW MODAL
export function VideoModal({ item }) {
  //GOOGLE MAP
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <span onClick={handleOpen} className="button-text a_flex">
        <div className="thumbnail_icon">
          <img
            src={item.videoThumbnail ? item.videoThumbnail : no}
            alt={item.videoTitle}
            className="img"
          />
          <div className="icon_bg l_flex">
            <PlayArrowIcon className="icon" />
          </div>
        </div>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="customer_location video_modal">
          <div className="map_header c_flex">
            <h1>{truncateText(item.videoTitle, 9)}</h1>
            <CloseIcon onClick={handleClose} className="map_icon" />
          </div>
          <div className="video">
            <iframe
              width="100%"
              height="600"
              src={item.videoLink}
              title={item.videoTitle}
              frameborder="0"
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen="1"
              data-frameborder="0"
              data-allowfullscreen="1"
            ></iframe>
          </div>
        </Box>
      </Modal>
    </span>
  );
}
