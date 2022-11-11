const GET_WATCHHISTORY = 'watchhistory/GET_WATCHHISTORY'
const CREATE_WATCHHISTORY = 'watchhistory/CREATEWATCHHISTORY ';
const DELETE_WATCHHISTORY  = 'watchhistory/DELETEWATCHHISTORY ';

const getAllWatchHistory= (watchhistory) => ({
    type: GET_WATCHHISTORY,
    watchhistory
})

const createWatchHistory = (payload) => ({
  type: CREATE_WATCHHISTORY,
  payload,
});

const deleteWatchHistory = (id) => ({
  type: DELETE_WATCHHISTORY,
  id,
});

// thunks

export const getWatchHistoryThunk = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/watchhistory/${user_id}/history`);
    if (response.ok) {
        const watchhistory = await response.json();
        dispatch(getAllWatchHistory(watchhistory));
        return watchhistory;
    }
}


export const createWatchHistoryThunk = (user_id, video_id, payload) => async (dispatch) => {
    const response = await fetch(`/api/watchhistory/${user_id}/history/${video_id}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const watchhistory = await response.json()
        dispatch(createWatchHistory(watchhistory))
    }
}

export const deleteWatchHistoryThunk = (user_id, video_id) => async (dispatch) => {
    const response = await fetch(`/api/watchhistory/${user_id}/history/${video_id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const watchhistory = await response.json()
        await dispatch(deleteWatchHistory(watchhistory))
        return watchhistory
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WATCHHISTORY: {
            // const newState = {}
            // action.watchhistory.forEach((video) => {
            //     newState[video.id] = video
            // })
            const newState = {...action.watchhistory}
            return newState;
        }
        case CREATE_WATCHHISTORY: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_WATCHHISTORY: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
