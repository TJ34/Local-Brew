import axios from "axios";

const initialState = {
    user: {},
    isAuthed: false
}

const GET_USER = "GET_USER"

export default function userReducer(state= initialState, action){
    switch (action.type) {
        case `${GET_USER}_FULFILLED`:
            return {
                ...state,
                user: action.payload,
                isAuthed: true
            };
        case `${GET_USER}_REJECTED`:
            return {
                ...state,
                isAuthed: false
            }
        default:
          return state;
    }
}

export function getUser(){
    return {
        type: GET_USER,
        payload: axios.get("/api/me")
    }
}