import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllTagsThunk } from "../../../../store/tags";
import { createATagThunk } from "../../../../store/tags";
function CreateTagForm({video, setShowModal}) {
  const user = useSelector((state) => state.session.user);
  const channel_id = user.active_channel
  const video_id = video.id
  const dispatch = useDispatch();



  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const formValidationErrors = [];

    if (!body || body.length > 100) {

      formValidationErrors.push(
        "Tag must exist and be between 1 and 100 characters"
        );
      }

    setErrors(formValidationErrors);
  }, [body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        createATagThunk(channel_id, video_id, body)
      )
        .then(() => dispatch(getAllTagsThunk())).then(() => setShowModal(false))
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
    <>
      <div className="EditUser-outer">
      <div className="edit-user-containerinner">
        <form
          className="Edit-User-inner"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
          <h2 className="EditUserHeaderTop">Create Tag</h2>
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
          <div className="EditUserHeader">Tag Body:</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            name="body"
            placeholder="Add a tag..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            // required
          />


            <div className="deleteImageButtons">
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Create Tag
            </button>
            <button
              className="cancelDeleteImage"
              onClick={() => setBody("")}
              type="submit"
              >
              Cancel
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default CreateTagForm;
