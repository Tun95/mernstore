import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "../styles/styles.scss";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utilities/util/Utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import LoadingBox from "../../utilities/message loading/LoadingBox";
import MessageBox from "../../utilities/message loading/MessageBox";
import { Helmet } from "react-helmet-async";
import PublishIcon from "@mui/icons-material/Publish";
import JoditEditor from "jodit-react";
import photo from "../../../assets/photo.jpg";
import me from "../../../assets/me.png";
import { request } from "../../../base url/BaseUrl";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};
function Vendor() {
  const editor = useRef(null);

  const params = useParams();
  const { id: userId } = params;
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;
  console.log(userInfo);

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    loadingUpdate: false,
  });

  const [company, setCompany] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image, setImage] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `${request}/api/users/info/${userId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setCountry(data.country);
        setImage(data.image);

        setSellerName(data?.seller?.name);
        setSellerLogo(data?.seller?.logo);
        setSellerDescription(data?.seller?.description);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  //==============
  //SUBMIT HANDLER
  //==============
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      const { data } = await axios.put(
        `${request}/api/users/profile`,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          image,
          country,
          sellerName,
          sellerLogo,
          sellerDescription,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({
        type: "USER_SIGNIN",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Vendor profile updated successfully", {
        position: "bottom-center",
      });
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  //==============
  //PROFILE PICTURE
  //===============
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(`${request}/api/upload`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      toast.success("Image uploaded successfully", {
        position: "bottom-center",
      });
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };

  //=====================
  //SELLER PROFILE PICTURE
  //======================
  const uploadSellerFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(`${request}/api/upload`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      toast.success("Image uploaded successfully", {
        position: "bottom-center",
      });
      setSellerLogo(data.secure_url);
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };

  //=================
  //VERIFICATION HANDLER
  //=================
  const verificationHandler = async () => {
    // dispatch({ type: "CREATE_REQUEST" });
    try {
      const { data } = await axios.post(
        `${request}/api/users/verification-token`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Verification email sent successfully ", {
        position: "bottom-center",
      });
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err), { position: "bottom-center" });
    }
  };

  console.log(user);
  return (
    <div className="user_profile_page">
      <div className="container ">
        <div className="profile">
          <Helmet>
            <title>User :: {`${user?.lastName} ${user?.firstName}`}</title>
          </Helmet>
          <div className="quick_link ">
            <div className="page a_flex">
              <Link to="/">Home /</Link>
              <p>
                &#160;{user?.lastName} {user?.firstName}
              </p>
            </div>
          </div>

          <div className="profile">
            <div className="profile-styles">
              <div className="profile_seller">
                <div className="profile_box">
                  <div className="profile-box">
                    <form onSubmit={submitHandler} className="profile_form">
                      <div className="profile-form-header seller_form_header">
                        <div className="c_flex seller_flex">
                          <div className="form_header seller_header">
                            <div className="user_image">
                              <div className="drop_zone">
                                <img
                                  src={image ? image : me}
                                  alt=""
                                  className="image"
                                />
                                <input
                                  className="profile-input-box"
                                  id="file"
                                  type="file"
                                  onChange={uploadFileHandler}
                                  style={{ display: "none" }}
                                />
                                <div className="icon_bg l_flex">
                                  <label htmlFor="file">
                                    <PublishIcon
                                      className={
                                        image ? "icon" : "icon no_image"
                                      }
                                      onChange={uploadFileHandler}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="user_details">
                              <div className="user_detail_list">
                                <label>Name:</label>
                                <h4>
                                  {user?.lastName}&#160;{user?.firstName}
                                </h4>
                              </div>
                              <div className="user_detail_list">
                                <label>Email:</label>
                                <h4>{user?.email}</h4>
                              </div>
                              {user?.address && (
                                <div className="user_detail_list">
                                  <label>Address:</label>
                                  <h4>{user?.address}</h4>
                                </div>
                              )}
                              {user?.country && (
                                <div className="user_detail_list">
                                  <label>Country:</label>
                                  <h4>{user?.country}</h4>
                                </div>
                              )}

                              <div className="user_detail_list">
                                <label>Account Status:</label>
                                {user?.isAccountVerified === false ? (
                                  <span className="unverified_account a_flex">
                                    unverified account
                                  </span>
                                ) : (
                                  <span className="verified_account a_flex">
                                    verified account
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>{" "}
                          <div className="form_header seller_header">
                            <div className="user_image">
                              <div className="drop_zone seller_drop_zone">
                                <img
                                  src={sellerLogo ? sellerLogo : photo}
                                  alt=""
                                  className="image"
                                />
                                <input
                                  className="profile-input-box"
                                  id="file"
                                  type="file"
                                  onChange={uploadSellerFileHandler}
                                  style={{ display: "none" }}
                                />
                                <div className="icon_bg l_flex">
                                  <label htmlFor="file">
                                    <PublishIcon
                                      className={"icon"}
                                      onChange={uploadSellerFileHandler}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="user_details">
                              <div className="user_detail_list">
                                <label>Name:</label>
                                <h4>
                                  {user?.lastName}&#160;{user?.firstName}
                                </h4>
                              </div>
                              <div className="user_detail_list">
                                <label>Email:</label>
                                <h4>{user?.email}</h4>
                              </div>
                              {user?.address && (
                                <div className="user_detail_list">
                                  <label>Address:</label>
                                  <h4>{user?.address}</h4>
                                </div>
                              )}
                              {user?.country && (
                                <div className="user_detail_list">
                                  <label>Country:</label>
                                  <h4>{user?.country}</h4>
                                </div>
                              )}
                              {user?.apply[0]?.status && (
                                <div className="user_detail_list">
                                  <label>Application Status:</label>
                                  {user?.apply[0]?.status === false ? (
                                    <span className="unverified_account a_flex">
                                      declined
                                    </span>
                                  ) : user?.apply[0]?.status === true &&
                                    user.isSeller === true ? (
                                    <span className="verified_account a_flex">
                                      approved
                                    </span>
                                  ) : user?.apply[0]?.status === true &&
                                    user?.isSeller === false ? (
                                    <span className="pending_account a_flex">
                                      pending
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="profile_inner_form">
                        {userInfo?.isSeller && (
                          <>
                            <div className="profile_user_form">
                              {" "}
                              <div className="profile_form_group">
                                <label htmlFor="company">Company </label>
                                <input
                                  className="profile-input-box"
                                  id="company"
                                  type="name"
                                  placeholder="Enter your company name"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                />
                              </div>
                              <div className="profile_form_group">
                                <label htmlFor="taxNumber">Tax number </label>
                                <input
                                  className="profile-input-box"
                                  id="taxNumber"
                                  type="number"
                                  placeholder="Enter tax number"
                                  value={taxNumber}
                                  onChange={(e) => setTaxNumber(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="firstName">First Name </label>
                                <input
                                  className="profile-input-box"
                                  id="firstName"
                                  type="name"
                                  placeholder="Enter your first name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="lastName">Last name </label>
                                <input
                                  className="profile-input-box"
                                  id="lastName"
                                  type="name"
                                  placeholder="Enter your last name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="email">E-mail </label>
                                <input
                                  className="profile-input-box"
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="address">Address </label>
                                <input
                                  className="profile-input-box"
                                  id="address"
                                  type="address"
                                  placeholder="Enter your store address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="country">Country </label>
                                <CountryDropdown
                                  name="country"
                                  value={selectedCountry} // Use selectedCountry state
                                  onChange={(val) => setSelectedCountry(val)} // Update selectedCountry state
                                  // onBlur={handleBlur}
                                  className="select_styles"
                                />
                              </div>
                              <div className="profile_form_group">
                                <label htmlFor="state">State/Province </label>
                                <RegionDropdown
                                  country={selectedCountry} // Use selectedCountry state
                                  name="state"
                                  value={selectedState} // Use selectedState state
                                  onChange={(val) => setSelectedState(val)} // Update selectedState state
                                  // onBlur={handleBlur}
                                  className="select_styles"
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="city">City </label>
                                <input
                                  className="profile-input-box"
                                  id="city"
                                  type="text"
                                  placeholder="Enter your city"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </div>{" "}
                              <div className="profile_form_group">
                                <label htmlFor="zipCode">
                                  Zip/postal code{" "}
                                </label>
                                <input
                                  className="profile-input-box"
                                  id="zipCode"
                                  type="zipCode"
                                  placeholder="Enter your zip/postal code"
                                  value={zipCode}
                                  onChange={(e) => setZipCode(e.target.value)}
                                />
                              </div>
                              <div className="profile_form_group">
                                <label htmlFor="phone">Phone </label>
                                <PhoneInput
                                  international
                                  countryCallingCodeEditable={true}
                                  inputProps={{
                                    name: "phone",
                                    id: "phone",
                                  }}
                                  country={selectedCountry}
                                  value={selectedPhone}
                                  onChange={(value, country) =>
                                    setSelectedPhone(value)
                                  } // Update selectedPhone state
                                  // onBlur={handleBlur}
                                />
                              </div>
                            </div>
                            <div className="seller_component">
                              <div className="profile-form-group">
                                <label htmlFor="sellerdesc">Description:</label>
                                <div className="form_box">
                                  <JoditEditor
                                    className="editor"
                                    id="desc"
                                    ref={editor}
                                    value={sellerDescription}
                                    tabIndex={1}
                                    onBlur={(newContent) =>
                                      setSellerDescription(newContent)
                                    }
                                    onChange={(newContent) => {}}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="profile_form_button">
                          <button className="a_flex" disabled={loading}>
                            {loading ? (
                              <div className="loading-spinner">Loading...</div>
                            ) : (
                              <>
                                <DescriptionOutlinedIcon className="icon" />{" "}
                                Save
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Vendor;
