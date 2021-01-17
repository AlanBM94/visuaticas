import React from "react";
import "./Button.scss";
import { connect } from "react-redux";

const Button = ({ text, event, customStyles, full, color, audioIsPlaying }) => {
    return (
        <button
            style={customStyles}
            className={`button button--${color} ${
                full ? `button--active--${color}` : ""
            } ${audioIsPlaying ? "btn-disabled" : ""}`}
            onClick={(e) => event(e)}
            disabled={color === "" && true}
        >{`${color === "" ? "Selecciona una operación" : text}`}</button>
    );
};

const mapStateToProps = (state) => ({
    color: state.sign.color,
    audioIsPlaying: state.audio.isPlaying,
});

export default connect(mapStateToProps)(Button);
