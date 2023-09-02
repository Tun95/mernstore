import React, { useReducer } from "react";
import "../styles/style.scss";

import { Formik, ErrorMessage, Field, Form } from "formik";
import { resetSchema } from "../../../components/schemas/Index";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import { toast } from "react-toastify";
import { getError } from "../../../components/utilities/util/Utils";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
function PasswordEmailResetScreen() {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      dispatch({ type: "SUBMIT_REQUEST" });
      const { data } = await axios.post(`${request}/api/users/password-token`, {
        email: values.email,
      });
      dispatch({ type: "SUBMIT_SUCCESS", payload: data });
      toast.success("Password reset email successfully sent to your email", {
        position: "bottom-center",
      });
    } catch (err) {
      dispatch({ type: "SUBMIT_FAIL" });
      toast.error(getError(err), { position: "bottom-center" });
    }
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };

  return (
    <div className="form-box">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p> Reset Password</p>
          </div>
        </div>
        <div className="form-box-content">
          <Formik
            initialValues={initialValues}
            validationSchema={resetSchema}
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
                  <h1>Reset Password</h1>
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
                  <div className="form-btn">
                    <button className="form-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Reset Password"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-lower-text">
            <div className="register_now">
              <h2>Reset password</h2>
              <p>
                If you have forgotten your password, enter your email address in
                the field and click{" "}
                <span className="italics">Reset password</span>.{" "}
              </p>
              <p>
                You will receive a new password and a link to sign in. You will
                be able to change the password later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordEmailResetScreen;
