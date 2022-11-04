import { amountViews } from "../../../Utils/Utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DescriptionSection({ filteredVideo }) {
  const history = useHistory()
  // usestate to keep track of description height
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const tags = useSelector((state) => state.tags);
  const tagsArray = Object.values(tags);

  const viewAmount = Math.floor(Math.random() * (100000 - 1) + 1);
  const viewString = viewAmount.toString();
  let returnString;
  if (viewString.length > 3 && viewString.length < 6) {
    returnString = viewString.slice(0, -3) + "K";
  }
  if (viewString.length > 6) {
    returnString =
      viewString.slice(0, -6) + "." + viewString.slice(1, -5) + "M";
  }
  const [viewsVideo, setViewsVideo] = useState(returnString);
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
              <div>{viewsVideo} views</div>
              <div>{filteredVideo[0].created_at.slice(0, 16)}</div>
            </div>
            {showMoreDescription == true ? (
              <div
                id="blueLike"
                onClick={() => setShowMoreDescription(!showMoreDescription)}
              >
                Show less
              </div>
            ) : (
              <div onClick={() => setShowMoreDescription(!showMoreDescription)}>
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
