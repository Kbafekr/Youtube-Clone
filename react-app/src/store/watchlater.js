const GET_WATCHLATER = 'watchlater/GET_WATCHLATER'
const CREATE_WATCHLATER = 'watchlater/CREATEWATCHLATER ';
const DELETE_WATCHLATER  = 'watchlater/DELETEWATCHLATER ';

const getAllWatchLater= (watchlater) => ({
    type: GET_WATCHLATER,
    watchlater
})

const createWatchLater = (payload) => ({
  type: CREATE_WATCHLATER,
  payload,
});

const deleteWatchLater = (id) => ({
  type: DELETE_WATCHLATER,
  id,
});

// thunks

export const getWatchLaterThunk = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/watchlater/${user_id}/watchlater`);
    if (response.ok) {
        const watchlater = await response.json();
        dispatch(getAllWatchLater(watchlater));
        return watchlater;
    }
}


export const createWatchLaterThunk = (user_id, video_id) => async (dispatch) => {
    const response = await fetch(`/api/watchlater/${user_id}/watchlater/${video_id}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, video_id})
    })
    if (response.ok) {
        const watchlater = await response.json()
        dispatch(createWatchLater(watchlater))
    }
}

export const deleteWatchLaterThunk = (user_id, video_id) => async (dispatch) => {
    const response = await fetch(`/api/watchlater/${user_id}/watchlater/${video_id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const watchlater = await response.json()
        await dispatch(deleteWatchLater(watchlater))
        return watchlater
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHLATER: {
            // const newState = {}
            // action.watchlater.forEach((video) => {
            //     newState[video.id] = video
            // })
            const newState = {...action.watchlater}
            return newState;
        }
        case CREATE_WATCHLATER: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_WATCHLATER: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
