import React from "react";
import Navigation from "../../components/Navigation";
import MainContent from "../../components/MainContent";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const GameContent = ({ gameStarted }) => {
    if (!gameStarted) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <div className="container__content">
                <Navigation />
                <MainContent />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    gameStarted: state.gameInfo.gameStarted,
});

export default connect(mapStateToProps)(GameContent);
