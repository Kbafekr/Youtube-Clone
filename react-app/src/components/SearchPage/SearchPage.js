import "./SearchPage.css";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { getAllChannelsThunk } from "../../store/channel";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";
import { amountViews } from "../../Utils/Utils";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAllTagsThunk } from "../../store/tags";
import { getAllLikesThunk } from "../../store/likes";
import { getAllDisLikesThunk } from "../../store/dislikes";

export function SearchPage({ sidePanel }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { searchTerm } = useParams();

  let filterState;
  if (location.state != null) {
    filterState = location.state.filterState;
  }

  // keeps track of filter typ
  const [filterMethod, setFilterMethod] = useState("Video");
  // sort videos by date posted
  const [sortBy, setSortBy] = useState("oldest");
  // keep track of whether filterstate is open
  const [openFilters, setOpenFilters] = useState("false");
  //   set active for filters
  const [activeCategory, setActiveCategory] = useState("Videos");
  const [activeSort, setActiveSort] = useState("Oldest");

  console.log(filterState);

  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.video);
  const tags = useSelector((state) => state.tags);
  const channels = useSelector((state) => state.channel);

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

  return (
    <>
      <div
        className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}
      >
        <div className="SearchPageContainerInner">
          {openFilters == false ? (
            <div
              onClick={() => setOpenFilters(!openFilters)}
              className="FilterSectionSearchPage"
            >
              <i class="fa-solid fa-arrow-down-wide-short"></i>
              Open Filters
            </div>
          ) : (
            <div
              onClick={() => setOpenFilters(!openFilters)}
              className="FilterSectionSearchPage"
            >
              <i class="fa-solid fa-arrow-up-short-wide"></i>
              Close Filters
            </div>
          )}
            {openFilters == true ? (
          <div className="FilterContainerSearchPage">
                <div className="FilterCategorySearch">
                  <div>Type</div>
                  <div className="BorderGrayDiv"></div>
                  <div
                    onClick={() => setActiveCategory("Videos")}
                    className={
                      activeCategory == "Videos"
                        ? "FilterCategoryTextActive"
                        : "FilterCategoryText"
                    }
                  >
                    Video
                  </div>
                  <div
                    onClick={() => setActiveCategory("Tags")}
                    className={
                      activeCategory == "Tags"
                        ? "FilterCategoryTextActive"
                        : "FilterCategoryText"
                    }
                  >
                    Tags
                  </div>
                </div>
                <div className="FilterCategorySearch">
                  <div>Sort By</div>
                  <div className="BorderGrayDiv"></div>
                  <div
                    onClick={() => setActiveSort("Oldest")}
                    className={
                      activeSort == "Oldest"
                        ? "FilterCategoryTextActive"
                        : "FilterCategoryText"
                    }
                  >
                    Oldest
                  </div>
                  <div
                    onClick={() => setActiveSort("Newest")}
                    className={
                      activeSort == "Newest"
                        ? "FilterCategoryTextActive"
                        : "FilterCategoryText"
                    }
                  >
                    Newest
                  </div>
                </div>
          </div>
            ) : (
              ""
            )}

          <div>videosArray</div>
          <div>tagsArray</div>
        </div>
      </div>
    </>
  );
}
