import React from 'react';
import './button.scss';

const Button = (props) => {
    return (
        <button 
            disabled={props.active}
            value={props.value}
            style={props.style}
            onClick={props.clicked}>{props.value}</button>
    )
}

export default Button;