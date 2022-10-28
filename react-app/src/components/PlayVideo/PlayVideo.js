import "./PlayVideo.css";

import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk, getOneVideoThunk } from "../../store/video";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../../icons/you2oobLogo.png";

export function VideoPage({ sidePanel }) {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getAllVideosThunk());
      setLoaded(true);
    })();
  }, [dispatch, user]);

  if (!loaded) {
    return null;
  }
  let videosArray;

  videosArray = Object.values(videos);

  let filteredVideo;
  let notVideoArray;

  if (videosArray && videoId) {
    filteredVideo = videosArray.filter((videos) => videos.id == videoId);
  }
  if (videosArray && videoId) {
    notVideoArray = videosArray.filter((videos) => videos.id != videoId);
  }

  if (filteredVideo[0] && loaded) {
    return (
      <>
        <div
          className={
            sidePanel == true ? "homeContainer" : "homeContainerClosed"
          }
        >
          <div className="VideoSingleOuterContainer">
            <div className="SingleVideoContainer">
              <div className="VideoPreviewDetails">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={filteredVideo[0].video_url}
                  playing={true}
                  controls={true}
                />
              </div>
              <div className="VideoDetailsTitleCard">
                <div className="VideoDetailsTitle">
                  {filteredVideo[0].title}
                </div>
                <div className="VideoDetailsChannelSection">
                  {filteredVideo[0].channel_id}
                </div>
                <div className="VideoDetailsDescriptionSection">
                  {filteredVideo[0].description}
                </div>
              </div>
              <div className="VideoDetailsCommentsSection">
                Comments Section
              </div>
            </div>

            <div className="RightSideVideoDetailsSection">
              <div>Recommended Videos Section</div>
              <div className="RecommendedArraySection">
                    {notVideoArray &&
                        notVideoArray.map((video) => {
                    return (
                      <>
                        <div className="VideoCardRecommended">
                          <div
                            className="RecommendedVideoPreview"
                            onClick={() => history.push(`/videos/${video.id}`)}
                          >
                            <ReactPlayer
                              width="100%"
                              height="100%"
                              url={video.video_url}
                              light={true}
                              playIcon={true}
                            />
                          </div>
                          <div className="RecommendedVideoDetailsSection">
                            <div className="RecommendedVideoTitle">{video.title}</div>
                            <div className="RecommendedVideoChannelDetails">{video.channel_id}</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (!filteredVideo[0] && loaded) {
    return (
        <>
        <div>
            {history.push('/')}
        </div>
        </>
    )
  }
}
