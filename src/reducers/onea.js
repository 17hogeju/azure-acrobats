import {
    RETRIEVE_ONEA_SUCCESS, RETRIEVE_ONEA_FAIL, RETRIEVE_ONEA_BEGIN
} from "../actions/types";

const initialState = {
    items: [],
    loading: true,
    error: null
  };

function oneAReducer(state = initialState, action) {

switch (action.type) {
    case RETRIEVE_ONEA_BEGIN:
        return {
            ...state,
            items: [],
            loading: true,
            error: null,
        };

    case RETRIEVE_ONEA_SUCCESS:
        console.log(action.payload);
        return {
            ...state,
            items: action.payload,
            loading: false,
            error: null,
        };
    case RETRIEVE_ONEA_FAIL:
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
export default oneAReducer;