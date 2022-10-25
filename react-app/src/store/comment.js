// constants

const GET_VIDEO = 'video/getVideo'
const GET_ONE_VIDEO = 'video/getOneVideo'
const NEW_VIDEO = 'video/newVideo'
const UPDATE_VIDEO = 'video/updateVideo'
const DELETE_VIDEO = 'video/deleteVIdeo'

// actions

const getAllVideos = (videos) => {
  return {
    type: GET_VIDEO,
    videos
  }
}

const getOneVideo = (videoId) => {
  return {
    type: GET_ONE_VIDEO,
    videoId
  }
}

const newVideo = (video) => {
  return {
    type: NEW_VIDEO,
    video
  }
}

const updateVideo = (updated) => {
  return {
    type: UPDATE_VIDEO,
    updated
  }
}

const deleteVideo = (videoId) => {
  return {
    type: DELETE_VIDEO,
    videoId
  }
}

// thunks

export const getVideoThunk = () => async dispatch => {
  const response = await fetch('/api/videos/all');

  if (response.ok) {
    const videos = await response.json();
    dispatch(getAllVideos(videos))
    return videos
  }
}

export const getOneVideoThunk = (videoId) => async dispatch => {
  const response = await fetch(`/api/videos/${videoId}`)

  if (response.ok) {
    const video = await response.json ();
    dispatch(getOneVideo(video))
    return video
  }
}

export const newVideoThunk = (channel_id, title, description, video_url) => async (dispatch) => {
  const response = await fetch("/api/videos/upload", {
    method: "POST",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({channel_id, title, description, video_url})}
  })
  if (response.ok) {
    const createVideo = await response.json()
    dispatch(newVideo(createVideo))
    return createVideo
  }
}

export const updateVideoThunk = (channel_id, title, description, video_url, videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/edit`, {
    method: "PUT",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({channel_id, title, description, video_url})}
  })
  if (response.ok) {
    const updateVideo = await response.json()
    dispatch(updateVideo(updateVideo))
    return updateVideo
  }
}

export const deleteVideoThunk = (videoId) => async dispatch => {
  const response = await fetch(`/api/videos/${videoId}/delete`, {
    method: "DELETE"
  });
  if (response.ok) {
    const deleted = await response.json()
    dispatch(deleteVideo(deleted))
  }
}

// reducer

const initialState = {};

const videoReducer = (state = initialState, action) => {
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

export default videoReducer
