import { SET_COLOR, RESET_SIGN } from "../actions/types";

const initialState = {
    color: "",
    text: "",
};

const sign = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_COLOR:
            return { ...state, color: payload.color, text: payload.text };
        case RESET_SIGN:
            return initialState;
        default:
            return state;
    }
};

export default sign;
