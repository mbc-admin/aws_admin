import React, {useState} from 'react';
import './inputDateText.css';
import {IconAssets} from '../../utils/ImageAssets';

const InputDateText = ({label, iconLeft, placeholder, type, changeValue, iconRight, value, name, oneData}) => {
    const [show, setShow] = useState(false);

    return (
        <div className={'realContainerInput'}>
            {label && <p className={'labelInput'}>{label}</p>}
            <div className={'containerDateInput'}>
                <img src={iconLeft}/>
                <input
                    className={'input'}
                    placeholder={placeholder}
                    value={value}
                    type='date'
                    onChange={ val  => {
                        console.log("onChange")
                        console.log(val)
                        console.log(val.target)
                        if (oneData) {
                            changeValue(val.target.value)
                        } else {
                            changeValue(name,val.target.value);
                        }
                    }}
                />
                {(type === 'password' && !show) ? <img src={IconAssets.hide} onClick={() => setShow(true)}/> : (type === 'password' && show) && <img src={IconAssets.show} onClick={() => setShow(false)}/> }
            </div>
        </div>

    )
}

export default InputDateText;
