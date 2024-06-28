import {SET_MESSAGE, CLEAR_MESSAGE} from "../action/actionTypes";

const Message_State = {
    Message: ""
}

const MessageReducer = (state = Message_State, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return {...state, Message:action.payload}
        case CLEAR_MESSAGE:
            return {...state, Message: ""}
        default:
            return state;
    }
};

export default MessageReducer;