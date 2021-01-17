import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Navigation.scss";
import { setSign, resetSign } from "./../../actions/sign";
import { resetMode } from "./../../actions/mode";
import { resetGameInfo } from "./../../actions/gameInfo";
import { Link } from "react-router-dom";

const Navigation = ({
    mode,
    setSign,
    resetMode,
    resetSign,
    scholarYear,
    resetGameInfo,
    audioIsPlaying,
    sign,
}) => {
    const [itemActive, setItemActive] = useState("");
    const [operationActiveClass, setOperationActiveClass] = useState({
        active: false,
        operation: "",
    });

    const setActiveHandler = (operation) => {
        resetMode();
        setItemActive(operation);
        setSign(operation);
    };

    const onGoBackHandler = () => {
        resetMode();
        resetSign();
        resetGameInfo();
    };

    const setActiveOperationClassesAfterTimeOut = () => {
        setTimeout(() => {
            setOperationActiveClass({
                active: true,
                operation:
                    scholarYear === 1 || scholarYear === 2
                        ? "addition"
                        : "multiplication",
            });
        }, 3000);
        setTimeout(() => {
            setOperationActiveClass({
                active: true,
                operation:
                    scholarYear === 1 || scholarYear === 2
                        ? "substraction"
                        : "division",
            });
        }, 4000);
        setTimeout(() => {
            setOperationActiveClass({
                active: false,
                operation: "",
            });
        }, 5000);
        setTimeout(() => {
            setOperationActiveClass({
                active: true,
                operation: "goBack",
            });
        }, 7000);
        setTimeout(() => {
            setOperationActiveClass({
                active: false,
                operation: "",
            });
        }, 8000);
    };

    const setActiveOperationClasses = () => {
        if (scholarYear === 1 || scholarYear === 2) {
            setActiveOperationClassesAfterTimeOut();
        } else if (scholarYear === 3 || scholarYear === 4) {
            setActiveOperationClassesAfterTimeOut();
        }
    };

    useEffect(() => {
        if (audioIsPlaying && sign === "") {
            setActiveOperationClasses();
        }
    }, [audioIsPlaying]);

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {scholarYear === 1 || scholarYear === 2 ? (
                    <>
                        {" "}
                        <li className="navigation__item">
                            <button
                                disabled={mode.loading}
                                className={`navigation__link--add ${
                                    itemActive === "add" &&
                                    "navigation__link--add--active"
                                } ${audioIsPlaying && "btn-disabled"} ${
                                    operationActiveClass.active &&
                                    operationActiveClass.operation ===
                                        "addition"
                                        ? "navigation__link--add--active"
                                        : ""
                                }`}
                                onClick={() => setActiveHandler("add")}
                            >
                                Sumar
                                <i className="fas fa-plus"></i>
                            </button>
                        </li>
                        <li className="navigation__item">
                            <button
                                disabled={mode.loading}
                                className={`navigation__link--substract ${
                                    itemActive === "substract" &&
                                    "navigation__link--substract--active"
                                } ${audioIsPlaying && "btn-disabled"} ${
                                    operationActiveClass.active &&
                                    operationActiveClass.operation ===
                                        "substraction"
                                        ? "navigation__link--substract--active"
                                        : ""
                                }`}
                                onClick={() => setActiveHandler("substract")}
                            >
                                Restar
                                <span></span>
                            </button>
                        </li>
                    </>
                ) : null}
                {scholarYear === 3 || scholarYear === 4 ? (
                    <>
                        {" "}
                        <li className="navigation__item">
                            <button
                                disabled={mode.loading}
                                className={`navigation__link--multiply ${
                                    itemActive === "multiply" &&
                                    "navigation__link--multiply--active"
                                } ${audioIsPlaying && "btn-disabled"} ${
                                    operationActiveClass.active &&
                                    operationActiveClass.operation ===
                                        "multiplication"
                                        ? "navigation__link--multiply--active"
                                        : ""
                                }`}
                                onClick={() => setActiveHandler("multiply")}
                            >
                                Multiplicar
                                <span>x</span>
                            </button>
                        </li>
                        <li className="navigation__item">
                            <button
                                disabled={mode.loading}
                                className={`navigation__link--divide ${
                                    itemActive === "divide" &&
                                    "navigation__link--divide--active"
                                } ${audioIsPlaying && "btn-disabled"} ${
                                    operationActiveClass.active &&
                                    operationActiveClass.operation ===
                                        "division"
                                        ? "navigation__link--divide--active"
                                        : ""
                                }`}
                                onClick={() => setActiveHandler("divide")}
                            >
                                Dividir
                                <i className="fas fa-divide"></i>
                            </button>
                        </li>
                    </>
                ) : null}
                {!mode.loading ? (
                    <Link
                        className={`go-back-button ${
                            audioIsPlaying && "btn-disabled"
                        } ${
                            operationActiveClass.active &&
                            operationActiveClass.operation === "goBack"
                                ? "go-back-button--active"
                                : ""
                        }`}
                        to="/"
                        onClick={() => onGoBackHandler()}
                        disabled={audioIsPlaying}
                    >
                        Atras
                        <i className="fas fa-hand-point-left"></i>
                    </Link>
                ) : null}
            </ul>
        </nav>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
    scholarYear: state.gameInfo.scholarYear,
    audioIsPlaying: state.audio.isPlaying,
    sign: state.sign.text,
});

export default connect(mapStateToProps, {
    setSign,
    resetMode,
    resetGameInfo,
    resetSign,
})(Navigation);
