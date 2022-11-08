// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import { getAllLikesThunk, getImageLikesThunk, createLikesThunk, deleteLikesThunk } from "../../store/likes";

// export default function TestingLikesFunctions() {
//   const {imageId} = useParams()
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.session.user)
//   const likes = useSelector(state => state.likes)



// /* NOTES!!!!

// when implementing in explore route:

// map each image first, then define filteredLikes for each instance of an image,
// this way when we dispatch postLike/deleteLike, we aren't deleting every instance of a users likes
// --- only a users like on one image

// a user can only like an image one time, toggle function will prevent successive likes

// */
// let likesArray = Object.values(likes)
// let filteredLikes;


//  useEffect(() => {
//     dispatch(getImageLikesThunk(imageId))
//  }, [dispatch, imageId])

//  filteredLikes = likesArray.filter((filteredLikes, index) => filteredLikes.userId === user.id)
// const userLikeId = filteredLikes[0]
// // toggle likes on and off (post and delete)
// const toggleLikes = (e) => {
//     e.preventDefault();
//     if (!filteredLikes.length > 0) {
//         dispatch(createLikesThunk(imageId))
//     }
//     else {
//         dispatch(deleteLikesThunk(userLikeId.id))
//     }

//   };
// const styles1 = {
//     height:"100px",
//     width:"100px",
// 	color:'black',
// 	backgroundColor:'pink',
// 	fontWeight:'bold'
// };
// const styles2 = {
//     height:"100px",
//     width:"100px",
// 	color:'black',
// 	backgroundColor:'lavender',
// 	fontWeight:'bold'
// };

//  return (
//     <>
//     <div>
//         <button style={styles2}onClick={() => dispatch(getImageLikesThunk(imageId))}>
//             Get Image likes
//         </button>
//     </div>
//     <div>
//         <button style={styles1}onClick={() => dispatch(getAllLikesThunk())}>
//             Get All likes
//         </button>
//     </div>
//     <div>
//         <button style={styles2}onClick={toggleLikes}>
//             Toggle Likes (add/delete like)
//         </button>
//     </div>
//     </>
//     )
//  }
