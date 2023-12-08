import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { request } from "../../base url/BaseUrl";
import { Context } from "../../context/Context";
import { getError } from "../utilities/util/Utils";
import { toast } from "react-toastify";
import "./styles.scss";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import me from "../../assets/me.png";

function Comments({ blogId }) {
  const { state } = useContext(Context);
  const { userInfo } = state;

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const result = await axios.get(`${request}/api/blog/${blogId}/comments`);

      // Transform the server response data into the format expected by CommentSection
      const transformedComments = result.data.map((comment) => ({
        userId: comment.user,
        comId: comment._id,
        fullName: comment.name,
        avatarUrl: comment.image,
        text: comment.comment,
        replies: comment.replies.map((reply) => ({
          userId: reply.userId,
          comId: reply._id,
          fullName: reply.fullName,
          avatarUrl: reply.avatarUrl,
          text: reply.text,
          replies: [], // Assuming replies can't have replies in this structure
        })),
      }));

      setComments(transformedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
    console.log("Comments Map", comments);
  }, [blogId]);

  const handleAddComment = async (commentData) => {
    try {
      const result = await axios.post(
        `${request}/api/blog/${blogId}/comment/create`,
        {
          name: `${userInfo.lastName} ${userInfo.firstName}`,
          email: userInfo.email,
          image: userInfo.image,
          comment: commentData.text,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      // Get the comment ID from the response
      const commentId = result.data._id;

      toast.success("Comment created successfully");

      // Manually fetch comments after adding a comment
      fetchComments();

      // Return the comment ID in case you need it in your component
      return commentId;
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(getError(error));
    }
  };

  const handleUpdateComment = async (commentId, updatedData) => {
    try {
      const result = await axios.put(
        `${request}/api/blog/${blogId}/comment/update/${commentId}`,
        { comment: updatedData.text },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setComments(result.data.comments);
      // Manually fetch comments after adding a comment
      fetchComments();
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error(getError(error));
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const result = await axios.delete(
        `${request}/api/blog/${blogId}/comment/delete/${commentId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setComments(result.data.comments);
      // Manually fetch comments after adding a comment
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(getError(error));
    }
  };

  //=============
  // ADD REPLIES
  //=============
  const handleAddReply = async (commentId, replyData) => {
    try {
      console.log("Received commentId in handleAddReply:", commentId);

      await axios.post(
        `${request}/api/blog/${blogId}/comment/${commentId}/reply/create`,
        {
          text: replyData.text,
          avatarUrl: userInfo.image,
          fullName: `${userInfo.lastName} ${userInfo.firstName}`,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success("Reply added successfully");

      // Manually fetch comments after adding a reply
      fetchComments();
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error(getError(error));
    }
  };

  //=============
  // UPDATE REPLIES
  //=============
  const handleUpdateReply = async (commentId, replyId, updatedData) => {
    try {
      const result = await axios.put(
        `${request}/api/blog/${blogId}/comment/${commentId}/reply/update/${replyId}`,
        { text: updatedData.text },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setComments(result.data.comments);
      // Manually fetch comments after adding a comment
      fetchComments();
    } catch (error) {
      console.error("Error updating reply:", error);
      toast.error(getError(error));
    }
  };

  //=============
  // DELETE REPLIES
  //=============
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      const result = await axios.delete(
        `${request}/api/blog/${blogId}/comment/${commentId}/reply/delete/${replyId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setComments(result.data.comments);
      // Manually fetch comments after adding a comment
      fetchComments();
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error(getError(error));
    }
  };

  return (
    <div
      className="react_comment"
      style={{ width: "100%", marginLeft: "-16px" }}
    >
      <CommentSection
        currentUser={{
          currentUserId: userInfo._id,
          currentUserImg: userInfo.image,
          currentUserFullName: `${userInfo.lastName} ${userInfo.firstName}`,
        }}
        hrStyle={{ border: "0.5px solid #ff0072" }}
        commentData={comments}
        currentData={(data) => {
          console.log("current data", data);
        }}
        customImg={userInfo ? userInfo.image : me}
        inputStyle={{ border: "1px solid rgb(208 208 208)" }}
        formStyle={{ backgroundColor: "white" }}
        submitBtnStyle={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "7px 15px",
        }}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          padding: "7px 15px",
        }}
        advancedInput={true}
        replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
        onSubmitAction={(data) => {
          handleAddComment(data);
        }}
        onDeleteAction={(data) => {
          handleDeleteComment(data.comIdToDelete);
        }}
        onEditAction={(data) => {
          handleUpdateComment(data.comId, {
            text: data.text,
          });
        }}
        onReplyAction={(data) => {
          console.log("onReplyAction data:", data);
          handleAddReply(data.repliedToCommentId, {
            text: data.text,
          });
        }}
        onEditReplyAction={(data) => {
          handleUpdateReply(data.comId, data.replyId, {
            text: data.text,
          });
        }}
        onDeleteReplyAction={(data) => {
          handleDeleteReply(data.comId, data.replyId);
        }}
      />
    </div>
  );
}

export default Comments;
