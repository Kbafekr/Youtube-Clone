import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { getAllChannelsThunk } from "../../../store/channel";
import { useHistory } from "react-router-dom";
import { amountViews } from "../../../Utils/Utils";

export default function ChannelVideosSection({ currentChannel }) {
  const dispatch = useDispatch();
  const userId = currentChannel.user_id;
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="VideosMapped">
        {currentChannel &&
          currentChannel.videos.map((video) => {
            return (
              <>
                <div className="VideoCardHome">
                  <div
                    className="VideoPreviewHome"
                    onClick={() => history.push(`/videos/${video.id}`)}
                  >
                    {video.video_url.includes("s3") ? (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        url={video.video_url}
                        playIcon={true}
                      />
                    ) : (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        url={video.video_url}
                        light={true}
                        playIcon={true}
                      />
                    )}
                  </div>

                  <div className="HomeVideoCardBottomSection">
                    <div className="profileImageHomeVideoArray">
                      <img
                        className="channelPictureHomeArray"
                        alt="channel"
                        src={currentChannel.profile_picture}
                      />
                    </div>
                    <div className="HomeVideoArrayChannelDetails">
                      <div
                        className="VideoTitleCard"
                        onClick={() => history.push(`/videos/${video.id}`)}
                      >
                        {video.title}
                      </div>
                      <div className="flexColumn" id="homeArrayChannelDetails">
                        <div className="flexRow" id="ChannelNameHomeArray">
                          <div>{currentChannel.channel_name}</div>
                          <div id="verifiedCheckMark">
                            <i class="fa-solid fa-check"></i>
                          </div>
                        </div>
                        <div className="flexRow" id="homeArrayChannelViews">
                          <div>{amountViews(video.video_views)} views</div>
                          <div className="CircleDiv" />
                          <div>{video.created_at.slice(0, 16)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
