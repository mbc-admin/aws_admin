import React, {useEffect, useState} from 'react';

import './coachStats.css';

import InputDateText from '../../components/inputDateText/inputDateText';
import Button from '../../components/button/button.component';
import CardStats from '../../components/cardStats/cardStats.component';
import ContainerGraphics from "../../components/containerGraphics/containerGraphics.component";
import Searcher from "../../components/searcher/searcher.component";
import GeneralDropdown from "../../components/generalDropdown/generalDropdown.component";

import {getCoachStats} from "../../services/stats.service";
import {message} from "antd";
import {IconAssets} from "../../utils/ImageAssets";
import {CoachService} from "../../services/mbc.service";

const CoachStats = () => {
    const [stats, setStats] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [coaches, setCoaches] = useState([]);
    const [coachId, setCoachId] = useState([]);

    useEffect(() => {
        getStats('', '', '');
        getCoaches();
    }, [])

    const getCoaches = async () => {
        try {
            const data = await CoachService.getAll()
            console.log('sadfsdf', data);
            setCoaches(data);
        } catch (error) {
            console.error('Error al obtener los coaches:', error);
        }
    }

    const getStats = (start, end, idCoach) => {
        getCoachStats(start, end, idCoach).then(res => {
            console.log('Estadisticas del coach recogidas cone xito', res.data);
            setStats(res.data)
        }).catch(err => {
            console.log('ERROR al recoger las estadisticas del coach',err);
        })
    }

    const applyFilters = () => {
        if (startDate !== null && endDate !== null || coachId !== null) {
            getStats(startDate, endDate, coachId);
        } else {
            message.error('Rellena los filtros.')
        }
    }

    return (
        <div className={'containerCoachStats'}>
            <p className={'titleCoachStats'}>Coach services</p>

             <div className={'containerFiltersCoachStats'}>
                <div className={'containerDateFiltersCoachStats'}>
                    <InputDateText changeValue={value => setStartDate(value)} oneData/>
                    <InputDateText changeValue={value => setEndDate(value)} oneData/>

                    <GeneralDropdown options={coaches} initialText={'Seleccione un coach'} onChange={value => setCoachId(value)} returnId/>
                </div>
                <div style={{width: 150}}>
                    <Button text={'Aplicar'} press={() => applyFilters()}/>
                </div>
            </div>

            {/*<div className={'containerSearcherCoachStats'}>
                <Searcher/>
            </div>*/}

            {stats &&
                <>
                    <div className={'containerCardsCoachStats'}>
                        <CardStats value={stats.coach_rating} text={'Valoración del coach'} icon={IconAssets.starStats}/>
                        <CardStats value={stats.interactions} text={'Total de interacciones'} icon={IconAssets.responseStats}/>
                        <CardStats value={stats.average_session_duration} text={'Duración media sesión'} icon={IconAssets.timelaspseStats}/>
                        <CardStats value={stats.average_videocall_duration} text={'Duración media videocall'} icon={IconAssets.timelaspseStats}/>
                        <CardStats value={stats.response_time} text={'Tiempo medio respuesta'} icon={IconAssets.timelaspseStats}/>
                        <CardStats value={stats.interactions_by_hour} text={'Nº de intercciones por hora'} icon={IconAssets.messageStats}/>
                        <CardStats value={stats.videocalls_by_hour} text={'Nº de videocall por hora'} icon={IconAssets.videoStats}/>
                        <CardStats value={stats.users_by_hour} text={'Usuarios atendidos por hora'} icon={IconAssets.profileStats}/>
                    </div>

                    <ContainerGraphics title={'Tipología de sesión'} data={stats.specialities_graph} type={'donut'}/>
                </>
            }

        </div>
    )

}

export default CoachStats;
