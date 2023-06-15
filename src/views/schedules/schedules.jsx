// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import Searcher from '../../components/searcher/searcher.component';
import './schedules.css';
import { Pagination } from '@material-ui/lab';
import {useNavigate} from 'react-router-dom';
import { CoachService } from '../../services/mbc.service';
import { Space, Table, Tag } from 'antd';
import StatusDot from '../../components/statusDot/statusDot';
import moment from 'moment';

const Schedules = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const data = [];


  const fetchCoaches = async () => {
    console.log('fetchCoaches');
    try {
      const data = await CoachService.getAvailable()
      console.log('this is a fetchCoaches', data);
      setCoaches(data);
    } catch (error) {
      console.error('Error al obtener los coaches:', error);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  function formatearFecha(input) {
    const fecha = new Date(input);
    const horas = fecha.getUTCHours();
    const minutos = fecha.getUTCMinutes();
    const formattedDate = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}hs`;
    return formattedDate;
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const ListItem = ({ start, end }) => (
    <div className="list-item">
      <div style={{ marginRight: '5px' }}>{start}</div>
      <div>{"-"}</div>
      <div style={{ marginLeft: '5px' }}>{end}</div>
    </div>
  );

  const columns = [
    {
      title: 'Nombre',
      dataIndex: ['name', 'lastname'], // an
      key: 'name',
      render: (text, record) => <li onClick={() => navigate('/calendar', {state: {idUser: record.id, workingHours: record.WorkingHours}})}> {record.name}  {record.lastname} </li>,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.name.length - b.name.length,
      render:(status)=>{
        return (
          <div className="list-item-status">
          <StatusDot status={status}/>
          <div>{status === 'Online' || status === 'connect' ? 'Online' : 'Offline'}</div>
        </div>
        );
      }
    },
    {
      title: 'Lunes',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: (WorkingHours) =>
      WorkingHours.map((whours) => {
        if(whours.recurring.weekday == "MO"){
          console.log('THIS IS A DATE OF MONDAY', whours.recurring.start)
          return (
            <ListItem start={moment(whours.recurring.start.replace('+02:00', '')).format('HH:mm')+'hs'} end={moment(whours.recurring.end.replace('+02:00', '')).format('HH:mm')+'hs'} />
          );
        };
      }),
    },
    {
      title: 'Martes',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: (WorkingHours) =>
      WorkingHours.map((whours) => {
        if(whours.recurring.weekday == "TU"){
          return (
              <ListItem start={moment(whours.recurring.start.replace('+02:00', '')).format('HH:mm')+'hs'} end={moment(whours.recurring.end.replace('+02:00', '')).format('HH:mm')+'hs'} />
          );        }
      }),
    },
    {
      title: 'Miercoles',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: (WorkingHours) =>
      WorkingHours.map((whours) => {
        if(whours.recurring.weekday == "WE"){
          return (
              <ListItem start={moment(whours.recurring.start.replace('+02:00', '')).format('HH:mm')+'hs'} end={moment(whours.recurring.end.replace('+02:00', '')).format('HH:mm')+'hs'} />
          );        }
      }),
    },
    {
      title: 'Jueves',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: (WorkingHours) =>
      WorkingHours.map((whours) => {
        if(whours.recurring.weekday == "TH"){
          return (
              <ListItem start={moment(whours.recurring.start.replace('+02:00', '')).format('HH:mm')+'hs'} end={moment(whours.recurring.end.replace('+02:00', '')).format('HH:mm')+'hs'} />
          );        }
      }),
    },
    {
      title: 'Viernes',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: (WorkingHours) =>
      WorkingHours.map((whours) => {
        if(whours.recurring.weekday == "FR"){
          return (
              <ListItem start={moment(whours.recurring.start.replace('+02:00', '')).format('HH:mm')+'hs'} end={moment(whours.recurring.end.replace('+02:00', '')).format('HH:mm')+'hs'} />
          );        }
      }),
    },
    // {
    //   title: 'Sabado',
    //   dataIndex: 'WorkingHours',
    //   key: 'WorkingHours',
    //   render: (WorkingHours) =>
    //   WorkingHours.map((whours) => {
    //     if(whours.weekday == "SA"){
    //       return (
    //         <ListItem start={formatearFecha(whours.start)} end={formatearFecha(whours.end)} />
    //       );        }
    //   }),
    // },
    // {
    //   title: 'Domingo',
    //   dataIndex: 'WorkingHours',
    //   key: 'WorkingHours',
    //   render: (WorkingHours) =>
    //   WorkingHours.map((whours) => {
    //     if(whours.weekday == "SU"){
    //       return (
    //         <ListItem start={formatearFecha(whours.start)} end={formatearFecha(whours.end)} />
    //       );        }
    //   }),
    // },
  ];


  return (
    <div className='viewSchedulesContainer'>
       <div className={'searchBarStyle'}>
      <Searcher/>
      </div>
      <div className={'schedulesTableStyle'}>
      <Table bordered className="custom-table"  columns={columns} dataSource={coaches} onChange={onChange} scroll={false}/>
      </div>
    </div>
  );
};

export default Schedules;
