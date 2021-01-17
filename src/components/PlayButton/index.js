import React from "react";
import "./PlayButton.scss";

const PlayButton = ({ event, playButtonClass, type }) => {
    return (
        <button
            onClick={() => event()}
            className={`playButton ${playButtonClass} ${
                type !== "light" && "playButton--dark"
            }`}
        >
            <i className="far fa-play-circle"></i>
        </button>
    );
};

export default PlayButton;
