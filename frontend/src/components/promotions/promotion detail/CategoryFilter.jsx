import React, { useReducer, useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { request } from "../../../base url/BaseUrl";

// Initial state for the reducer
const initialState = {
  loading: true,
  error: null,
  categories: [],
};

// Action types
const ActionTypes = {
  FETCH_CATEGORIES_START: "FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE: "FETCH_CATEGORIES_FAILURE",
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORIES_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case ActionTypes.FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CategoryFilter({ promotion, getFilterUrl }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { error, categories } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_CATEGORIES_START });

      try {
        // Make the API call to fetch categories from the promotion route
        const response = await fetch(
          `${request}/api/promotions/${promotion.id}/categories`
        );
        const data = await response.json();

        // Update the state with the fetched categories
        dispatch({
          type: ActionTypes.FETCH_CATEGORIES_SUCCESS,
          payload: data.categories,
        });
      } catch (error) {
        // Handle errors
        dispatch({
          type: ActionTypes.FETCH_CATEGORIES_FAILURE,
          payload: "Error fetching categories",
        });
      }
    };

    fetchData();
  }, [promotion.id]);

  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    if (activeCategory === categoryId) {
      // Clicked on the same category, close it
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="side_filter">
      <div className="content">
        <div className="category_header">
          <ul>
            <div className="title">
              <small>Categories</small>
            </div>
            {error && <p>Error: {error}</p>}

            {categories.length === 0 && (
              <span className="no_category">No category found </span>
            )}

            {categories.map((category) => (
              <li key={category.category}>
                <div
                  className={`main_category ${
                    activeCategory === category.category ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category.category)}
                >
                  <span>{category.category}</span>
                  {activeCategory === category.category && (
                    <FiberManualRecordIcon className="icon" />
                  )}
                </div>
                {activeCategory === category.category && (
                  <ul className="sub_category">
                    {category.subcategories.map((subCategory) => (
                      <li key={subCategory}>
                        <span>{subCategory}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
