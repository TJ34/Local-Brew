const initialState = {
    brewery_info: []
}

const UPDATE_BREWERY_INFO = "UPDATE_BREWERY_INFO";

function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_BREWERY_INFO:
        return Object.assign({}, state, {brewery_info: action.payload});

        default: return state;
    }
}

export function updateBrewInfo(brewery_info){
    return{
        type: UPDATE_BREWERY_INFO,
        payload: brewery_info
    }
}

export default reducer;