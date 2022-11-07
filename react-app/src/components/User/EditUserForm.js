import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../store/session";
import { authenticate } from "../../store/session";
import "./EditUserForm.css";

// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditUserForm({ user, setShowModal }) {
  const dispatch = useDispatch();
  const userId = user.id;
  const active_channel = user.active_channel;
  const email = "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const formValidationErrors = [];

    if (!firstName || firstName.length < 1 || firstName.trim().length < 1)
      formValidationErrors.push(
        "First Name must exist and be longer than 1 character"
      );
    if (!lastName || lastName.length < 1 || lastName.trim().length < 1)
      formValidationErrors.push(
        "Last Name must exist and be longer than 1 character"
      );

    setErrors(formValidationErrors);
  }, [firstName, lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateUserThunk(
          userId,
          firstName,
          lastName,
          email,
          active_channel,
          password,
        )
      )
        .then(() => setShowModal(false))
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
          <h2 className="EditUserHeaderTop">Edit User Information</h2>
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
          <div className="EditUserHeader">First Name:</div>
          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            name="preview-image"
            placeholder="first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <div className="EditUserHeader">Last Name</div>

          <input
            className="preview-image-input"
            id="edit-image-input"
            type="text"
            placeholder="Description"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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

export default EditUserForm;
