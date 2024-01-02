import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function Announcement({ openBox, toggleBox }) {
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

  const headerRef = useRef(null);

  // Function to handle editing a color
  const editColor = (id) => {
    headerRef.current.scrollIntoView({ behavior: "smooth" });
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
    // Show confirmation dialog
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this color?"
    );

    // If the user confirms, proceed with deletion
    if (shouldDelete) {
      try {
        await axios.delete(`${request}/api/color/${id}`);
        setColors((prevColors) =>
          prevColors.filter((color) => color._id !== id)
        );
        toast.success("Color deleted successfully");
      } catch (error) {
        toast.error("Failed to delete color");
      }
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

export default Announcement;
