import React from 'react';

import './radioButton.css';

const RadioButton = ({text}) => {

    return (
        <div className={'container'}>
            <input type={'radio'}/>
            <p className={'textRadioButton'}>{text}</p>
        </div>
    )
}

export default RadioButton;
