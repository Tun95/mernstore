import React, { useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { sellerSchema } from "../../../components/schemas/Index";
import "./styles.scss";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { getError } from "../../../components/utilities/util/Utils";
import axios from "axios";
import { request } from "../../../base url/BaseUrl";
import LoadingBox from "../../../components/utilities/message loading/LoadingBox";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };

    default:
      return state;
  }
};
function VendorScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const initialValues = {
    company: "",
    taxNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    address: "",
    city: "",
    zipCode: "",
    status: false,
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  //==============
  // APPLY
  //==============
  const handleSubmit = async (values, actions) => {
    dispatch({ type: "CREATE_REQUEST" });

    try {
      if (userInfo.isAccountVerified) {
        toast.error("You need to be a verified user to apply as a merchant", {
          position: "bottom-center",
        });
      } else if (userInfo.isSeller) {
        toast.error("Your account has already been approved as a vendor", {
          position: "bottom-center",
        });
      } else {
        const { data } = await axios.post(
          `${request}/api/apply`,
          {
            company: values.company,
            taxNumber: values.taxNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            description: values.description,
            address: values.address,
            city: values.city,
            country: selectedCountry,
            state: selectedState,
            zipCode: values.zipCode,
            phone: selectedPhone,
            status: "pending",
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "CREATE_SUCCESS", payload: data });
        toast.success("Application sent successfully", {
          position: "bottom-center",
        });
      }
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      if (err.response && err.response.status === 401) {
        toast.error("Unauthorized. Please log in.", {
          position: "bottom-center",
        });
      } else {
        toast.error(getError(err), { position: "bottom-center" });
      }
    }
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };

  return (
    <div className="form-box">
      <Helmet>
        <title>Apply for a vendor account</title>
      </Helmet>
      <div className="container">
        <div className="quick_link ">
          <div className="page a_flex">
            <Link to="/">Home /</Link>
            <p>Apply for a vendor account</p>
          </div>
        </div>
        <div className="form-box-content">
          <Formik
            initialValues={initialValues}
            validationSchema={sellerSchema}
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
                  <h1 className="form_header">Apply for a vendor account</h1>
                  <div className="form-group">
                    <label
                      htmlFor="company"
                      className={
                        errors.company && touched.company ? "error" : ""
                      }
                    >
                      Company:<span className="red">*</span>
                    </label>
                    <Field
                      name="company"
                      type="company"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.company && touched.company ? "input-error" : ""
                      }
                      id="company"
                      placeholder="Enter your company name"
                    />
                    <ErrorMessage
                      name="company"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="taxNumber"
                      className={
                        errors.taxNumber && touched.taxNumber ? "error" : ""
                      }
                    >
                      Tax number:<span className="red">*</span>
                    </label>
                    <Field
                      name="taxNumber"
                      type="number"
                      value={values.taxNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.taxNumber && touched.taxNumber
                          ? "input-error"
                          : ""
                      }
                      id="taxNumber"
                      placeholder="Enter tax number"
                    />
                    <ErrorMessage
                      name="taxNumber"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="inline_input d_flex">
                    <div className="form-group">
                      <label
                        htmlFor="firstName"
                        className={
                          errors.firstName && touched.firstName ? "error" : ""
                        }
                      >
                        First name:<span className="red">*</span>
                      </label>
                      <Field
                        name="firstName"
                        type="firstName"
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
                        Last name:<span className="red">*</span>
                      </label>
                      <Field
                        name="lastName"
                        type="lastName"
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
                      E-mail:<span className="red">*</span>
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
                      htmlFor="description"
                      className={
                        errors.description && touched.description ? "error" : ""
                      }
                    >
                      Description:<span className="red">*</span>
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      type="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                  <div className="form-group">
                    <label
                      htmlFor="address"
                      className={
                        errors.address && touched.address ? "error" : ""
                      }
                    >
                      Address:<span className="red">*</span>
                    </label>
                    <Field
                      name="address"
                      type="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.address && touched.address ? "input-error" : ""
                      }
                      id="address"
                      placeholder="Enter your store address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="city"
                      className={errors.city && touched.city ? "error" : ""}
                    >
                      City:<span className="red">*</span>
                    </label>
                    <Field
                      name="city"
                      type="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.city && touched.city ? "input-error" : ""
                      }
                      id="city"
                      placeholder="Enter your city"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="inline_input d_flex">
                    <div className="form-group">
                      <label htmlFor="country">Country:</label>{" "}
                      <CountryDropdown
                        name="country"
                        value={selectedCountry} // Use selectedCountry state
                        onChange={(val) => setSelectedCountry(val)} // Update selectedCountry state
                        onBlur={handleBlur}
                        className="select_styles"
                      />
                    </div>
                    <div className="form-group">
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
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="zipCode"
                      className={
                        errors.zipCode && touched.zipCode ? "error" : ""
                      }
                    >
                      Zip/postal code:<span className="red">*</span>
                    </label>
                    <Field
                      name="zipCode"
                      type="zipCode"
                      value={values.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.zipCode && touched.zipCode ? "input-error" : ""
                      }
                      id="zipCode"
                      placeholder="Enter your zip/postal code"
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>{" "}
                    <PhoneInput
                      international
                      countryCallingCodeEditable={true}
                      inputProps={{
                        name: "phone",
                        id: "phone",
                      }}
                      country={selectedCountry}
                      value={selectedPhone}
                      onChange={(value, country) => setSelectedPhone(value)} // Update selectedPhone state
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="">
                    <span className="check_box_message">
                      <span className="check_box">
                        {" "}
                        <input
                          type="checkbox"
                          checked={values.status}
                          id="status"
                          className="flashdeal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="status">
                          I agree to the{" "}
                          <Link to="/terms-and-conditons">
                            terms and conditions
                          </Link>
                          <span className="red">*</span>
                        </label>
                      </span>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="error"
                      />
                    </span>
                  </div>
                  <div className="form-btn">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-submit-btn"
                    >
                      {isSubmitting ? (
                        <LoadingBox className="loading_submit" />
                      ) : (
                        <React.Fragment>Submit</React.Fragment>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="form-lower-text">
            <div className="register_now">
              <div className="vendor_application_description">
                <h2>Apply for a vendor account</h2>
                <p>Please provide a brief description of your store:</p>
                <p>As a vendor on our platform, you can:</p>
                <ul>
                  <li>Reach a wide audience of potential customers.</li>
                  <li>Manage your store and products with ease.</li>
                  <li>Track your sales and earnings.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorScreen;
