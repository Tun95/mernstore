import React, { useContext, useReducer, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet-async";
import { Context } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { request } from "../../../../base url/BaseUrl";
import { toast } from "react-toastify";
import { getError } from "../../../../components/utilities/util/Utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Checkbox } from "antd";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

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
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [subitem, setSubitem] = useState([]);
  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);
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

      await axios.post(
        `${request}/api/products`,
        {
          name,
          slug,
          keygen,
          countInStock,
          price,
          discount,
          description,
          weight,
          category,
          color,
          brand,
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
  const deleteFeature = (featureIndex) => {
    const updatedFeatureData = [...featureData];
    updatedFeatureData.splice(featureIndex, 1);
    setFeatureData(updatedFeatureData);
  };

  const deleteSubFeature = (featureIndex, subFeatureIndex) => {
    const updatedFeatureData = [...featureData];
    updatedFeatureData[featureIndex].subFeatures.splice(subFeatureIndex, 1);
    setFeatureData(updatedFeatureData);
  };

  //==================
  // TOGGLE SPECIFICATIONS BOX
  //==================
  const [specificationsData, setSpecificationsData] = useState([
    { name: "", image: "" }, // Initialize with one empty specification
  ]);

  const addMoreSpecification = () => {
    setSpecificationsData([...specificationsData, { name: "", image: "" }]);
  };

  // Delete specification function
  const deleteSpecification = (specificationIndex) => {
    const updatedSpecificationsData = [...specificationsData];
    updatedSpecificationsData.splice(specificationIndex, 1);
    setSpecificationsData(updatedSpecificationsData);
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

  // Delete color function
  const deleteColor = (colorIndex) => {
    const updatedColorData = [...colorData];
    updatedColorData.splice(colorIndex, 1);
    setColorData(updatedColorData);
  };

  //==================
  //TOGGLE COLOR BOX
  //==================
  const [videoData, setVideoData] = useState([
    { videoTitle: "", videoLink: "", videoThumbnail: "", videoDescription: "" },
  ]);

  const addMoreVideo = () => {
    setVideoData([
      ...videoData,
      {
        videoTitle: "",
        videoLink: "",
        videoThumbnail: "",
        videoDescription: "",
      },
    ]);
  };
  // Delete video function
  const deleteVideo = (videoIndex) => {
    const updatedVideoData = [...videoData];
    updatedVideoData.splice(videoIndex, 1);
    setVideoData(updatedVideoData);
  };

  return (
    <>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <div className="product_edit admin_page_all page_background">
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="product name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                              type="text"
                              id="quantity"
                              value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)}
                              placeholder="123"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                              type="text"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              id="price"
                              placeholder="1023"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="discount">Discount</label>
                            <input
                              type="text"
                              id="discount"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                              placeholder="15 in %"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="weight">Weight</label>
                            <input
                              type="text"
                              id="weight"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              placeholder="225 in g"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category">
                              <option value="category">category</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="sub-category">Sub-Category</label>
                            <select name="sub-category" id="sub-category">
                              <option value="category">category</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="sub-category-items">
                              Sub-Category items
                            </label>
                            <select
                              name="sub-category-items"
                              id="sub-category-items"
                            >
                              <option value="category">category</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" id="brand" placeholder="brand" />
                          </div>{" "}
                          <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                              type="text"
                              id="image"
                              placeholder="image link"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="promotion">Promotion</label>
                            <select name="promotion" id="promotion">
                              <option value="promotion">promotion</option>
                            </select>
                          </div>
                          <div className="form-group a_flex">
                            <Checkbox>Activate for Black Friday sale</Checkbox>
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
                                  {featureData.length > 1 && (
                                    <button
                                      type="button"
                                      className="remove_btn a_flex first_btn"
                                      onClick={() =>
                                        deleteFeature(featureIndex)
                                      }
                                    >
                                      <span className="a_flex">
                                        <CloseIcon className="icon" />
                                        Delete Feature
                                      </span>
                                    </button>
                                  )}
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
                                            setFeatureData(updatedFeatureData);
                                          }}
                                        />
                                        <button
                                          type="button"
                                          className="remove_btn a_flex"
                                          onClick={() =>
                                            deleteSubFeature(
                                              featureIndex,
                                              subFeatureIndex
                                            )
                                          }
                                        >
                                          <span className="a_flex">
                                            <DeleteForeverOutlinedIcon className="icon delete_icon" />
                                          </span>
                                        </button>
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
                            <span onClick={addFeature}>Add More Features</span>
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
                              <h4>Product Specifications</h4>
                              <small>Add product specifications</small>
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
                            {specificationsData.map(
                              (specification, specificationIndex) => (
                                <div
                                  className="form-group"
                                  key={specificationIndex}
                                >
                                  <label htmlFor="specification">
                                    Specification
                                  </label>
                                  <span className="specification_name">
                                    <input
                                      type="text"
                                      id="specification"
                                      value={specification.name}
                                      onChange={(e) => {
                                        const updatedSpecificationsData = [
                                          ...specificationsData,
                                        ];
                                        updatedSpecificationsData[
                                          specificationIndex
                                        ].name = e.target.value;
                                        setSpecificationsData(
                                          updatedSpecificationsData
                                        );
                                      }}
                                      placeholder="specification name"
                                    />
                                  </span>
                                  <span className="link_img">
                                    <input
                                      type="text"
                                      id="specification"
                                      value={specification.image}
                                      onChange={(e) => {
                                        const updatedSpecificationsData = [
                                          ...specificationsData,
                                        ];
                                        updatedSpecificationsData[
                                          specificationIndex
                                        ].image = e.target.value;
                                        setSpecificationsData(
                                          updatedSpecificationsData
                                        );
                                      }}
                                      placeholder="specification image link"
                                    />
                                  </span>
                                  {specificationsData.length > 1 && (
                                    <button
                                      type="button"
                                      className="remove_btn a_flex first_btn next_del_btn"
                                      onClick={() =>
                                        deleteSpecification(specificationIndex)
                                      }
                                    >
                                      <span className="a_flex">
                                        <CloseIcon className="icon" />
                                        Delete Specification
                                      </span>
                                    </button>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div className="add_more_btn">
                            <span onClick={addMoreSpecification}>
                              Add More Specifications
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="light_shadow mt product_color">
                      <div
                        className={
                          openBox === 3
                            ? "header  c_flex"
                            : "header border c_flex"
                        }
                        onClick={() => toggleBox(3)}
                      >
                        <div className="left">
                          <div className="d_flex">
                            <div className="number l_flex">
                              <span>04</span>
                            </div>
                            <div className="text">
                              <h4>Product Color</h4>
                              <small>Add product image color</small>
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {openBox === 3 ? (
                            <KeyboardArrowUpIcon className="icon" />
                          ) : (
                            <KeyboardArrowDownIcon className="icon" />
                          )}
                        </div>
                      </div>
                      {openBox === 3 && (
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
                                {colorData.length > 1 && (
                                  <button
                                    type="button"
                                    className="remove_btn a_flex first_btn next_del_btn"
                                    onClick={() => deleteColor(colorIndex)}
                                  >
                                    <span className="a_flex">
                                      <CloseIcon className="icon" />
                                      Delete Color
                                    </span>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="add_more_btn">
                            <span onClick={addMoreColor}>Add More Color</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="light_shadow mt product_images">
                      <div
                        className={
                          openBox === 4
                            ? "header  c_flex"
                            : "header border c_flex"
                        }
                        onClick={() => toggleBox(4)}
                      >
                        <div className="left">
                          <div className="d_flex">
                            <div className="number l_flex">
                              <span>05</span>
                            </div>
                            <div className="text">
                              <h4>Product Images</h4>
                              <small>Upload product images</small>
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {openBox === 4 ? (
                            <KeyboardArrowUpIcon className="icon" />
                          ) : (
                            <KeyboardArrowDownIcon className="icon" />
                          )}
                        </div>
                      </div>
                      {openBox === 4 && (
                        <div className="product_info_images">
                          <div className="product_info_img_box box">
                            <div className="form_group f_flex">
                              {images.map((x) => (
                                <div key={x} className="drop_zone">
                                  <img src={x} alt="" className="images" />
                                  <div className="icon_bg l_flex">
                                    <CloseIcon
                                      onClick={() => deleteFileHandler(x)}
                                      className="icon"
                                    />
                                  </div>
                                </div>
                              ))}
                              <div>
                                <label
                                  htmlFor="files"
                                  className="upload_box l_flex"
                                >
                                  <div className="inner">
                                    <div className="icon_btn">
                                      <CloudUploadIcon className="icon" />
                                    </div>
                                    <div className="text">
                                      <div>
                                        <p>Upload product images</p>
                                      </div>
                                      <div>
                                        <small>
                                          recommended: high quality, small size
                                          image
                                        </small>
                                      </div>
                                    </div>
                                  </div>

                                  <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="files"
                                    onChange={(e) => uploadFileHandler(e, true)}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="light_shadow mt product_color ">
                      <div
                        className={
                          openBox === 5
                            ? "header  c_flex"
                            : "header border c_flex"
                        }
                        onClick={() => toggleBox(5)}
                      >
                        <div className="left">
                          <div className="d_flex">
                            <div className="number l_flex">
                              <span>06</span>
                            </div>
                            <div className="text">
                              <h4>Video Reviews</h4>
                              <small>Add product review videos</small>
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {openBox === 5 ? (
                            <KeyboardArrowUpIcon className="icon" />
                          ) : (
                            <KeyboardArrowDownIcon className="icon" />
                          )}
                        </div>
                      </div>
                      {openBox === 5 && (
                        <div className="product_info_video product_info_color">
                          <div className="product_info_box box">
                            {videoData.map((video, videoIndex) => (
                              <div className="form-group" key={videoIndex}>
                                <label htmlFor="title">Video</label>
                                <span className="video_name">
                                  <input
                                    type="text"
                                    id="title"
                                    value={video.videoTitle}
                                    onChange={(e) => {
                                      const updatedVideoData = [...videoData];
                                      updatedVideoData[videoIndex].videoTitle =
                                        e.target.value;
                                      setVideoData(updatedVideoData);
                                    }}
                                    placeholder="title"
                                  />
                                </span>
                                <span className="link_img">
                                  <input
                                    type="text"
                                    id="link"
                                    value={video.videoLink}
                                    onChange={(e) => {
                                      const updatedVideoData = [...videoData];
                                      updatedVideoData[videoIndex].videoLink =
                                        e.target.value;
                                      setVideoData(updatedVideoData);
                                    }}
                                    placeholder="video link"
                                  />
                                </span>
                                <span className="link_img">
                                  <input
                                    type="text"
                                    id="thumbnail"
                                    value={video.videoThumbnail}
                                    onChange={(e) => {
                                      const updatedVideoData = [...videoData];
                                      updatedVideoData[
                                        videoIndex
                                      ].videoThumbnail = e.target.value;
                                      setVideoData(updatedVideoData);
                                    }}
                                    placeholder="video thumbnail link"
                                  />
                                </span>
                                <span className="description">
                                  <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Descriptions here..."
                                    value={video.videoDescription}
                                    onChange={(e) => {
                                      const updatedVideoData = [...videoData];
                                      updatedVideoData[
                                        videoIndex
                                      ].videoDescription = e.target.value;
                                      setVideoData(updatedVideoData);
                                    }}
                                  ></textarea>
                                </span>
                                {videoData.length > 1 && (
                                  <button
                                    type="button"
                                    className="remove_btn a_flex first_btn next_del_btn"
                                    onClick={() => deleteVideo(videoIndex)}
                                  >
                                    <span className="a_flex">
                                      <CloseIcon className="icon" />
                                      Delete Video
                                    </span>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="add_more_btn">
                            <span onClick={addMoreVideo}>Add More Videos</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="light_shadow mt product_description ">
                      <div
                        className={
                          openBox === 6
                            ? "header  c_flex"
                            : "header border c_flex"
                        }
                        onClick={() => toggleBox(6)}
                      >
                        <div className="left">
                          <div className="d_flex">
                            <div className="number l_flex">
                              <span>07</span>
                            </div>
                            <div className="text">
                              <h4>Product Description</h4>
                              <small>
                                Provide in detail product description
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {openBox === 6 ? (
                            <KeyboardArrowUpIcon className="icon" />
                          ) : (
                            <KeyboardArrowDownIcon className="icon" />
                          )}
                        </div>
                      </div>
                      {openBox === 6 && (
                        <div className="product_info_desc ">
                          <div className="box">
                            <div className="form_group">
                              <label htmlFor="">Description</label>
                              <JoditEditor
                                className="editor"
                                id="desc"
                                ref={editor}
                                value={description}
                                // config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) =>
                                  setDescription(newContent)
                                } // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => {}}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bottom_btn mtb">
                  <span className="a_flex">
                    <button
                      className=" a_flex"
                      onClick={() => navigate("/admin/products")}
                    >
                      <CloseIcon className="icon" /> Cancel
                    </button>
                    <button type="submit" className="a_flex">
                      <DescriptionOutlinedIcon className="icon" /> Create
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
