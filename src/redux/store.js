 import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reduсer";

let store = {
    _state: {
        profilesPage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', like: 1},
                {id: 2, message: 'this my first post', like: 6}
            ],
            newPostText: ' ',
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'I love you'},
                {id: 4, message: 'hello))'}
            ],
            dialogs: [
                {id: 1, name: 'Inna'},
                {id: 2, name: 'Sofia'},
                {id: 3, name: 'Ihar'},
                {id: 4, name: 'Pavel'},
                {id: 5, name: 'Andrew'},
                {id: 6, name: 'Anastasia'}
            ],
            newMessageBody: ' '
        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('IT com');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilesPage = profileReducer(this._state.profilesPage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}





export default store;
window.store = store;