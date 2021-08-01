import UploadHouseholdsService from "../services/upload.service";

import {
    UPLOAD_HOUSHOLDS_BEGIN, 
    UPLOAD_HOUSHOLDS_SUCCESS, 
    UPLOAD_HOUSHOLDS_FAIL
} from "./types";

export const postHouseholds = (file) => (dispatch) => {
    dispatch(postHouseholdsBegin());
    return UploadHouseholdsService.uploadCsv(file).then(
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

export const postHouseholdsBegin = () => ({
    type: UPLOAD_HOUSHOLDS_BEGIN,
});

export const postHouseholdsSuccess = households => ({
    type: UPLOAD_HOUSHOLDS_SUCCESS,
    payload: households
});

export const postHouseholdsFail = error => ({
    type: UPLOAD_HOUSHOLDS_FAIL,
    payload: error 
});