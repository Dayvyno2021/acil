import axios from 'axios';
import { USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants';

export const registerAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { username, email, psw, refCode, phone } = input;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const {data} = await axios.post(
      '/api/user/register',
      { username, email, psw, refCode, phone },
      config
    )
    
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    
    localStorage.setItem('acilDetails', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message: error.response
    })
  }
}

export const logoutAction = () => async(dispatch) =>{
  // localStorage.clear();
  localStorage.removeItem('acilDetails');
  dispatch({type: USER_LOGOUT})
  document.location.href = '/';
}
