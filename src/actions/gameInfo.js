import { SET_GAME_INFO, RESET_GAME_INFO } from "./types";

export const setGameInfo = (year) => (dispatch) => {
    dispatch({ type: SET_GAME_INFO, payload: { year } });
};

export const resetGameInfo = (year) => (dispatch) => {
    dispatch({ type: RESET_GAME_INFO });
};
