import React, { useState, useEffect } from "react";
import "./OperationForm.scss";
import { connect } from "react-redux";
import Button from "./../Button";
import Input from "./../Input";
import { setUserResult, resetMode } from "./../../actions/mode";
import "./OperationForm.scss";

const OperationForm = ({
    sign,
    mode,
    resetMode,
    setUserResult,
    audioIsPlaying,
}) => {
    const [formState, setFormState] = useState({
        firstDigit: "",
        secondDigit: "",
        userResult: "",
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

    // TODO: FIX THIS LIKE VISUALIZATION FORM

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { firstDigit, secondDigit } = formState;
        if (!parseInt(firstDigit) || !parseInt(secondDigit)) {
            setError("Los valores no pueden ser 0");
        } else if (parseInt(firstDigit) > 10 || parseInt(secondDigit) > 10) {
            setError("Los valores no pueden ser mayores a 10");
        } else if (parseInt(firstDigit) < 0 || parseInt(secondDigit) < 0) {
            setError("Los valores no pueden ser menores a 0");
        } else if (
            mode.operation === "substraction" &&
            parseInt(firstDigit) < parseInt(secondDigit)
        ) {
            setError(
                "En las restas el primer valor tiene que ser mayor al segundo"
            );
        } else {
            setError(null);
            setUserResult(
                formState.firstDigit,
                formState.secondDigit,
                formState.userResult,
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
            setActiveItem({ active: true, item: "third-input" });
        }, 9000);
        setTimeout(() => {
            setActiveItem({ active: false, item: "" });
        }, 10000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "btn-solve" });
        }, 13000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "" });
        }, 15000);
        setTimeout(() => {
            setActiveItem({ active: true, item: "btn-goBack" });
        }, 20000);
        setTimeout(() => {
            setActiveItem({ active: false, item: "" });
        }, 21000);
    };

    useEffect(() => {
        if (audioIsPlaying) {
            setActiveItemsClassesAfterTimeOut();
        }
    }, [audioIsPlaying]);

    return (
        <div className="operationForm">
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
            <form action="#" className="operationForm__form">
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
                <Input
                    text="Respuesta"
                    value={formState.userResult}
                    name={"userResult"}
                    event={(e) => onChangeHandler(e)}
                    full={
                        mode.result === 0 &&
                        activeItem.active &&
                        activeItem.item === "third-input"
                    }
                />
                {!mode.loading && (
                    <Button
                        customStyles={{ width: "100%" }}
                        disabled={mode.loading}
                        text={`Comprobar ${sign.text}`}
                        event={(e) => onSubmitHandler(e)}
                        full={
                            mode.result === 0 &&
                            activeItem.active &&
                            activeItem.item === "btn-solve"
                        }
                    />
                )}
            </form>
            {error && <span>{error}</span>}
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
    sign: state.sign,
    audioIsPlaying: state.audio.isPlaying,
});

export default connect(mapStateToProps, { resetMode, setUserResult })(
    OperationForm
);
