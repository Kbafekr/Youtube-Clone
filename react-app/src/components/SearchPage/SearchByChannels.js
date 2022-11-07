import "./SearchPage";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { amountViews } from "../../Utils/Utils";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { Link } from "react-router-dom";
import { getAllDisLikesThunk } from "../../store/dislikes";

export function SearchPageChannels({ searchTerm, activeSort }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);
  const [newChannelMade, setNewChannelMade] = useState(false);
  const [tagClicked, setTagClicked] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("");

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllLikesThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllDisLikesThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch, user]);
  let channelsArray;

  let FilteredChannels;


  channelsArray = Object.values(channels);

  if (channelsArray) {
    FilteredChannels = channelsArray.filter((channel) =>
      channel.channel_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  let channelResults;
  let channelArrayCopy;
  let sortChannelsbyNewest;

  if (FilteredChannels != null) {
    channelArrayCopy = [...FilteredChannels];
  }

  if (
    channelArrayCopy &&
    channelArrayCopy.length > 0 &&
    FilteredChannels != null
  ) {
    sortChannelsbyNewest = channelArrayCopy.sort((a, b) => b.id - a.id);
  }

  if (activeSort == "Newest") {
    channelResults = [...sortChannelsbyNewest];
  }
  if (activeSort != "Newest") {
    channelResults = [...FilteredChannels];
  }


  // create new variable to filter through tags based on keyword
  return (
    <div>
      {channelResults && channelResults.map((channel) => {
        return (
          <div className="ChannelArrayMappedSection">
            <div className="ChannelBannerChannelsSection" key={channel.id}>
              <img
                className="ChannelArrayProfilePic"
                src={channel.profile_picture}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                }}
              />
              <img
                className="ChannelArrayBanner"
                src={channel.banner_picture}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png";
                }}
              />
              <Link
                className="ChannelArrayUsername"
                to={`/channels/${channel.id}`}
              >
                {channel.channel_name}
              </Link>

              {/* set inactive active toggle that dispatches edit user to set current active channel */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
