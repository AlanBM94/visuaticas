import React from 'react';
import Confetti from 'react-confetti'
import './Success.scss';



const Success = ({userResult, result}) => {
    const width = window.innerWidth;
    let height = window.innerHeight;

    if(width <= 764) {
        height += 200;
    }

    return <div className="success">
            <h3>Felicidades!</h3>
            <p>Tu respuesta fue {userResult}</p>
            <p>El resultado correcto es {result}</p>
            <Confetti numberOfPieces={500} width={width} height={height} />
    </div>
};


export default Success;