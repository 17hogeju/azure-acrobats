import OneAService from "../services/onea.service";

import {
    RETRIEVE_ONEA_BEGIN, 
    RETRIEVE_ONEA_SUCCESS, 
    RETRIEVE_ONEA_FAIL
} from "./types";

export const fetchOneA = (hshd_num) => (dispatch) => {
    dispatch(retrieveOneABegin());
    return OneAService.getOneA(hshd_num).then(
        (data) => {
            dispatch(retrieveOneASuccess(data));
            return Promise.resolve();
        },
        (error) => {
            dispatch(retrieveOneAFail(error));
            return Promise.reject();
        }
    );
};

export const retrieveOneABegin = () => ({
    type: RETRIEVE_ONEA_BEGIN,
});

export const retrieveOneASuccess = onea => ({
    type: RETRIEVE_ONEA_SUCCESS,
    payload: onea
});

export const retrieveOneAFail = error => ({
    type: RETRIEVE_ONEA_FAIL,
    payload: error 
});