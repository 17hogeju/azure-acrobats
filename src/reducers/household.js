import {
    RETRIEVE_HOUSEHOLDS_SUCCESS, RETRIEVE_HOUSEHOLDS_FAIL, RETRIEVE_HOUSEHOLDS_BEGIN, POST_HOUSEHOLDS_BEGIN, POST_HOUSEHOLDS_SUCCESS
} from "../actions/types";

const initialState = {
    items: [],
    loading: true,
    error: null
};

function householdReducer(state = initialState, action) {

    switch (action.type) {
        case RETRIEVE_HOUSEHOLDS_BEGIN:
            return {
                ...state,
                items: [],
                loading: true,
                error: null,
            };

        case RETRIEVE_HOUSEHOLDS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null,
            };
        case RETRIEVE_HOUSEHOLDS_FAIL:
            return {
                ...state,
                items: [],
                loading: false,
                error: action.payload,
            }

        case POST_HOUSEHOLDS_BEGIN:
            return {
                ...state,
                items: [],
                loading: true,
                error: null
            }

        case POST_HOUSEHOLDS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null
            }

        case POST_HOUSEHOLDS_SUCCESS:
            return {
                ...state,
                items: [],
                loading: false,
                error: action.payload
            }

        default:
            return state;
    };
}
export default householdReducer;