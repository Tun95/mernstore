import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.scss";
import { Context } from "../../../../context/Context";
import { getError } from "../../../../components/utilities/util/Utils";
import { request } from "../../../../base url/BaseUrl";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

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
export function Category({ openBox, toggleBox }) {
  const [categoryData, setCategoryData] = useState({
    categories: [
      {
        icon: "",
        background: "",
        img: "",
        name: "",
        description: "",
        subCategories: [
          {
            name: "",
            img: "",
            subItems: [{ name: "" }],
          },
        ],
      },
    ],
  });

  const addCategory = () => {
    setCategoryData({
      ...categoryData,
      categories: [
        ...categoryData.categories,
        {
          icon: "",
          background: "",
          img: "",
          name: "",
          description: "",
          subCategories: [
            {
              name: "",
              img: "",
              subItems: [{ name: "" }],
            },
          ],
        },
      ],
    });
  };

  const addSubCategory = (categoryIndex) => {
    const updatedCategoryData = { ...categoryData };
    updatedCategoryData.categories[categoryIndex].subCategories.push({
      name: "",
      img: "",
      subItems: [{ name: "" }],
    });
    setCategoryData(updatedCategoryData);
  };

  const addSubItem = (categoryIndex, subCategoryIndex) => {
    const updatedCategoryData = { ...categoryData };
    updatedCategoryData.categories[categoryIndex].subCategories[
      subCategoryIndex
    ].subItems.push({ name: "" });
    setCategoryData(updatedCategoryData);
  };

  const removeCategory = (categoryIndex) => {
    const updatedCategoryData = { ...categoryData };
    updatedCategoryData.categories.splice(categoryIndex, 1);
    setCategoryData(updatedCategoryData);
  };

  const removeSubCategory = (categoryIndex, subCategoryIndex) => {
    const updatedCategoryData = { ...categoryData };
    updatedCategoryData.categories[categoryIndex].subCategories.splice(
      subCategoryIndex,
      1
    );
    setCategoryData(updatedCategoryData);
  };

  const removeSubItem = (categoryIndex, subCategoryIndex, subItemIndex) => {
    const updatedCategoryData = { ...categoryData };
    updatedCategoryData.categories[categoryIndex].subCategories[
      subCategoryIndex
    ].subItems.splice(subItemIndex, 1);
    setCategoryData(updatedCategoryData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="productBottom mtb">
        <form action="" onSubmit={handleSubmit}>
          <div className="productForm">
            <div className="product_info product___">
              <div className="features_box mt light_shadow">
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
                        <h4>Category</h4>
                        <small>Add and update category below</small>
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
                    <div className="features box">
                      <div className="more_feature">
                        {categoryData.categories.map(
                          (category, categoryIndex) => (
                            <div
                              className="more_feature_box"
                              key={categoryIndex}
                            >
                              <div className="form-group">
                                <label htmlFor="icon">Icon</label>
                                <input
                                  type="text"
                                  placeholder="Icon URL"
                                  value={category.icon}
                                  onChange={(e) => {
                                    const updatedCategoryData = {
                                      ...categoryData,
                                    };
                                    updatedCategoryData.categories[
                                      categoryIndex
                                    ].icon = e.target.value;
                                    setCategoryData(updatedCategoryData);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="background">Background</label>
                                <input
                                  type="text"
                                  placeholder="Background URL"
                                  value={category.background}
                                  onChange={(e) => {
                                    const updatedCategoryData = {
                                      ...categoryData,
                                    };
                                    updatedCategoryData.categories[
                                      categoryIndex
                                    ].background = e.target.value;
                                    setCategoryData(updatedCategoryData);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="img">Image</label>
                                <input
                                  type="text"
                                  placeholder="Image URL"
                                  value={category.img}
                                  onChange={(e) => {
                                    const updatedCategoryData = {
                                      ...categoryData,
                                    };
                                    updatedCategoryData.categories[
                                      categoryIndex
                                    ].img = e.target.value;
                                    setCategoryData(updatedCategoryData);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  placeholder="Category name"
                                  value={category.name}
                                  onChange={(e) => {
                                    const updatedCategoryData = {
                                      ...categoryData,
                                    };
                                    updatedCategoryData.categories[
                                      categoryIndex
                                    ].name = e.target.value;
                                    setCategoryData(updatedCategoryData);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                  type="text"
                                  placeholder="Category description"
                                  value={category.description}
                                  onChange={(e) => {
                                    const updatedCategoryData = {
                                      ...categoryData,
                                    };
                                    updatedCategoryData.categories[
                                      categoryIndex
                                    ].description = e.target.value;
                                    setCategoryData(updatedCategoryData);
                                  }}
                                />
                              </div>
                              <>
                                {category.subCategories.map(
                                  (subCategory, subCategoryIndex) => (
                                    <span
                                      className="subCategories"
                                      key={subCategoryIndex}
                                    >
                                      <div className="form-group">
                                        <label htmlFor="subCategoryName">
                                          Sub-Category Name
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Sub-Category name"
                                          value={subCategory.name}
                                          onChange={(e) => {
                                            const updatedCategoryData = {
                                              ...categoryData,
                                            };
                                            updatedCategoryData.categories[
                                              categoryIndex
                                            ].subCategories[
                                              subCategoryIndex
                                            ].name = e.target.value;
                                            setCategoryData(
                                              updatedCategoryData
                                            );
                                          }}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="subCategoryImg">
                                          Sub-Category Image
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Sub-Category image URL"
                                          value={subCategory.img}
                                          onChange={(e) => {
                                            const updatedCategoryData = {
                                              ...categoryData,
                                            };
                                            updatedCategoryData.categories[
                                              categoryIndex
                                            ].subCategories[
                                              subCategoryIndex
                                            ].img = e.target.value;
                                            setCategoryData(
                                              updatedCategoryData
                                            );
                                          }}
                                        />
                                      </div>
                                      <>
                                        {subCategory.subItems.map(
                                          (subItem, subItemIndex) => (
                                            <div
                                              className="sub_item_box"
                                              key={subItemIndex}
                                            >
                                              <div className="form-group">
                                                <label htmlFor="subItemName">
                                                  Sub-Item Name
                                                </label>
                                                <input
                                                  type="text"
                                                  placeholder="Sub-Item name"
                                                  value={subItem.name}
                                                  onChange={(e) => {
                                                    const updatedCategoryData =
                                                      {
                                                        ...categoryData,
                                                      };
                                                    updatedCategoryData.categories[
                                                      categoryIndex
                                                    ].subCategories[
                                                      subCategoryIndex
                                                    ].subItems[
                                                      subItemIndex
                                                    ].name = e.target.value;
                                                    setCategoryData(
                                                      updatedCategoryData
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="remove_btn">
                                                <span
                                                  onClick={() =>
                                                    removeSubItem(
                                                      categoryIndex,
                                                      subCategoryIndex,
                                                      subItemIndex
                                                    )
                                                  }
                                                  className="a_flex"
                                                >
                                                  <CloseIcon className="icon" />{" "}
                                                  Remove Sub-Item
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        )}
                                        <div
                                          className={
                                            subCategory.subItems.length === 0
                                              ? "sub_btn_btn"
                                              : "sub_btn"
                                          }
                                        >
                                          <span
                                            onClick={() =>
                                              addSubItem(
                                                categoryIndex,
                                                subCategoryIndex
                                              )
                                            }
                                          >
                                            Add Sub-Item
                                          </span>
                                        </div>
                                      </>
                                      <div className="remove_btn">
                                        <span
                                          onClick={() =>
                                            removeSubCategory(
                                              categoryIndex,
                                              subCategoryIndex
                                            )
                                          }
                                          className="a_flex"
                                        >
                                          <CloseIcon className="icon" /> Remove
                                          Sub-Category
                                        </span>
                                      </div>
                                    </span>
                                  )
                                )}
                                <div
                                  className={
                                    category.subCategories.length === 0
                                      ? "sub_btn_btn"
                                      : "sub_btn"
                                  }
                                >
                                  <span
                                    onClick={() =>
                                      addSubCategory(categoryIndex)
                                    }
                                  >
                                    Add Sub-Category
                                  </span>
                                </div>
                              </>
                              {categoryIndex === 0 ? (
                                ""
                              ) : (
                                <div className="remove_btn">
                                  <span
                                    onClick={() =>
                                      removeCategory(categoryIndex)
                                    }
                                    className="a_flex"
                                  >
                                    <CloseIcon className="icon" /> Remove
                                    Category
                                  </span>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                      <div className="add_more_btn">
                        <span onClick={addCategory}>Add More Categories</span>
                      </div>
                    </div>
                    <div className="bottom_btn mtb">
                      <span className="">
                        <button type="submit" className="a_flex">
                          <DescriptionOutlinedIcon className="icon" /> Save
                        </button>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export function Color({ openBox, toggleBox }) {
  // State to hold the list of colors and the form data
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({
    colorName: "",
    hexCode: "",
  });

  useEffect(() => {
    // Fetch the list of colors when the component mounts
    fetchColors();
  }, []);

  // Function to fetch the list of colors from the server
  const fetchColors = async () => {
    try {
      const response = await axios.get(`${request}/api/color`);
      setColors(response.data);
    } catch (error) {
      toast.error("Failed to fetch colors");
    }
  };

  // Function to handle changes in the form input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to add a new color
  const addColor = async () => {
    if (!formData.colorName || !formData.hexCode) {
      toast.error("ColorName and HexCode cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`${request}/api/color`, {
        colors: [
          {
            colorName: formData.colorName,
            hexCode: formData.hexCode,
          },
        ],
      });
      setColors((prevColors) => [...prevColors, response.data]);
      toast.success("Color added successfully");
    } catch (error) {
      toast.error("Failed to add color");
    }
  };

  // Function to handle editing a color
  const editColor = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      _id: id, // Set the _id to indicate it's an existing color
    }));
    populateFormData(id); // Populate the form data with the selected color's details
  };

  const populateFormData = (id) => {
    // Find the selected color by its ID
    const selectedColor = colors.find((colorData) => colorData._id === id);

    if (selectedColor) {
      setFormData((prevData) => ({
        ...prevData,
        colorName: selectedColor.colors[0].colorName,
        hexCode: selectedColor.colors[0].hexCode,
      }));
    } else {
      toast.error("No data found for the color being edited.");
    }
  };

  // Function to delete a color
  const deleteColor = async (id) => {
    try {
      await axios.delete(`${request}/api/color/${id}`);
      setColors((prevColors) => prevColors.filter((color) => color._id !== id));
      toast.success("Color deleted successfully");
    } catch (error) {
      toast.error("Failed to delete color");
    }
  };

  // Function to update an existing color
  const updateColor = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${request}/api/color/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateOrAddColor = async () => {
    if (formData._id) {
      try {
        // Call updateColor function with the correct color ID and the updated data
        const updatedData = {
          colorName: formData.colorName,
          hexCode: formData.hexCode,
        };
        const updatedColor = await updateColor(formData._id, updatedData);

        // Update the state directly with the updated data from the server
        setColors((prevColors) =>
          prevColors.map((color) =>
            color._id === formData._id ? updatedColor : color
          )
        );

        toast.success("Color updated successfully");
      } catch (error) {
        console.error("Error updating color:", error); // Log the error
        toast.error("Failed to update color");
      }
    } else {
      addColor(); // If no _id exists, it's a new color, so call addColor function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrAddColor();
    // Clear form data after submitting
    setFormData({
      colorName: "",
      hexCode: "",
      _id: "", // Clear the _id field to indicate it's a new color
    });
  };

  // Function to handle editing cancellation
  const handleCancelEdit = () => {
    setFormData({
      colorName: "",
      hexCode: "",
      _id: "", // Clear the _id field to indicate it's a new color
    });
  };

  console.log(colors);

  return (
    <>
      <div className="productBottom mtb ">
        <div className="productForm">
          <div className="product_info product___">
            <div className="features_box mt light_shadow">
              <div
                className={
                  openBox === 1 ? "header  c_flex" : "header border c_flex"
                }
                onClick={() => toggleBox(1)}
              >
                <div className="left">
                  <div className="d_flex">
                    <div className="number l_flex">
                      <span>02</span>
                    </div>
                    <div className="text">
                      <h4>Color</h4>
                      <small>Add and update color below</small>
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
                <>
                  <div className="product_info_color ">
                    <div className="product_info_box ">
                      <form onSubmit={handleSubmit} className="form_input">
                        {/* Color Name Input */}
                        <div className="form-group">
                          <label htmlFor="color">Color</label>
                          <span className="color_name">
                            <input
                              type="text"
                              name="colorName"
                              value={formData.colorName}
                              onChange={handleInputChange}
                              placeholder="Color Name"
                            />
                          </span>
                          {/* Hex Code Input */}
                          <span className="link_img">
                            <input
                              type="text"
                              name="hexCode"
                              value={formData.hexCode}
                              onChange={handleInputChange}
                              placeholder="Hex Code"
                            />
                          </span>{" "}
                        </div>

                        {/* Conditional Rendering of the Buttons */}
                        <div className="a_flex">
                          <button type="submit">
                            {formData._id ? "Update Color" : "Add Color"}
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
                        {colors?.map((colorData) => (
                          <li key={colorData._id} className="mb">
                            {colorData.colors.map((color) => (
                              <div key={color._id}>
                                <div>
                                  <strong>Color Name: </strong>
                                  <span>{color.colorName}</span>
                                </div>
                                <div>
                                  <strong>Hex Code: </strong>
                                  <span>{color.hexCode}</span>
                                </div>
                              </div>
                            ))}
                            <span className="d_flex">
                              <button
                                type="submit"
                                onClick={() => editColor(colorData._id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteColor(colorData._id)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Price({ openBox, toggleBox }) {
  const [priceData, setPriceData] = useState({
    minValue: "",
    maxValue: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPriceId, setCurrentPriceId] = useState("");

  useEffect(() => {
    fetchPriceData();
  }, []);

  const fetchPriceData = async () => {
    try {
      const response = await axios.get(`${request}/api/price`);
      setPriceData(response.data[0]);
      setCurrentPriceId(response.data[0]._id);
    } catch (error) {
      console.error("Failed to fetch price data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPriceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${request}/api/price/${currentPriceId}`, priceData);
      toast.success("Price updated successfully");
    } catch (error) {
      console.error("Failed to update price:", error);
      toast.error("Failed to update price");
    } finally {
      setLoading(false);
    }
  };

  console.log(priceData);

  return (
    <>
      <div className="productBottom mtb">
        <form onSubmit={handleSubmit}>
          <div className="productForm">
            <div className="product_info product___">
              <div className="features_box mt light_shadow">
                <div
                  className={
                    openBox === 2 ? "header  c_flex" : "header border c_flex"
                  }
                  onClick={() => toggleBox(2)}
                >
                  <div className="left">
                    <div className="d_flex">
                      <div className="number l_flex">
                        <span>03</span>
                      </div>
                      <div className="text">
                        <h4>Price</h4>
                        <small>Update price range</small>
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
                  <>
                    <div className="features box">
                      <div className="inline_input c_flex">
                        <div className="form-group">
                          <label htmlFor="minValue">Minimum Value</label>
                          <input
                            type="number"
                            id="minValue"
                            name="minValue"
                            value={priceData.minValue}
                            onChange={handleInputChange}
                            placeholder="0"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="maxValue">Maximum Value</label>
                          <input
                            type="number"
                            id="maxValue"
                            name="maxValue"
                            value={priceData.maxValue}
                            onChange={handleInputChange}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bottom_btn mtb">
                      <span className="">
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
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
