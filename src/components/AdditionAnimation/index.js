import React, { useState, useEffect } from "react";
import "./AdditionAnimation.scss";
import { connect } from "react-redux";
import { createCircles } from "./../../utils";

const AdditionAnimation = ({ mode }) => {
    const { value1, value2, result } = mode;
    const [timeToDisplayResult, setTimeToDisplayResult] = useState(false);
    const greaterValue = value1 > value2 ? value1 : value2;

    useEffect(() => {
        setTimeout(() => {
            setTimeToDisplayResult(true);
        }, (greaterValue + 1) * 1000);
    }, [greaterValue]);

    return (
        <div className="additionContainer">
            <div className="additionContainer__individualContainer additionContainer__firstDigitContainer">
                <p
                    className={`animate__animated animate__fadeOut animate__delay-${
                        greaterValue + 1
                    }s`}
                >
                    Primer número
                </p>
                <p
                    className={`resultText animate__animated animate__fadeIn animate__delay-${
                        greaterValue + 1
                    }s`}
                >
                    Resultado
                </p>
                <div className="circlesContainer">
                    {createCircles(value1, {
                        withOpacity: false,
                        color: "green",
                        greaterValue: null,
                    })}
                </div>
            </div>
            <div
                className={`additionContainer__individualContainer additionContainer__secondDigitContainer ${
                    timeToDisplayResult && "moveToTop"
                } animate__delay-${greaterValue + 1}`}
            >
                <p
                    className={`animate__animated animate__fadeOut animate__delay-${
                        greaterValue + 1
                    }s`}
                >
                    Segundo número
                </p>
                <div className="circlesContainer">
                    {createCircles(value2, {
                        withOpacity: false,
                        color: "green",
                        greaterValue: null,
                    })}
                </div>
            </div>
            <div
                className={`additionContainer__individualContainer additionContainer__resultContainer animate__animated animate__fadeIn animate__delay-${
                    greaterValue + 1
                }s`}
            >
                <span>{result}</span>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
});

export default connect(mapStateToProps)(AdditionAnimation);
