import HshdNumsService from "../services/hshdnums.service";

import {
    RETRIEVE_HSHDS_BEGIN, 
    RETRIEVE_HSHDS_SUCCESS, 
    RETRIEVE_HSHDS_FAIL
} from "./types";

export const fetchHshdNums = () => (dispatch) => {
    dispatch(retrieveHshdNumsBegin());
    return HshdNumsService.getHshdNums().then(
        (data) => {
            dispatch(retrieveHshdNumsSuccess(data));
            return Promise.resolve();
        },
        (error) => {
            dispatch(retrieveHshdNumsFail(error));
            return Promise.reject();
        }
    );
};

export const retrieveHshdNumsBegin = () => ({
    type: RETRIEVE_HSHDS_BEGIN,
});

export const retrieveHshdNumsSuccess = hshd => ({
    type: RETRIEVE_HSHDS_SUCCESS,
    payload: hshd
});

export const retrieveHshdNumsFail = error => ({
    type: RETRIEVE_HSHDS_FAIL,
    payload: error 
});