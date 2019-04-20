import { TEST_DISPATCH } from "./types";

//Register User
export const registeruser = (userData) =>{
    console.log("Action register User called...", userData);
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}