import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getVideoCommentsThunk } from "../../../../store/comment";
import { deleteCommentThunk } from "../../../../store/comment";
import "./DeleteChannelForm.css";
import { useParams } from "react-router-dom";

//  Be sure to import the modal contents
function DeleteCommentForm({ comment, setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comment);
  const commentArray = Object.values(comments)

  const { videoId } = useParams();

// filter through child comments and delete
const filteredReplies = commentArray.filter((comments) => comments.commentReply_id === comment.id)
console.log(filteredReplies)
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteCommentThunk(videoId, comment.id))
    if (filteredReplies.length > 0) {
      filteredReplies.forEach((reply) => {
        dispatch(deleteCommentThunk(videoId, reply.id))
      })
      dispatch(getVideoCommentsThunk(videoId))
    }
    dispatch(getVideoCommentsThunk(videoId))
    setShowModal(false);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="DeleteImage-outer">
      <form
        className="DeleteComment-inner"
        onSubmit={handleSubmit2}
        autoComplete="off"
      >
        <h4 id="statement">
          Warning! This will permanently remove the Comment.
        </h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete this Comment?</h5>
        <div className="deleteImageButtons">
          <button
            className="submitDeleteImage"
            onClick={handleSubmit}
            type="submit"
          >
            Delete
          </button>
          <button
            className="cancelDeleteImage"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteCommentForm;
