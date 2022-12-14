import { getVideoCommentsThunk } from "../../../store/comment";
import CreateCommentForm from "./CommentForms/CreateCommentForm";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "./CommentForms/EditCommentForm";
import DeleteCommentForm from "./CommentForms/DeleteCommentForm";
import CreateReplyForm from "./CommentForms/ReplyCommentForm";
import { RepliesSection } from "./Replies";
import { getAllUsersThunk } from "../../../store/allusers";
import "./Comments.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export function CommentsSection() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const comments = useSelector((state) => state.comment);
  const allUsers = useSelector((state) => state.allusers);

  const [currentComment, setCurrentComment] = useState("");

  const [showModalEdit, setShowModalEdit] = useState(false);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [sortByComments, setSortByComments] = useState(false);

  let CommentsArray;
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

  CommentsArray = Object.values(comments);
  const channelsArray = Object.values(channels);
  const allUsersArray = Object.values(allUsers);

  if (CommentsArray) {
    filteredCommentsArray = CommentsArray.filter(
      (comment) => comment.is_reply == false
    );
  }

  let commentsCopyArray;
  let sortedCommentsByNewest;

  let commentsArrayForMapping;

  if (CommentsArray) {
    filteredRepliesArray = CommentsArray.filter(
      (comment) => comment.is_reply == true
    );
  }

  if (CommentsArray && filteredCommentsArray.length) {
    commentsCopyArray = [...filteredCommentsArray];
  }

  if (commentsCopyArray != undefined) {
    sortedCommentsByNewest = commentsCopyArray.sort((a, b) => b.id - a.id);
  }
  if (CommentsArray && filteredCommentsArray.length) {
  if (sortByComments == true) {
    commentsArrayForMapping = [...sortedCommentsByNewest];
  } else {
    commentsArrayForMapping = [...filteredCommentsArray];
  }
}

  return (
    <>
      <div className="CommentsLengthAndSort">
        <div className="CommentsLength">{CommentsArray.length} Comments</div>
        <div
          className="SortedCommentsSection"
          onClick={() => setSortByComments(!sortByComments)}
        >
          {sortByComments === false ? (
            <>
              <div className="SortCommentsFavicon">
                {/* <i class="fa-solid fa-sort-up"></i> */}
                <i class="fa-solid fa-sort-down"></i>
              </div>
              <div>Sort by newest </div>
            </>
          ) : (
            <>
              <div className="SortupCommentsFavicon">
                <i class="fa-solid fa-sort-up"></i>
              </div>
              <div>Sort by oldest </div>
            </>
          )}
        </div>
      </div>

      <CreateCommentForm />

      <div className="CommentsSectionAllComments">
        {/* filter out comments where is_reply == true, only map through original comments first
            create helper function that filters through all comments that are replies to current comment id
            map through replied comments array in current comments through hidden div onclick*/}
        {commentsArrayForMapping &&
          commentsArrayForMapping.map((comment) => {
            return (
              <>
                <div className="CommentsandRepliesSection">
                  <div className="IndividualComments">
                    {/* match all users to respective commment user_id */}
                    {allUsersArray &&
                      allUsersArray.map((user) => {
                        return (
                          <>
                            {user.id == comment.user_id ? (
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
                                                  {comment.created_at.slice(
                                                    0,
                                                    16
                                                  )}
                                                </div>
                                                <div className="EditDeleteCommentsSection">
                                                  {sessionUser.id ===
                                                  comment.user_id ? (
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
                                                          setShowModalEdit(
                                                            true
                                                          );
                                                          setCurrentComment(
                                                            comment
                                                          );
                                                        }}
                                                        class="fa-solid fa-pen-to-square"
                                                      ></i>
                                                    </div>
                                                  ) : (
                                                    ""
                                                  )}
                                                  {sessionUser.id ===
                                                  comment.user_id ? (
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
                                                            comment={
                                                              currentComment
                                                            }
                                                            setShowModal={
                                                              setShowModalDelete
                                                            }
                                                          />
                                                        </Modal>
                                                      )}

                                                      <i
                                                        onClick={() => {
                                                          setShowModalDelete(
                                                            true
                                                          );
                                                          setCurrentComment(
                                                            comment
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
                                              </div>
                                              <div className="CommentIndividualBody">
                                                {comment.body}
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
                  <RepliesSection comment={comment} />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
