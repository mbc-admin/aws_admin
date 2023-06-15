import React, { useState, useRef, useEffect } from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './editCompany.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import {IconAssets} from '../../../utils/ImageAssets';
import {OrganizationService,  DepartmentService} from '../../../services/mbc.service';
import { useLocation } from 'react-router-dom';
import { ImagesUrl } from '../../../utils/ImageAssets';
import Modal from '../../../components/modal/modalComponent';


const EditCompany = () => {
  const location = useLocation();
  const company = location.state.company;
  const [file, setFile] = useState(null);

  const initialState = {
    name: company.name,
    phone: company.phone,
    email: company.email,
    password1: company.password,
    logo: company.logo,
    employees: company.employees,
    color1: company.color1,
    color2: company.color2,
    font_color: company.font_color,
  }

  const initialDepartment = {
    name: '',
    employees: '',
    organization_id: '',
  };

  const [departments, setDepartments] = useState(company.Departments);
  const [initialData, setinitialData] = useState(initialState);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);
  const formRef = useRef(); // Crear referencia al formulario
  const [showModal, setShowModal] = useState(false);


  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const fileTarget = e.target.files[0];
    setFile(fileTarget)
    setFormData({ ...formData, image: fileTarget });
    if (fileTarget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(fileTarget);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    console.log(company)
    if(file == null){
    if( company.logo != null ){
      setPreview(ImagesUrl.base_url_img + company.logo)
      }
    }
  });

  const handleAvatarClick = () => {
    document.getElementById('photoInput').click();
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  // Función para actualizar los campos de un departamento
  const handleDepartmentChange = (name,value,indice) => {
    const newDepartments = [...departments];
    newDepartments[indice] = { ...newDepartments[indice], [name]: value };
    setDepartments(newDepartments);
  };

  const agregarCampo = () => {
    setDepartments([...departments, { ...initialDepartment }]);
  };

  const eliminarCampo = (indice) => {
    setDepartments(departments.filter((_, i) => i !== indice));
  };


///////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
        if(formData != null){
          console.log("formadata  OK")
          console.log('Procesar el envío del formulario:', formData);
          const response = await OrganizationService.update(company.id,formData);
          setShowModal(true);
        }
      } catch (error) {
        console.log("Error")
        console.error(error);
      }
  };

  const createDepartments = async(id) => {
    for (const department of departments) {
      department.organization_id = id;
      await createDepartment(department);
    }
  }


 const createDepartment = async (department) => {
  if (Object.keys(department).length != 0) {
    try {
      const response = await DepartmentService.create(department);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('Faltan datos para crear el departamento',departments)
  }
 }

  return (
    
    <div className='generalContainer'>
      <TopNavBar text="Editar empresa"></TopNavBar>
      <form ref={formRef} onSubmit={handleSubmit}>
      <div className='form-container'> 
      <div className='formAddPhoto'>
           <form>
            <div  className='avatarStyle' >
                <input
                type="file"
                id="photoInput"
                name="photo"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                />
                <AddAvatar src={preview} onClick={handleAvatarClick} />
            </div>
            </form>
            <div className='addStyle'>
            <AddButton text="Agregar foto" press={handleAvatarClick}  id="photoInput" ></AddButton>
            </div>
        </div>

      <div >
        <div className='form-field'>
        <InputText placeholder={initialData.name} 
        name="name"
        value={formData.name} changeValue={handleChange}> </InputText>    
       </div>
        <div className='form-field'>          
        <InputText
        name="email"
        placeholder={initialData.email}  type="email" changeValue={handleChange} value={formData.email}> </InputText>    
        </div>   
        <div className='form-field'>
        <InputText placeholder={initialData.phone} 
        name="phone"
        type="phone"
        value={formData.phone} changeValue={handleChange}> </InputText>    
       </div>
        <div className='form-field'>
        <InputText placeholder="***********" 
         name="password1"
        type="password" changeValue={handleChange} value={formData.password1}> </InputText>    
         </div>
         <div className='form-field'>
        <InputText placeholder="Ingresar contraseña"  
         name="password2"
         type="password" changeValue={handleChange} value={formData.password2}> </InputText>    
         </div>
         <div className='form-field'>          
        <InputText
        name="employees"
        placeholder={initialData.employees}  type="number" changeValue={handleChange} value={formData.employees}> </InputText>    
        </div>  
        <div className='form-field'>          
        <InputText
        name="color1"
        placeholder={initialData.color1}  changeValue={handleChange} value={formData.color1}> </InputText>    
        </div>  
        <div className='form-field'>          
        <InputText
        name="color2"
        placeholder={initialData.color2}  changeValue={handleChange} value={formData.color2}> </InputText>    
        </div>  
        <div className='form-field'>          
        <InputText
        name="font_color"
        placeholder={initialData.font_color}  changeValue={handleChange} value={formData.font_color}> </InputText>    
        </div>  
         </div>
        </div>  

        <AddButton text="Agregar departamento" press={agregarCampo}></AddButton>
        {departments.map((department, indice) => (

        <div key={indice} className='departmentList'>

        <div className='form-field'>
        <InputText placeholder="Nombre del departamento" 
        name="name"
        type="text"
        value={department.name}
        index = {indice}
        changeValue={handleDepartmentChange}> </InputText>  
        <div className='form-field'>          
        <InputText
        name="employees"
        value={department.employees}
        index = {indice}
        placeholder="Cantidad de empleados" type="number" changeValue={handleDepartmentChange}>
        </InputText>    
        
       </div>  
       </div>
          <div onClick={() => eliminarCampo(indice)} className='trashIcon'>
          <img className={'iconMenuItem'} src={IconAssets.trash}/>
          </div>
        </div>
      ))}
      <div className='center'>
        <Button text="Guardar" type="sumit"></Button>  
       </div>
       <div className='margin-bottom'> </div>
    </form>
    <div>
    <Modal
        showModal={showModal}
        closeModal={closeModal}
        title="Correcto!"
        description="Se ha modificado la empresa correctamente."
      />
</div>
    </div>

);};

export default EditCompany;