import {
    SET_MODE,
    RESET_MODE,
    DO_OPERATION,
    LOADING,
    SET_USER_RESULT,
} from "./../actions/types";

const initialState = {
    value: "",
    operation: "",
    value1: 0,
    value2: 0,
    result: 0,
    userResult: null,
    loading: null,
};

const mode = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_MODE:
            return { ...state, value: payload.mode, operation: payload.text };
        case RESET_MODE:
            return initialState;
        case LOADING:
            return { ...state, loading: true };
        case DO_OPERATION:
            return {
                ...state,
                value1: payload.value1,
                value2: payload.value2,
                result: payload.result,
                loading: false,
            };
        case SET_USER_RESULT:
            return {
                ...state,
                value1: payload.value1,
                value2: payload.value2,
                result: payload.result,
                userResult: payload.userResult,
                loading: false,
            };
        default:
            return state;
    }
};

export default mode;
