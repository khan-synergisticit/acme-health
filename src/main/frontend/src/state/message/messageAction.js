import * as ActionType from "../action/actionTypes";

export const AddMessageToStore = (message) => {

    return {
        type: ActionType.SET_MESSAGE,
        payload: message
    }
}