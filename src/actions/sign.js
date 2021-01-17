import { SET_COLOR, RESET_SIGN } from "./types";

export const setSign = (operation) => (dispatch) => {
    let color, text;
    switch (operation) {
        case "add":
            color = "green";
            text = "Suma";
            break;
        case "substract":
            color = "orange";
            text = "Resta";
            break;
        case "multiply":
            color = "blue";
            text = "Multiplicación";
            break;
        case "divide":
            color = "yellow";
            text = "División";
            break;
        default:
            color = "";
            text = "";
            break;
    }

    dispatch({ type: SET_COLOR, payload: { color, text } });
};

export const resetSign = () => (dispatch) => {
    dispatch({ type: RESET_SIGN });
};
