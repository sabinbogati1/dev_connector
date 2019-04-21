import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILES } from "../actions/types";

//Get Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("/api/profile").then(res => {
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    })
}

//Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,

    }
}


//CLear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILES,

    }
}