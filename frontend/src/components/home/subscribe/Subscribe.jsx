import React, { useContext } from "react";
import "./styles.scss";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getError } from "../../utilities/util/Utils";
import { Context } from "../../../context/Context";
import { request } from "../../../base url/BaseUrl";
import EmailIcon from "@mui/icons-material/Email";

const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required*"),
});

function Subscribe() {
  const initialValues = {
    email: "",
  };

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings, userInfo } = state;

  const handleSubmit = async (values, actions) => {
    try {
      const { data } = await axios.post(`${request}/api/message/subscribe`, {
        email: values.email,
      });
      toast.success("You have successfully subscribed to our newsletter", {
        position: "bottom-center",
      });
      actions.resetForm();
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  return (
    <div className="subscribe">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="main_header">
              <h2>About company</h2>
            </div>
            <small>
              A site that sells products online. Allows users to create a
              purchase order, choose a payment method and deliver the order on
              the Internet. Having chosen the necessary goods or services, the
              user usually has the opportunity to select a method of payment and
              delivery on the site right away. The main difference between the
              Internet store and the traditional one is in the type of the
              trading platform. A typical store needs a trading hall, shop
              windows, price tags, as well as sellers, cashiers and experienced
              consultants, the online store has the entire infrastructure
              implemented programmatically.
            </small>
          </div>
          <div className="group d_flex">
            <div className="form_group">
              <div className="head l_flex">
                <h2>Stay Connected</h2>
                <p>
                  Exclusive discounts Subscribe to our news and get a 10%
                  discount coupon!
                </p>
              </div>
              <div className="form l_flex">
                {" "}
                <Formik
                  initialValues={initialValues}
                  validationSchema={SubscribeSchema}
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
                    <Form
                      action=""
                      onSubmit={handleSubmit}
                      className="f_flex subscribe_box_content"
                    >
                      <div className="content">
                        <div
                          className={
                            errors.email && touched.email
                              ? "input-box a_flex input-error"
                              : "input-box a_flex"
                          }
                        >
                          <Field
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            placeholder="E-mail"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="btn">
                        <button type="submit" disabled={isSubmitting}>
                          Subscribe
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="form_group">
              <div className="head l_flex">
                <h2>Get social</h2>
                <p>
                  Join us in the group and be the first to know all promotions
                  and offers!
                </p>
              </div>
              <div className="icons p_flex">
                <div className="social_icons f_flex">
                  <div className="icon l_flex">
                    <a href="/#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </div>
                  <div className="icon l_flex">
                    <a href="/#">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                  <div className="icon l_flex">
                    <a href="/#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        className="white-fill"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                      </svg>
                    </a>
                  </div>
                  <div className="icon l_flex">
                    <a href="/#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                  <div className="icon l_flex">
                    <a href="/#">
                      <i className="fa-brands fa-skype"></i>
                    </a>
                  </div>
                  <div className="icon l_flex">
                    <a href="/#">
                      <i className="fa-brands fa-pinterest-p"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
