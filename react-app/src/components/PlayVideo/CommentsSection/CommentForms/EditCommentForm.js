import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllCommentsThunk } from "../../../../store/comment";
import { updateCommentThunk } from "../../../../store/comment";
import { useParams } from "react-router-dom";
// pass in userId and imageId into createComment form so we aren't relying
// on useParams for imageId (will help when building a comment section for each photo in explore page)
function EditCommentForm({ comment, setShowModal }) {
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  let channelsArray = Object.values(channels);

  const dispatch = useDispatch();
  const { videoId } = useParams();
  const userId = user.id;


  const [body, setBody] = useState(comment.body);
  const [is_reply, setis_reply] = useState(comment.is_reply);
  const [commentReply_id, setcommentReply_id] = useState(comment.commentReply_id);
  const [commentStatus, setCommentStatus] = useState();
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const formValidationErrors = [];

    if (body.length > 500 || body.trim().length < 1) {
      formValidationErrors.push(
        "Channel Name must exist and be between 1 and 500 characters"
      );
      setCommentStatus(false);
    } else if (!body.length) {
      setCommentStatus(false);
    } else setCommentStatus(true);

    setErrors(formValidationErrors);
  }, [body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
      return dispatch(
        updateCommentThunk(comment.id, userId, videoId, body)
      )
        .then(() => setShowModal(false))
        .then(() => dispatch(getAllCommentsThunk()))
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
          <h2 className="EditUserHeaderTop">Edit Comment</h2>
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
          <div className="EditUserHeader">Comment Body:</div>
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

export default EditCommentForm;
