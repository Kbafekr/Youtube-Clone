import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllChannelsThunk } from "../../store/channel";
import { newChannelThunk } from "../../store/channel";
import "./EditUserForm.css";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function CreateChannelForm({setShowModal}) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const userId = user.id;

  const [channelName, setChannelName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [bannerPicture, setBannerPicture] = useState("");
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
        newChannelThunk(
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
    <div className="Edit-image-container">
      <div className="edit-image-container">
        <form
          className="Edit-image-inner"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
          <h2 className="EditImageHeader">Create New Channel</h2>
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
          <div className="EditImageHeader">Channel Name:</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            name="preview-image"
            placeholder="channel name..."
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />
          <div className="EditImageHeader">Profile Picture(optional):</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="url"
            name="preview-image"
            placeholder="Profile Picture(optional)"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
          <div className="EditImageHeader">Banner Picture(optional):</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="url"
            name="preview-image"
            placeholder="Banner Picture(optional)"
            value={bannerPicture}
            onChange={(e) => setBannerPicture(e.target.value)}
            required
          />
          <div className="done-edit-container">
            <button
              className="done-edit-bttn"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Channel
            </button>
            <button
              id="done-edit-cancel-bttn"
              className="done-edit-bttn"
              onClick={() => setShowModal(false)}
              type="submit"
            >
              Cancel Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChannelForm;
