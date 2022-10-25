import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import EditImageForm from '../ImagesForms/EditImageForm'
import DeleteImageForm from '../ImagesForms/DeleteImageForm'

import { Modal } from "../../context/Modal";

import { getImagesThunk, getOneImageThunk } from "../../store/image";
import CreateImageForm from "../Images/createImage";
import { getAllUsersThunk } from "../../store/AllUsers";

export default function TestingVideos() {
  const { imageId } = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  let allImagesArray;
  const [imageState, setImageState] = useState({});


  useEffect(() => {
    dispatch(getImagesThunk());
  }, [dispatch, imageState, showModal, showModalEdit, allImagesArray]);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const images = useSelector((state) => state.image);
    allImagesArray = Object.values(images)
  const allusers = useSelector((state) => state.allUsers);
  const allUsersArray = Object.values(allusers);

  var styles1 = {
    color: "Black",
    backgroundColor: "pink",
    fontWeight: "bold",
    height: "100px",
    width: "100px",
  };

  var styles3 = {
    color: "Black",
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
   justifyContent: "center"
  }

  return (
    <>
      <div className="ImageTESTINGCONTAINER" style={containerStyle}>
        <div>
          <button style={styles1} onClick={() => dispatch(getImagesThunk())}>
            Get all Images
          </button>
        </div>
        <div>
          <button
            style={styles3}
            onClick={() => dispatch(getOneImageThunk(imageId))}
          >
            Get One Image
          </button>
        </div>
        <div>
          <CreateImageForm />
        </div>
        <div className="CommentsArraymapped">
        {allImagesArray &&
          allImagesArray.map((image, index) => {
            return (
              <div key={image.id} className="CommentContainer">
                <br />
                {/* map through users array and display username if id matches userId */}
                <div>
                  {allUsersArray &&
                    allUsersArray.map((singleUser, index) => {
                      return (
                        <div>
                          {singleUser.id === image.userId
                            ? singleUser.username
                            : ""}
                        </div>
                      );
                    })}
                </div>
                <div>{image.title}</div>
                <div>{image.description}</div>
                <div>{image.previewImageUrl}</div>
                <div>{image.updated_at}</div>
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
                      setImageState(image)
                    }}
                  >
                    Edit image
                  </button>
                  {showModalEdit && (
                  <Modal onClose={() => setShowModalEdit(false)}>
                    <EditImageForm
                      imageId={imageState.id}
                      setShowModalEdit={setShowModalEdit}
                      oldImage={imageState}
                    />
                  </Modal>
                  )}
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
                      setImageState(image)
                    }}
                  >
                    Delete Comment
                  </button>
                  {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <DeleteImageForm
                      setShowModal={setShowModal}
                      image={imageState}
                    />
                  </Modal>
                  )}
                </button>
              </div>
            );
          })}
      </div>
      </div>
    </>
  );
}
