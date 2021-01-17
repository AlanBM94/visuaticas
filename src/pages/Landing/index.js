import React, { useState, useEffect } from "react";
import { setGameInfo } from "../../actions/gameInfo";
import { setAudioIsPlaying, setAudioIsNotPlaying } from "../../actions/audio";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { playAudio } from "./../../utils";
import PlayButton from "./../../components/PlayButton/";
import "./Landing.scss";

const Landing = ({
    setGameInfo,
    setAudioIsPlaying,
    setAudioIsNotPlaying,
    audioIsPlaying,
}) => {
    const [firstYear, setFirstYear] = useState(false);
    const [secondYear, setSecondYear] = useState(false);
    const [thirdYear, setThirdYear] = useState(false);
    const [fourthYear, setFourthYear] = useState(false);

    const selectScolarYear = (year) => {
        setGameInfo(year);
    };

    const setScholarYears = () => {
        setTimeout(() => {
            setFirstYear(true);
        }, 14000);

        setTimeout(() => {
            setFirstYear(false);
            setSecondYear(true);
        }, 15000);

        setTimeout(() => {
            setSecondYear(false);
        }, 16000);

        setTimeout(() => {
            setThirdYear(true);
        }, 18500);

        setTimeout(() => {
            setThirdYear(false);
            setFourthYear(true);
        }, 19000);

        setTimeout(() => {
            setFourthYear(false);
        }, 20000);
    };

    const synth = window.speechSynthesis;

    const finishLandingSpeechAfterTimeOut = (time) => {
        setTimeout(() => {
            synth.cancel();
            setAudioIsNotPlaying();
        }, time);
    };

    const startLandingSpeech = () => {
        setAudioIsPlaying();
        playAudio(
            "Visuaticas, Aprende a sumar, restar, multiplicar y dividir con animaciones. Selecciona la operación que quieres aprender dependiendo tu año escolar. Para sumar y restar puedes seleccionar primero, o segundo. Para multiplicar y dividir puedes elegir tercero o cuarto"
        );
        setScholarYears();
        finishLandingSpeechAfterTimeOut(21000);
    };

    const disabledPlayClass = audioIsPlaying
        ? "btn-disabled btn-disabled--purple"
        : "";

    const landingButtonActive = "landing-button--active";

    const landingButtonDisabled = audioIsPlaying ? "btn-disabled" : "";

    return (
        <div className="landing">
            <div className="landing__soundButtons">
                <PlayButton
                    event={startLandingSpeech}
                    playButtonClass={disabledPlayClass}
                    type="light"
                />
            </div>
            <div className="landing__text">
                <h1>Visuaticas</h1>
                <h2>
                    Aprende a sumar, restar, multiplicar y dividir con
                    animaciones
                </h2>
            </div>
            <div className="landing__menu">
                <div className="landing__menu__header">
                    <p>
                        Selecciona la operación que quieres aprender dependiendo
                        tu año escolar
                    </p>
                </div>
                <div className="landing__menu__buttonsContainer">
                    <Link
                        className={`landing-button ${
                            firstYear && `${landingButtonActive}`
                        } ${landingButtonDisabled}`}
                        to="/game"
                        onClick={() => selectScolarYear(1)}
                    >
                        Sumar / Restar <span>1°</span>
                    </Link>
                    <Link
                        className={`landing-button ${
                            secondYear && `${landingButtonActive}`
                        } ${landingButtonDisabled}`}
                        to="/game"
                        onClick={() => selectScolarYear(2)}
                    >
                        Sumar / Restar <span>2°</span>
                    </Link>
                    <Link
                        className={`landing-button ${
                            thirdYear && `${landingButtonActive}`
                        } ${landingButtonDisabled}`}
                        to="/game"
                        onClick={() => selectScolarYear(3)}
                    >
                        Multiplicar / Dividir <span>3°</span>
                    </Link>
                    <Link
                        className={`landing-button ${
                            fourthYear && `${landingButtonActive}`
                        } ${landingButtonDisabled}`}
                        to="/game"
                        onClick={() => selectScolarYear(4)}
                    >
                        Multiplicar / Dividir <span>4°</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    audioIsPlaying: state.audio.isPlaying,
});

export default connect(mapStateToProps, {
    setGameInfo,
    setAudioIsPlaying,
    setAudioIsNotPlaying,
})(Landing);
