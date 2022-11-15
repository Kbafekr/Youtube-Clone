import "./Playlist.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import {
  getAllPlaylistsThunk,
  getOnePlaylistThunk,
} from "../../store/playlist";
import { updatePlaylistThunk } from "../../store/playlist";
import { deleteVideoFromPlaylistThunk } from "../../store/playlist";
import { useParams } from "react-router-dom";

export function PlaylistPage({ sidePanel }) {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const playlist = useSelector((state) => state.playlist);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const playlistArray = Object.values(playlist);

  if (user == null) {
    history.push("/");
  }

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch, user]);

  //   randomly assign playlist background color
  const [backgroundNumber, setBackgroundNumber] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    setBackgroundNumber(Math.floor(Math.random() * 10));
    if (backgroundColor !== 0) {
      if (backgroundNumber == 1) {
        setBackgroundColor("FirstPlaylistBackground");
      } else if (backgroundNumber == 2) {
        setBackgroundColor("SecondPlaylistBackground");
      } else if (backgroundNumber == 3) {
        setBackgroundColor("ThirdPlaylistBackground");
      } else if (backgroundNumber == 4) {
        setBackgroundColor("FourthPlaylistBackground");
      } else if (backgroundNumber == 5) {
        setBackgroundColor("FifthPlaylistBackground");
      } else if (backgroundNumber == 6) {
        setBackgroundColor("SixthPlaylistBackground");
      } else if (backgroundNumber == 7) {
        setBackgroundColor("SeventhPlaylistBackground");
      } else if (backgroundNumber == 8) {
        setBackgroundColor("EigthPlaylistBackground");
      } else if (backgroundNumber == 9) {
        setBackgroundColor("NinthPlaylistBackground");
      } else {
        setBackgroundColor("TenthPlaylistBackground");
      }
    }
  }, [dispatch, backgroundNumber, playlistId]);

  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        {/* playlist Card */}
        <div
          className="PlaylistCardContainerPage"
          id={`${backgroundColor}`}
        ></div>
        {/* playlist videos */}
        <div className="PlaylistVideosContainerPage">
          {playlistArray &&
            playlistArray.map((playlistVideos) => {
              return (
                <>
                  <div>{playlistVideos.id} </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
