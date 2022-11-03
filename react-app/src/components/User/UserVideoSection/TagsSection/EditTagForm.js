import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllTagsThunk } from "../../../../store/tags";
import { updateATagThunk } from "../../../../store/tags";
import { useParams } from "react-router-dom";
// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditTagForm({ videoId, tag, setShowModal }) {


  const dispatch = useDispatch();


  const [body, setBody] = useState(tag.body);
  const [errors, setErrors] = useState([]);

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
        updateATagThunk(videoId, tag.id, tag.channel_id, body)
      )
        .then(() => setShowModal(false))
        .then(() => dispatch(getAllTagsThunk()))
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
          <h2 className="EditUserHeaderTop">Edit Tag</h2>
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
            placeholder={body}
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

export default EditTagForm;
