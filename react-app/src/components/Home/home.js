import "./home.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../icons/you2oobLogo.png";

export function HomePage({sidePanel}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);

  let videosArray;

  videosArray = Object.values(videos);

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);

  return (
    <>
      <div className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}>
        <div className="homeContainerInner">
          <div className="homeTagsBar">
            <h1>Welcome to You2ube</h1>
          </div>
          <div className="VideosMapped">
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div className="VideoCardHome">

                      <div className="VideoPreviewHome" onClick={() => history.push(`/videos/${video.id}`)}>
                        <ReactPlayer
                        width="100%"
                        height="100%"
                          url={video.video_url}
                          light={true}
                          playIcon={true}
                        />
                      </div>
                      <div className="VideoTitleCard">{video.title}</div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
