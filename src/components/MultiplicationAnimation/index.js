import React from "react";
import "./MultiplicationAnimation.scss";
import { connect } from "react-redux";
import "./MultiplicationAnimation.scss";
import { createCircles } from "./../../utils";

const MultiplicationAnimation = ({ mode }) => {
    const { value1, value2, result } = mode;

    const createRows = () => {
        const rows = [];
        for (let i = 0; i < value2; i++) {
            rows.push(
                <div
                    key={i}
                    className={`circlesContainer animate__animated animate__fadeIn animate__delay-${
                        value1 + 3
                    }s`}
                >
                    {createCircles(value1, {
                        withOpacity: false,
                        color: "blue",
                        greaterValue: null,
                    })}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="multiplicationContainer">
            <div className="multiplicationContainer__individualContainer multiplicationContainer__firstDigitContainer">
                <p>Primer número</p>
                <div className="circlesContainer">
                    {createCircles(value1, {
                        withOpacity: false,
                        color: "blue",
                        greaterValue: null,
                    })}
                </div>
            </div>
            <div
                className={`multiplicationContainer__individualContainer multiplicationContainer__secondDigitContainer`}
            >
                <p
                    style={{ margin: "1rem 0" }}
                    className={`animate__animated animate__fadeIn animate__delay-${
                        value1 + 1
                    }s secondNumberSubstraction`}
                >
                    Las siguientes filas representan el segundo número, y el
                    número de circulos en cada fila representan el primer número
                </p>
                {createRows()}
            </div>
            <div
                className={`multiplicationContainer__individualContainer multiplicationContainer__resultContainer animate__animated animate__fadeIn animate__delay-${
                    value1 + 3
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

export default connect(mapStateToProps)(MultiplicationAnimation);
