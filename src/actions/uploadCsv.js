import UploadHouseholdsService from "../services/upload.service";

import {
    UPLOAD_HOUSHOLDS_BEGIN,
    UPLOAD_HOUSHOLDS_SUCCESS,
    UPLOAD_HOUSHOLDS_FAIL,
    UPLOAD_HOUSHOLDS_INACTIVE
} from "./types";

export const postHouseholds = (file) => (dispatch) => {
    if (file) {
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
    } else {
        dispatch(postHouseholdsInactive());
    }

};

// export const postTransactions = (file) => (dispatch) => {
//     if (file) {
//         dispatch(postTransactionsBegin());
//         return UploadHouseholdsService.uploadCsv(file).then(
//             (data) => {
//                 dispatch(postHouseholdsSuccess(data));
//                 return Promise.resolve();
//             },
//             (error) => {
//                 dispatch(postHouseholdsFail(error));
//                 return Promise.reject();
//             }
//         );
//     } else {
//         dispatch(postHouseholdsInactive());
//     }

// };

// export const postHouseholds = (file) => (dispatch) => {
//     console.log(file);
//     if (file) {
//         dispatch(postHouseholdsBegin());
//         return UploadHouseholdsService.uploadCsv(file).then(
//             (data) => {
//                 dispatch(postHouseholdsSuccess(data));
//                 return Promise.resolve();
//             },
//             (error) => {
//                 dispatch(postHouseholdsFail(error));
//                 return Promise.reject();
//             }
//         );
//     } else {
//         dispatch(postHouseholdsInactive());
//     }

// };

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

export const postHouseholdsInactive = () => ({
    type: UPLOAD_HOUSHOLDS_INACTIVE,
});