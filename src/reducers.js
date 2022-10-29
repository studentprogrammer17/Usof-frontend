import { combineReducers } from 'redux-immutable';

// reducers import
import HeaderReducer from './components/Header/Header';
import RegisterReducer from './components/Body/Registration';
import LoginReducer from './components/Body/Login';
import EmailConfirmReducer from './components/Body/EmailConfirm';

const reducers = combineReducers({
    Header: HeaderReducer,
    register: RegisterReducer,
    login: LoginReducer,
    emailConfirm: EmailConfirmReducer
})


export default reducers;