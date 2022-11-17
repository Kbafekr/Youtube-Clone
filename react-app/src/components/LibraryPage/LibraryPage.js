import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { getWatchLaterThunk } from "../../store/watchlater";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "./LibraryPage.css";
import LibraryHistorySection from "./HistorySectionLibrary/LibraryHistorySection";
import LibraryWatchHistorySection from "./WatchLaterSectionLibrary/LibraryWatchLaterSection";
import LibraryPlaylistsSection from "./PlaylistsSectionLibrary/LibraryPlaylistsSection";
import LibraryLikedVideosSection from "./LikedVideosSectionLibrary/LibraryLikedVideosSection";

export default function LibraryPage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const channels = useSelector((state) => state.channel);
  const likes = useSelector((state) => state.likes);
  const watchlater = useSelector((state) => state.watchlater);

  const channelsArray = Object.values(channels);
  const videosArray = Object.values(videos);
  const watchlaterArray = Object.values(watchlater);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      dispatch(getWatchLaterThunk(user.id));
    }
  }, [dispatch, user]);

  let userWatchLater;

  if (watchlaterArray != null && user != null) {
    userWatchLater = watchlaterArray.filter(
      (likes) => likes.user_id == user.id
    );
  }

  if (!user) {
    return (
      <>
        <div>{history.push("/")}</div>
      </>
    );
  }

  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        {/* playlist Card */}
        {/* playlist videos */}
        <div className="libraryPageContainer">
          <div className="LibraryLeftSectionContainer">
            {/* watch history */}
            <div className="LibrarySectionInnerContainer">
              <div className="LibrarySectionLinksContainer">
                <Link to={`/watchhistory`} className="LibraryLinkIcon">
                  <i class="fa-sharp fa-solid fa-arrow-rotate-left"></i>
                </Link>
                <Link to={`/watchhistory`} className="LibraryLinkText">
                  History
                </Link>
              </div>
              <LibraryHistorySection />
              <div className="BorderBottomLibrary"/>
            </div>
            {/* watch Later */}
            <div className="LibrarySectionInnerContainer">
              <div className="LibrarySectionLinksContainer">
                <Link to={`/watchlater`} className="LibraryLinkIcon">
                  <i class="fa-solid fa-clock"></i>
                </Link>
                <Link to={`/watchlater`} className="LibraryLinkText">
                  Watch Later
                </Link>
              </div>
              <LibraryWatchHistorySection />
              <div className="BorderBottomLibrary"/>

            </div>
            {/* playlists section */}
            <div className="LibrarySectionInnerContainer">
              <div className="LibrarySectionLinksContainer">
                <Link
                  to={{
                    pathname: `/users/${user.id}`,
                    state: {
                      directedCategory: 3,
                      uploadModalState: false,
                    },
                  }}
                  className="LibraryLinkIcon"
                >
                  <i class="fa-solid fa-list"></i>
                </Link>
                <Link
                  to={{
                    pathname: `/users/${user.id}`,
                    state: {
                      directedCategory: 3,
                      uploadModalState: false,
                    },
                  }}
                  className="LibraryLinkText"
                >
                  Playlists
                </Link>
              </div>
              <LibraryPlaylistsSection />
              <div className="BorderBottomLibrary"/>
            </div>
            {/* liked videos */}
            <div className="LibrarySectionInnerContainer">
              <div className="LibrarySectionLinksContainer">
                <Link to={`/likedvideos`} className="LibraryLinkIcon">
                  <i class="fa-solid fa-heart"></i>
                </Link>
                <Link to={`/likedvideos`} className="LibraryLinkText">
                  Liked Videos
                </Link>
              </div>
              <LibraryLikedVideosSection />
              <div className="BorderBottomLibrary"/>

            </div>
          </div>

          <div className="LibraryUserCardRightSide">
            <div className="CenterImagePlaylistCard">
              {channelsArray &&
                channelsArray.map((channel) => {
                  return (
                    <>
                      {channel.id == user.active_channel ? (
                        <div className="LibraryChannelDetailsNavBar">
                          <img
                            className="ChannelProfilePicNav"
                            src={channel.profile_picture}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                            }}
                          />
                          <div className="ChannelNameAndSubscriberLibrarySection">
                            <div className="LibraryNameNavBar">
                              {user.first_name}
                            </div>
                            <div className="ChannelSubscriberCountNavBar">
                              {channel.subscribers.length} subscribers
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
            </div>
            <div className="CenterImagePlaylistCardDetails">
              <div className="PlaylistTitlePageLibraryContainer">
                <div className="PlaylistTitleLibraryOnCard">Subscriptions</div>
                {user.subscriptions != null ? (
                  <div className="LibraryInfoOnCard">
                    {user.subscriptions.length}
                  </div>
                ) : (
                  <div className="LibraryInfoOnCard">0</div>
                )}
              </div>
            </div>
            {/* comments */}
            <div className="CenterImagePlaylistCardDetails">
              <div className="PlaylistTitlePageLibraryContainer">
                <div className="PlaylistTitleLibraryOnCard">Comments</div>
                {user.comments != null ? (
                  <div className="LibraryInfoOnCard">
                    {user.comments.length}
                  </div>
                ) : (
                  <div className="LibraryInfoOnCard">0</div>
                )}
              </div>
            </div>
            {/* likes */}
            <div className="CenterImagePlaylistCardDetails">
              <div className="PlaylistTitlePageLibraryContainer">
                <div className="PlaylistTitleLibraryOnCard">Likes</div>
                {user.likes != null ? (
                  <div className="LibraryInfoOnCard">
                    {user.likes.length}
                  </div>
                ) : (
                  <div className="LibraryInfoOnCard">0</div>
                )}
              </div>
              <div className="PlaylistTitlePageLibraryContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
