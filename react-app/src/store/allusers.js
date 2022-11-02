// constants
const All_USER = 'users/ALL_USER';

const allUsers = (users) => ({
  type: All_USER,
  users
});

export const getAllUsersThunk = () => async (dispatch) => {
  const response = await fetch('/api/users/')
  if (response.ok) {
    const data = await response.json();
    await dispatch(allUsers(data));
  }
}
const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case All_USER:
      const newState = {...state};
      action.users.users.forEach(user => {
        newState[user.id] = user
      })
      return newState
    default:
      return state;
  }
}
