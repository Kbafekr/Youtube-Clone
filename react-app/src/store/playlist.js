// constants

const GET_PLAYLIST = "playlist/getPlaylist";
const GET_ONE_PLAYLIST = "playlist/getOnePlaylist";
const NEW_PLAYLIST = "playlist/newPlaylist";
const UPDATE_PLAYLIST = "playlist/updatePlaylist";
const DELETE_PLAYLIST = "playlist/deleteVideo";
const ADD_VIDEO_PLAYLIST = "playlist/addVideoPlaylist";
const DELETE_VIDEO_PLAYLIST = "playlist/deleteVideoPlaylist";

// actions

const getAllPlaylists = (playlists) => {
  return {
    type: GET_PLAYLIST,
    playlists,
  };
};

const getOnePlaylist = (playlistId) => {
  return {
    type: GET_ONE_PLAYLIST,
    playlistId,
  };
};

const newPlaylist = (playlist) => {
  return {
    type: NEW_PLAYLIST,
    playlist,
  };
};

const updatePlaylist = (updated) => {
  return {
    type: UPDATE_PLAYLIST,
    updated,
  };
};

const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    playlistId,
  };
};
const addVideoToPlaylist = (updated) => {
  return {
    type: ADD_VIDEO_PLAYLIST,
    updated,
  };
};

const deleteVideoFromPlaylist = (playlistId) => {
  return {
    type: DELETE_VIDEO_PLAYLIST,
    playlistId,
  };
};

// thunks

export const getAllPlaylistsThunk = () => async (dispatch) => {
  const response = await fetch("/api/playlists/all");

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getAllPlaylists(playlists));
    return playlists;
  }
};

export const getOnePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`);

  if (response.ok) {
    const playlist = await response.json();
    dispatch(getOnePlaylist(playlist));
    return playlist;
  }
};

export const newPlaylistThunk =
  (playlist) => async (dispatch) => {
    const response = await fetch("/api/playlists/new", {
      method: "POST",
      // do not set content type, allow browser to do this automatically to prevent missing information
      body: playlist,
    });
    if (response.ok) {
      const createPlaylist = await response.json();
      dispatch(newPlaylist(createPlaylist));
      return createPlaylist;
    }
  };

export const updatePlaylistThunk =
  (playlistId, user_id, title) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, title }),
    });
    if (response.ok) {
      const editPlaylist = await response.json();
      dispatch(updatePlaylist(editPlaylist));
      return editPlaylist;
    }
  };

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deletePlaylist(deleted));
  }
};
export const addVideoToPlaylistThunk =
  (playlistId, video_id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/${video_id}/new`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistId, video_id }),
    });
    if (response.ok) {
      const editPlaylist = await response.json();
      dispatch(addVideoToPlaylist(editPlaylist));
      return editPlaylist;
    }
  };

export const deleteVideoFromPlaylistThunk = (playlistId, playlistvideo_id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/${playlistvideo_id}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteVideoFromPlaylist(deleted));
  }
};

// reducer

const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLIST: {
      const newState = {};
      action.playlists.playlists.forEach((playlist) => {
        newState[playlist.id] = playlist;
      });
      return newState;
    }
    case GET_ONE_PLAYLIST: {
      const newState = {};
      return (newState[action.playlistId.id] = action.playlistId);
    }
    case NEW_PLAYLIST: {
      const newState = { ...state };
      newState[action.playlist.id] = action.playlist;
      return newState;
    }
    case UPDATE_PLAYLIST: {
      const newState = { ...state };
      newState[action.updated.id] = action.updated;
      return newState;
    }
    case DELETE_PLAYLIST: {
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    }
    case ADD_VIDEO_PLAYLIST: {
        const newState = { ...state };
        newState[action.playlist.id] = action.playlist;
        return newState;
      }
    case DELETE_VIDEO_PLAYLIST: {
        const newState = { ...state };
        delete newState[action.playlistId];
        return newState;
      }
    default:
      return state;
  }
}
