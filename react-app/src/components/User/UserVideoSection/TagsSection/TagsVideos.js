import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../../context/Modal";
import { getAllTagsThunk } from "../../../../store/tags";

import EditTagForm from "./EditTagForm";
import DeleteTagForm from "./DeleteTagForm";
export default function TagsVideos({ video }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const tags = useSelector((state) => state.tags);

  // tag
  const [currentTag, setCurrentTag] = useState(false);
  const [showModalCreateTag, setShowModalCreateTag] = useState(false);
  const [showModalEditTag, setShowModalEditTag] = useState(false);
  const [showModalDeleteTag, setShowModalDeleteTag] = useState(false);

  let tagsArray = Object.values(tags);

  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch, showModalCreateTag, showModalEditTag, showModalDeleteTag]);

  return (
    <>
      <div className="TagsArrayManageVideosContainer">
        {tagsArray &&
          tagsArray.map((tag) => {
            return (
              <>
                {video.id == tag.video_id ? (
                  <div className="TagIndividualManage">
                    <div className="tagSingleContainerManage">{tag.body}</div>
                    <div className="EditDeleteTagSection">
                      <div className="EditTagFavicon">
                        {showModalEditTag && (
                          <Modal onClose={() => setShowModalEditTag(false)}>
                            <EditTagForm
                              videoId={video.id}
                              tag={currentTag}
                              setShowModal={setShowModalEditTag}
                            />
                          </Modal>
                        )}

                        <i
                          onClick={() => {
                            setShowModalEditTag(true);
                            setCurrentTag(tag);
                          }}
                          class="fa-solid fa-pen-to-square"
                        ></i>
                      </div>
                      <div className="EditTagFavicon">
                        {showModalDeleteTag && (
                          <Modal onClose={() => setShowModalDeleteTag(false)}>
                            <DeleteTagForm
                              videoId={video.id}
                              tag={currentTag}
                              setShowModal={setShowModalDeleteTag}
                            />
                          </Modal>
                        )}
                        <i
                          onClick={() => {
                            setShowModalDeleteTag(true);
                            setCurrentTag(tag);
                          }}
                          class="fa-sharp fa-solid fa-trash"
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>
      <div>Create new Tag</div>
    </>
  );
}
