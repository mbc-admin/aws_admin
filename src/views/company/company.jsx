// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import Searcher from '../../components/searcher/searcher.component';
import './company.css';
import {useNavigate} from 'react-router-dom';
import { OrganizationService } from '../../services/mbc.service';
import { ImagesUrl } from '../../utils/ImageAssets';
import { Avatar } from '@material-ui/core';
import { Table} from 'antd';
import AddButton from '../../components/addButton/addButton.component';

const Company = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [contextMenuData, setContextMenuData] = useState({ visible: false, x: 0, y: 0, company: null });


  const fetchCompanies = async () => {
    console.log('fetchCompanies');
    try {
      const data = await OrganizationService.getAll()
      console.log(data);
      setCompanies(data);
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
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
    fetchCompanies();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuData.visible]);

  const handleEdit = () => {
    console.log('Edit company:', contextMenuData.company);
    const company = contextMenuData.company;
    navigate('/editCompany', { state: {  company } })
    handleMenuClose();
  };

  const handleDelete = async () => {
    console.log('Delete company:', contextMenuData.company);
    try{
      const response = await OrganizationService.delete(contextMenuData.company.id);
      fetchCompanies();
      handleMenuClose();
    }catch(e){
        console.log("Error",e)
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleContextMenu = (event, company) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuData({ visible: true, x: event.clientX, y: event.clientY, company });
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
      dataIndex: 'logo',
      key: 'logo',
      render: (text, record) =>  <Avatar src={ ImagesUrl.base_url_img + record.logo}/>
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Cant emp',
      key: 'employees',
      dataIndex: 'employees',
    },
    {
      title: 'Departamentos',
      key: 'Departments',
      dataIndex: 'Departments',
      render: (Departments) =>
      Departments.map((department) => `${department.name}`).join('- '),
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
    <div className='viewCompanyContainer'>
       <div className={'searchBarStyle'}>
       <Searcher/>
      </div>
      <div className='companyAddButton'>
      <AddButton text={"Agregar Empresa"}  press={() => navigate('/addCompany')}></AddButton>
      </div>
      <div className={'companyTableStyle'}>
      <Table className="custom-table"  columns={columns} dataSource={companies}  onChange={onChange} scroll={false} />
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

export default Company;
