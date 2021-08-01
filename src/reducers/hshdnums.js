import {
    RETRIEVE_HSHDS_BEGIN, RETRIEVE_HSHDS_SUCCESS, RETRIEVE_HSHDS_FAIL
} from "../actions/types";

const initialState = {
    items: [],
    loading: true,
    error: null
  };

function oneAReducer(state = initialState, action) {

switch (action.type) {
    case RETRIEVE_HSHDS_BEGIN:
        return {
            ...state,
            items: [],
            loading: true,
            error: null,
        };

    case RETRIEVE_HSHDS_SUCCESS:
        console.log(action.payload);
        return {
            ...state,
            items: action.payload,
            loading: false,
            error: null,
        };
    case RETRIEVE_HSHDS_FAIL:
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