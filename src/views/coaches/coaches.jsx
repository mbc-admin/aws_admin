// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import Searcher from '../../components/searcher/searcher.component';
import './coaches.css';
import {useNavigate} from 'react-router-dom';
import { CoachService } from '../../services/mbc.service';
import { ImagesUrl } from '../../utils/ImageAssets';
import { Avatar } from '@material-ui/core';
import { Table} from 'antd';
import AddButton from '../../components/addButton/addButton.component';
import {message} from 'antd';

const Coaches = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [contextMenuData, setContextMenuData] = useState({ visible: false, x: 0, y: 0, user: null });


  const fetchCoaches = async () => {
    console.log('fetchCoaches');
    try {
      const data = await CoachService.getAll()
      console.log(data);
      setCoaches(data);
    } catch (error) {
      console.error('Error al obtener los coaches:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (contextMenuData.visible) {
      handleMenuClose();
    }
  };

  const handleMenuClose = () => {
    setContextMenuData({ visible: false, x: 0, y: 0, user: null });
  };

  useEffect(() => {
    fetchCoaches();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuData.visible]);

  const handleEdit = () => {
    console.log('Edit coach:', contextMenuData.coach);
    const coach = contextMenuData.coach;
    navigate('/editCoach', { state: {  coach } })
    handleMenuClose();
  };

  const handleDelete = async () => {
    console.log('Delete coach:', contextMenuData.coach);
    try{
      const response = await CoachService.delete(contextMenuData.coach.id);
      if (response === 'OK') {
          message.success('Coach eliminado con exito.')
      }
      console.log('response delete coach', response)
      fetchCoaches();
      handleMenuClose();
    }catch(e){
        console.log("Error",e)
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleContextMenu = (event, coach) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuData({ visible: true, x: event.clientX, y: event.clientY, coach });
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: ['name', 'lastname'], // an
      key: 'name',
      render: (text, record) => <l> {record.name}  {record.lastname} </l>,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Foto',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) =>  <Avatar src={ ImagesUrl.base_url_img + record.image}/>
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Especialidad',
      dataIndex: 'Specialities',
    key: 'Specialities',
   render: (Specialities) =>
   Specialities.map((specialty) => `${specialty.name}`).join(', '),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Valoracion',
      key: 'rating',
      dataIndex: 'rating',
    },
    {
      title: 'T/Rta',
      key: 'response_time',
      dataIndex: 'response_time',
    },
    {
      title: 'Estado',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
        <button
        className="hamburger-menu"
        onClick={(event) =>{handleContextMenu(event, record)}}
        >
     &#x2630;
    </button>
      ),
    },
  ];


  return (
  <div className={'viewCoachContainer'}>
 <div className={'searchBarStyle'}>
      <Searcher/>
      </div>
      <div className='coachAddButton'>
      <AddButton text={"Agregar Coach"}  press={() => navigate('/addCoach')}></AddButton>
      </div>
      <div className={'coachTableStyle'}>
      <Table className={'custom-table'} columns={columns} dataSource={coaches} onChange={onChange}  scroll={false}/>
      </div>
      {contextMenuData.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenuData.y, left: contextMenuData.x }}>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Borrar</button>
        </div>
      )}
    </div>
  );
};

export default Coaches;
