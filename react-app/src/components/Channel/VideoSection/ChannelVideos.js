import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllChannelsThunk } from "../../../store/channel";



export default function ChannelVideosSection({currentChannel}) {
    const dispatch = useDispatch();
    const userId = currentChannel.user_id
    console.log(userId)

    useEffect(() => {
        dispatch(getAllChannelsThunk());
      }, [dispatch]);

  return (
    <>
      <div>Channel Videos</div>
    </>
  );
}
