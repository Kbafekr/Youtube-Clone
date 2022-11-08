import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllChannelsThunk } from "../../../store/channel";
import { deleteChannelThunk } from "../../../store/channel";
import { updateUserThunk } from "../../../store/session";
import "./DeleteChannelForm.css";

//  Be sure to import the modal contents
function DeleteChannelForm({ setShowModal, channel }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const userId = user.id;
  const firstName = user.first_name;
  const lastName = user.last_name;
  const email =
    "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

  const otherChannels = user.channels.filter((otherchannel) => otherchannel.id != channel.id)
  const handleSubmit = async (e) => {
    if (user.active_channel == channel.id) {
      dispatch(
        updateUserThunk(
          userId,
          firstName,
          lastName,
          email,
          otherChannels[0].id,
          password
        )
      );
    }
    e.preventDefault();
    await dispatch(deleteChannelThunk(channel.id));
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
          Warning! This will permanently remove the Channel.
        </h4>
        <div></div>
        <h5 id="assurance">Are you sure you want to delete this Channel?</h5>
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

export default DeleteChannelForm;
