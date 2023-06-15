import React from 'react';

import './rating.css';

import { Rate } from 'antd';

import Button from '../../components/button/button.component';
import RadioButton from '../../components/radioButton/radioButton.component';

const Rating = () => {

    return (
        <div className={'containerRating'}>
            <p className={'titleRating'}>Valoración del servicio</p>

            <Rate
                className={'rate'}
                allowHalf
                defaultValue={0}
            />

            <p className={'textConfirmRating'}>Confirmación de especialidad</p>

            {/*<select className={'selectRating'}>
                <option>Seleccione la especialidad</option>
                <option>Seleccione la especialidad</option>
                <option>Seleccione la especialidad</option>
            </select>*/}

            <div className={'containerRadioButtons'}>
                <div className={'blockRadioButtons'}>
                    <RadioButton text={'Coaching ejecutivo'}/>
                    <RadioButton text={'Coach de vida'}/>
                    <RadioButton text={'Familia'}/>
                    <RadioButton text={'Adolescencia'}/>
                    <RadioButton text={'Productividad, liderazgo, equipos'}/>
                    <RadioButton text={'Gestión del cambio'}/>
                    <RadioButton text={'Gestión del cambio en la mujer'}/>
                </div>
                <div className={'blockRadioButtons blockRadioButtonsRight'}>
                    <RadioButton text={'Actitud positiva'}/>
                    <RadioButton text={'Inteligencia emocional: Estrés y ansiedad'}/>
                    <RadioButton text={'Coaching de mujeres'}/>
                    <RadioButton text={'Duelo'}/>
                    <RadioButton text={'Mindfulness'}/>
                    <RadioButton text={'Desarrollo personal'}/>
                    <RadioButton text={'Relaciones personales'}/>
                </div>
            </div>

            <div className={'containerButtonRating'}>
                <Button
                    text={'Enviar'}
                />
            </div>
        </div>
    )
}

export default Rating;
