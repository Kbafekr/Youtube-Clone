import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBarTop/NavBar";
import SideBarNav from "./components/NavBarLeft/SideBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import { authenticate } from "./store/session";
import { HomePage } from "./components/Home/home";
import { VideoPage } from "./components/PlayVideo/PlayVideo";
import TestingVideos from "./components/TestingReduxState/videoTESTING";
import TestingLikesFunctions from "./components/TestingReduxState/LikesTESTING";
import TagsTestingFunction from "./components/TestingReduxState/TagsTESTING";
import CommentsTestingFunction from "./components/TestingReduxState/CommentsTESTING";
import ChannelTestingFunction from "./components/TestingReduxState/ChannelTESTING";
import { SearchBar } from "./components/NavBarTop/SearchBar/SearchBar";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { PageNotFound } from "./components/UnknownPage/PageNotFound";
import Channel from "./components/Channel/Channel";
import { SubscriptionsPage } from "./components/Subscriptions/Subscriptions";
import { PlaylistPage } from "./components/Playlist/Playlist";
import { PlaylistVideos } from "./components/PlaylistVideos/PlaylistVideos";
import { LikedVideosPage } from "./components/LikedVideosPage/LikedVideosPage";
import { WatchHistoryPage } from "./components/WatchHistoryPage/WatchHistoryPage";
import { WatchLaterPage } from "./components/WatchLaterPage/WatchLaterPage";
import LibraryPage from "./components/LibraryPage/LibraryPage";
// hootubeMusic
import { HootubeMusic } from "./components/HootubeMusic/HootubeMusic";
import SongPlayer from "./components/HootubeMusic/SongPlayer/SongPlayer";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [sidePanel, setSidePanel] = useState(true);
  const [navBarType, setNavBarType] = useState(false)
  const [playingSongPlayer, setPlayingSongPlayer] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar sidePanel={sidePanel} setSidePanel={setSidePanel} navBarType={navBarType} setNavBarType={setNavBarType}/>
      <SideBarNav sidePanel={sidePanel} setSidePanel={setSidePanel} />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage sidePanel={sidePanel} setNavBarType={setNavBarType} />
        </Route>
        <Route path="/search/:searchTerm" exact={true}>
          <SearchPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm sidePanel={sidePanel} setNavBarType={setNavBarType} />
        </Route>
        {/* single Video */}
        <Route path="/videos/:videoId" exact={true}>
          <VideoPage sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>
        {/* single Channel */}
        <Route path="/channels/:channelId" exact={true}>
          <Channel sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* subscriptions */}
        <Route path="/subscriptions" exact={true}>
          <SubscriptionsPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* playlists */}
        <Route path="/playlists/:playlistId" exact={true}>
          <PlaylistPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* playlists videos watch */}
        <Route path="/playlists/:playlistId/:videoId" exact={true}>
          <PlaylistVideos sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>
        {/* liked videos */}
        <Route path="/likedvideos" exact={true}>
          <LikedVideosPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* watch later */}
        <Route path="/watchlater" exact={true}>
          <WatchLaterPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* watch history */}
        <Route path="/watchhistory" exact={true}>
          <WatchHistoryPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>
        {/* library */}
        <Route path="/library" exact={true}>
          <LibraryPage sidePanel={sidePanel} setNavBarType={setNavBarType}/>
        </Route>

        {/* youtube music */}
        <Route path="/hootubemusic" exact={true}>
          <HootubeMusic sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>
        <Route path="/hootubemusic/explore" exact={true}>
          <HootubeMusic sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>
        <Route path="/hootubemusic/library" exact={true}>
          <HootubeMusic sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>
        <Route path="/hootubemusic/:songId" exact={true}>
          <HootubeMusic sidePanel={sidePanel} setNavBarType={setNavBarType} setPlayingSongPlayer={setPlayingSongPlayer}/>
        </Route>


        {/* shorts */}
        <Route path="/shorts" exact={true}>
          <Channel sidePanel={sidePanel} />
        </Route>

        <ProtectedRoute path="/users/:userId" exact={true}>
          <User sidePanel={sidePanel} setNavBarType={setNavBarType} />
        </ProtectedRoute>
        <Route>
          <PageNotFound sidePanel={sidePanel} />
        </Route>

              {/* liked videos videos watch */}
              {/* <Route path='/likedvideos/:videoId' exact={true} >
                <PlaylistVideos sidePanel={sidePanel}/>
              </Route> */}
              {/* watch later videos watch */}
              {/* <Route path='/watchlater/:videoId' exact={true} >
                <PlaylistVideos sidePanel={sidePanel}/>
              </Route> */}
      </Switch>
      <SongPlayer playingSongPlayer={playingSongPlayer}/>
    </BrowserRouter>
  );
}

export default App;
