import './SubscribeButtonVideo.css'
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createSubscriberThunk } from "../../store/subscribers";
import { getChannelSubscribersThunk } from '../../store/subscribers';
import { getAllVideosThunk } from '../../store/video';

export const SubscribeButton = ({currentChannel, subscribed, setSubscribed}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const channels = useSelector((state) => state.channel);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getChannelSubscribersThunk())
      }, [dispatch, user, subscribed]);
    useEffect(() => {
        dispatch(getAllVideosThunk())
      }, [dispatch, user, subscribed]);

      useEffect(() => {
        (async() => {
          await dispatch(authenticate());
        })();
      }, [dispatch, subscribed]);

    if (
      currentChannel != null &&
      user != null
    ) {
      const subscribedState = currentChannel.subscribers.filter(
        (subscriber) => subscriber.user_id == user.id
      );
      if (subscribedState.length > 0) {
      }
      if (currentChannel.user_id != user.id) {
        return (
          <>
            {/* button that csubscribees and unsubscribes*/}
              <div
                className={subscribedState.length > 0 ? "ChannelVideoSubscribeSectionButton": "ChannelVideoUnSubscribeSectionButton"}
                onClick={() =>
                  dispatch(createSubscriberThunk(currentChannel.id)).then(() =>
                    setSubscribed(!subscribed)
                  )
                }
              >
                {subscribedState.length > 0 ? (
                  <div className="SubscribedCSS">subscribed <div id="subscribedCheckMark">
                  <i class="fa-solid fa-check"></i>
                </div></div>
                ) : (
                  <div className="UnsubscribedCSS">subscribe</div>
                )}
              </div>
          </>
        );
      } else
        return (
          <>
          </>
        );
    } else
      return (
        <>
          <div
            className="SubscribeVideoSectionButton"
            onClick={() => history.push('/login')}
          >
            Sign in to subscribe
          </div>
        </>
      );
  };
