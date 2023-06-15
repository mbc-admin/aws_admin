import React, { useState , useEffect,useRef} from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './editUser.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import CountryDropdown from '../../../components/countryDropdown/countryDropdown.component';
import GeneralDropdown from '../../../components/generalDropdown/generalDropdown.component';
import InputDateText from '../../../components/inputDateText/inputDateText';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import CompaniesDropdown from '../../../components/companiesDropdown/companiesDropdown';
import { OrganizationService, UserService, ImageService } from '../../../services/mbc.service';
import DepartmentDropdown from '../../../components/departmentDropdown/departmentDropdown';
import Modal from '../../../components/modal/modalComponent';
import { useLocation } from 'react-router-dom';
import { ImagesUrl } from '../../../utils/ImageAssets';


const EditUser = () => {
  const location = useLocation();
  const user = location.state.user;

  const initialState = 
    {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      image: user.image,
      birthday: user.birthday,
      gender: user.gender,
      country_id: user.country_id,
      city: user.city, 
      organization_id: user.organization_id,
      department_id: user.department_id,
      user_type: user.user_type
  }
  const [file, setFile] = useState(null);
  const [initialData, setinitialData] = useState(initialState);
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [company, setCompany] = useState({});
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  


  useEffect(() => {
    if(file == null){
      if(user.image != null){
      setPreview(ImagesUrl.base_url_img + user.image)
    }
  }
  fetchDepartments(initialState.organization_id)
}, []);



const handleCompanyChange = (val) => {
  setFormData({ ...formData, organization_id: val.id });
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



  const closeModal = () => {
    setShowModal(false);
  };

  const fetchDepartments = async (companyId) => {
    console.log("fetchDepartments")
    try {
        const companyResp = await OrganizationService.getById(companyId)
        console.log(companyResp)
        setCompany(companyResp)
        setDepartments(companyResp.Departments)
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
  };  

  const handleFileChange = (e) => {
    const fileTarget = e.target.files[0];
     setFile(fileTarget)
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

  const handleAvatarClick = () => {
    document.getElementById('photoInput').click();
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log('Procesar el envío del formulario:', formData);
    try {
      if(formData != null){
       const response = await UserService.update(user.id,formData);
      }
      await uploadImage()
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert('Error al actualizar');
    }
};

  const uploadImage = async () => {
    if(file != null){
    try {
      const imageData = new FormData();
      imageData.append('file',file);
      imageData.append('user_id',user.id)
      console.log(imageData)
      const response = await ImageService.upload(imageData);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }
  };

  return (
    <div className='generalContainer'>
      <TopNavBar text="Editar usuario"></TopNavBar>
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
            <AddButton text="Agregar foto"></AddButton>
            </div>
        </div>

      <div >
        <div className='form-field'>
        <InputText placeholder={initialState.name} 
        name="name"
        value={formData.name} changeValue={handleChange}> </InputText>    
        {errors.name && <p>{errors.name}</p>}
       </div>

       <div className='form-field'>
        <InputText placeholder={initialState.lastname} 
        name="lastname"
        value={formData.lastname} changeValue={handleChange}> </InputText>    
        {errors.lastname && <p>{errors.lastname}</p>}
       </div>
        <div className='form-field'>          
        <InputText
        name="email"
        placeholder={initialState.email}  type="email" changeValue={handleChange} value={formData.email}> </InputText>    
        {errors.email && <p>{errors.email}</p>}
        </div>    
        <div className='form-field'>
        <InputText placeholder="*********" 
         name="password"
        type="password" changeValue={handleChange} value={formData.password}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
        <InputText placeholder="*********"  
         name="password2"
         type="password" changeValue={handleChange} value={formData.password2}> </InputText>    
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
         <GeneralDropdown options={userTypes} initialText={initialState.user_type} onChange={(val)=>{
          formData.user_type = val;
        }}></GeneralDropdown>
         </div>
         </div>
        </div>  

<div className='containerDropdowns'>
        <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
         <InputDateText placeholder={initialState.birthday} 
         name="birthday" changeValue={handleChange} value={formData.birthday}> </InputDateText>    
         </div>
         <div className='form-field-dropdown'>
        <CountryDropdown  initialText={initialState.country_id} onChange={(val)=>{
          console.log("country change")
          formData.country_id = val;
        }}></CountryDropdown>
         </div>
         <div className='form-field-dropdown'>
         <CompaniesDropdown initialText={company.name} onChange={handleCompanyChange}></CompaniesDropdown>
         </div>
         </div>

         <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
        <GeneralDropdown options={generes} initialText={initialState.gender} onChange={(val)=>{
          formData.gender = val;
        }}></GeneralDropdown>
         </div>
         <div className='form-field-dropdown'>
         <GeneralDropdown options={cities} initialText={initialState.city} onChange={(val)=>{
          formData.city = val;
        }}></GeneralDropdown>
         </div>
         <div className='form-field-dropdown'>
         <DepartmentDropdown options={departments != null ? departments : []} initialText={initialState.department_id =! null ?initialState.department_id : "" } onChange={(val)=>{
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
        description="Se ha modificado el usuario correctamente."
      />
</div>
    </div>
);};

export default EditUser;