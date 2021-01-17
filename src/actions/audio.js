import { AUDIO_IS_PLAYING, AUDIO_IS_NOT_PLAYING } from "./types";

export const setAudioIsPlaying = () => (dispatch) => {
    dispatch({ type: AUDIO_IS_PLAYING });
};

export const setAudioIsNotPlaying = () => (dispatch) => {
    dispatch({ type: AUDIO_IS_NOT_PLAYING });
};
