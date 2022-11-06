import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllUsersThunk } from "../../../store/allusers";



export default function ChannelVideosSection({currentChannel}) {
    const dispatch = useDispatch();
    const userId = currentChannel.user_id
    const allUsers = useSelector((state) => state.allusers);
    useEffect(() => {
        dispatch(getAllUsersThunk());
      }, [dispatch]);

    const allUsersArray = Object.values(allUsers)

    const User = allUsersArray.filter((user) => user.id == userId)

    const otherChannels = User[0].channels.filter((channel) => channel.id != currentChannel.id)


      return (
        <>
          <div className="UserChannelsDetailsSectionOuter">
            <div className="UserChannelsDetailsSection">
              <div>
                {otherChannels.map((channel) => {
                  return (
                    <div className="ChannelArrayMappedSection">
                      <div
                        className="ChannelBannerChannelsSection"
                        key={channel.id}
                      >
                        <img
                          className="ChannelArrayProfilePic"
                          src={channel.profile_picture}
                          onError={e => { e.currentTarget.src = "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png"; }}
                        />
                        <img
                          className="ChannelArrayBanner"
                          src={channel.banner_picture}
                          onError={e => { e.currentTarget.src = "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png"; }}
                        />
                        <Link className="ChannelArrayUsername" to={`/channels/${channel.id}`} >
                          {channel.channel_name}
                        </Link>

                        {/* set inactive active toggle that dispatches edit user to set current active channel */}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </>
      );
}
