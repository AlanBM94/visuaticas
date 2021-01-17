import React, { useState, useEffect } from "react";
import "./DivisionAnimation.scss";
import { connect } from "react-redux";
import "./DivisionAnimation.scss";
import { createCircles } from "./../../utils";
import "./DivisionAnimation.scss";

const DivisionAnimation = ({ mode }) => {
    const { value1, value2, result } = mode;
    const [timeToDisplayResult, setTimeToDisplayResult] = useState(false);
    const greaterValue = value1 > value2 ? value1 : value2;

    useEffect(() => {
        setTimeout(() => {
            setTimeToDisplayResult(true);
        }, (greaterValue + 1) * 1000);
    }, [greaterValue]);

    return (
        <div className="divisionContainer">
            <div className="divisionContainer__individualContainer Container__firstDigitContainer">
                <p>Primer número</p>
                <div className="circlesContainer">
                    {createCircles(value1, {
                        withOpacity: false,
                        color: "yellow",
                        greaterValue: null,
                    })}
                </div>
            </div>
            <div
                className={`divisionContainer__individualContainer divisionContainer__secondDigitContainer`}
            >
                <p>Segundo número</p>
                <div className="circlesContainer">
                    {createCircles(value2, {
                        withOpacity: false,
                        color: "yellow",
                        greaterValue: null,
                    })}
                </div>
                {timeToDisplayResult && (
                    <p
                        className={`animate__animated animate__fadeIn secondNumberSubstraction text-result`}
                    >
                        El segundo número cabe{" "}
                        <span className={`divisionResult`}>
                            {result % 1 !== 0 ? result.toFixed(1) : result}
                        </span>{" "}
                        {result === 1 ? "vez" : "veces"} en el primer número
                    </p>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
});

export default connect(mapStateToProps)(DivisionAnimation);
