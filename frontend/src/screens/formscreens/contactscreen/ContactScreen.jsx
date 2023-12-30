import React, { useContext, useReducer } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";

import { Helmet } from "react-helmet-async";
import "../styles/style.scss";
import { contactSchema } from "../../../components/schemas/Index";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../components/utilities/util/Utils";
import { request } from "../../../base url/BaseUrl";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false };
    case "POST_FAIL":
      return { ...state, loading: false };

    default:
      return state;
  }
};
function ContactScreen() {
  const { state } = useContext(Context);
  const { settings } = state;
  const { email, shortDesc, storeAddress, whatsapp } =
    (settings &&
      settings
        .map((s) => ({
          shortDesc: s.shortDesc,
          storeAddress: s.storeAddress,
          whatsapp: s.whatsapp,
          email: s.email,
        }))
        .find(() => true)) ||
    {};

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      dispatch({ type: "POST_REQUEST" });
      const { data } = axios.post(`${request}/api/message`, {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      dispatch({ type: "POST_SUCCESS", payload: data });
      toast.success("Email sent successfully", { position: "bottom-center" });
    } catch (err) {
      dispatch({ type: "POST_FAIL" });
      toast.error(getError(err), { position: "bottom-center" });
    }
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };

  return (
    <div className="form-box">
      <Helmet>
        <title>Contact us</title>
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
            validationSchema={contactSchema}
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
                  <h1>Contact Us</h1>

                  <div className="contact_form_group">
                    <div className="form-group">
                      <label
                        htmlFor="name"
                        className={errors.name && touched.name ? "error" : ""}
                      >
                        Full name:<span className="red">*</span>
                      </label>
                      <Field
                        name="name"
                        type="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name ? "input-error" : ""
                        }
                        id="name"
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className={errors.email && touched.email ? "error" : ""}
                      >
                        Eamil:<span className="red">*</span>
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
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="subject"
                      className={
                        errors.subject && touched.subject ? "error" : ""
                      }
                    >
                      Title:<span className="red">*</span>
                    </label>
                    <Field
                      name="subject"
                      type="subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.subject && touched.subject ? "input-error" : ""
                      }
                      id="subject"
                      placeholder="Enter your message title"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="message"
                      className={
                        errors.message && touched.message ? "error" : ""
                      }
                    >
                      Message:<span className="red">*</span>
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      type="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.message && touched.message
                          ? "textarea input-error"
                          : "textarea"
                      }
                      placeholder="Enter your message..."
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-btn">
                    <button disabled={isSubmitting} className="form-submit-btn">
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-lower-text">
            <div className="register_now">
              <div className="contact_info">
                <h2>Contact Information</h2>
                <p>{shortDesc}</p>
                <address>
                  <p className="lower">Address: {storeAddress}</p>
                  <p className="lower">Email: {email}</p>
                  <p className="lower">Phone: {whatsapp}</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
