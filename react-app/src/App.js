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
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [sidePanel, setSidePanel] = useState(true);
  const [navBarType, setNavBarType] = useState(false)

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
      <NavBar sidePanel={sidePanel} setSidePanel={setSidePanel} />
      <SideBarNav sidePanel={sidePanel} setSidePanel={setSidePanel} />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage sidePanel={sidePanel} />
        </Route>
        <Route path="/search/:searchTerm" exact={true}>
          <SearchPage sidePanel={sidePanel} />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm sidePanel={sidePanel} />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm sidePanel={sidePanel} />
        </Route>
        {/* single Video */}
        <Route path="/videos/:videoId" exact={true}>
          <VideoPage sidePanel={sidePanel} />
        </Route>
        {/* single Channel */}
        <Route path="/channels/:channelId" exact={true}>
          <Channel sidePanel={sidePanel} />
        </Route>
        {/* subscriptions */}
        <Route path="/subscriptions" exact={true}>
          <SubscriptionsPage sidePanel={sidePanel} />
        </Route>
        {/* playlists */}
        <Route path="/playlists/:playlistId" exact={true}>
          <PlaylistPage sidePanel={sidePanel} />
        </Route>
        {/* playlists videos watch */}
        <Route path="/playlists/:playlistId/:videoId" exact={true}>
          <PlaylistVideos sidePanel={sidePanel} />
        </Route>
        {/* liked videos */}
        <Route path="/likedvideos" exact={true}>
          <LikedVideosPage sidePanel={sidePanel} />
        </Route>
        {/* watch later */}
        <Route path="/watchlater" exact={true}>
          <WatchLaterPage sidePanel={sidePanel} />
        </Route>
        {/* watch history */}
        <Route path="/watchhistory" exact={true}>
          <WatchHistoryPage sidePanel={sidePanel} />
        </Route>
        {/* library */}
        <Route path="/library" exact={true}>
          <LibraryPage sidePanel={sidePanel} />
        </Route>

        {/* youtube music */}
        <Route path="/youtubemusic" exact={true}>
          <Channel sidePanel={sidePanel} />
        </Route>

        
        {/* shorts */}
        <Route path="/shorts" exact={true}>
          <Channel sidePanel={sidePanel} />
        </Route>

        {/* liked videos videos watch */}
        {/* <Route path='/likedvideos/:videoId' exact={true} >
          <PlaylistVideos sidePanel={sidePanel}/>
        </Route> */}
        {/* watch later videos watch */}
        {/* <Route path='/watchlater/:videoId' exact={true} >
          <PlaylistVideos sidePanel={sidePanel}/>
        </Route> */}

        <ProtectedRoute path="/users/:userId" exact={true}>
          <User sidePanel={sidePanel} />
        </ProtectedRoute>
        <Route>
          <PageNotFound sidePanel={sidePanel} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
