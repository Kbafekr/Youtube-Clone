// constants

const ALL_COMMENTS = 'comments/AllComments'
const VIDEO_COMMENTS = 'comments/VideoComments'
const NEW_COMMENT = 'comments/newComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

// actions

const getAllComments = (comments) => {
  return {
    type: ALL_COMMENTS,
    comments
  }
}

const getVideoComments = (videoId) => {
  return {
    type: VIDEO_COMMENTS,
    videoId
  }
}

const newComment = (comment) => {
  return {
    type: NEW_COMMENT,
    comment
  }
}

const updateComment = (updated) => {
  return {
    type: UPDATE_COMMENT,
    updated
  }
}

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

// thunks

export const getAllCommentsThunk = () => async dispatch => {
  const response = await fetch('/api/comments/all');

  if (response.ok) {
    const AllComments = await response.json();
    dispatch(getAllComments(AllComments))
    return AllComments
  }
}

export const getVideoCommentsThunk = (videoId) => async dispatch => {
  const response = await fetch(`/api/videos/${videoId}/comments`)

  if (response.ok) {
    const videoComments = await response.json ();
    dispatch(getVideoComments(videoComments))
    return videoComments
  }
}

export const newCommentThunk = (user_id, video_id, body, is_reply, commentReply_id) => async (dispatch) => {
  const response = await fetch(`/api/videos/${video_id}/comment/new`, {
    method: "POST",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({user_id, video_id, body, is_reply, commentReply_id})}
  })
  if (response.ok) {
    const createComment = await response.json()
    dispatch(newComment(createComment))
    return createComment
  }
}

export const updateCommentThunk = (id, user_id, video_id, body, is_reply, commentReply_id) => async (dispatch) => {
  const response = await fetch(`/api/videos/${video_id}/comment/${id}/edit`, {
    method: "PUT",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({user_id, video_id, body, is_reply, commentReply_id})}
  })
  if (response.ok) {
    const editComment = await response.json()
    dispatch(updateComment(editComment))
    return editComment
  }
}

export const deleteCommentThunk = (videoId, id) => async dispatch => {
  const response = await fetch(`/api/videos/${videoId}/comment/${id}/delete`, {
    method: "DELETE"
  });
  if (response.ok) {
    const deleted = await response.json()
    dispatch(deleteComment(deleted))
    // dispatch(deleteComment(id))
    return deleted
  }
}

// reducer

const initialState = {};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO: {
      const newState = {}
      action.videos.videos.forEach((video) => {
        newState[video.id] = video
      })
      return newState
    }
    case GET_ONE_VIDEO: {
      const newState = {...action.videoId}
      return newState
    }
    case NEW_VIDEO: {
      const newState = {...state}
      newState[action.video.id] = action.video
      return newState
    }
    case UPDATE_VIDEO: {
      const newState = {...state}
      newState[action.updated.id] = action.updated
      return newState
    }
    case DELETE_VIDEO: {
      const newState = {...state}
      delete newState[action.videoId]
      return newState
    }
    default:
      return state
  }
}

