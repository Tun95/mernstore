import axios from "axios";
import React, { useContext, useReducer } from "react";
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
  const [category, setCategory] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

  const { state } = useContext(Context);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //======
  //CREATE
  //======
  const createHandler = async (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Category input box is empty", { position: "bottom-center" });
    } else {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          `${request}/api/category`,
          { category, categoryImg },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "CREATE_SUCCESS", payload: data });
        toast.success("Created successfully", {
          position: "bottom-center",
        });
        navigate(`/admin/settings`);
      } catch (err) {
        dispatch({ type: "CREATE_FAIL" });
        toast.error(getError(err), { position: "bottom-center" });
      }
    }
  };
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

  return (
    <>
      <div className="productBottom mtb">
        <form action="">
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
  const [color, setColor] = useState();
  const [colorName, setColorName] = useState();

  const { state } = useContext(Context);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //======
  //CREATE
  //======
  const createHandler = async (e) => {
    e.preventDefault();
    if (!color || !colorName) {
      toast.error("Please add color first", { position: "bottom-center" });
    } else {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          `${request}/api/color`,
          { color, colorName },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "CREATE_SUCCESS", payload: data });
        toast.success("Created successfully", {
          position: "bottom-center",
        });
        navigate(`/admin/settings`);
      } catch (err) {
        dispatch({ type: "CREATE_FAIL" });
        toast.error(getError(err), { position: "bottom-center" });
      }
    }
  };

  //==================
  //TOGGLE COLOR BOX
  //==================
  const [colorData, setColorData] = useState([
    { colorName: "", hexCode: "" }, // Initialize with one empty Color and one sub-Color
  ]);

  const addMoreColor = () => {
    setColorData([...colorData, { colorName: "", hexCode: "" }]);
  };

  const removeColor = (index) => {
    const updatedColorData = [...colorData];
    updatedColorData.splice(index, 1);
    setColorData(updatedColorData);
  };

  return (
    <>
      {" "}
      <div className="productBottom mtb">
        <form action="">
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
                                placeholder="color name e.g white"
                              />
                            </span>
                            <span className="link_img">
                              <input
                                type="text"
                                id="color"
                                value={color.hexCode}
                                onChange={(e) => {
                                  const updatedColorData = [...colorData];
                                  updatedColorData[colorIndex].hexCode =
                                    e.target.value;
                                  setColorData(updatedColorData);
                                }}
                                placeholder="color hex code e.g #ffffff"
                              />
                            </span>
                            {colorIndex === 0 ? (
                              ""
                            ) : (
                              <div className="remove_btn">
                                <span
                                  className="a_flex"
                                  onClick={() => removeColor(colorIndex)}
                                >
                                  <CloseIcon className="icon" /> Remove Color
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="add_more_btn">
                        <span onClick={addMoreColor}>Add More Color</span>
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
export function Price({ openBox, toggleBox }) {
  const [price, setPrice] = useState("");
  const [priceSpan, setPriceSpan] = useState("");

  const { state } = useContext(Context);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //======
  //CREATE
  //======
  const createHandler = async (e) => {
    e.preventDefault();
    if (!price || !priceSpan) {
      toast.error("Please add your price range", { position: "bottom-center" });
    } else {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          `${request}/api/price`,
          { price, priceSpan },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "CREATE_SUCCESS", payload: data });
        toast.success("Created successfully", {
          position: "bottom-center",
        });
        navigate(`/admin/settings`);
      } catch (err) {
        dispatch({ type: "CREATE_FAIL" });
        toast.error(getError(err), { position: "bottom-center" });
      }
    }
  };
  return (
    <>
      <div className="productBottom mtb">
        <form action="">
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
                          <label htmlFor="name">Minimum Value</label>
                          <input type="number" id="name" placeholder="0" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Maximum Value</label>
                          <input type="number" id="name" placeholder="0" />
                        </div>
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
