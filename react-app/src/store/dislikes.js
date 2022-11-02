const GET_ALL_DISLIKES = 'dislikes/GET_ALL_LIKES'
const GETVIDEODISLIKES = 'dislikes/GETVIDEODISLIKES';
const CREATE_DISLIKES = 'dislikes/CREATEDISLIKES';
const DELETE_DISLIKES = 'dislikes/DELETEDISLIKES';

const getAllDislikes = (dislikes) => ({
    type: GET_ALL_DISLIKES,
    dislikes
})

const getVideoDislikes = (videoId) => ({
  type: GETVIDEODISLIKES,
  videoId,
});

const createDislikes = (payload) => ({
  type: CREATE_DISLIKES,
  payload,
});

const deleteDislike = (id) => ({
  type: DELETE_DISLIKES,
  id,
});

// thunks

export const getAllDisLikesThunk = () => async (dispatch) => {
    const response = await fetch('/api/videos/dislikes/all');
    if (response.ok) {
        const dislikes = await response.json();
        dispatch(getAllDislikes(dislikes));
        return dislikes;
    }
}

export const getVideoDislikesThunk = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/dislikes`, {});
  if (response.ok) {
    const dislikes = await response.json();
    dispatch(getVideoDislikes(dislikes));
  }
};

export const createDislikeThunk = (videoId, payload) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/dislikes/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const dislikes = await response.json()
        dispatch(createDislikes(dislikes))
    }
}

export const deleteLikesThunk = (videoId, id) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/dislikes/${id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const dislike = await response.json()
        await dispatch(deleteDislike(id))
        return dislike
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DISLIKES: {
            const newState = {}
            action.dislikes.dislikes.forEach((dislike) => {
                newState[dislike.id] = dislike
            })
            return newState;
        }
        case GETVIDEODISLIKES: {
            const newState = { ...action.video_id }
            return newState
        }
        case CREATE_DISLIKES: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_DISLIKES: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
