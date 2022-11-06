import "./../PlayVideo.css";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk, getOneVideoThunk } from "../../../store/video";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { amountViews } from "../../../Utils/Utils";
import { getAllChannelsThunk } from "../../../store/channel";


import {
  getVideoLikesThunk,
  createLikesThunk,
  deleteLikesThunk,
} from "../../../store/likes";
import {
  getVideoDislikesThunk,
  createDislikeThunk,
  deleteDislikesThunk,
} from "../../../store/dislikes";

export default function LikesDislikes() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const likes = useSelector((state) => state.likes);
  const dislikes = useSelector((state) => state.dislikes);

  const videos = useSelector((state) => state.video);

  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getVideoDislikesThunk(videoId));
  }, [dispatch, user, videoId, liked, disliked]);

  useEffect(() => {
    dispatch(getVideoLikesThunk(videoId));
    setLoaded(true);
  }, [dispatch, user, videoId, liked, disliked]);


  let likedByUser;
  let dislikedByUser;
  const likesArray = Object.values(likes);
  const dislikesArray = Object.values(dislikes);
  if (user != null) {
    likedByUser = likesArray.filter((likes) => likes.user_id === user.id);
  }
  if (user != null) {
  dislikedByUser = dislikesArray.filter(
    (dislikes) => dislikes.user_id === user.id
  )
  }

  const toggleLike = (e) => {
    e.preventDefault();
    if (dislikedByUser.length) {
      dispatch(createLikesThunk(videoId))
        .then(() => setLiked(!liked))
        .then(() =>
          dispatch(deleteDislikesThunk(videoId, dislikedByUser[0].id))
        )
        .then(() => setDisliked(!disliked));
    } else {
      dispatch(createLikesThunk(videoId)).then(() => setLiked(!liked));
    }
  };
  const toggleDislike = (e) => {
    e.preventDefault();
    if (likedByUser.length) {
      dispatch(createDislikeThunk(videoId))
        .then(() => setDisliked(!disliked))
        .then(() => dispatch(deleteLikesThunk(videoId, likedByUser[0].id)))
        .then(() => setLiked(!liked));
    } else {
      dispatch(createDislikeThunk(videoId)).then(() => setDisliked(!disliked));
    }
  };
  if (user != null ) {
  return (
    loaded && (
      <>
        <div className="LikesSectionVideo">
          <div className="LikeVideoSection">
            <div
              className="notificationBellVideoPlay"
              id={likedByUser.length ? "blueLike" : ""}
              onClick={toggleLike}
            >
              <i class="fa-solid fa-thumbs-up"></i>
            </div>
            {`${likesArray.length} likes`}
          </div>
          <div
            className="notificationBellVideoPlay"
            id={dislikedByUser.length ? "redDislike" : ""}
            onClick={toggleDislike}
          >
            <i class="fa-solid fa-thumbs-down"></i>
          </div>
        </div>
      </>
    ))
  }
  else return (
    loaded && (
      <>
        <div className="LikesSectionVideo">
          <div className="LikeVideoSection">
            <div
              className="notificationBellVideoPlay"
              id="NoCursor"
              onClick={() => history.push('/login')}

            >
              <i class="fa-solid fa-thumbs-up"></i>
            </div>
            {`${likesArray.length} likes`}
          </div>
          <div
            className="notificationBellVideoPlay"
            id="NoCursor"
            onClick={() => history.push('/login')}
          >
            <i class="fa-solid fa-thumbs-down"></i>
          </div>
        </div>
      </>
    )
  );
}
