const GET_ALL_LIKES = 'likes/GET_ALL_LIKES'
const GETVIDEOLIKES = 'likes/GETVIDEOLIKES';
const CREATE_LIKES = 'likes/CREATELIKES';
const DELETE_LIKES = 'likes/DELETELIKES';

const getAllLikes = (likes) => ({
    type: GET_ALL_LIKES,
    likes
})

const getVideoLikes = (videoId) => ({
  type: GETVIDEOLIKES,
  videoId,
});

const createLikes = (payload) => ({
  type: CREATE_LIKES,
  payload,
});

const deleteLikes = (id) => ({
  type: DELETE_LIKES,
  id,
});

// thunks

export const getAllLikesThunk = () => async (dispatch) => {
    const response = await fetch('/api/likes/');
    if (response.ok) {
        const likes = await response.json();
        dispatch(getAllLikes(likes));
        return likes;
    }
}

export const getVideoLikesThunk = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/likes`, {});
  if (response.ok) {
    const likes = await response.json();
    dispatch(getVideoLikes(likes));
  }
};

export const createLikesThunk = (videoId, payload) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/likes/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const likes = await response.json()
        dispatch(createLikes(likes))
    }
}

export const deleteLikesThunk = (videoId, id) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/likes/${id}/delete`, {
        // const response = await fetch(`/api/images/:imageId/likes/${id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const likes = await response.json()
        await dispatch(deleteLikes(id))
        return likes
    }
}
const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LIKES: {
            const newState = {}
            action.likes.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState;
        }
        case GETVIDEOLIKES: {
            const newState = { ...action.video_id }
            return newState
        }
        case CREATE_LIKES: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_LIKES: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
