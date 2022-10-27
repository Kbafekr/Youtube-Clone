import "./home.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { useDispatch } from "react-redux";
import logo from "../../icons/you2oobLogo.png";

export function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);

  let videosArray;

  videosArray = Object.values(videos);

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);

  return (
    <>
      <div className="homeContainer">
        <div className="homeContainerInner">
          <div className="homeTagsBar">
          <h1>Welcome to You2ube</h1>
          </div>
          <div>
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div>
                    <ReactPlayer url={video.video_url} light={true} playIcon={true}/>
                      <div>{video.title}</div>

                      <br />
                      {video.description}
                    </div>
                  </>
                );
              })}
          </div>
          <div>
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div>
                    <ReactPlayer url={video.video_url} light={true} playIcon={true}/>
                      <div>{video.title}</div>

                      <br />
                      {video.description}
                    </div>
                  </>
                );
              })}
          </div>
          <div>
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div>
                    <ReactPlayer url={video.video_url} light={true} playIcon={true}/>
                      <div>{video.title}</div>

                      <br />
                      {video.description}
                    </div>
                  </>
                );
              })}
          </div>
          <div>
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div>
                    <ReactPlayer url={video.video_url} light={true} playIcon={true}/>
                      <div>{video.title}</div>

                      <br />
                      {video.description}
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
