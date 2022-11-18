//audio player to be retained by state
import ReactPlayer from "react-player";
//css to import for audio player
import "./SongPlayer.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SongPlayer({playingSongPlayer}) {
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
    return (
        <>
        </>
    )
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
                  controls={true}
              onClickPreview={false}
            />
          </div>

          <div
            className="currentSongThumbnail"
            // className={
            //   currentSong.url ? "currentSongThumbnail" : "NoThumbnail"
            // }
            // id={showThumbnail == true ? "closeThumbnail" : "openThumbnail"}
          >
            <div className="ThumbnailContainerPlaying">
              <div className="currentSongImageContainer"></div>
              {/* <div className="SongInformationContainerPlaying"> */}

              <div className="songContainerPlayingNow">
                <div className="NowPlayingContainer">
                  <div className="nowPlaying">Now Playing...</div>
                  {/* {displayThumbnail()} */}
                </div>

                <div className="linkContainerModal">
                  <NavLink
                    className="CurrentSongThumbNailLinkHome"
                    to={`/hootubemusic/${currentSong.id}`}
                  >
                    {currentSong.title}
                  </NavLink>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="AudioPlayerState">
          <div className="AudioMusicPlayer">
            <ReactPlayer
              src={songSource}
              // muted={true}
              onPlay={(e) => console.log("onPlay")}
            />
          </div>
          <div
            className="currentSongThumbnail"
            // className={
            //   currentSong.url ? "currentSongThumbnail" : "NoThumbnail"
            // }
            // id={showThumbnail == true ? "closeThumbnail" : "openThumbnail"}
          >
            <div className="ThumbnailContainerPlaying">
              {/* <div className="currentSongImageContainer">
                <img className="currentSongThumbnailImage" src={LibraryGif} />
              </div> */}
              {/* <div className="SongInformationContainerPlaying"> */}

              <div className="songContainerPlayingNow">
                <div className="NowPlayingContainer">
                  <div className="nowPlaying">Click on a song to play! </div>
                  {/* {displayThumbnail()} */}
                </div>

                <div className="linkContainerModal">
                  <NavLink
                    className="CurrentSongThumbNailLinkHome"
                    to={`/hootubemusic/${currentSong.id}`}
                  >
                    {currentSong.title}
                  </NavLink>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}