// create three modes,
// 1 lists all recent videos and filters by channels,
// 2 displays all channels and lists every video inside a scrollable div
// 3 lists channels only

import "./Subscriptions.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { SubscriptionsVideosNewestPage } from "./SubscriptionsMapped/SubscriptionsVideosNewest";

export function SubscriptionsPage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

    // keeps track of filter type
    const [filterMethod, setFilterMethod] = useState("Grid");

  if (user == null) {
    history.push("/");
  }

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, user]);



  // create new variable to filter through tags based on keyword
  return (
      <>
        <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        <div className="SearchPageContainerInner">
            <div className="FilterContainerSubscriptionsPage">
              <div className="FilterCategorySubscriptions">
                <div
                  onClick={() => setFilterMethod("Grid")}
                  className={
                    filterMethod == "Grid"
                      ? "FilterCategoryTextActive"
                      : "FilterCategoryText"
                  }
                >
                  Grid
                </div>
                <div
                  onClick={() => setFilterMethod("Row")}
                  className={
                    filterMethod == "Row"
                      ? "FilterCategoryTextActive"
                      : "FilterCategoryText"
                  }
                >
                  List-1
                </div>
                {/* search by Channels */}
                <div
                  onClick={() => setFilterMethod("List")}
                  className={
                    filterMethod == "List"
                      ? "FilterCategoryTextActive"
                      : "FilterCategoryText"
                  }
                >
                  List-2
                </div>
                {/* search by Channels */}
              </div>
            </div>
          {filterMethod == "Grid" ? (
            <SubscriptionsVideosNewestPage />
          ) : (
            ""
          )}
          {filterMethod == "Row" ? (
            // <SearchPageTags searchTerm={searchTerm} activeSort={activeSort} />
            <div>2</div>
          ) : (
            ""
          )}
          {filterMethod == "List" ? (
            // <SearchPageChannels
            //   searchTerm={searchTerm}
            //   activeSort={activeSort}
            // />
            <div>3</div>

          ) : (
            ""
          )}
        </div>
      </div>
      </>
    )
}
