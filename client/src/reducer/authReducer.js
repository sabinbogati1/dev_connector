import {TEST_DISPATCH} from "../actions/types";

const initialState ={
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action){

    switch(action.type){
        case TEST_DISPATCH:
            console.log("Test dispatch reducer called...")
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }

}