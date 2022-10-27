import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBarTop/NavBar';
import SideBarNav from './components/NavBarLeft/SideBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { HomePage } from './components/Home/home';
import TestingVideos from "./components/TestingReduxState/videoTESTING";
import TestingLikesFunctions from "./components/TestingReduxState/LikesTESTING";
import TagsTestingFunction from "./components/TestingReduxState/TagsTESTING";
import CommentsTestingFunction from "./components/TestingReduxState/CommentsTESTING";
import ChannelTestingFunction from './components/TestingReduxState/ChannelTESTING';

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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/videos/:videoId' exact={true} >
          <HomePage />
        </Route>
        {/* user settings, create new channel, delete channel */}
        <Route path='/users/:userId/channel/' exact={true} >
          <HomePage />
        </Route>
        {/* edit channel, switch channel */}
        <Route path='/users/:userId/channel/:channelId' exact={true} >
          <HomePage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* The following routes are for testing only */}
        <Route path="/:videoId/videos" exact={true}>
          <TestingVideos />
        </Route>
        <Route path="/:videoId/tags" exact={true}>
          <TagsTestingFunction />
        </Route>
        <Route path="/:videoId/likes" exact={true}>
          <TestingLikesFunctions />
        </Route>
        <Route path="/:videoId/comments" exact={true}>
          <CommentsTestingFunction />
        </Route>
        <Route path="/channel/:channelId" exact={true}>
          <ChannelTestingFunction />
        </Route>
        {/* End of testing section */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
