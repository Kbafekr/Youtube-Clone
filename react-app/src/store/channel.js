// constants

const ALL_CHANNELS = 'channels/AllChannels'
const GET_CHANNEL = 'channels/OneChannel'
const NEW_CHANNEL = 'channel/NewChannel'
const UPDATE_CHANNEL = 'channel/updateChannel'
const DELETE_CHANNEL = 'channel/deleteChannel'

// actions

const getAllChannels = (channels) => {
  return {
    type: ALL_CHANNELS,
    channels
  }
}

const getOneChannel = (channelId) => {
  return {
    type: GET_CHANNEL,
    channelId
  }
}

const newChannel = (channel) => {
  return {
    type: NEW_CHANNEL,
    channel
  }
}

const updateChannel = (updated) => {
  return {
    type: UPDATE_CHANNEL,
    updated
  }
}

const deleteChannel = (channelId) => {
  return {
    type: DELETE_CHANNEL,
    channelId
  }
}

// thunks

export const getAllChannelsThunk = () => async dispatch => {
  const response = await fetch('/api/channels/all');

  if (response.ok) {
    const AllChannels = await response.json();
    dispatch(getAllChannels(AllChannels))
    return AllChannels
  }
}

export const getOneChannelThunk = (channelId) => async dispatch => {
  const response = await fetch(`/api/channels/${channelId}`)

  if (response.ok) {
    const OneChannel = await response.json ();
    dispatch(getOneChannel(OneChannel))
    return OneChannel
  }
}

export const newChannelThunk = (channel_name, user_id, profile_picture, banner_picture) => async (dispatch) => {
  const response = await fetch(`/api/channels/new`, {
    method: "POST",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({channel_name, user_id, profile_picture, banner_picture})}
  })
  if (response.ok) {
    const createChannel = await response.json()
    dispatch(newChannel(createChannel))
    return createChannel
  }
}

export const updateChannelThunk = (id, channel_name, user_id, profile_picture, banner_picture) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}/edit`, {
    method: "PUT",
    headers: {"Content-Type": "application/json",
    body: JSON.stringify({channel_name, user_id, profile_picture, banner_picture})}
  })
  if (response.ok) {
    const editChannel = await response.json()
    dispatch(updateChannel(editChannel))
    return editChannel
  }
}

export const deleteChannelThunk = (id) => async dispatch => {
  const response = await fetch(`/api/channels/${id}/delete`, {
    method: "DELETE"
  });
  if (response.ok) {
    const deleted = await response.json()
    dispatch(deleteChannel(deleted))
    // dispatch(deleteComment(id))
    return deleted
  }
}

// reducer

const initialState = {};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ALL_CHANNELS: {
      const newState = {...action.channels}
      return newState
    }
    case GET_CHANNEL: {
      const newState = {...action.channelId}
      return newState
    }
    case NEW_CHANNEL: {
      const newState = {...state}
      newState[action.channel.id] = action.channel
      return newState
    }
    case UPDATE_CHANNEL: {
      const newState = {...state}
      newState[action.updated.id] = action.updated
      return newState
    }
    case DELETE_CHANNEL: {
      const newState = {...state}
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}
