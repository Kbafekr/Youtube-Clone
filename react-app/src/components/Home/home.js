import "./home.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserThunk } from "../../store/session";
import { newChannelThunk } from "../../store/channel";
import { authenticate } from "../../store/session";
import logo from "../../icons/you2oobLogo.png";

export function HomePage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);

  const email =
    "fsdaiufgh3w9832f23wkjqfhwejkfasdbff9843wqeyrwdjkafhsdf@gmail.com";
  const password = "password";

  let videosArray;
  let channelsArray;

  videosArray = Object.values(videos);
  channelsArray = Object.values(channels);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, newChannelMade, user]);

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);

  useEffect(() => {
    if (user && channelsArray) {
      const userChannels = channelsArray.filter(
        (channel) => channel.user_id == user.id
      );
      console.log(userChannels.length);
      if (
        user.active_channel == null &&
        user.channels[0] != null &&
        channelsArray != null
      ) {
        dispatch(
          updateUserThunk(
            user.id,
            user.first_name,
            user.last_name,
            email,
            user.channels[0].id,
            password
          )
        );
      }
      if (
        user.channels.length < 1 &&
        userChannels.length < 1 &&
        channelsArray != null &&
        newChannelMade == false
      ) {
        let channelName = `${user.first_name} ${user.last_name}`;
        dispatch(newChannelThunk(channelName, user.id, "", ""))
          .then(() => setNewChannelMade(true))
          .then(() => dispatch(getAllChannelsThunk()))
          .then(() => dispatch(authenticate()));
      }
    }
  }, [dispatch, channelsArray, user]);

  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        <div className="homeContainerInner">
          <div className="homeTagsBarContainer">
            <div className="homeTagsBar">
              <div className="tagHomePageActive">
                All
              </div>
              <div className="tagHomePage">
                Mixes
              </div>
              <div className="tagHomePage">
                Gaming
              </div>
              <div className="tagHomePage">
                Music
              </div>
              <div className="tagHomePage">
                Sports
              </div>
              <div className="tagHomePage">
                House of Dragon
              </div>
              <div className="tagHomePage">
                Marvel
              </div>
              <div className="tagHomePage">
                Anime
              </div>
              <div className="tagHomePage">
                Pokemon
              </div>
              <div className="tagHomePage">
                News
              </div>
            </div>
          </div>
          <div className="VideosMapped">
            {videosArray &&
              videosArray.map((video) => {
                return (
                  <>
                    <div className="VideoCardHome">
                      <div
                        className="VideoPreviewHome"
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
