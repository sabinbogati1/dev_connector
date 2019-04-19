import { TEST_DISPATCH } from "../actions/types";

const initialState = {
    isAutheticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {

        case TEST_DISPATCH:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}