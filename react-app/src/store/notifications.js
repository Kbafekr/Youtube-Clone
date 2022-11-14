// constants

const GET_NOTIFICATION = "NOTIFICATION/getNOTIFICATION";
const GET_ONE_NOTIFICATION = "NOTIFICATION/getOneNOTIFICATION";
const GET_USER_NOTIFICATION = "NOTIFICATION/getUserNOTIFICATION";
const NEW_NOTIFICATION = "NOTIFICATION/newNOTIFICATION";
const UPDATE_NOTIFICATION = "NOTIFICATION/updateNOTIFICATION";
const DELETE_NOTIFICATION = "NOTIFICATION/deleteVideo";

// actions

const getAllNotifications = (Notifications) => {
  return {
    type: GET_NOTIFICATION,
    Notifications,
  };
};

const getOneNotification = (Notification_id) => {
  return {
    type: GET_ONE_NOTIFICATION,
    Notification_id,
  };
};
const getUserNotification = (User_id) => {
  return {
    type: GET_USER_NOTIFICATION,
    User_id
  };
};

const newNotification = (Notification) => {
  return {
    type: NEW_NOTIFICATION,
    Notification,
  };
};

const updateNotification = (updated) => {
  return {
    type: UPDATE_NOTIFICATION,
    updated,
  };
};

const deleteNotification = (Notification_id) => {
  return {
    type: DELETE_NOTIFICATION,
    Notification_id,
  };
};


// thunks

export const getAllNotificationsThunk = () => async (dispatch) => {
  const response = await fetch("/api/notifications/all");

  if (response.ok) {
    const Notifications = await response.json();
    dispatch(getAllNotifications(Notifications));
    return Notifications;
  }
};

export const getOneNotificationThunk = (Notification_id) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${Notification_id}`);

  if (response.ok) {
    const Notification = await response.json();
    dispatch(getOneNotification(Notification));
    return Notification;
  }
};
export const getUserNotificationThunk = (User_id) => async (dispatch) => {
  const response = await fetch(`/api/notifications/users/${User_id}/all`);

  if (response.ok) {
    const Notification = await response.json();
    dispatch(getUserNotification(Notification));
    return Notification;
  }
};

export const newNotificationThunk =
  (channel_id, user_id, is_read) => async (dispatch) => {
    const response = await fetch("/api/notifications/new", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({channel_id, user_id, is_read})
    });
    if (response.ok) {
      const createNotification = await response.json();
      dispatch(newNotification(createNotification));
      return createNotification;
    }
  };

export const updateNotificationThunk =
  (Notification_id, channel_id, video_id, user_id, is_read) => async (dispatch) => {
    const response = await fetch(`/api/notifications/${Notification_id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel_id, video_id, user_id, is_read }),
    });
    if (response.ok) {
      const editNotification = await response.json();
      dispatch(updateNotification(editNotification));
      return editNotification;
    }
  };

export const deleteNotificationThunk = (Notification_id) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${Notification_id}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteNotification(deleted));
  }
};

// reducer

const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION: {
      const newState = {};
      action.Notifications.notifications.forEach((Notification) => {
        newState[Notification.id] = Notification;
      });
      return newState;
    }
    case GET_ONE_NOTIFICATION: {
      const newState = {};
      return (newState[action.Notification_id.id] = action.Notification_id);
    }
    case GET_USER_NOTIFICATION: {
      const newState = {};
      return (newState[action.Notification_id.id] = action.Notification_id);
    }
    case NEW_NOTIFICATION: {
      const newState = { ...state };
      newState[action.Notification.id] = action.Notification;
      return newState;
    }
    case UPDATE_NOTIFICATION: {
      const newState = { ...state };
      newState[action.updated.id] = action.updated;
      return newState;
    }
    case DELETE_NOTIFICATION: {
      const newState = { ...state };
      delete newState[action.Notification_id];
      return newState;
    }
    default:
      return state;
  }
}
