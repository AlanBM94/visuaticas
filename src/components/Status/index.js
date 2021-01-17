import React from 'react';
import './Status.scss';
import Idea from './../../images/Idea';
import {connect} from 'react-redux';


const Status = ({mode, sign}) => {
    const setStatusClass = () => {
        let name;
        switch(sign.color){
            case "green":
                name = "green";
                break;
            case "blue":
                name = "blue";
                break;
            case "orange":
                name = "orange";
                break;
            case "yellow":
                name = "yellow";
                break;
            default:
                name = ""
                break;
        }
        return name;   
    };
    

    return <div className={`status ${mode.loading && `status--${setStatusClass()}`}`}>
        <Idea/>
        <p>{mode.loading ? "Resolviendo..." : "Sin operación"}</p>
    </div>
};

const mapStateToProps = (state) => ({
    mode: state.mode,
    sign: state.sign
});



export default connect(mapStateToProps)(Status);