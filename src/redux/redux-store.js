import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reduсer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./Users-reduser";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
   profilesPage: profileReducer,
   dialogsPage: dialogsReducer,
   sidebar: sidebarReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware)); /*создаем redux-store с помощью этой ф-и*/

window.store = store;

export default store;