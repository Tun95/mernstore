import React, { useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { Context } from "../../../../context/Context";
import { request } from "../../../../base url/BaseUrl";
import { getError } from "../../../../components/utilities/util/Utils";
import LoadingBox from "../../../../components/utilities/message loading/LoadingBox";
import MessageBox from "../../../../components/utilities/message loading/MessageBox";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet } from "react-helmet-async";
import "./styles.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, calls: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, errors: action.payload };

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

    case "DELETE_ALL_REQUEST":
      return { ...state, loadingDeleteAll: true, successDeleteAll: false };
    case "DELETE_ALL_SUCCESS":
      return { ...state, loadingDeleteAll: false, successDeleteAll: true };
    case "DELETE_ALL_FAIL":
      return {
        ...state,
        loadingDeleteAll: false,
        successDeleteAll: false,
      };
    case "DELETE_ALL_RESET":
      return {
        ...state,
        loadingDeleteAll: false,
        successDeleteAll: false,
      };

    default:
      return state;
  }
};

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 380,
    renderCell: (params) => {
      return (
        <>
          <div className="cellWidthImg">{params.row?.name}</div>
        </>
      );
    },
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 300,
    renderCell: (params) => {
      return (
        <>
          <div className="cellWidthImg">{params.row?.phone}</div>
        </>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 270,
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
];

function CallRequest() {
  const { state } = useContext(Context);
  const { userInfo } = state;

  const [
    {
      loading,
      error,
      successDelete,
      loadingDeleteAll,
      successDeleteAll,
      calls,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
    calls: [],
  });

  //================
  //FETCH ALL PRICE
  //================
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`${request}/api/calls`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete || successDeleteAll) {
      dispatch({ type: "DELETE_RESET" });
      dispatch({ type: "DELETE_ALL_RESET" });
    }

    fetchData();
  }, [successDelete, successDeleteAll, userInfo]);

  //=================
  //DELETE CALL
  //=================
  const deleteHandler = async (call) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this call record?"
    );
    if (!confirmed) {
      return; // Do nothing if the user cancels the deletion
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`${request}/api/calls/${call._id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("Deleted successfully", {
        position: "bottom-center",
      });
      dispatch({ type: "DELETE_SUCCESS" });
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "DELETE_FAIL", payload: getError(err) });
    }
  };

  //=================
  //DELETE ALL CALLS
  //=================
  const deleteAllHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all call records?"
    );
    if (!confirmed) {
      return;
    }
    try {
      dispatch({ type: "DELETE_ALL_REQUEST" });
      await axios.get(`${request}/api/calls/delete`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("All call records deleted successfully", {
        position: "bottom-center",
      });
      dispatch({ type: "DELETE_ALL_SUCCESS" });
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "DELETE_ALL_FAIL", payload: getError(err) });
    }
  };

  console.log(calls);

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction c_flex">
            <a href={`tel:${params.row?.phone}`} className="blockButton">
              Call Now
            </a>
            <div
              onClick={() => deleteHandler(params.row)}
              className="deleteButton"
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const customTranslations = {
    noRowsLabel: "No call requests",
  };
  return (
    <>
      <Helmet>
        <title>Call Requests</title>
      </Helmet>
      <div className="applicants admin_call_request">
        <div className="datatable ">
          <span className="c_flex">
            <h3>All Call Request</h3>
            <span>
              <button
                className="delete_all"
                disabled={loadingDeleteAll}
                onClick={deleteAllHandler}
              >
                {loadingDeleteAll ? (
                  <div className="loading-spinner">deleting...</div>
                ) : (
                  "Delete All"
                )}
              </button>
            </span>
          </span>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <DataGrid
              className="datagrid"
              rows={calls}
              localeText={customTranslations}
              getRowId={(row) => row._id}
              columns={columns.concat(actionColumn)}
              autoPageSize
              rowsPerPageOptions={[8]}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CallRequest;
