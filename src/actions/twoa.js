import TwoAService from "../services/TwoA.service";

import {
    RETRIEVE_TWOA_BEGIN, 
    RETRIEVE_TWOA_SUCCESS, 
    RETRIEVE_TWOA_FAIL
} from "./types";

export const fetchTwoA = (hshd_num) => (dispatch) => {
    dispatch(retrieveTwoABegin());
    return TwoAService.getTwoA(hshd_num).then(
        (data) => {
            dispatch(retrieveTwoASuccess(data));
            return Promise.resolve();
        },
        (error) => {
            dispatch(retrieveTwoAFail(error));
            return Promise.reject();
        }
    );
};

export const retrieveTwoABegin = () => ({
    type: RETRIEVE_TWOA_BEGIN,
});

export const retrieveTwoASuccess = TwoA => ({
    type: RETRIEVE_TWOA_SUCCESS,
    payload: TwoA
});

export const retrieveTwoAFail = error => ({
    type: RETRIEVE_TWOA_FAIL,
    payload: error 
});