import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { Link } from "react-router-dom";
import reloadPage from "../../Utils/Utils";
import "./SideBar.css";
const SideBarNav = ({ sidePanel, setSidePanel }) => {
  const user = useSelector((state) => state.session.user);
  // const channel = useSelector((state) => state.active.channel);
  let channel_id;
  let user_id;
if (user != null)
{
  user_id = user.id;
}
  // useselector channelid, if none take to signup

  if (sidePanel == true)
    return (
      <nav className="SideNavBarContainer">
        <div className="InternalSideBarContainer">
          <div className="InternalSideBarSectionTop">
            <div className="SideNavRowContainer">
              <Link to="/" className="SideBarIcon">
                <i class="fa-sharp fa-solid fa-house"></i>
              </Link>
              <Link to="/" className="SideBarText">
                Home
              </Link>
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
              <Link to={user != null ? `/users/${user_id}` : `/login`} className="SideBarIcon" onClick={reloadPage}>
                <i class="fa-solid fa-user"></i>
              </Link>
              <Link to={user != null ? `/users/${user_id}` : `/login`} className="SideBarText" onClick={reloadPage} >
                Profile Page
              </Link>
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
              <Link onClick={reloadPage}
                to={channel_id ? {
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 2, uploadModalState: false },
                } : `/login`}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-play"></i>
              </Link>
              <Link
                onClick={reloadPage}
                to={channel_id ? {
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 2, uploadModalState: false },
                } : `/login`}
                className="SideBarText"
              >
                Your Videos
              </Link>
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
  if (sidePanel == false)
    return (
      <nav className="SideNavBarContainerClosed">
        <div className="InternalSideBarContainer">
          <div className="InternalSideBarSectionTopClosed">
            <div className="SideNavRowContainerClosed">
              <Link to="/" className="SideBarIcon">
                <i class="fa-sharp fa-solid fa-house"></i>
              </Link>
              <Link to="/" className="SideBarText">
                Home
              </Link>
            </div>
            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-sharp fa-solid fa-house"></i>
              </div>
              <div>Shorts</div>
            </div>
            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-sharp fa-solid fa-house"></i>
              </div>
              <div>Subscriptions</div>
            </div>
            <div className="SideNavRowContainerClosed">
              <Link to={`/users/${user_id}`} className="SideBarIcon" onClick={reloadPage}>
                <i class="fa-solid fa-user"></i>
              </Link>
              <Link to={`/users/${user_id}`} className="SideBarText" onClick={reloadPage}>
                Profile Page
              </Link>
            </div>
            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-sharp fa-solid fa-house"></i>
              </div>
              <div>You2oob Music</div>
            </div>
            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-sharp fa-solid fa-house"></i>
              </div>
              <div>Library</div>
            </div>
            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-sharp fa-solid fa-house"></i>
              </div>
              <div>History</div>
            </div>
            <div className="SideNavRowContainerClosed">
              <Link onClick={reloadPage}
                to={channel_id ? {
                  pathname: `/users/${user.id}`,
                  state: { directedCategory: 2, uploadModalState: false },
                } : `/login`}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-play"></i>
              </Link>
              <Link
               onClick={reloadPage}
               to={channel_id ? {
                 pathname: `/users/${user.id}`,
                 state: { directedCategory: 2, uploadModalState: false },
               } : `/login`}
                className="SideBarText"
              >
                Your Videos
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default SideBarNav;
