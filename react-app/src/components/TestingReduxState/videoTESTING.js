import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";

import { getAllVideosThunk, getOneVideoThunk, newVideoThunk, updateVideoThunk, deleteVideoThunk } from "../../store/video";

import { getWatchHistoryThunk } from "../../store/watchhistory";
import { getWatchLaterThunk } from "../../store/watchlater";
import { getAllPlaylistsThunk } from "../../store/playlist";
export default function TestingVideos() {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  let allVideosArray;
  const [videoState, setVideoState] = useState({});
  const user = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch, videoState, showModal, showModalEdit, allVideosArray]);

  useEffect(() => {
    dispatch(getWatchLaterThunk(user.id));
  }, [dispatch, user]);
  useEffect(() => {
    dispatch(getAllPlaylistsThunk());
  }, [dispatch, user]);

  // useEffect(() => {
  //   dispatch(getOneVideoThunk(videoId));
  // }, [dispatch]);

  const videos = useSelector((state) => state.video);
  allVideosArray = Object.values(videos)

  var styles1 = {
    color: "white",
    backgroundColor: "pink",
    fontWeight: "bold",
    height: "100px",
    width: "100px",
  };

  var styles3 = {
    color: "white",
    backgroundColor: "lavender",
    fontWeight: "bold",
    height: "100px",
    width: "100px",
  };

  const containerStyle = {
   width: "100%",
   height: "100%",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   color: "white"
  }

  return (
    <>
      <div className="VideoTESTINGCONTAINER" style={containerStyle}>
        <div>
          <button style={styles1} onClick={() => dispatch(getAllVideosThunk())}>
            Get all Videos
          </button>
        </div>
        <div>
          <button
            style={styles3}
            onClick={() => dispatch(getOneVideoThunk(videoId))}
          >
            Get One Video
          </button>
        </div>
        <div>
          {/* <CreateImageForm /> */}
        </div>
        <div className="CommentsArraymapped">
        {allVideosArray &&
          allVideosArray.map((video, index) => {
            return (
              <div key={video.id} className="CommentContainer">
                <br />
                {/* map through users array and display username if id matches userId */}
                <div>
                </div>
                <div>{video.channel_id}</div>
                <div>{video.title}</div>
                <div>{video.description}</div>
                <div>{video.video_url}</div>
                <div>{video.updated_at}</div>
                {/* edit image */}
                <button
                  style={styles3}
                  onClick={() => {
                    setShowModalEdit(true);
                  }}
                    >
                  <button
                    className="DeleteAlbumButton"
                    id="DeleteCommentButton"
                    onClick={() => {
                      setShowModalEdit(true);
                      setVideoState(video)
                    }}
                  >
                    Edit Video
                  </button>
                  {/* {showModalEdit && (
                  <Modal onClose={() => setShowModalEdit(false)}>
                    <EditImageForm
                      imageId={imageState.id}
                      setShowModalEdit={setShowModalEdit}
                      oldImage={imageState}
                    />
                  </Modal>
                  )} */}
                </button>
                {/* edit comment */}

                {/* delete comment */}
                <button
                  style={styles3}
                  onClick={() => {
                    setShowModal(true);
                  }}
                    >
                  <button
                    className="DeleteAlbumButton"
                    id="DeleteCommentButton"
                    onClick={() => {
                      setShowModal(true);
                      setVideoState(video)
                    }}
                  >
                    Delete Video
                  </button>
                  {/* {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <DeleteImageForm
                      setShowModal={setShowModal}
                      image={imageState}
                    />
                  </Modal>
                  )} */}
                </button>
              </div>
            );
          })}
      </div>
      </div>
    </>
  );
}
