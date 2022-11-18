//audio player to be retained by state
import ReactPlayer from "react-player";
//css to import for audio player
import "./SongPlayer.css";
import { useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SongPlayer({ playingSongPlayer }) {
  const history = useHistory();
  const [songSource, setSongSource] = useState("");
  const [showThumbnail, setShowThumbnail] = useState(true);
  const currentSong = useSelector((state) => state.audioPlayer);
  // const currentPlayingSong = Object.values(currentSong)
  // console.log(currentPlayingSong + 'sf')

  useEffect(() => {
    if (currentSong) {
      setSongSource(currentSong.song_url);
      // console.log('this is current song' + currentSong)
      // console.log('this is song source' + songSource)
    }
  }, [currentSong]);

  const toggleThumbnail = () => {
    setShowThumbnail((previousState) => !previousState);
  };

  function displayThumbnail() {
    if (showThumbnail === true) {
      return <button onClick={toggleThumbnail}>Close</button>;
    } else {
      return <button onClick={toggleThumbnail}>Open</button>;
    }
  }
  if (playingSongPlayer != true) {
    return <></>;
  }
  if (currentSong.song_url) {
    return (
      <>
        <div className="AudioPlayerState">
          <div className="RecommendedVideoPreview">
            <ReactPlayer
              width="100%"
              height="100%"
              url={songSource}
              playing={true}
              controls={false}
              onClickPreview={false}
            />
          </div>

          <div className="ThumbnailContainerPlaying">
            <div className="songContainerPlayingNow">
                <div
                  className="nowPlayingMusicPlayer"

                >
                  Now playing...
                </div>
              <div
                className="SongTitleCardMusicPlayer"
                onClick={() => history.push(`/hootubemusic/${currentSong.id}`)}
                >
                {currentSong.title}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
      </>
    );
  }
}
