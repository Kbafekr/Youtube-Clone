import "./../PlayVideo.css";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllChannelsThunk } from "../../../store/channel";
import { getWatchLaterThunk } from "../../../store/watchlater";
import { createWatchLaterThunk } from "../../../store/watchlater";

export default function WatchLaterSection() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => state.channel);
  const watchlater = useSelector((state) => state.watchlater);

  const videos = useSelector((state) => state.video);

  const [loaded, setLoaded] = useState(false);
  const [tagged, setTagged] = useState(false);


  useEffect(() => {
    dispatch(getWatchLaterThunk(user.id));
    setLoaded(true)
  }, [dispatch, user, tagged]);




  let watchLaterUser
  const watchlaterArray = Object.values(watchlater);
  if (user != null) {
    watchLaterUser = watchlaterArray.filter((watch) => watch.user_id === user.id);
  }
  let videoInWatchLater
  if (user != null && watchLaterUser[0] != null)
  {
    videoInWatchLater = watchlaterArray.filter((watch) => watch.video_id == videoId && watch.user_id == user.id);

  }

  const toggleWatchLater = (e) => {
    e.preventDefault();
    dispatch(createWatchLaterThunk(user.id, videoId)).then(() => dispatch(getWatchLaterThunk(user.id))).then(() =>setTagged(!tagged))
  };
  if (user != null) {
  return (
    loaded && (
      <>
        <div className="AddtoPlaylistButtonVideosSection">
          <div className="WatchLaterButtonContainer">
            <div
              className="notificationBellVideoPlay"
              id={videoInWatchLater != null && videoInWatchLater[0] != null ? "blueLike" : ""}
              onClick={toggleWatchLater}
            >
              <i class="fa-solid fa-clock"></i>
            </div>
            Watch Later
          </div>
        </div>
      </>
    ))
  }
  else return (
   <>
   </>
    )
}
