import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllVideosThunk } from "../../../../store/video";
import { getAllChannelsThunk } from "../../../../store/channel";
import { updateVideoThunk } from "../../../../store/video";
import "./EditUserForm.css";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditVideoForm({ video, setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const channel_id = user.active_channel;
  const dispatch = useDispatch();
  const userId = user.id;

  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [video_url, setVideo_Url] = useState(video.video_url);
  const [errors, setErrors] = useState([]);
  const [video_Views, setVideo_Views] = useState(video.video_views)


  const allowedFileTypes = ["video/mp4", "video/mov"];

  useEffect(() => {
    const formValidationErrors = [];

    if (!title || title.length < 1 || title.trim().length < 1)
      formValidationErrors.push(
        "Video title must exist and must be more than 1 character"
      );
    if (title.length > 200)
      formValidationErrors.push("Video title must less than 200 characters");
    if (!description || title.description < 1)
      formValidationErrors.push(
        "Video description must exist and must be more than 1 character"
      );
    if (!description || description.length < 1)
      formValidationErrors.push(
        "Video description must be less than 1000 characters"
      );
    // blob data type for files use .size method, returns bytes, million bytes in a megabyte

    setErrors(formValidationErrors);
  }, [title, description]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateVideoThunk(
          channel_id,
          title,
          description,
          video_url,
          video_Views,
          video.id,
        )
      )
        .then(() => setShowModal(false)).then(() => dispatch(getAllVideosThunk())).then(() => dispatch(getAllChannelsThunk()))
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
          <h2 className="EditUserHeaderTop">Edit Video</h2>
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
          <div className="EditUserHeader">Title:</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="text"
            name="preview-image"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="EditUserHeader">Description:</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="text"
            name="preview-image"
            placeholder="Profile Picture(optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditVideoForm;
