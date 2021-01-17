import React from "react";
import { connect } from "react-redux";
import "./Evaluation.scss";
import Success from "./../Success";
import Failure from "./../Failure";

const Evaluation = ({ mode }) => {
    const checkIfResultIsCorrect = () =>
        parseInt(mode.result) === parseInt(mode.userResult);

    return (
        <div className="evaluation">
            {checkIfResultIsCorrect() ? (
                <Success result={mode.result} userResult={mode.userResult} />
            ) : (
                <Failure result={mode.result} userResult={mode.userResult} />
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
});

export default connect(mapStateToProps)(Evaluation);
