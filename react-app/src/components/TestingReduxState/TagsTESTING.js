// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import EditTagForm from "../Tags/EditTagForm";
// import DeleteTagForm from "../Tags/DeleteTagForm";
// import CreateTagForm from "../Tags/CreateTagForm";
// import { getAllTagsThunk, getImageTagsThunk } from "../../store/tags";

// import { getAllUsersThunk } from "../../store/AllUsers";

// import { Modal } from "../../context/Modal";

// export default function TagsTestingFunction() {
//   const dispatch = useDispatch();

//   /*
//     You will need to define imageId in 2 places**
//     1. in the explore page, map through all images
//     and pass in each imageId instance into the create comment form

//     2. in the image details page just grab imageId from the params */
//   const { imageId } = useParams();
// //
//   const user = useSelector((state) => state.session.user);
//   const tags = useSelector((state) => state.tags);
//   const allusers = useSelector((state) => state.allUsers);
//   const [showModal, setShowModal] = useState(false);
//   const [showModalEdit, setShowModalEdit] = useState(false);
//   const userId = user.id;

//    // to keep track of individual comments
//    const [tagState, setTagState] = useState({});

//   //   map through users array and display username if id matches userId
//   const allUsersArray = Object.values(allusers);

//   const tagsArray = Object.values(tags);

//   useEffect(() => {
//     dispatch(getAllUsersThunk());
//   }, [dispatch]);
//   useEffect(() => {
//     dispatch(getAllTagsThunk());
//   }, [dispatch, tagState, showModal, showModalEdit]);
//   //   make comments array for mapping (possibly sort from newest to oldest?)

//   /*
//     You will need to define commentId by mapping through all comments
//     and pass in each commentId instance into the delete and update comment form

// */
//   const styles1 = {
//     height: "100px",
//     width: "100px",
//     color: "black",
//     backgroundColor: "pink",
//     fontWeight: "bold",
//   };
//   const styles2 = {
//     height: "100px",
//     width: "100px",
//     color: "black",
//     backgroundColor: "lavender",
//     fontWeight: "bold",
//   };
//   const styles3 = {
//     height: "30px",
//     width: "100px",
//     color: "black",
//     backgroundColor: "gold",
//     fontWeight: "bold",
//   };
//   const styles4 = {
//     height: "50px",
//     width: "100px",
//     color: "black",
//     backgroundColor: "blue",
//     fontWeight: "bold",
//   };

//   return (
//     <>
//       <div>
//         <button style={styles2} onClick={() => dispatch(getAllUsersThunk())}>
//           allUsers
//         </button>
//       </div>
//       <div>
//         <button style={styles1} onClick={() => dispatch(getAllTagsThunk())}>
//           Get All Tags
//         </button>
//       </div>
//       <div>
//         <button
//           style={styles2}
//           onClick={() => dispatch(getImageTagsThunk(imageId))}
//         >
//           Get All Tags by Image
//         </button>
//       </div>
//       <div>
//         {/* You will need to define imageId in 2 places**
//             1. in the explore page map through all images
//             and pass in each imageId instance into the createTag form

//             2. in the image details page just grab imageId from the params
//         */}
//         <CreateTagForm userId={userId} imageId={imageId} />
//       </div>
//       <br />
//       <br />
//       <br />

//       <div className="CommentsArraymapped">
//         {tagsArray &&
//           tagsArray.map((tag, index) => {
//             return (
//               <div key={tag.id} className="CommentContainer">
//                 <br />
//                 {/* map through users array and display username if id matches userId */}
//                 <div>
//                   {allUsersArray &&
//                     allUsersArray.map((singleUser, index) => {
//                       return (
//                         <div>
//                           {singleUser.id === tag.userId
//                             ? singleUser.username
//                             : ""}
//                         </div>
//                       );
//                     })}
//                 </div>
//                 <div>{tag.body}</div>
//                 <div>{tag.updated_at}</div>
//                 {/* edit comment */}
//                 <button
//                   style={styles3}
//                   onClick={() => {
//                     setShowModalEdit(true);
//                   }}
//                     >
//                   <button
//                     className="DeleteAlbumButton"
//                     id="DeleteCommentButton"
//                     onClick={() => {
//                         setShowModalEdit(true);
//                       setTagState(tag)
//                     }}
//                   >
//                     Edit Tag
//                   </button>
//                   {showModalEdit && (
//                   <Modal onClose={() => setShowModalEdit(false)}>
//                     <EditTagForm
//                       imageId={imageId}
//                       userId={userId}
//                       setShowModalEdit={setShowModalEdit}
//                       oldTag={tagState}
//                     />
//                   </Modal>
//                   )}
//                 </button>
//                 {/* edit comment */}

//                 {/* delete comment */}
//                 <button
//                   style={styles4}
//                   onClick={() => {
//                     setShowModal(true);
//                   }}
//                     >
//                   <button
//                     className="DeleteAlbumButton"
//                     id="DeleteCommentButton"
//                     onClick={() => {
//                       setShowModal(true);
//                       setTagState(tag)
//                     }}
//                   >
//                     Delete Tag
//                   </button>
//                   {showModal && (
//                   <Modal onClose={() => setShowModal(false)}>
//                     <DeleteTagForm
//                     imageId={imageId}
//                       setShowModal={setShowModal}
//                       tag={tagState}
//                     />
//                   </Modal>
//                   )}
//                 </button>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// }
