const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
        ]
};

const dialogsReducer = (state=initialState,action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});
export const  updateNewMessageBodyCreator = (body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;