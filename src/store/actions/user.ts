import {
    AUTHENTICATE_USER_START,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_FAILURE,
    LOGOUT_USER
} from '../reducers/userReducer';

import fetchRequest from '../../utils/network';
import { LOGIN, GET_USER_DATA, UPDATE_USER_STEPS } from '../../utils/network/constants';

const authenticateUserStart = () => ({
    type: AUTHENTICATE_USER_START,
})

const authenticateUserSuccess = (data) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    data,
})

const authenticateUserFailure = (error: string) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
})

export const authenticateUser = (payload) => dispatch => {
    dispatch(authenticateUserStart());
    fetchRequest(LOGIN, { payload })
        .then(result => {
            if (result && result[0]) {
                dispatch(authenticateUserSuccess(result[0]));
            } else {
                dispatch(authenticateUserFailure("Incorrect email/rmn or password!!!"));
            }
        })
        .catch(error => {
            dispatch(authenticateUserFailure("Incorrect email/rmn or password!!!"));
        })
}

const getUserDataStart = () => ({
    type: AUTHENTICATE_USER_START,
})

const getUserDataSuccess = (data) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    data,
})

const getUserDataFailure = (error: string) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
})

export const getUserData = (payload) => dispatch => {
    dispatch(getUserDataStart());
    fetchRequest(GET_USER_DATA, { payload })
        .then(result => {
            if (result && result[0]) {
                dispatch(getUserDataSuccess(result[0]));
            } else {
                dispatch(getUserDataFailure("User data fetch failed!!"));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailure("User data fetch failed!!!!" + error));
        })
}

const updateUserStepsStart = () => ({
    type: AUTHENTICATE_USER_START,
})

const updateUserStepsSuccess = (data) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    data,
})

const updateUserStepsFailure = (error: string) => ({
    type: AUTHENTICATE_USER_FAILURE,
    error
})

export const updateUserSteps = (payload: any) => dispatch => {
    dispatch(updateUserStepsStart());
    fetchRequest(UPDATE_USER_STEPS, { payload })
        .then(result => {
            if (result && result[0]) {
                dispatch(updateUserStepsSuccess(result[0]));
            } else {
                dispatch(updateUserStepsFailure("User data fetch failed!!"));
            }
        })
        .catch(error => {
            dispatch(updateUserStepsFailure("User data fetch failed!!!!" + error));
        })
}


const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const logout = () => dispatch => {
    dispatch(logoutUser());
}