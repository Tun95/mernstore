import React, { useContext, useReducer, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import photo from "../../../assets/photo.jpg";
import { Helmet } from "react-helmet-async";
import { Context } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { request } from "../../../../base url/BaseUrl";
import { toast } from "react-toastify";
import { getError } from "../../../../components/utilities/util/Utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
function NewProduct() {
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Context);
  const { userInfo, colors, categories, brands, sizes } = state;

  const navigate = useNavigate();

  const editor = useRef(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [keygen, setKeygen] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [desc, setDesc] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [brand, setBrand] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);

  //=================
  // CREATE PRODUCT
  //=================
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });

      if (!name) {
        toast.error("Please enter product name", { position: "bottom-center" });
        return;
      }

      if (!slug) {
        toast.error("Please enter product slug", { position: "bottom-center" });
        return;
      }
      if (!price) {
        toast.error("Please add product price", { position: "bottom-center" });
        return;
      }
      if (!image) {
        toast.error("Please select an image", { position: "bottom-center" });
        return;
      }

      await axios.post(
        `${request}/api/products`,
        {
          name,
          slug,
          keygen,
          countInStock,
          price,
          discount,
          desc,
          weight,
          category,
          color,
          size,
          brand,
          image,
          images,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully", {
        position: "bottom-center",
      });
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  //=================
  // IMAGES UPLOAD
  //=================
  const uploadFileHandler = async (e, forImages) => {
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
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success("Image uploaded successfully. Click update to apply it", {
        position: "bottom-center",
      });
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };

  //=================
  //DELETE IMAGES
  //=================
  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success("Image removed successfully. Click update to apply it", {
      position: "bottom-center",
    });
  };

  //============
  //TOGGLE BOX
  //============
  const [openBox, setOpenBox] = useState(null);

  const toggleBox = (index) => {
    if (openBox === index) {
      setOpenBox(null);
    } else {
      setOpenBox(index);
    }
  };

  //==================
  //TOGGLE FEATURE BOX
  //==================
  const [featureData, setFeatureData] = useState([
    { featureName: "", subFeatures: [""] }, // Initialize with one empty feature and one sub-feature
  ]);

  const addFeature = () => {
    setFeatureData([...featureData, { featureName: "", subFeatures: [""] }]);
  };

  const addSubFeature = (featureIndex) => {
    const updatedFeatureData = [...featureData];
    updatedFeatureData[featureIndex].subFeatures.push("");
    setFeatureData(updatedFeatureData);
  };

  //==================
  //TOGGLE COLOR BOX
  //==================
  const [colorData, setColorData] = useState([
    { colorName: "", colorImg: "" }, // Initialize with one empty Color and one sub-Color
  ]);

  const addMoreColor = () => {
    setColorData([...colorData, { colorName: "", colorImg: "" }]);
  };
  return (
    <>
      <>
        <Helmet>
          <title>Add Product</title>
        </Helmet>
        <div className="product_edit page_background">
          <div className="container">
            <div className=" ">
              <div className="productTitleContainer">
                <h3 className="productTitle light_shadow uppercase">
                  Add Product
                </h3>
              </div>
              <div className="productBottom mtb">
                <form action="" onSubmit={submitHandler}>
                  <div className="productForm">
                    <div className="product_info product___">
                      <div className="light_shadow product___main">
                        <div
                          className={
                            openBox === 0
                              ? "header  c_flex"
                              : "header border c_flex"
                          }
                          onClick={() => toggleBox(0)}
                        >
                          <div className="left">
                            <div className="d_flex">
                              <div className="number l_flex">
                                <span>01</span>
                              </div>
                              <div className="text">
                                <h4>Product Info</h4>
                                <small>Fill all information below</small>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            {openBox === 0 ? (
                              <KeyboardArrowUpIcon className="icon" />
                            ) : (
                              <KeyboardArrowDownIcon className="icon" />
                            )}
                          </div>
                        </div>
                        {openBox === 0 && (
                          <div className="product_info_box box">
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                id="name"
                                placeholder="product name"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="quantity">Quantity</label>
                              <input
                                type="text"
                                id="quantity"
                                placeholder="123"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="price">Price</label>
                              <input
                                type="text"
                                id="price"
                                placeholder="1023"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="discount">Discount</label>
                              <input
                                type="text"
                                id="discount"
                                placeholder="15"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="weight">Weight</label>
                              <input
                                type="text"
                                id="weight"
                                placeholder="225g"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="category">Category</label>
                              <select name="category" id="category">
                                <option value="category">category</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="brand">Brand</label>
                              <input
                                type="text"
                                id="brand"
                                placeholder="brand"
                              />
                            </div>{" "}
                            <div className="form-group">
                              <label htmlFor="image">Image</label>
                              <input
                                type="text"
                                id="image"
                                placeholder="image link"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="features_box mt light_shadow">
                        <div
                          className={
                            openBox === 1
                              ? "header  c_flex"
                              : "header border c_flex"
                          }
                          onClick={() => toggleBox(1)}
                        >
                          <div className="left">
                            <div className="d_flex">
                              <div className="number l_flex">
                                <span>02</span>
                              </div>
                              <div className="text">
                                <h4>Features</h4>
                                <small>Add product features below</small>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            {openBox === 1 ? (
                              <KeyboardArrowUpIcon className="icon" />
                            ) : (
                              <KeyboardArrowDownIcon className="icon" />
                            )}
                          </div>
                        </div>
                        {openBox === 1 && (
                          <div className="features box">
                            <div className="more_feature">
                              {featureData.map((feature, featureIndex) => (
                                <div
                                  className="more_feature_box"
                                  key={featureIndex}
                                >
                                  <div className="form-group">
                                    <label htmlFor="feature">Feature</label>
                                    <input
                                      type="text"
                                      placeholder="feature name"
                                      value={feature.featureName}
                                      onChange={(e) => {
                                        const updatedFeatureData = [
                                          ...featureData,
                                        ];
                                        updatedFeatureData[
                                          featureIndex
                                        ].featureName = e.target.value;
                                        setFeatureData(updatedFeatureData);
                                      }}
                                    />
                                  </div>
                                  <div className="form-group">
                                    {feature.subFeatures.map(
                                      (subFeature, subFeatureIndex) => (
                                        <div
                                          className="sub_features a_flex"
                                          key={subFeatureIndex}
                                        >
                                          <input
                                            type="text"
                                            className="sub-features"
                                            placeholder="sub-features name"
                                            value={subFeature}
                                            onChange={(e) => {
                                              const updatedFeatureData = [
                                                ...featureData,
                                              ];
                                              updatedFeatureData[
                                                featureIndex
                                              ].subFeatures[subFeatureIndex] =
                                                e.target.value;
                                              setFeatureData(
                                                updatedFeatureData
                                              );
                                            }}
                                          />
                                        </div>
                                      )
                                    )}
                                    <div className="add_btn">
                                      <span
                                        onClick={() =>
                                          addSubFeature(featureIndex)
                                        }
                                      >
                                        Add Sub-Features
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="add_more_btn">
                              <span onClick={addFeature}>
                                Add More Features
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="light_shadow mt product_color">
                        <div
                          className={
                            openBox === 2
                              ? "header  c_flex"
                              : "header border c_flex"
                          }
                          onClick={() => toggleBox(2)}
                        >
                          <div className="left">
                            <div className="d_flex">
                              <div className="number l_flex">
                                <span>03</span>
                              </div>
                              <div className="text">
                                <h4>Product Color</h4>
                                <small>
                                  Upload multiple image of product with
                                  different color
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="right">
                            {openBox === 2 ? (
                              <KeyboardArrowUpIcon className="icon" />
                            ) : (
                              <KeyboardArrowDownIcon className="icon" />
                            )}
                          </div>
                        </div>
                        {openBox === 2 && (
                          <div className="product_info_color">
                            <div className="product_info_box box">
                              {colorData.map((color, colorIndex) => (
                                <div className="form-group" key={colorIndex}>
                                  <label htmlFor="color">Color</label>
                                  <span className="color_name">
                                    <input
                                      type="text"
                                      id="color"
                                      value={color.colorName}
                                      onChange={(e) => {
                                        const updatedColorData = [...colorData];
                                        updatedColorData[colorIndex].colorName =
                                          e.target.value;
                                        setColorData(updatedColorData);
                                      }}
                                      placeholder="color name"
                                    />
                                  </span>
                                  <span className="link_img">
                                    <input
                                      type="text"
                                      id="color"
                                      value={color.colorImg}
                                      onChange={(e) => {
                                        const updatedColorData = [...colorData];
                                        updatedColorData[colorIndex].colorImg =
                                          e.target.value;
                                        setColorData(updatedColorData);
                                      }}
                                      placeholder="product image color link"
                                    />
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="add_more_btn">
                              <span onClick={addMoreColor}>Add More Color</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="productFormRight mtb c_flex">
                      <div className="productUpload light_shadow">
                        <img
                          src={image || photo}
                          alt=""
                          className="productUploadImg"
                        />
                        {/* {image === loadingUpload && <LoadingBox></LoadingBox>} */}
                        <label htmlFor="file">
                          <PublishIcon
                            className="upload-btn"
                            onChange={uploadFileHandler}
                          />
                        </label>
                        <input
                          onChange={uploadFileHandler}
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                        />
                      </div>
                      <div className="productUpload light_shadow mtb">
                        <div className="productUploadImg-delete">
                          {images.map((x) => (
                            <div key={x}>
                              <img
                                src={x}
                                alt=""
                                className="productUploadImg wtdh-imgs small_imgs"
                              />
                              <DeleteIcon
                                onClick={() => deleteFileHandler(x)}
                                className="deleteImages"
                              />
                            </div>
                          ))}
                        </div>
                        <label
                          htmlFor="files"
                          className="products-images-upload"
                        >
                          {/* {images.length === 0 && <MessageBox>No Image</MessageBox>} */}
                          {/* {images && loadingUpload && <LoadingBox></LoadingBox>} */}
                          <PublishIcon
                            className="upload-btn images-list-l"
                            onChange={(e) => uploadFileHandler(e, true)}
                          />
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="files"
                          onChange={(e) => uploadFileHandler(e, true)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lower_test">
                    <label htmlFor="">Description</label>
                    <JoditEditor
                      className="editor"
                      id="desc"
                      ref={editor}
                      value={desc}
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>
                  <div className="btn">
                    <button className="productButton main_btn mtb ">
                      Cancel
                    </button>
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default NewProduct;
