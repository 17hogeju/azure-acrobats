import {
    UPLOAD_HOUSHOLDS_BEGIN, UPLOAD_HOUSHOLDS_SUCCESS, UPLOAD_HOUSHOLDS_FAIL, UPLOAD_HOUSHOLDS_INACTIVE
} from "../actions/types";

const initialState = {
    items: [],
    loading: false,
    error: null
  };

function uploadReducer(state = initialState, action) {

switch (action.type) {

    case UPLOAD_HOUSHOLDS_INACTIVE:
        return {
            ...state,
            items: [],
            loading: false,
            error: null
        };

    case UPLOAD_HOUSHOLDS_BEGIN:
        return {
            ...state,
            items: [],
            loading: true,
            error: null,
        };

    case UPLOAD_HOUSHOLDS_SUCCESS:
        console.log(action.payload);
        return {
            ...state,
            items: action.payload,
            loading: false,
            error: null,
        };
    case UPLOAD_HOUSHOLDS_FAIL:
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
export default uploadReducer;