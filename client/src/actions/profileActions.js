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

//Create Profile
export const createProfile = (profileData, history) => dispatch =>{

    axios.post("/api/profile", profile).then(
        res => {
            history.push("/dashboard")
        }
    ).catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
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