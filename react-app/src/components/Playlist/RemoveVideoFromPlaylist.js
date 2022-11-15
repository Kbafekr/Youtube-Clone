import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPlaylistsThunk } from "../../store/playlist";
import { useParams } from "react-router-dom";
import { deleteVideoFromPlaylistThunk } from "../../store/playlist";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function DeletePlaylistVideoForm({ playlistVideo, setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const {playlistId} = useParams()
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteVideoFromPlaylistThunk(playlistId, playlistVideo.id)).then(() => dispatch(getAllPlaylistsThunk()));
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
          Warning! This will remove video from playlist.
        </h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to remove this video?</h5>
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

export default DeletePlaylistVideoForm;
