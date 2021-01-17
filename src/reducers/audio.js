import { AUDIO_IS_PLAYING, AUDIO_IS_NOT_PLAYING } from "./../actions/types";

const initialState = {
    isPlaying: false,
};

const audio = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case AUDIO_IS_PLAYING:
            return { ...state, isPlaying: true };
        case AUDIO_IS_NOT_PLAYING:
            return { ...state, isPlaying: false };
        default:
            return state;
    }
};

export default audio;
