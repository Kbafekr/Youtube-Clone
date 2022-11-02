import { getVideoCommentsThunk } from "../../../store/comment";
import CreateCommentForm from "./CommentForms/CreateCommentForm";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "./CommentForms/EditCommentForm";
import DeleteCommentForm from "./CommentForms/DeleteCommentForm";
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
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const comments = useSelector((state) => state.comment);
  const allUsers = useSelector((state) => state.allusers);

  const [currentComment, setCurrentComment] = useState("");
  const [commentReplies, setCommentReplies] = useState(false);

  useEffect(() => {
    dispatch(getVideoCommentsThunk(videoId));
  }, [dispatch, videoId]);
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

  return (
    <>
      <div className="CommentsLengthAndSort">
        <div className="CommentsLength">{CommentsArray.length} Comments</div>
        <div className="SortedCommentsSection">
          <div className="SortCommentsFavicon">
            {/* <i class="fa-solid fa-sort-up"></i> */}
            <i class="fa-solid fa-sort-down"></i>
          </div>
          Sort by
        </div>
        <div onClick={() => setCommentReplies(!commentReplies)}>
          {commentReplies === true ? (
            <div className="ShowReplies">Hide Replies</div>
          ) : (
            <div className="ShowReplies">Show Replies</div>
          )}
        </div>
      </div>
      <div className="CreateCommentSection">
        <CreateCommentForm />
      </div>

      <div className="CommentsSectionAllComments">
        {/* filter out comments where is_reply == true, only map through original comments first
            create helper function that filters through all comments that are replies to current comment id
            map through replied comments array in current comments through hidden div onclick*/}
        {filteredCommentsArray &&
          filteredCommentsArray.map((comment) => {
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
                                                {/* edit and delete modal/favicons here */}
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
                                                  {channel.id ==
                                                  user.active_channel ? (
                                                    <>
                                                      <div className="ChannelPictureIndividualComment">
                                                        <img
                                                          src={
                                                            channel.profile_picture
                                                          }
                                                          className="channelPictureHomeArray"
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
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
