// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import EditCommentForm from "../Comments/EditCommentForm";
// import CreateCommentForm from "../Comments/CreateCommentForm";
// import {
//   getAllCommentsThunk,
//   getImageCommentsThunk,
// } from "../../store/comments";

// import { getAllUsersThunk } from "../../store/AllUsers";

// import { Modal } from "../../context/Modal";
// import DeleteCommentForm from "../Comments/DeleteCommentForm";
// export default function CommentsTestingFunction() {
//   const dispatch = useDispatch();

//   /*
//     You will need to define imageId in 2 places**
//     1. in the explore page, map through all images
//     and pass in each imageId instance into the create comment form

//     2. in the image details page just grab imageId from the params */
//   const { imageId } = useParams();
// //
//   const user = useSelector((state) => state.session.user);
//   const comments = useSelector((state) => state.comments);
//   const allusers = useSelector((state) => state.allUsers);
//   const [showModal, setShowModal] = useState(false);
//   const [showModalEdit, setShowModalEdit] = useState(false);
//   const userId = user.id;

//    // to keep track of individual comments
//    const [commentState, setCommentState] = useState({});

//   //   map through users array and display username if id matches userId
//   const allUsersArray = Object.values(allusers);

//   const commentsArray = Object.values(comments);

//   useEffect(() => {
//     dispatch(getAllUsersThunk());
//   }, [dispatch]);
//   useEffect(() => {
//     dispatch(getAllCommentsThunk());
//   }, [dispatch, commentState, showModal, showModalEdit]);
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
//         <button style={styles1} onClick={() => dispatch(getAllCommentsThunk())}>
//           Get All Comments
//         </button>
//       </div>
//       <div>
//         <button
//           style={styles2}
//           onClick={() => dispatch(getImageCommentsThunk(imageId))}
//         >
//           Get All Comments by Image
//         </button>
//       </div>
//       <div>
//         {/* You will need to define imageId in 2 places**
//             1. in the explore page map through all images
//             and pass in each imageId instance into the createcomment form

//             2. in the image details page just grab imageId from the params
//         */}
//         <CreateCommentForm userId={userId} imageId={imageId} />
//       </div>
//       {/* <div>
//         <button style={styles2}onClick={() => dispatch(updateACommentThunk(imageId))}>
//             Update Comment
//         </button>
//     </div>
//     */}
//       <br />
//       <br />
//       <br />

//       <div className="CommentsArraymapped">
//         {commentsArray &&
//           commentsArray.map((comment, index) => {
//             return (
//               <div key={comment.id} className="CommentContainer">
//                 <br />
//                 {/* map through users array and display username if id matches userId */}
//                 <div>
//                   {allUsersArray &&
//                     allUsersArray.map((singleUser, index) => {
//                       return (
//                         <div>
//                           {singleUser.id === comment.userId
//                             ? singleUser.username
//                             : ""}
//                         </div>
//                       );
//                     })}
//                 </div>
//                 <div>{comment.body}</div>
//                 <div>{comment.updated_at}</div>
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
//                       setCommentState(comment)
//                     }}
//                   >
//                     Edit Comment
//                   </button>
//                   {showModalEdit && (
//                   <Modal onClose={() => setShowModalEdit(false)}>
//                     <EditCommentForm
//                       imageId={imageId}
//                       userId={userId}
//                       setShowModalEdit={setShowModalEdit}
//                       oldComment={commentState}
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
//                       setCommentState(comment)
//                     }}
//                   >
//                     Delete Comment
//                   </button>
//                   {showModal && (
//                   <Modal onClose={() => setShowModal(false)}>
//                     <DeleteCommentForm
//                     imageId={imageId}
//                       setShowModal={setShowModal}
//                       comment={commentState}
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
