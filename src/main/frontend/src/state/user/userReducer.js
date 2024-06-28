import {AddUserToStore} from "../action/actionTypes";

const User_State = {
    User: {
        userName: "",
        policies: [],
    },
}

let UserReducer = (state = User_State, action) => {
    switch(action.type) {
        case AddUserToStore:
            return {...state, User:action.payload}
        default:
            return state;
    }
}

export default UserReducer;