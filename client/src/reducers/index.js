import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './userReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    currentUser: userReducer,
    profile: profileReducer,
    form: formReducer
});