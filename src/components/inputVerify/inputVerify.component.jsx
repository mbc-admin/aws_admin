import React from 'react';

import './inputVerify.css';

const InputVerify = ({value, changeValue}) => {

    return (
        <input
            className={'inputVerify'}
            type={'number'}
            value={value}
            onChange={value => value.target.value.length === 1 && changeValue(value.target.value)}
        />
    )
}

export default InputVerify;