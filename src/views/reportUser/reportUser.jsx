import React from 'react';

import './reportUser.css';

import Button from '../../components/button/button.component';

const ReportUser = () => {

    return (
        <div className={'containerReportUser'}>
            <p className={'titleReportUser'}>¿Desea banear a este usuario?</p>

            <p className={'textReportUser'}>Si baneas a este usuario ya no podra interactuar contigo. Por favor ingresa los motivos:</p>

            <textarea
                className={'textareaReportUser'}
                placeholder={'Escriba aqui...'}
            />

            <div className={'containerButtonsReportUser'}>
                <div className={'containerButton'}>
                    <Button
                        text={'Cancelar'}
                        secondary
                    />
                </div>
                <div className={'containerButton'}>
                    <Button
                        text={'Confirmar'}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportUser;
