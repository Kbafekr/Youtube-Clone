import { amountViews } from "../../../Utils/Utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateVideoThunk } from "../../../store/video";
import { amountViewsDetails } from "../../../Utils/Utils";

export default function DescriptionSection({ filteredVideo }) {
  const history = useHistory()
  // usestate to keep track of description height
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const tags = useSelector((state) => state.tags);
  const tagsArray = Object.values(tags);

  return (
    <>
      {/* description, show tags on click for show more */}
      <div
        className="VideoDetailsDescriptionSection"
        id={
          showMoreDescription == true
            ? "showmoreActiveDescription"
            : "showlessActiveDescription"
        }
      >
        <div className="videoDetailsDescriptionTop">
          <div className="videoDetailsShowMoreContainer">
            <div className="videoDetailsDescriptionTop">
              <div>{amountViewsDetails(filteredVideo[0].video_views)} views</div>
              <div>{filteredVideo[0].created_at.slice(0, 16)}</div>
            </div>
            {showMoreDescription == true ? (
              <div
              className="PointerCursor"
                id="blueLike"
                onClick={() => setShowMoreDescription(!showMoreDescription)}
              >
                Show less
              </div>
            ) : (
              <div  className="PointerCursor" onClick={() => setShowMoreDescription(!showMoreDescription)}>
                Show more
              </div>
            )}
          </div>
        </div>
        <div className="VideoDetailsDescriptionText">
          {filteredVideo[0].description}
        </div>
        <div className="TagsContainer">
          {tagsArray.map((tag) => {
            return (
              <>
                <div key={tag.id}>
                  <div
                    onClick={() =>
                      history.push({
                        pathname: `/search/${tag.body}`,
                        state: { filterState: "Tags" },
                      })
                    }
                    className="tagSingleContainer"
                  >
                    {tag.body}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* end of description, show tags */}
    </>
  );
}
