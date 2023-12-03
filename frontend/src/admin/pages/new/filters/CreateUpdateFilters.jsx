import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "./styles.scss";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export function Category({ openBox, toggleBox }) {
  // State to hold the list of categories and the form data
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    icon: "",
    background: "",
    img: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch the list of categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${request}/api/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Add error handling or toast messages here
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

  // Function to add a new category
  const addCategory = async () => {
    if (!formData.name || !formData.img) {
      // Add your own validation as needed
      console.error("Name and Image are required");
      return;
    }

    try {
      const response = await axios.post(
        `${request}/api/category/create-category`,
        {
          icon: formData.icon,
          background: formData.background,
          img: formData.img,
          name: formData.name,
          description: formData.description,
        }
      );

      setCategories((prevCategories) => [...prevCategories, response.data]);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error("Failed to add category");
    }
  };

  // Function to handle editing a category
  const editCategory = (id) => {
    const selectedCategory = categories.find((category) => category._id === id);

    if (selectedCategory) {
      setFormData({
        ...selectedCategory.categories[0], // Assuming the data structure is similar
        _id: id,
      });
    } else {
      console.error("No data found for the category being edited.");
      toast.error("No data found for the category being edited.");
    }
  };

  // Function to delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${request}/api/category/delete-category/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  };

  // Function to update an existing category
  const updateCategory = async () => {
    if (!formData.name || !formData.img) {
      // Add your own validation as needed
      console.error("Name and Image are required");
      return;
    }

    try {
      const response = await axios.put(
        `${request}/api/category/update-category/${formData._id}`,
        {
          icon: formData.icon,
          background: formData.background,
          img: formData.img,
          name: formData.name,
          description: formData.description,
        }
      );

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === formData._id ? response.data : category
        )
      );
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");
    }
  };

  // Function to update or add a category
  const updateOrAddCategory = async () => {
    if (formData._id) {
      updateCategory();
    } else {
      addCategory();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateOrAddCategory();
    // Clear form data after submitting
    setFormData({
      icon: "",
      background: "",
      img: "",
      name: "",
      description: "",
      _id: "", // Clear the _id field to indicate it's a new category
    });
  };

  // Function to handle editing cancellation
  const handleCancelEdit = () => {
    setFormData({
      icon: "",
      background: "",
      img: "",
      name: "",
      description: "",
      _id: "", // Clear the _id field to indicate it's a new category
    });
  };

  return (
    <>
      <div className="productBottom mtb">
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
                  <div className="product_info_color ">
                    <div className="product_info_box ">
                      <form onSubmit={handleSubmit} className="form_input">
                        {/* Icon Input */}
                        <div className="form-group">
                          <label htmlFor="icon">Icon</label>
                          <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleInputChange}
                            placeholder="Icon URL"
                          />
                        </div>

                        {/* Background Input */}
                        <div className="form-group">
                          <label htmlFor="background">Background</label>
                          <input
                            type="text"
                            name="background"
                            value={formData.background}
                            onChange={handleInputChange}
                            placeholder="Background URL"
                          />
                        </div>

                        {/* Image Input */}
                        <div className="form-group">
                          <label htmlFor="img">Image</label>
                          <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                          />
                        </div>

                        {/* Name Input */}
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Category Name"
                          />
                        </div>

                        {/* Description Input */}
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Category Description"
                          />
                        </div>

                        {/* Conditional Rendering of the Buttons */}
                        <div className="a_flex">
                          <button type="submit">
                            {formData._id ? "Update Category" : "Add Category"}
                          </button>
                          &nbsp; &nbsp;
                          {formData._id && (
                            <button type="button" onClick={handleCancelEdit}>
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>

                      <ul className="color_list home_wrappers">
                        {categories?.map((category) => (
                          <li key={category._id} className="mb">
                            <div>
                              <div>
                                <strong>Name: </strong>
                                <span>{category.categories[0].name}</span>
                              </div>
                              <div>
                                <strong>Description: </strong>
                                <span>
                                  {category.categories[0].description}
                                </span>
                              </div>
                            </div>
                            <span className="d_flex">
                              <button
                                type="submit"
                                onClick={() => editCategory(category._id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteCategory(category._id)}
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

export function SubCategory({ openBox, toggleBox }) {
  const [data, setData] = useState({
    categories: [],
    subCategories: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    selectedCategory: "",
    editingSubCategoryId: "",
    editFormData: {
      name: "",
      img: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${request}/api/category`);
      setData({
        categories: response.data,
        subCategories: response.data.flatMap(
          (category) => category.categories[0].subCategories
        ),
      });
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      editFormData: {
        ...prevData.editFormData,
        [name]: value,
      },
    }));
  };

  const addSubCategory = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.selectedCategory) {
      toast.error("Subcategory name and category cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        `${request}/api/category/${formData.selectedCategory}/create-subcategory`,
        {
          name: formData.name,
          img: formData.img,
        }
      );
      setData((prevData) => ({
        ...prevData,
        subCategories: [...prevData.subCategories, response.data],
      }));
      toast.success("Subcategory added successfully");
      setFormData({
        name: "",
        img: "",
        selectedCategory: "",
      });
      fetchData();
    } catch (error) {
      console.error("Failed to add subcategory:", error);
      toast.error("Failed to add subcategory");
    }
  };

  const deleteSubCategory = async (subCategoryId) => {
    try {
      await axios.delete(
        `${request}/api/category/${formData.selectedCategory}/delete-subcategory/${subCategoryId}`
      );
      setData((prevData) => ({
        ...prevData,
        subCategories: prevData.subCategories.filter(
          (subCategory) => subCategory._id !== subCategoryId
        ),
      }));
      toast.success("Subcategory deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete subcategory:", error);
    }
  };

  const editSubCategory = (subCategoryId) => {
    const subCategoryToEdit = data.subCategories.find(
      (subCategory) => subCategory._id === subCategoryId
    );

    if (subCategoryToEdit) {
      setFormData((prevData) => ({
        ...prevData,
        editingSubCategoryId: subCategoryId,
        editFormData: {
          name: subCategoryToEdit.name,
          img: subCategoryToEdit.img,
        },
      }));
    } else {
      console.error(`Subcategory with ID ${subCategoryId} not found.`);
      console.log("Current subCategories:", data.subCategories);
    }
  };

  const updateSubCategory = async (subCategoryId) => {
    if (!formData.editFormData.name || !formData.editFormData.img) {
      toast.error("Subcategory name and image cannot be empty");
      return;
    }

    const url = `${request}/api/category/${formData.selectedCategory}/update-subcategory/${subCategoryId}`;
    console.log("Update URL:", url);

    try {
      const response = await axios.put(url, {
        name: formData.editFormData.name,
        img: formData.editFormData.img,
      });

      console.log("Update response:", response.data);

      setData((prevData) => ({
        ...prevData,
        subCategories: prevData.subCategories.map((subCategory) =>
          subCategory._id === subCategoryId ? response.data : subCategory
        ),
      }));

      toast.success("Subcategory updated successfully");
      setFormData({
        ...formData,
        editingSubCategoryId: "",
        editFormData: {
          name: "",
          img: "",
        },
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update subcategory:", error);
      toast.error("Failed to update subcategory");
    }
  };

  // Filter subcategories based on selected category
  const filteredSubCategories =
    data.categories.find(
      (category) => category._id === formData.selectedCategory
    )?.categories[0].subCategories || [];

  const cancelUpdate = () => {
    setFormData({
      ...formData,
      editingSubCategoryId: "",
      editFormData: {
        name: "",
        img: "",
      },
    });
  };
  return (
    <>
      <div className="productBottom mtb">
        <div className="productForm">
          <div className="product_info product___">
            <div className="features_box mt light_shadow">
              <div
                className={
                  openBox === 1 ? "header c_flex" : "header border c_flex"
                }
                onClick={() => toggleBox(1)}
              >
                <div className="left">
                  <div className="d_flex">
                    <div className="number l_flex">
                      <span>02</span>
                    </div>
                    <div className="text">
                      <h4>Sub-Category</h4>
                      <small>Add and update sub-category below</small>
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
                  <div className="product_info_color">
                    <div className="product_info_box">
                      <form onSubmit={addSubCategory} className="form_input">
                        <div className="form-group">
                          <label htmlFor="subcategory">Subcategory</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Subcategory Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="img">Image</label>
                          <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="selectedCategory">
                            Select Category
                          </label>
                          <select
                            name="selectedCategory"
                            value={formData.selectedCategory}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            {data.categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categories[0].name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="a_flex">
                          <button type="submit">Add Subcategory</button>
                        </div>
                      </form>
                      <ul className="color_list home_wrappers">
                        {filteredSubCategories.map((subCategory) => (
                          <li key={subCategory._id} className="mb">
                            {formData.editingSubCategoryId ===
                            subCategory._id ? (
                              <div className="edit-form">
                                <div className="form-group">
                                  <label htmlFor="subcategory">
                                    Subcategory
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.editFormData.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Subcategory Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="img">Image</label>
                                  <input
                                    type="text"
                                    name="img"
                                    value={formData.editFormData.img}
                                    onChange={handleEditInputChange}
                                    placeholder="Image URL"
                                  />
                                </div>
                                <div className="a_flex">
                                  <button
                                    type="submit"
                                    onClick={() =>
                                      updateSubCategory(subCategory._id)
                                    }
                                  >
                                    Update
                                  </button>
                                  &#160; &#160;
                                  <button
                                    type="button"
                                    onClick={() => cancelUpdate()}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <div>
                                    <strong>Subcategory Name: </strong>
                                    <span>{subCategory.name}</span>
                                  </div>
                                  <div>
                                    <strong>Image: </strong>
                                    <span>{subCategory.img}</span>
                                  </div>
                                </div>
                                <span className="d_flex">
                                  <button
                                    type="submit"
                                    onClick={() =>
                                      editSubCategory(subCategory._id)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteSubCategory(subCategory._id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </span>
                              </>
                            )}
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

export function SubItem({ openBox, toggleBox }) {
  const [data, setData] = useState({
    categories: [],
    subCategories: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    selectedCategory: "",
    selectedSubCategory: "",
    editingSubItemId: "",
    editFormData: {
      name: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${request}/api/category`);
      setData({
        categories: response.data,
        subCategories: response.data.flatMap(
          (category) => category.categories[0].subCategories
        ),
      });
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      editFormData: {
        ...prevData.editFormData,
        [name]: value,
      },
    }));
  };

  const addSubItem = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.selectedCategory ||
      !formData.selectedSubCategory
    ) {
      toast.error("Subitem name, category, and subcategory cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${request}/api/category/${formData.selectedCategory}/${formData.selectedSubCategory}/create-subitem`,
        {
          name: formData.name,
        }
      );
      setData((prevData) => ({
        ...prevData,
        subCategories: prevData.subCategories.map((subCategory) => {
          if (subCategory._id === formData.selectedSubCategory) {
            subCategory.subItems.push(response.data);
          }
          return subCategory;
        }),
      }));
      toast.success("Subitem added successfully");
      setFormData({
        name: "",
        selectedCategory: "",
        selectedSubCategory: "",
      });
      fetchData();
    } catch (error) {
      console.error("Failed to add subitem:", error);
      toast.error("Failed to add subitem");
    }
  };

  const deleteSubItem = async (subItemId) => {
    try {
      await axios.delete(
        `${request}/api/category/${formData.selectedCategory}/${formData.selectedSubCategory}/${subItemId}`
      );
      setData((prevData) => ({
        ...prevData,
        subCategories: prevData.subCategories.map((subCategory) => {
          if (subCategory._id === formData.selectedSubCategory) {
            subCategory.subItems = subCategory.subItems.filter(
              (subItem) => subItem._id !== subItemId
            );
          }
          return subCategory;
        }),
      }));
      toast.success("Subitem deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete subitem:", error);
    }
  };

  const editSubItem = (subItemId) => {
    const subItemToEdit = data.subCategories
      .find((subCategory) => subCategory._id === formData.selectedSubCategory)
      .subItems.find((subItem) => subItem._id === subItemId);

    if (subItemToEdit) {
      setFormData((prevData) => ({
        ...prevData,
        editingSubItemId: subItemId,
        editFormData: {
          name: subItemToEdit.name,
        },
      }));
    } else {
      console.error(`Subitem with ID ${subItemId} not found.`);
      console.log("Current subItems:", data.subCategories);
    }
  };

  const updateSubItem = async (subItemId) => {
    if (!formData.editFormData.name) {
      toast.error("Subitem name cannot be empty");
      return;
    }

    const url = `${request}/api/category/${formData.selectedCategory}/${formData.selectedSubCategory}/${subItemId}`;
    console.log("Update URL:", url);

    try {
      const response = await axios.put(url, {
        name: formData.editFormData.name,
      });

      console.log("Update response:", response.data);

      setData((prevData) => ({
        ...prevData,
        subCategories: prevData.subCategories.map((subCategory) => {
          if (subCategory._id === formData.selectedSubCategory) {
            subCategory.subItems = subCategory.subItems.map((subItem) =>
              subItem._id === subItemId ? response.data : subItem
            );
          }
          return subCategory;
        }),
      }));

      toast.success("Subitem updated successfully");
      setFormData({
        ...formData,
        editingSubItemId: "",
        editFormData: {
          name: "",
        },
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update subitem:", error);
      toast.error("Failed to update subitem");
    }
  };

  // Filter subcategories based on selected category
  const filteredSubCategories =
    data.categories.find(
      (category) => category._id === formData.selectedCategory
    )?.categories[0].subCategories || [];

  // Filter subitems based on selected subcategory
  const filteredSubItems =
    data.subCategories.find(
      (subCategory) => subCategory._id === formData.selectedSubCategory
    )?.subItems || [];

  const cancelUpdate = () => {
    setFormData({
      ...formData,
      editingSubItemId: "",
      editFormData: {
        name: "",
      },
    });
  };

  return (
    <>
      <div className="productBottom mtb">
        <div className="productForm">
          <div className="product_info product___">
            <div className="features_box mt light_shadow">
              <div
                className={
                  openBox === 2 ? "header c_flex" : "header border c_flex"
                }
                onClick={() => toggleBox(2)}
              >
                <div className="left">
                  <div className="d_flex">
                    <div className="number l_flex">
                      <span>03</span>
                    </div>
                    <div className="text">
                      <h4>Sub-Items-Category</h4>
                      <small>Add and update sub-items-category below</small>
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
                  <div className="product_info_color">
                    <div className="product_info_box">
                      <form onSubmit={addSubItem} className="form_input">
                        <div className="form-group">
                          <label htmlFor="subcategory">Subitem</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Subitem Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="selectedCategory">
                            Select Category
                          </label>
                          <select
                            name="selectedCategory"
                            value={formData.selectedCategory}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            {data.categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categories[0].name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="selectedSubCategory">
                            Select Subcategory
                          </label>
                          <select
                            name="selectedSubCategory"
                            value={formData.selectedSubCategory}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select Subcategory
                            </option>
                            {filteredSubCategories.map((subCategory) => (
                              <option
                                key={subCategory._id}
                                value={subCategory._id}
                              >
                                {subCategory.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="a_flex">
                          <button type="submit">Add Subitem</button>
                        </div>
                      </form>
                      <ul className="color_list home_wrappers">
                        {filteredSubItems.map((subItem) => (
                          <li key={subItem._id} className="mb">
                            {formData.editingSubItemId === subItem._id ? (
                              <div className="edit-form">
                                <div className="form-group">
                                  <label htmlFor="subitem">Subitem</label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.editFormData.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Subitem Name"
                                  />
                                </div>
                                <div className="a_flex">
                                  <button
                                    type="submit"
                                    onClick={() => updateSubItem(subItem._id)}
                                  >
                                    Update
                                  </button>
                                  &#160; &#160;
                                  <button
                                    type="button"
                                    onClick={() => cancelUpdate()}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <div>
                                    <strong>Subitem Name: </strong>
                                    <span>{subItem.name}</span>
                                  </div>
                                </div>
                                <span className="d_flex">
                                  <button
                                    type="submit"
                                    onClick={() => editSubItem(subItem._id)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteSubItem(subItem._id)}
                                  >
                                    Delete
                                  </button>
                                </span>
                              </>
                            )}
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
                  openBox === 3 ? "header  c_flex" : "header border c_flex"
                }
                onClick={() => toggleBox(3)}
              >
                <div className="left">
                  <div className="d_flex">
                    <div className="number l_flex">
                      <span>04</span>
                    </div>
                    <div className="text">
                      <h4>Color</h4>
                      <small>Add and update color below</small>
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
                    openBox === 4 ? "header  c_flex" : "header border c_flex"
                  }
                  onClick={() => toggleBox(4)}
                >
                  <div className="left">
                    <div className="d_flex">
                      <div className="number l_flex">
                        <span>05</span>
                      </div>
                      <div className="text">
                        <h4>Price</h4>
                        <small>Update price range</small>
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
