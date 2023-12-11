import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../../../context/Context";
import { request } from "../../../../base url/BaseUrl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styles.scss";
import { getError } from "../../../../components/utilities/util/Utils";

export function VendorPlanCreate() {
  const { state } = useContext(Context);
  const { userInfo } = state;

  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    range: "",
    description: "",
    isChecked: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${request}/api/plans`);
      setPlans(response.data);
    } catch (error) {
      toast.error("Failed to fetch plans");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const addPlan = async () => {
    try {
      await axios.post(
        `${request}/api/plans`,
        { ...formData, _id: null },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      await fetchPlans();
      toast.success("Plan added successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const headerRef = useRef(null);

  const editPlan = async (id) => {
    await fetchPlans();
    headerRef.current.scrollIntoView({ behavior: "smooth" });

    setFormData((prevData) => ({
      ...prevData,
      _id: id,
    }));
    populateFormData(id);
  };

  const populateFormData = (id) => {
    const selectedPlan = plans.find((plan) => plan._id === id);

    if (selectedPlan) {
      setFormData({
        ...selectedPlan,
      });
    } else {
      toast.error("No data found for the plan being edited.");
    }
  };

  const deletePlan = async (id) => {
    if (!id) {
      console.error("Invalid plan ID");
      return;
    }

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (shouldDelete) {
      try {
        await axios.delete(`${request}/api/plans/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        await fetchPlans();
        toast.success("Plan deleted successfully");
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  const updatePlan = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${request}/api/plans/${id}`,
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

   const updateOrAddPlan = async () => {
     if (!formData._id) {
       await addPlan();
     } else {
       try {
         const updatedPlan = await updatePlan(formData._id, formData);

         setPlans((prevPlans) =>
           prevPlans.map((plan) =>
             plan._id === formData._id ? updatedPlan : plan
           )
         );

         toast.success("Plan updated successfully");

         // Fetch plans after updating
         await fetchPlans();
       } catch (error) {
         console.error("Error updating plan:", error);
         toast.error("Failed to update plan");
       }
     }

     setFormData({
       name: "",
       price: 0,
       range: "",
       description: "",
       isChecked: false,
       _id: "",
     });
   };

  const handleCheckChange = async (planId) => {
    const existingCheckedPlan = plans.find((plan) => plan.isChecked);

    if (existingCheckedPlan && existingCheckedPlan._id !== planId) {
      toast.error("Only one plan can be checked at a time");
      return;
    }

    const updatedPlans = plans.map((plan) =>
      plan._id === planId
        ? { ...plan, isChecked: !plan.isChecked }
        : { ...plan, isChecked: false }
    );

    try {
      const updatedPlan = updatedPlans.find((p) => p._id === planId);

      if (updatedPlan) {
        await axios.put(
          `${request}/api/plans/${planId}`,
          {
            isChecked: updatedPlan.isChecked,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        await fetchPlans();
        setPlans(updatedPlans);
      }
    } catch (error) {
      console.error("Error updating isChecked:", error);
      toast.error(getError(error));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateOrAddPlan();
  };

  const handleCancelEdit = () => {
    setFormData({
      name: "",
      price: 0,
      range: "",
      description: "",
      isChecked: false,
      _id: "",
    });
  };

  console.log(plans);

  return (
    <>
      <div className="product_edit filters_add_update admin_page_all plan_all">
        <div className="productBottom ">
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
                        <h4>Plans</h4>
                        <small>Add and update plans below</small>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <KeyboardArrowUpIcon className="icon" />
                  </div>
                </div>

                <div className="product_info_color ">
                  <div className="product_info_box ">
                    <form onSubmit={handleSubmit} className="form_input">
                      <div className="form-group">
                        <span>
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                          />
                        </span>
                        <span>
                          <label htmlFor="price">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                          />
                        </span>
                        <span>
                          <label htmlFor="range">Range</label>
                          <select
                            name="range"
                            value={formData.range}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Range</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
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
                      </div>
                      <div className="a_flex">
                        <button type="submit">
                          {formData._id ? "Update Plan" : "Add Plan"}
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
                      {plans?.map((plan) => (
                        <li key={plan._id} className="mb">
                          <div>
                            <div>
                              <strong>Name: </strong>
                              <span>{plan.name}</span>
                            </div>
                            <div>
                              <strong>Price: </strong>
                              <span>{plan.price}</span>
                            </div>
                            <div>
                              <strong>Choice: </strong>
                              <span>{plan.isChecked ? "Yes" : "No"}</span>
                            </div>
                            <div>
                              <strong>Range: </strong>
                              <span>{plan.range}</span>
                            </div>
                            <div>
                              <label className="a_flex label">
                                <input
                                  type="checkbox"
                                  checked={plan.isChecked || false}
                                  onChange={() => handleCheckChange(plan._id)}
                                />
                                <strong> Is Checked</strong>
                              </label>
                            </div>
                            <div>
                              <strong>Description: </strong>
                              <span>{plan.description}</span>
                            </div>
                          </div>
                          <span className="d_flex">
                            <button
                              type="submit"
                              onClick={() => editPlan(plan._id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deletePlan(plan._id)}
                            >
                              Delete
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
