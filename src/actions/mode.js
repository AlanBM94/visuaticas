import {
    SET_MODE,
    RESET_MODE,
    DO_OPERATION,
    LOADING,
    SET_USER_RESULT,
} from "./types";

export const setMode = (mode, text) => (dispatch) => {
    switch (text) {
        case "Suma":
            text = "addition";
            break;
        case "Resta":
            text = "substraction";
            break;
        case "Multiplicación":
            text = "multiplication";
            break;
        case "División":
            text = "division";
            break;
        default:
            text = text;
            break;
    }
    dispatch({ type: SET_MODE, payload: { mode, text } });
};

export const resetMode = () => (dispatch) => {
    dispatch({ type: RESET_MODE });
};

const setResult = (operationInfo) => {
    const { operation, value1, value2 } = operationInfo;
    let result;

    switch (operation) {
        case "addition":
            result = parseInt(value1) + parseInt(value2);
            break;
        case "substraction":
            result = parseInt(value1) - parseInt(value2);
            break;
        case "multiplication":
            result = parseInt(value1) * parseInt(value2);
            break;
        case "division":
            result = parseInt(value1) / parseInt(value2);
            break;
        default:
            result = 0;
            break;
    }
    return result;
};

export const doOperation = (value1, value2, operation) => (dispatch) => {
    const result = setResult({ operation, value1, value2 });

    dispatch({ type: LOADING });

    setTimeout(() => {
        dispatch({ type: DO_OPERATION, payload: { value1, value2, result } });
    }, 3000);
};

export const setUserResult = (value1, value2, userResult, operation) => (
    dispatch
) => {
    const result = setResult({ operation, value1, value2 });

    dispatch({ type: LOADING });

    setTimeout(() => {
        dispatch({
            type: SET_USER_RESULT,
            payload: { value1, value2, userResult, result },
        });
    }, 3000);
};
