import React from "react";
import "./VisualizationContainer.scss";
import Status from "./../Status";
import { connect } from "react-redux";
import AdditionAnimation from "./../AdditionAnimation";
import SubstractionAnimation from "./../SubstractionAnimation";
import MultiplicationAnimation from "./../MultiplicationAnimation";
import DivisionAnimation from "./../DivisionAnimation";
import Evaluation from "./../Evaluation";

const VisualizationContainer = ({ mode }) => {
    const setAnimation = () => {
        switch (mode.operation) {
            case "addition":
                return <AdditionAnimation />;
            case "substraction":
                return <SubstractionAnimation />;
            case "multiplication":
                return <MultiplicationAnimation />;
            case "division":
                return <DivisionAnimation />;
            default:
                return null;
        }
    };

    return (
        <div className="wrapper">
            <div className="visualizationContainer">
                {mode.loading === false && mode.value ? (
                    mode.value === "visualizeOperation" ? (
                        setAnimation()
                    ) : (
                        <Evaluation />
                    )
                ) : (
                    <Status />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    mode: state.mode,
});

export default connect(mapStateToProps)(VisualizationContainer);
