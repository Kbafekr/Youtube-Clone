import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import reloadPage from "../../Utils/Utils";
import { reloadSearchPage } from "../../Utils/Utils";
import { AllSubscriptionsSideBar } from "./AllSubscriptionSideBar";
import { getAllNotificationsThunk } from "../../store/notifications";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./SideBar.css";
const SideBarNav = ({ sidePanel, setSidePanel }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const [openSubscriptions, setOpenSubscriptions] = useState(false);
  const [showMoreSubscriptions, setshowMoreSubscriptions] = useState(false);
  // const channel = useSelector((state) => state.active.channel);
  let channel_id;
  let user_id;
  if (user != null) {
    user_id = user.id;
  }
  // useselector channelid, if none take to signup

  useEffect(() => {
    dispatch(getAllNotificationsThunk());
  }, [dispatch, user]);


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
                <i class="fa-solid fa-film"></i>
              </div>
              <div>Shorts</div>
            </div>
            {user != null ? (
              <div className="SideNavRowContainer">
                <Link to={`/subscriptions`} className="SideBarIcon">
                  <i class="fa-solid fa-users"></i>
                </Link>
                <Link to={`/subscriptions`} className="SideBarText">
                  Subscriptions
                </Link>
              </div>
            ) : (
              ""
            )}
            {user != null ? (
              <div className="SideNavRowContainer">
                <Link
                  to={user != null ? `/users/${user_id}` : `/login`}
                  className="SideBarIcon"
                  onClick={reloadPage}
                >
                  <i class="fa-solid fa-user"></i>
                </Link>
                <Link
                  to={user != null ? `/users/${user_id}` : `/login`}
                  className="SideBarText"
                  onClick={reloadPage}
                >
                  Profile Page
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="SideNavRowContainer">
              <div>
                <i class="fa-solid fa-record-vinyl"></i>
              </div>
              <div>You2oob Music</div>
            </div>
          </div>
          {/* middle row */}
          {user != null ? (
            <div className="SideNavBorderDivContainer">
              <div className="SideNavBorderDiv"></div>
            </div>
          ) : (
            ""
          )}
          {user != null ? (
            <div className="InternalSideBarSection">
              {user != null ? (
                <div className="SideNavRowContainer">
                  <div>
                    <i class="fa-solid fa-book"></i>
                  </div>
                  <div>Library</div>
                </div>
              ) : (
                ""
              )}

              {user != null ? (
                <div className="SideNavRowContainer">
                  <div>
                    <i class="fa-sharp fa-solid fa-arrow-rotate-left"></i>
                  </div>
                  <div>History</div>
                </div>
              ) : (
                ""
              )}
              {user != null ? (
                <div className="SideNavRowContainer">
                  <Link
                    onClick={reloadPage}
                    to={
                      user != null
                        ? {
                            pathname: `/users/${user.id}`,
                            state: {
                              directedCategory: 2,
                              uploadModalState: false,
                            },
                          }
                        : `/login`
                    }
                    className="SideBarIcon"
                  >
                    <i class="fa-solid fa-play"></i>
                  </Link>
                  <Link
                    onClick={reloadPage}
                    to={
                      user != null
                        ? {
                            pathname: `/users/${user.id}`,
                            state: {
                              directedCategory: 2,
                              uploadModalState: false,
                            },
                          }
                        : `/login`
                    }
                    className="SideBarText"
                  >
                    Your Videos
                  </Link>
                </div>
              ) : (
                ""
              )}
              {user != null ? (
                <div className="SideNavRowContainer">
                  <div>
                    <i class="fa-solid fa-clock"></i>
                  </div>
                  <div>Watch Later</div>
                </div>
              ) : (
                ""
              )}
              {user != null ? (
                <div className="SideNavRowContainer">
                  <div>
                    <i class="fa-solid fa-heart"></i>
                  </div>
                  <div>Liked Videos</div>
                </div>
              ) : (
                ""
              )}
              {user != null ? (
                <div className="SideNavRowContainer">
                  <div>
                    <i class="fa-solid fa-list"></i>
                  </div>
                  <div>Playlists</div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {/* Subscriptions row */}
          <div className="SideNavBorderDivContainer">
            <div className="SideNavBorderDiv"></div>
          </div>
          <div
            className={
              openSubscriptions == true
                ? "InternalSideBarSection"
                : "CloseSubscriptionsSection"
            }
          >
            <div className="SideNavRowContainer">
              <div>Subscriptions</div>
              {showMoreSubscriptions == true && user ? (
                <div
                  className="OpenSubscriptionsButton"
                  onClick={() => setOpenSubscriptions(!openSubscriptions)}
                >
                  {openSubscriptions == false ? (
                    <div>Show All</div>
                  ) : (
                    <div>Show Less</div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <AllSubscriptionsSideBar
              setOpenSubscriptions={setOpenSubscriptions}
              setshowMoreSubscriptions={setshowMoreSubscriptions}
            />
          </div>

          {/* Last row */}
          <div className="SideNavBorderDivContainer">
            <div className="SideNavBorderDiv"></div>
          </div>
          <div className="InternalSideBarSection">
            <div className="SideNavRowContainer">
              <div className="ExploreSideBarText">Explore</div>
            </div>
            {/* <div className="SideNavRowContainer">
              <div>
                <i class="fa-solid fa-fire"></i>
              </div>
              <div>Trending</div>
            </div> */}
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Music`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-music"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Music`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Music
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Scene`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-tv"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Scene`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Movies & Shows
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Gaming`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-headset"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Gaming`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Gaming
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/News`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-newspaper"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/News`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                News
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Sports`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-medal"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Sports`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Sports
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Education`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-graduation-cap"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Education`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Learning
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Fashion`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-shirt"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Fashion`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Fashion
              </Link>
            </div>
            <div className="SideNavRowContainer">
              <Link
                to={{
                  pathname: `/search/Podcasts`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarIcon"
              >
                <i class="fa-solid fa-podcast"></i>
              </Link>
              <Link
                to={{
                  pathname: `/search/Podcasts`,
                  state: { filterState: "Tags", forceState: true },
                }}
                className="SideBarText"
              >
                Podcasts
              </Link>
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
                <i class="fa-solid fa-film"></i>
              </div>
              <div>Shorts</div>
            </div>
            {user != null ? (
              <div className="SideNavRowContainerClosed">
                <Link to={`/subscriptions`} className="SideBarIcon">
                  <i class="fa-solid fa-users"></i>
                </Link>
                <Link to={`/subscriptions`} className="SideBarText">
                  Subscriptions
                </Link>
              </div>
            ) : (
              ""
            )}
            {user != null ? (
              <div className="SideNavRowContainerClosed">
                <Link
                  to={`/users/${user_id}`}
                  className="SideBarIcon"
                  onClick={reloadPage}
                >
                  <i class="fa-solid fa-user"></i>
                </Link>
                <Link
                  to={`/users/${user_id}`}
                  className="SideBarText"
                  onClick={reloadPage}
                >
                  Profile Page
                </Link>
              </div>
            ) : (
              ""
            )}

            <div className="SideNavRowContainerClosed">
              <div>
                <i class="fa-solid fa-record-vinyl"></i>
              </div>
              <div>You2oob Music</div>
            </div>

            {user != null ? (
              <div className="SideNavRowContainerClosed">
                <div>
                  <i class="fa-solid fa-book"></i>
                </div>
                <div>Library</div>
              </div>
            ) : (
              ""
            )}
            {user != null ? (
              <div className="SideNavRowContainerClosed">
                <div>
                  <i class="fa-sharp fa-solid fa-arrow-rotate-left"></i>
                </div>
                <div>History</div>
              </div>
            ) : (
              ""
            )}
            {user != null ? (
              <div className="SideNavRowContainerClosed">
                <Link
                  onClick={reloadPage}
                  to={
                    user != null
                      ? {
                          pathname: `/users/${user.id}`,
                          state: {
                            directedCategory: 2,
                            uploadModalState: false,
                          },
                        }
                      : `/login`
                  }
                  className="SideBarIcon"
                >
                  <i class="fa-solid fa-play"></i>
                </Link>
                <Link
                  onClick={reloadPage}
                  to={
                    user != null
                      ? {
                          pathname: `/users/${user.id}`,
                          state: {
                            directedCategory: 2,
                            uploadModalState: false,
                          },
                        }
                      : `/login`
                  }
                  className="SideBarText"
                >
                  Your Videos
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    );
};

export default SideBarNav;
