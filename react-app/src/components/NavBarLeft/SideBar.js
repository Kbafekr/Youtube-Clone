import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./SideBar.css";
const SideBarNav = () => {
  return (
    <nav className="SideNavBarContainer">
      <div className="InternalSideBarContainer">
        <div className="InternalSideBarSectionTop">
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Home</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Shorts</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Subscriptions</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Originals</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>You2oob Music</div>
          </div>
        </div>
        {/* middle row */}
        <div className="SideNavBorderDivContainer">
          <div className="SideNavBorderDiv"></div>
        </div>
        <div className="InternalSideBarSection">
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Library</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>History</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Your Videos</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Watch Later</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Playlists</div>
          </div>
        </div>

        {/* Subscriptions row */}
        <div className="SideNavBorderDivContainer">
          <div className="SideNavBorderDiv"></div>
        </div>
        <div className="InternalSideBarSection">
          <div className="SideNavRowContainer">Subscriptions</div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Subscription 1</div>
          </div>
        </div>

        {/* Last row */}
        <div className="SideNavBorderDivContainer">
          <div className="SideNavBorderDiv"></div>
        </div>
        <div className="InternalSideBarSection">
          <div className="SideNavRowContainer">Explore</div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Trending</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Music</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Movies & Shows</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Gaming</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>News</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Sports</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Learning</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Fashion & Beauty</div>
          </div>
          <div className="SideNavRowContainer">
            <div>
              <i class="fa-sharp fa-solid fa-house"></i>
            </div>
            <div>Podcasts</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBarNav;
