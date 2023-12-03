import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Context } from "../../../../context/Context";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function Banner() {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    imgBackground: "",
    videoBackground: "",
    buttonText: "",
    color: "",
    pColor: "",
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${request}/api/banner`);
      setBanners(response.data);
    } catch (error) {
      toast.error("Failed to fetch banners");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addBanner = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Title and Description cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`${request}/api/banner`, {
        banners: [
          {
            title: formData.title,
            description: formData.description,
            img: formData.img,
            imgBackground: formData.imgBackground,
            videoBackground: formData.videoBackground,
            buttonText: formData.buttonText,
            color: formData.color,
            pColor: formData.pColor,
          },
        ],
      });
      setBanners((prevBanners) => [...prevBanners, response.data]);
      toast.success("Banner added successfully");
    } catch (error) {
      toast.error("Failed to add banner");
    }
  };

  const editBanner = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      _id: id,
    }));
    populateFormData(id);
  };

  const populateFormData = (id) => {
    const selectedBanner = banners.find((bannerData) => bannerData._id === id);

    if (selectedBanner) {
      setFormData((prevData) => ({
        ...prevData,
        title: selectedBanner.banners[0].title,
        description: selectedBanner.banners[0].description,
        img: selectedBanner.banners[0].img,
        imgBackground: selectedBanner.banners[0].imgBackground,
        videoBackground: selectedBanner.banners[0].videoBackground,
        buttonText: selectedBanner.banners[0].buttonText,
        color: selectedBanner.banners[0].color,
        pColor: selectedBanner.banners[0].pColor,
      }));
    } else {
      toast.error("No data found for the banner being edited.");
    }
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${request}/api/banner/${id}`);
      setBanners((prevBanners) =>
        prevBanners.filter((banner) => banner._id !== id)
      );
      toast.success("Banner deleted successfully");
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  const updateBanner = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${request}/api/banner/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateOrAddBanner = async () => {
    if (formData._id) {
      try {
        const updatedData = {
          title: formData.title,
          description: formData.description,
          img: formData.img,
          imgBackground: formData.imgBackground,
          videoBackground: formData.videoBackground,
          buttonText: formData.buttonText,
          color: formData.color,
          pColor: formData.pColor,
        };
        const updatedBanner = await updateBanner(formData._id, updatedData);

        setBanners((prevBanners) =>
          prevBanners.map((banner) =>
            banner._id === formData._id ? updatedBanner : banner
          )
        );

        toast.success("Banner updated successfully");
      } catch (error) {
        console.error("Error updating banner:", error);
        toast.error("Failed to update banner");
      }
    } else {
      addBanner();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrAddBanner();
    setFormData({
      title: "",
      description: "",
      img: "",
      imgBackground: "",
      videoBackground: "",
      buttonText: "",
      color: "",
      pColor: "",

      _id: "",
    });
  };

  const handleCancelEdit = () => {
    setFormData({
      title: "",
      description: "",
      img: "",
      imgBackground: "",
      videoBackground: "",
      buttonText: "",
      color: "",
      pColor: "",

      _id: "",
    });
  };

  console.log(banners);

  return (
    <>
      <Helmet>
        <title>Filters</title>
      </Helmet>
      <div className="product_edit filters_add_update admin_page_all page_background">
        <div className="container">
          <div className="productTitleContainer">
            <h3 className="productTitle light_shadow uppercase">
              Add and Update Banner
            </h3>
          </div>
          <div className="productBottom mtb ">
            <div className="productForm">
              <div className="product_info product___">
                <div className="features_box mt light_shadow">
                  <div className="header  c_flex">
                    <div className="left">
                      <div className="d_flex">
                        <div className="number l_flex">
                          <span>00</span>
                        </div>
                        <div className="text">
                          <h4>Banners</h4>
                          <small>Add and update banners below</small>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <KeyboardArrowUpIcon className="icon" />
                    </div>
                  </div>

                  <>
                    <div className="product_info_color ">
                      <div className="product_info_box ">
                        <form onSubmit={handleSubmit} className="form_input">
                          <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <span>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                              />
                            </span>
                            <span className="description">
                              <label htmlFor="description">Description</label>
                              <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                              />
                            </span>
                            <span className="img">
                              <label htmlFor="img">Image Url</label>
                              <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                              />
                            </span>
                            <span className="imgBackground">
                              <label htmlFor="img">Image Background Url</label>
                              <input
                                type="text"
                                name="imgBackground"
                                value={formData.imgBackground}
                                onChange={handleInputChange}
                                placeholder="Image Background URL"
                              />
                            </span>
                            <span className="videoBackground">
                              <label htmlFor="video">
                                Video Background Url
                              </label>
                              <input
                                type="text"
                                name="videoBackground"
                                value={formData.videoBackground}
                                onChange={handleInputChange}
                                placeholder="Video Background URL"
                              />
                            </span>
                            <span className="buttonText">
                              <label htmlFor="btn">Button Text</label>
                              <input
                                type="text"
                                name="buttonText"
                                value={formData.buttonText}
                                onChange={handleInputChange}
                                placeholder="Button Text"
                              />
                            </span>
                            <span className="color">
                              <label htmlFor="color">Header Text Color</label>
                              <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                placeholder="Color"
                              />
                            </span>
                            <span className="pColor">
                              <label htmlFor="pColor">
                                Paragraph Text Color
                              </label>
                              <input
                                type="text"
                                name="pColor"
                                value={formData.pColor}
                                onChange={handleInputChange}
                                placeholder="PColor"
                              />
                            </span>
                          </div>

                          <div className="a_flex">
                            <button type="submit">
                              {formData._id ? "Update Banner" : "Add Banner"}
                            </button>{" "}
                            &#160; &#160;
                            {formData._id && (
                              <button type="button" onClick={handleCancelEdit}>
                                Cancel Edit
                              </button>
                            )}
                          </div>
                        </form>

                        <ul className="color_list home_wrappers">
                          {banners?.map((bannerData) => (
                            <li key={bannerData._id} className="mb">
                              {bannerData.banners.map((banner) => (
                                <div key={banner._id}>
                                  <div>
                                    <strong>Title: </strong>
                                    <span>{banner.title}</span>
                                  </div>
                                  <div>
                                    <strong>Description: </strong>
                                    <span>{banner.description}</span>
                                  </div>
                                  <div>
                                    <strong>Image: </strong>
                                    <span>{banner.img}</span>
                                  </div>
                                  <div>
                                    <strong>Image Background: </strong>
                                    <span>{banner.imgBackground}</span>
                                  </div>
                                  <div>
                                    <strong>Video Background: </strong>
                                    <span>{banner.videoBackground}</span>
                                  </div>
                                  <div>
                                    <strong>Button Text: </strong>
                                    <span>{banner.buttonText}</span>
                                  </div>
                                  <div>
                                    <strong>Color: </strong>
                                    <span>{banner.color}</span>
                                  </div>
                                  <div>
                                    <strong>PColor: </strong>
                                    <span>{banner.pColor}</span>
                                  </div>
                                </div>
                              ))}
                              <span className="d_flex">
                                <button
                                  type="submit"
                                  onClick={() => editBanner(bannerData._id)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteBanner(bannerData._id)}
                                >
                                  Delete
                                </button>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
