import { SET_GAME_INFO, RESET_GAME_INFO } from "../actions/types";

const initialState = {
    scholarYear: null,
    gameStarted: false,
};

const gameInfo = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_GAME_INFO:
            return { ...state, scholarYear: payload.year, gameStarted: true };
        case RESET_GAME_INFO:
            return initialState;
        default:
            return state;
    }
};

export default gameInfo;
