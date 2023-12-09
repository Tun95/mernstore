import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { CommentModal } from "../modals/Modals";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseIcon from "@mui/icons-material/Close";
import UpdateIcon from "@mui/icons-material/Update";
import { Context } from "../../context/Context";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { getError } from "../utilities/util/Utils";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

//===========
// PAGINATION
//===========
const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return <Link to="">Previous</Link>;
  }
  if (type === "next") {
    return <Link to="">Next</Link>;
  }
  return originalElement;
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.payload.comments,
        totalPages: action.payload.totalPages,
        totalComments: action.payload.totalComments,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}

function Comments({ blogId }) {
  const { state: cState } = useContext(Context);
  const { userInfo } = cState;

  const initialState = {
    loading: false,
    comments: [],
    totalPages: 0,
    currentPage: 1,
    totalComments: 0,
    error: null,
  };

  const [{ comments, totalPages, currentPage, totalComments }, dispatch] =
    useReducer(reducer, initialState);

  console.log(totalComments);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    comment: "",
  });

  const fetchComments = async () => {
    dispatch({ type: "FETCH_REQUEST" });

    try {
      const response = await axios.get(
        `${request}/api/blog/${blogId}/comments?page=${currentPage}`
      );
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          comments: response.data.comments,
          totalPages: response.data.totalPages,
          totalComments: response.data.totalComments,
        },
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(getError(error));
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId, currentPage]);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editComment = (commentId) => {
    const commentToEdit = comments.find((comment) => comment._id === commentId);

    if (commentToEdit) {
      setEditingCommentId(commentId);
      setEditFormData({
        name: commentToEdit.name,
        comment: commentToEdit.comment,
      });
    } else {
      console.error(`Comment with ID ${commentId} not found.`);
    }
  };

  const updateComment = async () => {
    if (!editFormData.name || !editFormData.comment) {
      console.error("Name and comment cannot be empty");
      return;
    }

    try {
      await axios.put(
        `${request}/api/blog/update/${blogId}/${editingCommentId}`,
        {
          name: editFormData.name,
          comment: editFormData.comment,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success("Comment updated successfully");
      fetchComments(); // Updated to fetch comments after an update
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error(getError(error));
    } finally {
      setEditingCommentId(null);
      setEditFormData({
        name: "",
        comment: "",
      });
    }
  };

  const cancelUpdate = () => {
    setEditingCommentId(null);
    setEditFormData({
      name: "",
      comment: "",
    });
  };

  const deleteComment = async (commentId) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!userConfirmed) {
      return; // Do nothing if the user cancels the operation
    }

    try {
      await axios.delete(`${request}/api/blog/delete/${blogId}/${commentId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success("Comment deleted successfully");
      fetchComments(); // Updated to fetch comments after a delete
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(getError(error));
    }
  };

  const headerRef = useRef(null);
  const handlePageChange = (page) => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  return (
    <div className="comments">
      <div className="content">
        <div className="header">
          <h2>{totalComments} Comments</h2>
        </div>
        <div className="list" ref={headerRef}>
          {totalComments === 0 && (
            <div className="no_post l_flex">
              <h3>No comment found</h3>
            </div>
          )}
          <small className="reviews">
            <ul>
              {comments.map((item, index) => (
                <li className="" key={index}>
                  <div className="c_flex span_header">
                    <div className="user_info a_flex">
                      <div className="short l_flex">
                        <h2>{item.name.charAt(0)}</h2>
                      </div>
                      <div className="user">
                        <span>
                          <h4 className="name a_flex">{item.name}</h4>
                          <small className="date_time">
                            {new Intl.DateTimeFormat("en-GB", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }).format(new Date(item.createdAt))}
                          </small>
                        </span>
                      </div>
                    </div>
                    {userInfo._id === item.user && (
                      <div className="icons a_flex">
                        <span className="l_flex">
                          <DeleteForeverOutlinedIcon
                            className="icon mui_icon"
                            onClick={() => deleteComment(item._id)}
                          />
                        </span>

                        {editingCommentId === item._id ? (
                          <>
                            <span className="l_flex">
                              <UpdateIcon
                                className="icon mui_icon"
                                onClick={updateComment}
                              />
                            </span>
                            <span className="l_flex">
                              <CloseIcon
                                className="icon mui_icon"
                                onClick={cancelUpdate}
                              />
                            </span>
                          </>
                        ) : (
                          <span className="l_flex">
                            <i
                              className="fa-solid fa-pen-to-square icon"
                              onClick={() => editComment(item._id)}
                            ></i>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text">
                    {editingCommentId === item._id ? (
                      <textarea
                        name="comment"
                        className="textarea"
                        value={editFormData.comment}
                        onChange={handleEditInputChange}
                        placeholder="Edit comment..."
                      />
                    ) : (
                      <p>{item.comment}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </small>
          {totalComments === 0 ? (
            ""
          ) : (
            <div className="ant_pagination l_flex mt">
              <Pagination
                total={totalPages * 5}
                itemRender={itemRender}
                current={currentPage}
                pageSize={5}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
        <div className="btn">
          <CommentModal blogId={blogId} fetchComments={fetchComments} />
        </div>
      </div>
    </div>
  );
}

export default Comments;
