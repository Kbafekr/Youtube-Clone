import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBarTop/NavBar';
import SideBarNav from './components/NavBarLeft/SideBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import { authenticate } from './store/session';
import { HomePage } from './components/Home/home';
import { VideoPage } from './components/PlayVideo/PlayVideo';
import TestingVideos from "./components/TestingReduxState/videoTESTING";
import TestingLikesFunctions from "./components/TestingReduxState/LikesTESTING";
import TagsTestingFunction from "./components/TestingReduxState/TagsTESTING";
import CommentsTestingFunction from "./components/TestingReduxState/CommentsTESTING";
import ChannelTestingFunction from './components/TestingReduxState/ChannelTESTING';
import { SearchBar } from './components/NavBarTop/SearchBar/SearchBar';
import { SearchPage } from './components/SearchPage/SearchPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [sidePanel, setSidePanel] = useState(true)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar sidePanel={sidePanel} setSidePanel={setSidePanel}/>
      <SideBarNav sidePanel={sidePanel} setSidePanel={setSidePanel}/>
      <Switch>
        <Route path='/' exact={true}>
          <HomePage sidePanel={sidePanel}/>
        </Route>
        <Route path='/search/:searchWords' exact={true}>
          <SearchPage sidePanel={sidePanel}/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm sidePanel={sidePanel}/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm sidePanel={sidePanel}/>
        </Route>
        {/* single Video */}
        <Route path='/videos/:videoId' exact={true} >
          <VideoPage sidePanel={sidePanel}/>
        </Route>

        {/* user settings, create new channel, delete channel, switch channel */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User  sidePanel={sidePanel} />
        </ProtectedRoute>









        {/* edit channel, delete channel */}
        <Route path='/channels/:channelId' exact={true} >
          <HomePage sidePanel={sidePanel} />
        </Route>



      </Switch>
    </BrowserRouter>
  );
}

export default App;
