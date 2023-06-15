import React, { useState, useEffect } from 'react';
import Searcher from '../../components/searcher/searcher.component';
import './users.css';
import {useNavigate} from 'react-router-dom';
import { UserService } from '../../services/mbc.service';
import { Table} from 'antd';
import { Avatar } from '@material-ui/core';
import { ImagesUrl } from '../../utils/ImageAssets';
import AddButton from '../../components/addButton/addButton.component';


const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [contextMenuData, setContextMenuData] = useState({ visible: false, x: 0, y: 0, user: null });

  const fetchUsers = async () => {
    try {
     const data = await UserService.getAll()
      console.log(data);
      setUsers(data);
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
    fetchUsers();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuData.visible]);

  const handleEdit = () => {
    console.log('Edit user:', contextMenuData.user);
    const user = contextMenuData.user;
    navigate('/editUser', { state: {  user } })
    handleMenuClose();
  };

  const handleDelete = async () => {
    console.log('Delete user:', contextMenuData.user);
    try{
      const response = await UserService.delete(contextMenuData.user.id);
      console.log(response)
      fetchUsers();
      handleMenuClose();
    }catch(e){
        console.log("Error",e)
    }
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Empresa',
      key: 'organization_id',
      dataIndex: 'organization_id',
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleContextMenu = (event, user) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenuData({ visible: true, x: event.clientX, y: event.clientY, user });
  };

  return (
    <div className='viewUserContainer'>
       <div className={'searchBarStyle'}>
       <Searcher/>
      </div>
      <div className='userAddButton'>
      <AddButton text={"Agregar Usuario"}  press={() => navigate('/addUser')}></AddButton>
      </div>
      <div className={'userTableStyle'}>
      <Table className="custom-table"  columns={columns} dataSource={users}  onChange={onChange} scroll={false} />
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

export default Users;
