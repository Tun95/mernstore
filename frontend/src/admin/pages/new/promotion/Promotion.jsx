import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Context } from "../../../../context/Context";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styles.scss";
import { getError } from "../../../../components/utilities/util/Utils";

export function Promotion() {
  const { state } = useContext(Context);
  const { userInfo } = state;

  const [promotions, setPromotions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    slug: "",
    image: "",
    description: "",
    expirationDate: "",
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${request}/api/promotions`);
      setPromotions(response.data);
    } catch (error) {
      toast.error("Failed to fetch promotions");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addPromotion = async () => {
    if (!formData.title || !formData.description || !formData.expirationDate) {
      toast.error("Title, Description, and Expiration Date cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`${request}/api/promotions`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setPromotions((prevPromotions) => [...prevPromotions, response.data]);
      toast.success("Promotion added successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const headerRef = useRef(null);

  const editPromotion = (id) => {
    headerRef.current.scrollIntoView({ behavior: "smooth" });

    setFormData((prevData) => ({
      ...prevData,
      _id: id,
    }));
    populateFormData(id);
  };

  const populateFormData = (id) => {
    const selectedPromotion = promotions.find(
      (promotion) => promotion._id === id
    );

    if (selectedPromotion) {
      setFormData({
        ...selectedPromotion,
        expirationDate: selectedPromotion.expirationDate.slice(0, -1), // Remove the trailing 'Z'
      });
    } else {
      toast.error("No data found for the promotion being edited.");
    }
  };

  const deletePromotion = async (id) => {
    // Show confirmation dialog
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this promotion?"
    );

    // If the user confirms, proceed with deletion
    if (shouldDelete) {
      try {
        await axios.delete(`${request}/api/promotions/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        // Update state by filtering out the deleted promotion
        setPromotions((prevPromotions) =>
          prevPromotions.filter((promotion) => promotion._id !== id)
        );

        toast.success("Promotion deleted successfully");
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  const updatePromotion = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${request}/api/promotions/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const updateOrAddPromotion = async () => {
    if (!formData._id) {
      addPromotion();
    } else {
      try {
        const updatedPromotion = await updatePromotion(formData._id, formData);

        setPromotions((prevPromotions) =>
          prevPromotions.map((promotion) =>
            promotion._id === formData._id ? updatedPromotion : promotion
          )
        );

        toast.success("Promotion updated successfully");
      } catch (error) {
        console.error("Error updating promotion:", error);
        toast.error("Failed to update promotion");
      }
    }
    setFormData({
      title: "",
      subTitle: "",
      slug: "",
      image: "",
      description: "",
      expirationDate: "",
      _id: "",
    });
  };

  const handleCheckChange = async (promotionId) => {
    // Fetch existing checked promotion before updating the state
    const existingCheckedPromotion = promotions.find(
      (promotion) => promotion.isChecked
    );

    // If there's already a checked promotion, show an error
    if (
      existingCheckedPromotion &&
      existingCheckedPromotion._id !== promotionId
    ) {
      toast.error("Only one promotion can be checked at a time");
      return;
    }

    // Update the state with the new checked status
    const updatedPromotions = promotions.map((promotion) =>
      promotion._id === promotionId
        ? { ...promotion, isChecked: !promotion.isChecked }
        : { ...promotion, isChecked: false }
    );

    try {
      // Find the updated promotion
      const updatedPromotion = updatedPromotions.find(
        (p) => p._id === promotionId
      );

      if (updatedPromotion) {
        // Update the promotion in the database
        await axios.put(
          `${request}/api/promotions/${promotionId}`,
          {
            isChecked: updatedPromotion.isChecked,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        // Update the state with the new checked status
        setPromotions(updatedPromotions);
      }
    } catch (error) {
      console.error("Error updating isChecked:", error);
      toast.error(getError(error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrAddPromotion();
  };

  const handleCancelEdit = () => {
    setFormData({
      title: "",
      subTitle: "",
      slug: "",
      image: "",
      description: "",
      expirationDate: "",
      _id: "",
    });
  };

  console.log(promotions);

  return (
    <>
      <Helmet>
        <title>Promotions</title>
      </Helmet>
      <div className="promotion_edit product_edit admin_page_all page_background">
        <div className="container">
          <div className="productTitleContainer">
            <h3 className="productTitle light_shadow uppercase">
              Add and Update Promotion
            </h3>
          </div>
          <div className="productBottom mtb ">
            <div className="productForm">
              <div className="product_info product___">
                <div ref={headerRef} className="features_box mt light_shadow">
                  <div className="header  c_flex">
                    <div className="left">
                      <div className="d_flex">
                        <div className="number l_flex">
                          <span>00</span>
                        </div>
                        <div className="text">
                          <h4>Promotions</h4>
                          <small>Add and update promotions below</small>
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
                            <span>
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                              />
                            </span>
                            <span>
                              <label htmlFor="subTitle">Subtitle</label>
                              <input
                                type="text"
                                name="subTitle"
                                value={formData.subTitle}
                                onChange={handleInputChange}
                                placeholder="Subtitle"
                              />
                            </span>
                            <span>
                              <label htmlFor="image">Image URL</label>
                              <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                              />
                            </span>
                            <span>
                              <label htmlFor="description">Description</label>
                              <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                              />
                            </span>
                            <span>
                              <label htmlFor="expirationDate">
                                Expiration Date
                              </label>
                              <input
                                type="datetime-local"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleInputChange}
                                placeholder="Expiration Date"
                              />
                            </span>
                          </div>

                          <div className="a_flex">
                            <button type="submit">
                              {formData._id
                                ? "Update Promotion"
                                : "Add Promotion"}
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
                          {promotions?.map((promotion) => (
                            <li key={promotion._id} className="mb">
                              <div>
                                <div>
                                  <strong>Title: </strong>
                                  <span>{promotion.title}</span>
                                </div>
                                <div>
                                  <strong>Subtitle: </strong>
                                  <span>{promotion.subTitle}</span>
                                </div>
                                <div>
                                  <strong>Slug: </strong>
                                  <span>{promotion.slug}</span>
                                </div>
                                <div>
                                  <strong>Image: </strong>
                                  <span>{promotion.image}</span>
                                </div>
                                <div>
                                  <strong>Description: </strong>
                                  <span>{promotion.description}</span>
                                </div>
                                <div className="a_flex expiring">
                                  <strong>Expiration Date: </strong>
                                  <span className="c_flex full_width">
                                    <span className="date_time">
                                      {new Date(
                                        promotion.expirationDate
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      })}
                                    </span>
                                    <span
                                      className={`l_flex ${
                                        new Date() <
                                        new Date(promotion.expirationDate)
                                          ? "verified_account"
                                          : "unverified_account"
                                      }`}
                                    >
                                      {new Date() <
                                      new Date(promotion.expirationDate)
                                        ? "Ongoing"
                                        : "Expired"}
                                    </span>
                                  </span>
                                </div>

                                <div>
                                  <label className="a_flex label">
                                    <input
                                      type="checkbox"
                                      checked={promotion.isChecked || false}
                                      onChange={() =>
                                        handleCheckChange(promotion._id)
                                      }
                                    />
                                    <strong> Is Checked</strong>
                                  </label>
                                </div>
                              </div>
                              <span className="d_flex">
                                <button
                                  type="submit"
                                  onClick={() => editPromotion(promotion._id)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deletePromotion(promotion._id)}
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
