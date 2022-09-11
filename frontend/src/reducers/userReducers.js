import { USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const userFrmStorage = localStorage.getItem('acilDetails') ? 
  JSON.parse(localStorage.getItem('acilDetails')) : null;

export const registerReducer = (state = {acilDetails: userFrmStorage}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, acilDetails: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}