import { LOG_IN, REGISTER, GET_CURRENT_AUTH_USER } from '../actions/types'

export default (state = null, action) => {
    switch(action.type) {
        case LOG_IN:
            return action.payload || "";
        case REGISTER:
            return action.payload;
        case GET_CURRENT_AUTH_USER:
            return action.payload;
        default:
            return state;
    }
}