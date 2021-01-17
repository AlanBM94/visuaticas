import React from "react";
import { connect } from "react-redux";
import "./Input.scss";

const Input = ({ text, event, color, value, name, full }) => {
    return (
        <div
            className={`input input--${color} ${
                full ? `input--full--${color}` : ""
            }`}
        >
            <label htmlFor={text}>{text}</label>
            <input
                type="number"
                value={value}
                id={text}
                name={name}
                onChange={(e) => event(e)}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    color: state.sign.color,
});

export default connect(mapStateToProps)(Input);
