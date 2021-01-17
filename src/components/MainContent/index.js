import React from 'react';
import './MainContent.scss';
import Options from './../Options';
import VisualizationContainer from './../VisualizationContainer';

const MainContent = () => {
    return <div className="mainContent">
        <Options/>
        <VisualizationContainer/>
    </div>
};


export default MainContent;