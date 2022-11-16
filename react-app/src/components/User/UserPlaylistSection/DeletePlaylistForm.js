import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deletePlaylistThunk, getAllPlaylistsThunk } from "../../../store/playlist";

//  Be sure to import the modal contents
function DeletePlaylistForm({ setShowModal, playlist }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deletePlaylistThunk(playlist.id));
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
          Warning! This will permanently delete the Playlist.
        </h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete this Playlist?</h5>
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

export default DeletePlaylistForm;
