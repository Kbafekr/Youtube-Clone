import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllChannelsThunk } from "../../../store/channel";

import { updateChannelThunk } from "../../../store/channel";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditChannelForm({ channel, setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const userId = user.id;
  const id = channel.id
  console.log(id)

  const [channelName, setChannelName] = useState(channel.channel_name);
  const [profilePicture, setProfilePicture] = useState(channel.profile_picture);
  const [bannerPicture, setBannerPicture] = useState(channel.banner_picture);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (!channelName || channelName.length < 1 || channelName.length > 30)
      formValidationErrors.push(
        "Channel Name must exist and be between 1 and 30 characters"
      );

    setErrors(formValidationErrors);
  }, [channelName]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateChannelThunk(
          id,
          channelName,
          userId,
          profilePicture,
          bannerPicture,
        )
      )
        .then(() => setShowModal(false)).then(() => dispatch(getAllChannelsThunk()))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return errors;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="EditUser-outer">
      <div className="edit-user-containerinner">
        <form
          className="Edit-User-inner"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
          <h2 className="EditUserHeaderTop">Edit Channel</h2>
          <div className="errorHandlingContainer">
            {errors.length > 0 && (
              <div className="HeaderErrorStyling">
                <ul className="ImageUlBulletErrorStyling">
                  {errors.map((error, idx) => (
                    <li className="ImageErrorPoints" key={idx}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="EditUserHeader">Channel Name:</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            name="preview-image"
            placeholder="channel name..."
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <div className="EditUserHeader">Profile Picture(optional):</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="url"
            name="preview-image"
            placeholder="Profile Picture(optional)"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          <div className="EditUserHeader">Banner Picture(optional):</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="url"
            name="preview-image"
            placeholder="Banner Picture(optional)"
            value={bannerPicture}
            onChange={(e) => setBannerPicture(e.target.value)}
          />
          <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Edit
            </button>
            <button

              className="cancelDeleteImage"
              onClick={() => setShowModal(false)}
              type="submit"
            >
              Cancel Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelForm;
