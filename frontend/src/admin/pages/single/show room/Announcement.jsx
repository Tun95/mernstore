import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import "./styles.scss";

function Announcement({ openBox, toggleBox }) {
  const [announcementId, setAnnouncementId] = useState(null); // Initialize with null or the actual ID
  const [loading, setLoading] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    hColor: "",
    pColor: "",
    width: "",
    top: "",
    left: "",
    right: "",
    bottom: "",
  });
  const [fifthCardFormData, setFifthCardFormData] = useState({
    videoUrl: "",
    title: "",
    description: "",
    hColor: "",
    pColor: "",
    bColor: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${request}/api/announcement/all`);
      const { _id, sliders, fifthCard } = response.data;
      setAnnouncementId(_id);

      setSliders(sliders);
      setFifthCardFormData({
        videoUrl: fifthCard.videoUrl || "",
        title: fifthCard.title || "",
        description: fifthCard.description || "",
        hColor: fifthCard.hColor || "",
        pColor: fifthCard.pColor || "",
        bColor: fifthCard.bColor || "",
      });
    } catch (error) {
      toast.error("Failed to fetch all data");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // VIDEO INPUT CHANGE HANDLER
  const handleFifthCardInputChange = (event) => {
    const { name, value } = event.target;
    setFifthCardFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to add a new slider
  const addSlider = async () => {
    if (!formData.image || !formData.title) {
      toast.error("Image and Title cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        `${request}/api/announcement/sliders`,
        formData // send formData directly instead of wrapping it in an array
      );
      setSliders((prevSliders) => [...prevSliders, response.data]);
      fetchAllData();
      toast.success("Slider added successfully");
    } catch (error) {
      toast.error("Failed to add slider");
    }
  };

  const headerRef = useRef(null);
  const editSlider = (id) => {
    headerRef.current.scrollIntoView({ behavior: "smooth" });
    setFormData((prevData) => ({
      ...prevData,
      _id: id,
    }));
    populateFormData(id);
  };

  const populateFormData = (id) => {
    const selectedSlider = sliders.find((slider) => slider._id === id);

    if (selectedSlider) {
      setFormData((prevData) => ({
        ...prevData,
        image: selectedSlider.image,
        title: selectedSlider.title,
        description: selectedSlider.description,
        hColor: selectedSlider.hColor,
        pColor: selectedSlider.pColor,
        width: selectedSlider.width,
        top: selectedSlider.top,
        left: selectedSlider.left,
        right: selectedSlider.right,
        bottom: selectedSlider.bottom,
      }));
    } else {
      toast.error("No data found for the slider being edited.");
    }
  };

  const deleteSlider = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this slider?"
    );

    if (shouldDelete) {
      try {
        await axios.delete(`${request}/api/announcement/sliders/${id}`);
        setSliders((prevSliders) =>
          prevSliders.filter((slider) => slider._id !== id)
        );
        toast.success("Slider deleted successfully");
      } catch (error) {
        toast.error("Failed to delete slider");
      }
    }
  };

  const updateSlider = async () => {
    if (formData._id) {
      try {
        const response = await axios.put(
          `${request}/api/announcement/sliders/${formData._id}`,
          formData
        );
        const updatedSlider = response.data;
        setSliders((prevSliders) =>
          prevSliders.map((slider) =>
            slider._id === formData._id ? updatedSlider : slider
          )
        );
        toast.success("Slider updated successfully");
      } catch (error) {
        console.error("Error updating slider:", error);
        toast.error("Failed to update slider");
      }
    } else {
      addSlider();
    }
  };

  const handleSubmitSlider = async (e) => {
    e.preventDefault();
    updateSlider();
    setFormData({
      image: "",
      title: "",
      description: "",
      hColor: "",
      pColor: "",
      width: "",
      top: "",
      left: "",
      right: "",
      bottom: "",
      _id: "",
    });
  };

  const handleCancelEdit = () => {
    setFormData({
      image: "",
      title: "",
      description: "",
      hColor: "",
      pColor: "",
      width: "",
      top: "",
      left: "",
      right: "",
      bottom: "",
      _id: "",
    });
  };

  // VIDEO HANDLER
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true before making the request

      await axios.put(
        `${request}/api/announcement/update-fifth-card/${announcementId}`,
        {
          fifthCard: fifthCardFormData,
        }
      );

      setLoading(false); // Set loading back to false after a successful request
      toast.success("Fifth card updated successfully");
    } catch (error) {
      setLoading(false); // Set loading back to false in case of an error
      console.error("Error updating fifth card:", error);
      toast.error("Failed to update fifth card");
    }
  };

  console.log(sliders);

  return (
    <>
      <div className="productBottom mtb announce_box">
        <div className="productForm">
          <div className="product_info product___">
            <div ref={headerRef} className="features_box mt light_shadow">
              <div
                className={
                  openBox === 0 ? "header  c_flex" : "header border c_flex"
                }
                onClick={() => toggleBox(0)}
              >
                <div className="left">
                  <div className="d_flex">
                    <div className="number l_flex">
                      <span>01</span>
                    </div>
                    <div className="text">
                      <h4>Announcement</h4>
                      <small>Add, edit and update Announcement below</small>
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
                <>
                  <div className="product_info_color ">
                    <div className="box">
                      {/* SLIDER SECTION */}
                      <form
                        onSubmit={handleSubmitSlider}
                        className="form_input"
                      >
                        {/* Slider Input */}
                        <div className="form-group">
                          <label htmlFor="color">Sliders</label>
                          <span className="color_name">
                            <input
                              type="text"
                              name="image"
                              value={formData.image}
                              onChange={handleInputChange}
                              placeholder="Slider image link"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="Slider title"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              placeholder="Slider description"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="hColor"
                              value={formData.hColor}
                              onChange={handleInputChange}
                              placeholder="Header color e.g #ffffff"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="pColor"
                              value={formData.pColor}
                              onChange={handleInputChange}
                              placeholder="Paragraph color e.g #ffffff"
                            />
                          </span>{" "}
                          <span className="link_img">
                            <input
                              type="text"
                              name="width"
                              value={formData.width}
                              onChange={handleInputChange}
                              placeholder="Width e.g 20px"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="top"
                              value={formData.top}
                              onChange={handleInputChange}
                              placeholder="Top e.g 20px"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="left"
                              value={formData.left}
                              onChange={handleInputChange}
                              placeholder="Left e.g 20px"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="right"
                              value={formData.right}
                              onChange={handleInputChange}
                              placeholder="Right e.g 20px"
                            />
                          </span>
                          <span className="link_img">
                            <input
                              type="text"
                              name="bottom"
                              value={formData.bottom}
                              onChange={handleInputChange}
                              placeholder="Bottom e.g 20px"
                            />
                          </span>
                        </div>

                        {/* Conditional Rendering of the Buttons */}
                        <div className="a_flex">
                          <button type="submit">
                            {formData._id ? "Update Slide" : "Add Slide"}
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
                        {sliders?.map((sliderData) => (
                          <li key={sliderData._id} className="mb">
                            <div>
                              <div>
                                <strong>Image: </strong>
                                <span>{sliderData.image}</span>
                              </div>
                              <div>
                                <strong>Title: </strong>
                                <span>{sliderData.title}</span>
                              </div>
                            </div>
                            <span className="d_flex">
                              <button
                                type="submit"
                                onClick={() => editSlider(sliderData._id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteSlider(sliderData._id)}
                              >
                                Delete
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* VIDEO SECTION */}
                      <div className="video_box">
                        <form
                          onSubmit={handleSubmitVideo}
                          className="form_input"
                        >
                          <div className="form-group">
                            <label htmlFor="color">Sliders</label>
                            <span className="color_name">
                              <input
                                type="text"
                                name="videoUrl"
                                value={fifthCardFormData.videoUrl}
                                onChange={handleFifthCardInputChange}
                                placeholder="video Url link"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                name="title"
                                value={fifthCardFormData.title}
                                onChange={handleFifthCardInputChange}
                                placeholder="video title"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                name="description"
                                value={fifthCardFormData.description}
                                onChange={handleFifthCardInputChange}
                                placeholder="video description"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                name="hColor"
                                value={fifthCardFormData.hColor}
                                onChange={handleFifthCardInputChange}
                                placeholder="header color e.g #ffffff"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                name="pColor"
                                value={fifthCardFormData.pColor}
                                onChange={handleFifthCardInputChange}
                                placeholder="paragraph color e.g #ffffff"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                name="bColor"
                                value={fifthCardFormData.bColor}
                                onChange={handleFifthCardInputChange}
                                placeholder="background color e.g #ffffff"
                              />
                            </span>
                          </div>
                          <div className="bottom_btn mtb">
                            {sliders.length !== 0 && (
                              <button
                                type="submit"
                                className="a_flex"
                                disabled={loading}
                              >
                                {loading ? (
                                  <>
                                    <span>Saving...</span>
                                    <div className="loader"></div>
                                  </>
                                ) : (
                                  <>
                                    <DescriptionOutlinedIcon className="icon" />
                                    <span>Save</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcement;
