const GET_ALL_SUBSCRIBERS = 'subscribers/GET_ALL_SUBSCRIBERS'
const GET_CHANNEL_SUBSCRIBERS = 'subscribers/GET_CHANNEL_SUBSCRIBERS';
const CREATE_SUBSCRIBER = 'subscribers/CREATE_SUBSCRIBER';
const DELETE_SUBSCRIBER = 'subscribers/DELETE_SUBSCRIBER';

const getAllSubscribers = (subscribers) => ({
    type: GET_ALL_SUBSCRIBERS,
    subscribers
})

const getChannelSubscribers = (channelId) => ({
  type: GET_CHANNEL_SUBSCRIBERS,
  channelId,
});

const createSubscriber = (payload) => ({
  type: CREATE_SUBSCRIBER,
  payload,
});

const deleteSubscriber = (id) => ({
  type: DELETE_SUBSCRIBER,
  id,
});

// thunks

export const getAllSubscribersThunk = () => async (dispatch) => {
    const response = await fetch('/subscribers/all');
    if (response.ok) {
        const subscribers = await response.json();
        dispatch(getAllSubscribers(subscribers));
        return subscribers;
    }
}

export const getChannelSubscribersThunk = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/subscribers/${channelId}/all`);
  if (response.ok) {
    const subscribers = await response.json();
    dispatch(getChannelSubscribers(subscribers));
  }
};

export const createSubscriberThunk = (channelId, payload) => async (dispatch) => {
    const response = await fetch(`/api/subscribers/${channelId}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const subscribers = await response.json()
        dispatch(createSubscriber(subscribers))
    }
}

export const deleteLikesThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/subscribers/${id}/delete`, {
        method: "DELETE",
    });
    if (response.ok) {
        const subscribers = await response.json()
        await dispatch(deleteSubscriber(id))
        return subscribers
    }
}
const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SUBSCRIBERS: {
            const newState = {}
            action.subscribers.subscribers.forEach((subscriber) => {
                newState[subscriber.id] = subscriber
            })
            return newState;
        }
        case GET_CHANNEL_SUBSCRIBERS: {
            const newState = { ...action.channelId }
            return newState
        }
        case CREATE_SUBSCRIBER: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_SUBSCRIBER: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}
