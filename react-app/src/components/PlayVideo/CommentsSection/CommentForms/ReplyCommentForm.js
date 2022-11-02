import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getVideoCommentsThunk } from "../../../../store/comment";
import { newCommentThunk } from "../../../../store/comment";
import '../Comments.css'

function CreateReplyForm({comment}) {
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);

  let channelsArray = Object.values(channels);

  const dispatch = useDispatch();
  const { videoId } = useParams();
  const userId = user.id;
  const is_reply = true;
  const commentReply_id = comment.id

  const [body, setBody] = useState("");
  const [commentStatus, setCommentStatus] = useState()
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const formValidationErrors = [];

    if (body.length > 500) {

      formValidationErrors.push(
        "Channel Name must exist and be between 1 and 500 characters"
        );
        setCommentStatus(false)
      }
    else if (!body.length) {
      setCommentStatus(false)
    }
    else setCommentStatus(true)

    setErrors(formValidationErrors);
  }, [body]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length <= 0) {
  console.log(body)
      return dispatch(
        newCommentThunk(userId, videoId, body, is_reply, commentReply_id)
      )
        .then(() => dispatch(getVideoCommentsThunk(videoId))).then(() => setBody(""))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return errors;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setBody("");
  };

  return (
    <>
      <div className="CreateCommentContainer">
        {channelsArray &&
          channelsArray.map((channel) => {
            return (
              <>
                {channel.id == user.active_channel ? (
                      <img
                        className="channelPictureHomeArray"
                        alt="channel"
                        src={channel.profile_picture}
                      />
                ) : (
                  ""
                )}
              </>
            );
          })}
        <form
          className="CreateCommentForm"
          onSubmit={handleSubmit2}
          autoComplete="off"
        >
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
          <input
            className="CreateCommentBody"
            type="text"
            name="body"
            placeholder="Add a comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            // required
          />
          {commentStatus && (

            <div className="deleteImageButtons">
            <button
              className="cancelDeleteImage"
              onClick={() => setBody("")}
              type="submit"
              >
              Cancel
            </button>
            <button
              className="submitDeleteImage"
              onClick={handleSubmit}
              type="submit"
            >
              Comment
            </button>
          </div>
              )}
        </form>
      </div>
    </>
  );
}

export default CreateReplyForm;
