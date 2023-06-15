// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import Searcher from '../../components/searcher/searcher.component';
import './specialties.css';
import AddButton from  '../../components/addButton/addButton.component';
import {useNavigate} from 'react-router-dom';
import { SpecialtiesService } from '../../services/mbc.service';
import { Table} from 'antd';

const Specialties = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [contextMenuData, setContextMenuData] = useState({ visible: false, x: 0, y: 0, specialty: null });


  const fetchEspecialties = async () => {
    console.log('fetchEspecialties');
    try {
      const data = await SpecialtiesService.getAll()
      console.log(data);
      setSpecialties(data);
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
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
      fetchEspecialties();
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [contextMenuData.visible]);

    const handleEdit = () => {
      console.log('Edit specialty:', contextMenuData.specialty);
      const specialty = contextMenuData.specialty;
      navigate('/editSpecialty', { state: {  specialty } })
      handleMenuClose();
    };

    const handleDelete = async () => {
      console.log('Delete specialty:', contextMenuData.specialty);
      try{
        const response = await SpecialtiesService.delete(contextMenuData.specialty.id);
        fetchEspecialties();
        handleMenuClose();
      }catch(e){
          console.log("Error",e)
      }
    };


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleContextMenu = (event, specialty) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuData({ visible: true, x: event.clientX, y: event.clientY, specialty });
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
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Descripcion',
        dataIndex: 'description',
        key: 'description',
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
      <div className='viewSpecialtyContainer'>
         <div className={'searchBarStyle'}>
         <Searcher/>
        </div>
        <div className='specialtyAddButton'>
        <AddButton text={"Agregar Especialidad"}  press={() => navigate('/addSpecialty')}></AddButton>
        </div>
        <div className={'specialtyTableStyle'}>
        <Table className="custom-table"  columns={columns} dataSource={specialties}  onChange={onChange} scroll={false} />
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

export default Specialties;
