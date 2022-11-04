import { getVideoCommentsThunk } from "../../../store/comment";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "./CommentForms/EditCommentForm";
import DeleteCommentForm from "./CommentForms/DeleteCommentForm";
import CreateReplyForm from "./CommentForms/ReplyCommentForm";
import { getAllUsersThunk } from "../../../store/allusers";
import "./Comments.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export function RepliesSection({ comment }) {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const comments = useSelector((state) => state.comment);
  const allUsers = useSelector((state) => state.allusers);

  const [currentComment, setCurrentComment] = useState("");
  const [commentReplies, setCommentReplies] = useState(false);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const [showModalDelete, setShowModalDelete] = useState(false);

  const [reply, setReply] = useState(false);
  useEffect(() => {
    dispatch(getVideoCommentsThunk(videoId));
  }, [dispatch, videoId, showModalDelete, showModalEdit]);
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch, videoId]);

  //   all original comments
  let filteredCommentsArray;
  // all replies
  let filteredRepliesArray;

  const CommentsArray = Object.values(comments);
  const channelsArray = Object.values(channels);
  const allUsersArray = Object.values(allUsers);

  if (CommentsArray) {
    filteredCommentsArray = CommentsArray.filter(
      (comment) => comment.is_reply == false
    );
  }

  if (CommentsArray) {
    filteredRepliesArray = CommentsArray.filter(
      (comment) => comment.is_reply == true
    );
  }

  let filteredreplies = filteredRepliesArray.filter(
    (reply) => reply.commentReply_id == comment.id
  );

  return (
    <>
      <div className="ReplyButtonSection">
        {filteredreplies.length > 0 ? (
          <div onClick={() => setCommentReplies(!commentReplies)}>
            {commentReplies === true ? (
              <div className="ShowReplies">Hide Replies</div>
            ) : (
              <div className="ShowReplies">Show Replies</div>
            )}
          </div>
        ) : (
          ""
        )}
        <div onClick={() => setReply(!reply)}>
          {reply === true ? (
            <div className="ShowReplies">Close</div>
          ) : (
            <div className="ShowReplies">Reply</div>
          )}
        </div>
      </div>
      {reply === true ? (
        <div className="replyToComments">
          <CreateReplyForm comment={comment} setCommentReplies={setCommentReplies} setReply={setReply} />
        </div>
      ) : (
        ""
      )}
      {filteredRepliesArray &&
        commentReplies &&
        filteredRepliesArray.map((replies) => {
          return (
            <>
              {replies.commentReply_id == comment.id ? (
                <div className="repliesSection">
                  {allUsersArray &&
                    allUsersArray.map((user) => {
                      return (
                        <>
                          {user.id == replies.user_id ? (
                            <>
                              {/* match all users to active channel profile pictures */}
                              {channelsArray &&
                                channelsArray.map((channel) => {
                                  return (
                                    <>
                                      {channel.id == user.active_channel ? (
                                        <>
                                          <div className="ChannelPictureIndividualComment">
                                            <img
                                              src={channel.profile_picture}
                                              className="channelPictureHomeArray"
                                              onError={e => { e.currentTarget.src = "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png"; }}
                                            />
                                          </div>
                                          <div className="CommentIndividualRightComponent">
                                            <div className="CommentIndividualUserTop">
                                              <div className="CommentIndividualFirstName">
                                                {user.first_name}
                                              </div>
                                              <div className="CommentIndividualCreatedAt">
                                                {replies.created_at.slice(
                                                  0,
                                                  16
                                                )}
                                              </div>
                                              <div className="EditDeleteCommentsSection">
                                                {sessionUser.id ===
                                                replies.user_id ? (
                                                  <div className="EditCommentFavicon">
                                                    {showModalEdit && (
                                                      <Modal
                                                        onClose={() =>
                                                          setShowModalEdit(
                                                            false
                                                          )
                                                        }
                                                      >
                                                        <EditCommentForm
                                                          comment={
                                                            currentComment
                                                          }
                                                          setShowModal={
                                                            setShowModalEdit
                                                          }
                                                        />
                                                      </Modal>
                                                    )}

                                                    <i
                                                      onClick={() => {
                                                        setShowModalEdit(true);
                                                        setCurrentComment(
                                                          replies
                                                        );
                                                      }}
                                                      class="fa-solid fa-pen-to-square"
                                                    ></i>
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                              {sessionUser.id ===
                                              replies.user_id ? (
                                                <div className="EditCommentFavicon">
                                                  {showModalDelete && (
                                                    <Modal
                                                      onClose={() =>
                                                        setShowModalDelete(
                                                          false
                                                        )
                                                      }
                                                    >
                                                      <DeleteCommentForm
                                                        comment={currentComment}
                                                        setShowModal={
                                                          setShowModalDelete
                                                        }
                                                      />
                                                    </Modal>
                                                  )}

                                                  <i
                                                    onClick={() => {
                                                      setShowModalDelete(true);
                                                      setCurrentComment(
                                                        replies
                                                      );
                                                    }}
                                                    class="fa-sharp fa-solid fa-trash"
                                                  ></i>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                              {/* edit and delete modal/favicons here */}
                                            </div>
                                            <div className="CommentIndividualBody">
                                              {replies.body}
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  );
                                })}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
    </>
  );
}
