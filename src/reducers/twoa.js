import {
    RETRIEVE_TWOA_SUCCESS, RETRIEVE_TWOA_FAIL, RETRIEVE_TWOA_BEGIN
} from "../actions/types";

const initialState = {
    items: [],
    loading: true,
    error: null
  };

function twoAReducer(state = initialState, action) {

switch (action.type) {
    case RETRIEVE_TWOA_BEGIN:
        return {
            ...state,
            items: [],
            loading: true,
            error: null,
        };

    case RETRIEVE_TWOA_SUCCESS:
        console.log(action.payload);
        return {
            ...state,
            items: action.payload,
            loading: false,
            error: null,
        };
    case RETRIEVE_TWOA_FAIL:
        return {
            ...state,
            items: [],
            loading: false,
            error: action.payload,
        }

    default:
        return state;
  };
}
export default twoAReducer;