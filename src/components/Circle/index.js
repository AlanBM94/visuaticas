import React from 'react';
import './Circle.scss';

const Circle = ({color, delay, opacity}) => {
    return <div className={`circle circle--${color} ${opacity && "circle--opacity"} animate__animated animate__fadeInLeft animate__delay-${delay}s `}></div>
};


export default Circle;