import HouseholdService from "../services/household.service";
import {
    RETRIEVE_HOUSEHOLDS_BEGIN, 
    RETRIEVE_HOUSEHOLDS_SUCCESS, 
    RETRIEVE_HOUSEHOLDS_FAIL,
    POST_HOUSEHOLDS_BEGIN, 
    POST_HOUSEHOLDS_SUCCESS, 
    POST_HOUSEHOLDS_FAIL,

} from "./types";

export const fetchHouseholds = () => (dispatch) => {
    dispatch(retrieveHouseholdsBegin());
    return HouseholdService.getAllHouseholds().then(
        (data) => {
            dispatch(retrieveHouseholdsSuccess(data));
            return Promise.resolve();
        },
        (error) => {
            dispatch(retrieveHouseholdsFail(error));
            return Promise.reject();
        }
    );
};

export const postHousehold = (data) => async (dispatch) => {
    dispatch(postHouseholdsBegin());
    return HouseholdService.postHouseholds({ data }).then(
        (data) => {
            dispatch(postHouseholdsSuccess(data));
            return Promise.resolve();
        },
        (error) => {
            dispatch(postHouseholdsFail(error));
            return Promise.reject();
        }
    );
  };

export const retrieveHouseholdsBegin = () => ({
    type: RETRIEVE_HOUSEHOLDS_BEGIN,
});

export const retrieveHouseholdsSuccess = households => ({
    type: RETRIEVE_HOUSEHOLDS_SUCCESS,
    payload: households
});

export const retrieveHouseholdsFail = error => ({
    type: RETRIEVE_HOUSEHOLDS_FAIL,
    payload: error 
});

export const postHouseholdsBegin = () => ({
    type: POST_HOUSEHOLDS_BEGIN,
});

export const postHouseholdsSuccess = households => ({
    type: POST_HOUSEHOLDS_SUCCESS,
    payload: households
});

export const postHouseholdsFail = error => ({
    type: POST_HOUSEHOLDS_FAIL,
    payload: error 
});