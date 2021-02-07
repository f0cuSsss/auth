import { GET_PROFILE_DATA } from '../actions/types'

export default (state = null, action) => {
    switch(action.type) {
        case GET_PROFILE_DATA:
            return action.payload;
        default:
            return state;
    }
}