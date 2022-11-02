import { getVideoCommentsThunk } from "../../../store/comment"
import CreateCommentForm from "./CommentForms/CreateCommentForm"
import { Modal } from "../../../context/Modal"
import EditCommentForm from "./CommentForms/EditCommentForm"
import DeleteCommentForm from "./CommentForms/DeleteCommentForm"
import './Comments.css'

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

    useEffect(() => {
        dispatch(getVideoCommentsThunk(videoId));
      }, [dispatch, videoId]);

    //   all original comments
    let filteredCommentsArray;
    // all replies
    let filteredRepliesArray

    const CommentsArray = Object.values(comments)
    const channelsArray = Object.values(channels);


    if (CommentsArray) {
        filteredCommentsArray = CommentsArray.filter((comment) =>
            comment.is_reply == false
        )
    }

    if (CommentsArray) {
        filteredRepliesArray = CommentsArray.filter((comment) =>
            comment.is_reply == true
        )
    }

    return (
        <>
        <div className="CommentsLengthAndSort">
            <div className="CommentsLength">
                {CommentsArray.length} Comments
            </div>
            <div className="SortedCommentsSection">
                <div className="SortCommentsFavicon">
                {/* <i class="fa-solid fa-sort-up"></i> */}
            <i class="fa-solid fa-sort-down"></i>
                </div>
                Sort by
            </div>
        </div>
        <div className="CreateCommentSection">
            <CreateCommentForm />
        </div>

        <div className="CommentsSectionAllComments">
            {/* filter out comments where is_reply == true, only map through original comments first
            create helper function that filters through all comments that are replies to current comment id
            map through replied comments array in current comments through hidden div onclick*/}
            {filteredCommentsArray && filteredCommentsArray.map((comment) => {
                return (
                    <>
                    <div className="IndividualComments">
                        {comment.body}
                        {comment.user_id}
                        {comment.is_reply}
                        {comment.commentReply_id}
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}
