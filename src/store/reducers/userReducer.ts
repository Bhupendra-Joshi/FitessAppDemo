export const AUTHENTICATE_USER_START = "AUTHENTICATE_USER_START"
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS"
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE"

export const GET_USER_DATA_START = "GET_USER_DATA_START"
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS"
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE"

export const LOGOUT_USER = "LOGOUT_USER"

const initialState = {
    data: '',
    error: '',
    isLoading: false,
}

const userReducer = (state = initialState, action: any) => {
    const {
        type,
        data,
        error,
    } = action;

    switch (type) {
        case AUTHENTICATE_USER_START: {
            return {
                ...state,
                error: '',
                isLoading: true
            }
        }
        case AUTHENTICATE_USER_SUCCESS: {
            return {
                ...state,
                data: data,
                isLoading: false
            }
        }
        case AUTHENTICATE_USER_FAILURE: {
            return {
                ...state,
                error,
                isLoading: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...initialState
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer