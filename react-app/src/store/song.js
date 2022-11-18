// constant type keys

const GET_ALL_SONGS = "songs/getAllSongs";

const GET_ONE_SONG = "songs/getOneSong";

//actions

//get all songs action
export const actionGetSongs = (songs) => {
  return {
    type: GET_ALL_SONGS,
    songs,
  };
};

//get one song action
const actionGetOneSong = (song) => {
  return {
    type: GET_ONE_SONG,
    song,
  };
};

// thunks
//get one song thunk

export const getAllSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs/all");
  if (response.ok) {
    const allSongs = await response.json();
    await dispatch(actionGetSongs(allSongs));
  }
};

export const getOneSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);
  if (response.ok) {
    const OneSong = await response.json();
    await dispatch(actionGetOneSong(OneSong));
  }
};

// reducer

const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SONGS: {
      const newState = {};

      action.songs.songs.forEach((song) => {
        newState[song.id] = song;
      });
      return newState;
    }
    case GET_ONE_SONG: {
      const newState = {...action.song}
      return newState
    }
    default:
      return state;
  }
}
