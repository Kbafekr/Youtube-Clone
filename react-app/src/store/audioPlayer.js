const PLAYING_SONG = "AudioPlayer/TrendingSong";

//actions

//get all songs action
export const actionSongPlaying = (song) => {
  return {
    type: PLAYING_SONG,
    song,
  };
};


// reducer

const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYING_SONG: {
      const newState = { ...action.song };
      // newState[action.song.id] = action.song
      return newState;
    }
    default:
      return state;
  }
}
