import HouseholdService from "../services/household.service";
import {
    RETRIEVE_HOUSEHOLDS_BEGIN, 
    RETRIEVE_HOUSEHOLDS_SUCCESS, 
    RETRIEVE_HOUSEHOLDS_FAIL,

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

