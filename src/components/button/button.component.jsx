import React from 'react';

import './button.css';

const Button = ({disabled, iconLeft, type, text, secondary, press}) => {

    return (
        <button
            className={secondary ? 'secondaryButton' : 'button'}
            type={type}
            disabled={disabled}
            onClick={press}
        >
            {iconLeft && <img className={'iconButton'} src={iconLeft}/>}
            {text}
        </button>
    )
}

export default Button;
