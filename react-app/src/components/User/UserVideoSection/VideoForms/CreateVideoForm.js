import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllVideosThunk } from "../../../../store/video";
import { getAllChannelsThunk } from "../../../../store/channel";
import { newNotificationThunk } from "../../../../store/notifications";
import { newVideoThunk } from "../../../../store/video";
import "./EditUserForm.css";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function CreateVideoForm({ setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const videos = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const channel_id = user.active_channel;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video_url, setVideo_Url] = useState(null);
  const [errors, setErrors] = useState([]);
  const [video_Views, setVideo_Views] = useState("0")

  const allowedFileTypes = ["video/mp4", "video/mov"];

  const allChannels = Object.values(channels)
  const allVideos = Object.values(videos)
  let currentChannel;

  if (allChannels && channel_id){
    currentChannel = allChannels.filter((channel) => channel.id == channel_id)
  }

  useEffect(() => {
    const formValidationErrors = [];

    if (!title || title.trim().length < 1)
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
    if (video_url?.size > 5000000)
      formValidationErrors.push("Video must be smaller than 5MB");
    if (!allowedFileTypes.includes(video_url?.type))
      formValidationErrors.push("Only MP4 and MOV video files allowed");

    setErrors(formValidationErrors);
  }, [title, description, video_url]);

  const videoSet = (e) => {
    const file = e.target.files[0]
    setVideo_Url(file)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      const formData = new FormData()
      formData.append("channel_id", channel_id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("video_url", video_url);
      formData.append("video_views", video_Views);

      return dispatch(
        newVideoThunk(formData)
      )
        .then(() => setShowModal(false))
        .then(() => dispatch(getAllVideosThunk())).then(() => dispatch(getAllChannelsThunk())).then(() => notifyUsers())
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return errors;
  };

  const notifyUsers = () => {
    if (currentChannel) {
      currentChannel[0].subscribers.forEach((subscriber) => {
        dispatch(newNotificationThunk(channel_id, subscriber.user_id, false))
      })
    }
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
          <h2 className="EditUserHeaderTop">Create New Video</h2>
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
          <div className="EditUserHeader">Video Title:</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="text"
            name="preview-image"
            placeholder="Video Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="EditUserHeader">Description:</div>
          <input
            className="preview-image-input"
            id="edit-channel-input"
            type="text"
            name="preview-image"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />



          <div className="EditUserHeader">Video File (MP4 and MOV only):</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="file"
            name="preview-image"
            accept=".mp4, .mov"
            onChange={videoSet}
          />


          <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Submit Video
            </button>
            <button
              className="cancelDeleteImage"
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

export default CreateVideoForm;
