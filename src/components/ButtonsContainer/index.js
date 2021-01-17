import React, { useState } from "react";
import "./ButtonsContainer.scss";
import Button from "./../Button";
import { connect } from "react-redux";
import { setMode } from "./../../actions/mode";
import { setAudioIsPlaying, setAudioIsNotPlaying } from "./../../actions/audio";
import VisualizationForm from "./../VisualizationForm";
import OperationForm from "./../OperationForm";
import PlayButton from "./../PlayButton/";
import { playAudio } from "./../../utils";

const ButtonsContainer = ({
    sign,
    setMode,
    mode,
    scholarYear,
    setAudioIsPlaying,
    setAudioIsNotPlaying,
    audioIsPlaying,
}) => {
    const [
        visualizeOperationActiveClass,
        setVisualizeOperationActiveClass,
    ] = useState(false);
    const [solveOperationActiveClass, setSolveOperationActiveClass] = useState(
        false
    );

    const { text } = sign;

    const onClickHandler = (mode) => {
        setMode(mode, text);
    };

    const setOptions = () => {
        if (mode.value === "solveOperation") {
            return <OperationForm />;
        } else {
            return <VisualizationForm />;
        }
    };

    const cancelAudioAfterTimeOut = (timeDelay) => {
        setTimeout(() => {
            setAudioIsNotPlaying();
        }, timeDelay);
    };

    const playSelectedOperationAudio = (message) => {
        playAudio(message);
        cancelAudioAfterTimeOut(9000);
    };

    const playOptions = () => {
        playAudio(
            `Selecciona la opción de visualizar ${sign.text} o resolver ${sign.text}`
        );
        cancelAudioAfterTimeOut(5000);
    };

    const setOperations = () => {
        if (scholarYear === 1 || scholarYear === 2) {
            playSelectedOperationAudio(
                "Selecciona que operación quieres hacer. Sumar, o restar. Para regresar da click en el boton de atras"
            );
        } else if (scholarYear === 3 || scholarYear === 4) {
            playSelectedOperationAudio(
                "Selecciona que operación quieres hacer. Multiplicar, o dividir. Para regresar da click en el boton de atras"
            );
        }
    };

    const playVisualizeOperationAudio = () => {
        playAudio(
            `Para visualizar una ${sign.text} ingresa un número en el primer input y de igual manera en el segundo. Por último da click en el boton que se encuentra debajo del último input para visualizar la ${sign.text}. Si quieres regresar da click en el boton de atras`
        );
        cancelAudioAfterTimeOut(19000);
    };

    const playSolveOperationAudio = () => {
        playAudio(
            `Para resolver una ${sign.text} ingresa un número en el primer input y de igual manera en el segundo, la respuesta que creas correcta en el tercero. Por último da click en el boton que se encuentra debajo del último input para comprobar tu respuesta. Si quieres regresar da click en el boton de atras`
        );
        cancelAudioAfterTimeOut(22000);
    };

    const playAnimationAudio = () => {
        if (mode.operation === "addition") {
            playAudio(
                `La primera fila muestra el primer número que ingresaste, la segunda fila muestra el segundo número que ingresaste. Si unes los puntos en la fila el resultado es ${mode.result}`
            );
        } else if (mode.operation === "substraction") {
            playAudio(
                `La primera fila muestra el primer número que ingresaste, si le quitas el segundo número el resultado es ${mode.result}`
            );
        } else if (mode.operation === "multiplication") {
            playAudio(
                `La primera fila muestra el primer número que ingresaste, las siguientes filas representan el segundo número y el número de circulos en cada fila representa el primer número, si sumas todos los puntos el resultado es ${mode.result}`
            );
        } else if (mode.operation === "division") {
            playAudio(
                `La primera fila muestra el primer número que ingresaste, la segunda fila muestra el segundo número que ingresaste. El segundo número cabe ${mode.result} veces en el primero.`
            );
        }
        cancelAudioAfterTimeOut(5000);
    };

    const playSolvedOperationAudio = () => {
        if (mode.result === parseInt(mode.userResult)) {
            playAudio(
                `Felicidades. Tu resultado es correcto. El resultado correcto es ${mode.result} y tu respuesta fue ${mode.userResult}`
            );
        } else {
            playAudio(
                `Casi lo tienes. Tu resultado es incorrecto. El resultado correcto es ${mode.result} y tu respuesta fue ${mode.userResult}`
            );
        }
        cancelAudioAfterTimeOut(8000);
    };

    const setAudio = () => {
        if (
            sign.text !== "" &&
            mode.value === "visualizeOperation" &&
            mode.result === 0
        ) {
            playVisualizeOperationAudio();
        } else if (
            sign.text !== "" &&
            mode.value === "solveOperation" &&
            mode.result === 0
        ) {
            playSolveOperationAudio();
        } else if (sign.text !== "" && mode.result === 0) {
            playOptions();
            return;
        } else if (
            !mode.loading &&
            mode.result !== 0 &&
            mode.value === "visualizeOperation"
        ) {
            playAnimationAudio();
        } else if (
            !mode.loading &&
            mode.result !== 0 &&
            mode.value === "solveOperation"
        ) {
            playSolvedOperationAudio();
        } else {
            setOperations();
        }
    };

    const setButtonsClasses = () => {
        setTimeout(() => {
            setVisualizeOperationActiveClass(true);
        }, 2000);
        setTimeout(() => {
            setVisualizeOperationActiveClass(false);
            setSolveOperationActiveClass(true);
        }, 3000);
        setTimeout(() => {
            setSolveOperationActiveClass(false);
        }, 4000);
    };

    const onPlayAudioHandler = () => {
        setAudioIsPlaying();
        setAudio();
        setButtonsClasses();
    };

    const disabledPlayClass = audioIsPlaying
        ? "btn-disabled btn-disabled--full"
        : "";

    return (
        <div
            className={`buttonsContainer ${
                mode.value !== "" ? "buttonsContainer--center" : ""
            }`}
        >
            <PlayButton
                event={() => {
                    onPlayAudioHandler();
                }}
                playButtonClass={`${disabledPlayClass} `}
            />
            {mode.value ? (
                setOptions()
            ) : (
                <>
                    <Button
                        text={`Visualizar ${text}`}
                        event={() => onClickHandler("visualizeOperation")}
                        full={visualizeOperationActiveClass}
                    />
                    <Button
                        text={`Resolver ${text}`}
                        event={() => onClickHandler("solveOperation")}
                        full={solveOperationActiveClass}
                    />
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    sign: state.sign,
    mode: state.mode,
    scholarYear: state.gameInfo.scholarYear,
    audioIsPlaying: state.audio.isPlaying,
});

export default connect(mapStateToProps, {
    setMode,
    setAudioIsPlaying,
    setAudioIsNotPlaying,
})(ButtonsContainer);
