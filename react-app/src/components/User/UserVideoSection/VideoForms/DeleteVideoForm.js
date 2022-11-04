import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllChannelsThunk } from "../../../../store/channel";
import { getAllVideosThunk } from "../../../../store/video";
import { deleteVideoThunk } from "../../../../store/video";
import "./DeleteChannelForm.css";

//  Be sure to import the modal contents
function DeleteVideoForm({ setShowModal, video }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteVideoThunk(video.id)).then(() => dispatch(getAllVideosThunk()));
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
          Warning! This will permanently remove the Video.
        </h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete this Video?</h5>
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

export default DeleteVideoForm;
