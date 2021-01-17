import React from 'react';
import './Failure.scss';
import SadFace from './../../images/sadFace';

const Failure = ({userResult, result}) => {

    return <div className="failure">
            <h3>Casi lo tienes!</h3>
            <p>Tu respuesta fue {userResult}</p>
            <p>El resultado correcto es {result}</p>
            <div className="animate__animated animate__bounce">
                <SadFace />
            </div>
    </div>
};



export default Failure;