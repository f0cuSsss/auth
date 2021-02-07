import { 
    LOG_IN, 
    REGISTER, 
    GET_CURRENT_AUTH_USER, 
    GET_PROFILE_DATA 
} from './types'
import axios from 'axios'

export const authorize = (login, password) => {
    const user = null;
    return { type: LOG_IN, payload: user }
}

export const register = formValues => async dispatch => {
    const user = await axios.post('/user/register', formValues);
    dispatch({ type: REGISTER, payload: user });
}

export const checkAuth = () => async dispatch => {
    const user = await axios.get(`/api/check_auth`);
    dispatch({ type: GET_CURRENT_AUTH_USER, payload: user.data });
}

export const loadProfileData = (id = -1) => async dispatch => {
    if(id < 0) return;

    const profile = await axios.get(`/api/profile/${id}`);
    dispatch({ type: GET_PROFILE_DATA, payload: profile.data });
}