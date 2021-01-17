import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./SubstractionAnimation.scss";
import { createCircles } from "./../../utils";

const SubstractionAnimation = ({ mode }) => {
    const { value1, value2, result } = mode;
    const greaterValue = value1 > value2 ? value1 : value2;
    const [timeToDisplayResult, setTimeToDisplayResult] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeToDisplayResult(true);
        }, (value1 + value2 + 2) * 1000);
    }, [value1, value2]);

    return (
        <div className="substractionContainer">
            <div className="substractionContainer__individualContainer substractionContainer__firstDigitContainer">
                <p
                    className={`animate__animated animate__fadeOut animate__delay-${
                        greaterValue + 1
                    }s`}
                >
                    Primer número
                </p>
                <div className="circlesContainer">
                    {createCircles(value1, {
                        withOpacity: false,
                        color: "orange",
                        greaterValue: null,
                    })}
                </div>
            </div>
            <div
                className={`substractionContainer__individualContainer substractionContainer__secondDigitContainer`}
            >
                {!timeToDisplayResult ? (
                    <p
                        className={`animate__animated animate__fadeIn secondNumberSubstraction animate__delay-${
                            greaterValue + 2
                        }s`}
                    >
                        Segundo número
                    </p>
                ) : (
                    <p
                        className={`animate__animated animate__fadeIn animate__delay-${
                            value1 + value2 + 2
                        }s secondNumberSubstraction `}
                    >
                        Resultado
                    </p>
                )}
                <div className="circlesContainer">
                    {createCircles(value2, {
                        withOpacity: true,
                        color: "orange",
                        greaterValue,
                    })}
                </div>
            </div>
            {timeToDisplayResult && (
                <div
                    className={`substractionContainer__individualContainer substractionContainer__resultContainer animate__animated animate__fadeIn`}
                >
                    <span>{result}</span>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
});

export default connect(mapStateToProps)(SubstractionAnimation);
