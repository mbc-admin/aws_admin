import React, { useState , useEffect,useRef} from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './addUser.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import CountryDropdown from '../../../components/countryDropdown/countryDropdown.component';
import GeneralDropdown from '../../../components/generalDropdown/generalDropdown.component';
import InputDateText from '../../../components/inputDateText/inputDateText';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import CompaniesDropdown from '../../../components/companiesDropdown/companiesDropdown';
import { OrganizationService, UserService } from '../../../services/mbc.service';
import DepartmentDropdown from '../../../components/departmentDropdown/departmentDropdown';
import Modal from '../../../components/modal/modalComponent';


const AddUser = () => {

  const initialState = 
    {
      name: '',
      lastname: '',
      email: '',
      password: '',
      image: null,
      birthday: '',
      gender: '',
      country_id: '',
      city: '', 
      organization_id: '',
      department_id: '',
      user_type: ''
  }
 const [formData, setFormData] = useState(initialState); 
 const [departments, setDepartments] = useState([]);
 const [showModal, setShowModal] = useState(false);
 const [file, setFile] = useState(null);

 const formRef = useRef();

const handleCompanyChange = (val) => {
  formData.organization_id = val.id;
  fetchDepartments(val.id)
}

const generes = [
    { id: 1, name: 'Hombre' },
    { id: 2, name: 'Mujer' },
    { id: 3, name: 'Otro' },
  ];

  const cities = [
    { id: 1, name: 'Barcelona' },
    { id: 2, name: 'Alicante' },
    { id: 3, name: 'Valencia' },
  ];

  const userTypes = [
    { id: 1, name: 'user' },
    { id: 2, name: 'admin' },
  ];


  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchDepartments = async (companyId) => {
    try {
        const company = await OrganizationService.getById(companyId)
        setDepartments(company.Departments)
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
  };  

  const handleFileChange = (e) => {
    const fileTarget = e.target.files[0];
    setFile(fileTarget)
   setFormData({ ...formData, image: fileTarget });
    console.log("handleFileChange")
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


  const handleAvatarClick = () => {
    document.getElementById('photoInput').click();
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.lastname) newErrors.lastname = 'El apellido es obligatorio';
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Procesar el envío del formulario:', formData);
      try {
        const response = await UserService.create(formData);
        formRef.current.reset();
        setFormData(initialState)
        setShowModal(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };



  return (
    <div className='generalContainer'>
      <TopNavBar text="Agregar usuario"></TopNavBar>
      <form  ref={formRef}  onSubmit={handleSubmit}>
      <div className='form-container'> 
      <div className='formAddPhoto'>
           <form onSubmit={handleSubmit}>
            <div  className='avatarStyle' >
                <input
                type="file"
                id="photoInput"
                name="image"
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
        <InputText placeholder="Apellido" 
        name="lastname"
        value={formData.lastname} changeValue={handleChange}> </InputText>    
        {errors.lastname && <p>{errors.lastname}</p>}
       </div>
        <div className='form-field'>          
        <InputText
        name="email"
        placeholder="Email"  type="email" changeValue={handleChange} value={formData.email}> </InputText>    
        {errors.email && <p>{errors.email}</p>}
        </div>    
        <div className='form-field'>
        <InputText placeholder="Ingresar contraseña" 
         name="password"
        type="password" changeValue={handleChange} value={formData.password}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
        <InputText placeholder="Ingresar contraseña"  
         name="password2"
         type="password" changeValue={handleChange} value={formData.password2}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
         <GeneralDropdown options={userTypes} initialText="Tipo de usuario" onChange={(val)=>{
          formData.user_type = val;
        }}></GeneralDropdown>
         </div>
         </div>
        </div>  

<div className='containerDropdowns'>
        <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
         <InputDateText placeholder="Fecha de nacimiento" 
         name="birthday" changeValue={handleChange} value={formData.birthday}> </InputDateText>    
         </div>
         <div className='form-field-dropdown'>
        <CountryDropdown  initialText="Pais" onChange={(val)=>{
          console.log("country change")
          formData.country_id = val;
        }}></CountryDropdown>
         </div>
         <div className='form-field-dropdown'>
         <CompaniesDropdown initialText="Empresa" onChange={handleCompanyChange}></CompaniesDropdown>
         </div>
         </div>

         <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
        <GeneralDropdown options={generes} initialText="Género" onChange={(val)=>{
          formData.gender = val;
        }}></GeneralDropdown>
         </div>
         <div className='form-field-dropdown'>
         <GeneralDropdown options={cities} initialText="Ciudad" onChange={(val)=>{
          formData.city = val;
        }}></GeneralDropdown>
         </div>
         <div className='form-field-dropdown'>
         <DepartmentDropdown options={departments} initialText="Departamento" onChange={(val)=>{
          formData.department_id = val.id;
        }}></DepartmentDropdown>
         </div>
         </div>
         </div>
         <div className='center'>
        <Button text="Guardar" type="submit" ></Button>  
        </div>
        
    </form>
<div>
    <Modal
        showModal={showModal}
        closeModal={closeModal}
        title="Correcto!"
        description="Se ha creado un usuario correctamente."
      />
</div>
    </div>
);};

export default AddUser;