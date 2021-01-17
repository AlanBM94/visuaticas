import React, { useState, useEffect } from "react";
import Button from "./../Button";
import Input from "./../Input";
import "./VisualizationForm.scss";
import { connect } from "react-redux";
import { resetMode } from "./../../actions/mode";
import { doOperation } from "./../../actions/mode";

const VisualizationForm = ({
    sign,
    resetMode,
    doOperation,
    mode,
    audioIsPlaying,
}) => {
    const [formState, setFormState] = useState({
        firstDigit: "",
        secondDigit: "",
    });
    const [error, setError] = useState(null);
    const [activeItem, setActiveItem] = useState({ active: false, item: "" });

    const buttonStyles = {
        width: "fit-content",
        padding: "1rem 2rem",
        border: "none",
    };

    const onChangeHandler = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const atLeastOneInputHasZeroValue = (firstInput, secondInput) =>
        !parseInt(firstInput) || !parseInt(secondInput);

    const atLeastOneInputValueIsGreaterThanMax = (values, max = 10) => {
        const { firstDigit, secondDigit } = values;
        return parseInt(firstDigit) > max || parseInt(secondDigit) > max;
    };

    const atLeastOneInputValueIsLessThanMin = (values, min = 0) => {
        const { firstDigit, secondDigit } = values;
        return parseInt(firstDigit) < min || parseInt(secondDigit) < min;
    };

    const substractionResultIsNegative = (firstDigit, secondDigit) =>
        mode.operation === "substraction" &&
        parseInt(firstDigit) < parseInt(secondDigit);

    const oneErrorExists = (firstDigit, secondDigit) => {
        let errorExists = false;
        if (atLeastOneInputHasZeroValue(firstDigit, secondDigit)) {
            errorExists = true;
            setError("Los valores no pueden ser 0");
        } else if (
            atLeastOneInputValueIsGreaterThanMax({ firstDigit, secondDigit })
        ) {
            errorExists = true;
            setError("Los valores no pueden ser mayores a 10");
        } else if (
            atLeastOneInputValueIsLessThanMin({ firstDigit, secondDigit })
        ) {
            errorExists = true;
            setError("Los valores no pueden ser menores a 0");
        } else if (substractionResultIsNegative(firstDigit, secondDigit)) {
            errorExists = true;
            setError(
                "En las restas el primer valor tiene que ser mayor al segundo"
            );
        } else {
            setError(null);
        }
        return errorExists;
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { firstDigit, secondDigit } = formState;
        if (!oneErrorExists(firstDigit, secondDigit)) {
            doOperation(
                parseInt(firstDigit),
                parseInt(secondDigit),
                mode.operation
            );
        }
    };

    const setActiveItemsClassesAfterTimeOut = () => {
        setTimeout(() => {
            setActiveItem({ active: true, item: "first-input" });
        }, 4000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "second-input" });
        }, 5000);
        setTimeout(() => {
            setActiveItem({ active: false, item: "" });
        }, 6000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "btn-visualize" });
        }, 10000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "" });
        }, 11000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "btn-goBack" });
        }, 16000);
        setTimeout(() => {
            setActiveItem({ active: false, item: "" });
        }, 18000);
    };

    useEffect(() => {
        if (audioIsPlaying) {
            setActiveItemsClassesAfterTimeOut();
        }
    }, [audioIsPlaying]);

    return (
        <div className="visualizationForm">
            {!mode.loading && (
                <Button
                    text="Atras"
                    disabled={mode.loading}
                    event={() => resetMode()}
                    customStyles={buttonStyles}
                    full={
                        mode.result === 0 &&
                        activeItem.active &&
                        activeItem.item === "btn-goBack"
                    }
                />
            )}
            <form
                action="#"
                className={`visualizationForm__form ${
                    mode.loading && "form-space"
                }`}
            >
                <Input
                    text="Primer número"
                    value={formState.firstDigit}
                    name={"firstDigit"}
                    event={(e) => onChangeHandler(e)}
                    full={
                        mode.result === 0 &&
                        activeItem.active &&
                        activeItem.item === "first-input"
                    }
                />
                <Input
                    text="Segundo número"
                    value={formState.secondDigit}
                    name={"secondDigit"}
                    event={(e) => onChangeHandler(e)}
                    full={
                        mode.result === 0 &&
                        activeItem.active &&
                        activeItem.item === "second-input"
                    }
                />
                {!mode.loading && (
                    <Button
                        customStyles={{ minWidth: "0" }}
                        disabled={mode.loading}
                        text={`Visualizar ${sign.text}`}
                        event={(e) => onSubmitHandler(e)}
                        full={
                            mode.result === 0 &&
                            activeItem.active &&
                            activeItem.item === "btn-visualize"
                        }
                    />
                )}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
};

const mapStateToProps = (state) => ({
    sign: state.sign,
    mode: state.mode,
    audioIsPlaying: state.audio.isPlaying,
});

export default connect(mapStateToProps, { resetMode, doOperation })(
    VisualizationForm
);
