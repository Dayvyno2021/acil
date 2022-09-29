import { ADMIN_USERS_FAIL, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, DELETE_NOTIFICATION_FAIL, DELETE_NOTIFICATION_REQUEST, DELETE_NOTIFICATION_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_DOWNLINES_FAIL, GET_DOWNLINES_REQUEST, GET_DOWNLINES_SUCCESS, MAKE_ADMIN_FAIL, MAKE_ADMIN_REQUEST, MAKE_ADMIN_SUCCESS, MAKE_WITHDRAWAL_FAIL, MAKE_WITHDRAWAL_REQUEST, MAKE_WITHDRAWAL_RESET, MAKE_WITHDRAWAL_SUCCESS, MY_PROFILE_FAIL, MY_PROFILE_REQUEST, MY_PROFILE_SUCCESS, RESET_MAKE_ADMIN, RESET_MESSAGE, RESET_USER_UPDATE, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const userFrmStorage = localStorage.getItem('acilDetails') ? 
  JSON.parse(localStorage.getItem('acilDetails')) : null;

export const registerReducer = (state = {acilDetails: userFrmStorage}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {state, loading: false, acilDetails: action.payload };
    case USER_REGISTER_FAIL:
      return {state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const loginReducer = (state = { acilDetails: userFrmStorage }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:  
      return {loading: true};
    case USER_LOGIN_SUCCESS:
      return {loading: false, acilDetails: action.payload };
    case USER_LOGIN_FAIL:
      return {loading: false, error: action.payload }
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, userDetails: action.payload, success: true};
    case USER_PROFILE_FAIL:
      return {loading: true, error:action.payload};
    default:
      return state;
  }
}

export const uploadPixReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, report: action.payload, success: true };
    case UPLOAD_IMAGE_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const getDownlinesReducer = (state = { downlines: [] }, action) => {
  switch (action.type) {
    case GET_DOWNLINES_REQUEST:
      return { loading: true };
    case GET_DOWNLINES_SUCCESS:
      return { loading: false, downlines: action.payload };
    case GET_DOWNLINES_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false, result: action.payload, success: true };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case RESET_MESSAGE:
      return {};
  
    default:
      return state;
  }
}

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case RESET_USER_UPDATE:
      return {};
  
    default:
      return state;
  }
}

export const adminUsersReducer = (state = {investors:[]}, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return { loading: true };
    case ADMIN_USERS_SUCCESS:
      return { loading: false, investors: action.payload, success: true };
    case ADMIN_USERS_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const makeAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_ADMIN_REQUEST:
      return { loading: true };
    case MAKE_ADMIN_SUCCESS:
      return { loading: false, status: action.payload, success: true };
    case MAKE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case RESET_MAKE_ADMIN:
      return {};
  
    default:
      return state;
  }
}

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, del: true };
    case DELETE_USER_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const myProfileReducer = (state = { acilDetails: userFrmStorage }, action) => {
  switch (action.type) {
    case MY_PROFILE_REQUEST:
      return { loading: true };
    case MY_PROFILE_SUCCESS:
      return { loading: false, acilDetails: action.payload, success: true };
    case MY_PROFILE_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return {};
  }
}

export const deleteNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTIFICATION_REQUEST:
      return { loading: true };
    case DELETE_NOTIFICATION_SUCCESS:
      return { loading: false, acilDetails: action.payload, success: true };
    case DELETE_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
  
    default:
      return state;
  }
}

export const makeWithdrawalReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_WITHDRAWAL_REQUEST:
      return { loading: true };
    case MAKE_WITHDRAWAL_SUCCESS:
      return { loading: false, success: true };
    case MAKE_WITHDRAWAL_FAIL:
      return { loading: false, error: action.payload };
    case MAKE_WITHDRAWAL_RESET:
      return {};
    default:
      return state;
  }
}