import React, { useState, useRef, useMemo } from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './addCompany.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import {IconAssets} from '../../../utils/ImageAssets';
import { OrganizationService,DepartmentService, mbcApi, mbcPost } from '../../../services/mbc.service';
import Modal from '../../../components/modal/modalComponent';
import { ColorPicker, Space, theme } from 'antd';
import AppColorPicker from '../../../components/colorPicker/appColorPicker';

const AddCompany = () => {

  const initialState = {
    name: '',
    phone: '',
    email: '',
    password1: '',
    password2: '',
    image: null,
    employees: '',
    color1: '',
    color2: '',
    font_color: '',
  }

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(); // Crear referencia al formulario
  const [file, setFile] = useState(null);
  const { token } = theme.useToken();
  const [color1, setColor1] = useState(token.colorPrimary);
  const [color2, setColor2] = useState(token.colorPrimary);
  const [colorFont, setColorFont] = useState(token.colorPrimary);
  const bgColor1 = useMemo(() => (typeof color1 === 'string' ? color1 : color1.toHexString()), [color1]);
  const bgColor2 = useMemo(() => (typeof color2 === 'string' ? color2 : color2.toHexString()), [color2]);
  const bgColorFont = useMemo(() => (typeof colorFont === 'string' ? colorFont : colorFont.toHexString()), [colorFont]);


  
  const handleFileChange = (e) => {
    const fileTarget = e.target.files[0];
    setFile(fileTarget)
   setFormData({ ...formData, image: fileTarget });
    if (fileTarget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result)
        setPreview(reader.result);
      };
       reader.readAsDataURL(fileTarget);
    } else {
      setPreview(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAvatarClick = () => {
    document.getElementById('photoInput').click();
  };

  const handleChange = (name, value) => {
    console.log("handleChange")
    console.log(name)
    console.log(value)
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password1) {
      newErrors.password1 = 'La contraseña es obligatoria';
    } else if (formData.password1.length < 8) {
      newErrors.password1 = 'La contraseña debe tener al menos 8 caracteres';
    }
    return newErrors;
  };


  ///////// Para manejar el agregado de departamentos  ///////

  const initialDepartment = {
    name: '',
    employees: '',
    organization_id: '',
  };

  const [departments, setDepartments] = useState([initialDepartment]);

  // Función para actualizar los campos de un departamento
  const handleDepartmentChange = (name,value,indice) => {
    const newDepartments = [...departments];
    newDepartments[indice] = { ...newDepartments[indice], [name]: value };
    setDepartments(newDepartments);
  };


  const agregaDepartamento = () => {
    setDepartments([...departments, { ...initialDepartment }]);
  };

  const eliminarDepartamento = (indice) => {
    setDepartments(departments.filter((_, i) => i !== indice));
  };


///////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    // if (Object.keys(validationErrors).length === 0) {
      try {
         const response = await OrganizationService.create(formData);
        await createDepartments(response.id)
        setShowModal(true)
        resetForm()
      } catch (error) {
        console.error(error);
      }
    // } else {
    //   console.log('hay algun error');
    //   setErrors(validationErrors);
    // }
  };


  const resetForm = () => {
    formRef.current.reset();
    setFormData(initialState)
    setDepartments([initialDepartment])
   }

  const createDepartments = async(id) => {
    for (const department of departments) {
      department.organization_id = id;
      await createDepartment(department);
    }
  }

  const styleColor1 = {
    width: token.sizeMD,
    height: token.sizeMD,
    borderRadius: token.borderRadiusSM,
    backgroundColor: bgColor1,
  };
  const styleColor2 = {
    width: token.sizeMD,
    height: token.sizeMD,
    borderRadius: token.borderRadiusSM,
    backgroundColor: bgColor2,
  };
  const styleColorFont = {
    width: token.sizeMD,
    height: token.sizeMD,
    borderRadius: token.borderRadiusSM,
    backgroundColor: bgColorFont,
  };

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
      <TopNavBar text="Agregar empresa"></TopNavBar>
      <form  ref={formRef} onSubmit={handleSubmit}>

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
        <InputText placeholder="Nombre" 
        name="name"
        value={formData.name} changeValue={handleChange}> </InputText>    
        {errors.name && <p>{errors.name}</p>}
       </div>
        <div className='form-field'>          
        <InputText
        name="email"
        placeholder="Email"  type="email" changeValue={handleChange} value={formData.email}> </InputText>    
        {errors.email && <p>{errors.email}</p>}
        </div>   
        <div className='form-field'>
        <InputText placeholder="Teléfono" 
        name="phone"
        type="phone"
        value={formData.phone} changeValue={handleChange}> </InputText>    
        {errors.phone && <p>{errors.phone}</p>}
       </div>
        <div className='form-field'>
        <InputText placeholder="Ingresar contraseña" 
         name="password1"
        type="password" changeValue={handleChange} value={formData.password1}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
        <InputText placeholder="Ingresar contraseña"  
         name="password2"
         type="password" changeValue={handleChange} value={formData.password2}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>          
        <InputText
        name="employees"
        placeholder="Cantidad empleados"  type="number" changeValue={handleChange} value={formData.employees}> </InputText>    
        {errors.employees && <p>{errors.employees}</p>}
        </div>  
        <div className='color-fields'>       
        <div style={{ marginRight: '5px' }}>Color primario: </div>   
        <AppColorPicker name="color1" changeValue={handleChange}></AppColorPicker>
        </div>  
        <div className='color-fields'>       
        <div style={{ marginRight: '5px' }}>Color secundario: </div>   
        <AppColorPicker name="color2" changeValue={handleChange}></AppColorPicker>
        </div>  
        <div className='color-fields'>       
        <div style={{ marginRight: '5px'}}>Color de fuente: </div>   
        <AppColorPicker name="font_color" changeValue={handleChange}></AppColorPicker>
        </div>  
         </div>
        </div>  

        <AddButton text="Agregar departamento" press={agregaDepartamento}></AddButton>
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
          <div onClick={() => eliminarDepartamento(indice)} className='trashIcon'>
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
        description="Se ha creado una empresa correctamente."
      />
</div>
    </div>

);};

export default AddCompany;