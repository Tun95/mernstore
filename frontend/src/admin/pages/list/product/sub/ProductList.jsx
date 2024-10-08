import React, { useContext, useEffect, useReducer } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import axios from "axios";

import photo from "../../../../assets/photo.jpg";
import ReactTimeAgo from "react-time-ago";
import { Context } from "../../../../../context/Context";
import LoadingBox from "../../../../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../../../../components/utilities/message loading/MessageBox";
import { request } from "../../../../../base url/BaseUrl";
import { getError } from "../../../../../components/utilities/util/Utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
      };
    case "DELETE_RESET":
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
      };

    default:
      return state;
  }
};

function ProductList({ currencySign, webname, rows }) {
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Products",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWidthImg">
              <img
                src={params.row.images[0] || photo}
                alt="image_banner"
                className="cellImg"
              />
              {params.row.name}
            </div>
          </>
        );
      },
    },
    {
      field: "seller",
      headerName: "Vendor",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWidthImg">
              {params.row?.seller?.seller?.name || webname}
            </div>
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <div className="cellWidthImg">
              <ReactTimeAgo
                date={Date.parse(params.row.createdAt)}
                locale="en-US"
              />
            </div>
          </>
        );
      },
    },
    { field: "category", headerName: "Category", width: 200 },
  ];

  const navigate = useNavigate();

  const { state } = useContext(Context);
  const { userInfo } = state;

  const [
    {
      loading,
      error,
      products,

      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  //==============
  //FETCH PRODUCTS
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${request}/api/products`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  //==============
  //DELETE PRODUCT
  //==============
  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await axios.delete(`${request}/api/products/${product.id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        toast.success("product deleted successfully", {
          position: "bottom-center",
        });
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(err), { position: "bottom-center" });
        dispatch({ type: "DELETE_FAIL" });
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (product) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/product/${product.id}/edit`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => deleteHandler(product)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  console.log(products);

  const getRowId = (row) => {
    // Implement your custom logic to generate a unique id for each row
    return row._id;
  };

  // Check if any row is missing the id property
  const hasMissingId = rows?.some((row) => !row._id);

  if (hasMissingId) {
    // Generate unique ids for rows without an id property
    rows = rows?.map((row, index) => {
      if (!row._id) {
        return {
          ...row,
          id: `row_${index}`, // Replace with your preferred id generation logic
        };
      }
      return row;
    });
  }

  const customTranslations = {
    noRowsLabel: "No product found", // Customize the "No Rows" message here
  };
  return (
    <div className="admin_page_all page_background admin_page_screen">
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="container ">
        <div className="productTitleContainer">
          <h3 className="productTitle light_shadow uppercase">All Products</h3>
        </div>
        <div className="datatable">
          <span className="c_flex">
            <span></span>
            <i
              onClick={() => {
                navigate(`/admin/product/new`);
              }}
              className="fa-solid fa-square-plus filterPlus"
            ></i>
          </span>
          {loading || successDelete ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <DataGrid
              className="datagrid"
              rows={products}
              localeText={customTranslations}
              getRowId={(row) => row._id}
              columns={columns.concat(actionColumn)}
              autoPageSize
              rowsPerPageOptions={[8]}
              checkboxSelection
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
