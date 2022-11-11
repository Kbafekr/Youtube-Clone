import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import video from './video'
import channel from './channel'
import allusers from './allusers'
import comment from './comment'
import likes from './likes'
import dislikes from './dislikes'
import tags from './tags'
import subscribers from './subscribers'
import watchhistory from './watchhistory'
import watchlater from './watchlater'
import playlist from './playlist'

const rootReducer = combineReducers({
  session,
  allusers,
  video,
  channel,
  comment,
  likes,
  dislikes,
  tags,
  subscribers,
  watchhistory,
  watchlater,
  playlist
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
