import React, { useState, useRef } from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './addCoach.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import TimeSheet from '../../../components/timeSheet/timeSheet';
import { OrganizationService, UserService, CoachService } from '../../../services/mbc.service';
import DepartmentDropdown from '../../../components/departmentDropdown/departmentDropdown';
import CompaniesDropdown from '../../../components/companiesDropdown/companiesDropdown';
import SpecialtiesDropdown from '../../../components/specialtiesDropdown/specialtiesDropdown';
import Modal from '../../../components/modal/modalComponent';
import InputDateText from '../../../components/inputDateText/inputDateText';
import CountryDropdown from '../../../components/countryDropdown/countryDropdown.component';
import GeneralDropdown from '../../../components/generalDropdown/generalDropdown.component';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {useNavigate} from 'react-router-dom';
import {message} from 'antd'
import mobiscroll, {Eventcalendar, getJson, toast, setOptions, localeEs, momentTimezone} from '@mobiscroll/react';


const AddCoach = () => {
    const navigate = useNavigate();

  const initialCoachState =
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
      description: '',
      organization_id: '',
      department_id: '',
      user_type: 'coach'
  }

  const cities = [
    { id: 1, name: 'Barcelona' },
    { id: 2, name: 'Alicante' },
    { id: 3, name: 'Valencia' },
  ]
  const [formData, setFormData] = useState(initialCoachState);
  const [descripcion, setDescripcion] = useState('');
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [specialtyChips, setSpecialtyChips] = useState([]);
  const [companyChips, setCompanyChips] = useState([]);
  const [departmentChips, setDepartmentChips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(); // Crear referencia al formulario
  const [file, setFile] = useState(null);


  const closeModal = () => {
    setShowModal(false);
  };


  const handleCompanyChange = (val) => {
    formData.organization_id = val.id;
    const opcionEncontrada = companyChips.find((opcion) => opcion.id === val.id);
    if(opcionEncontrada == null){
      setCompanyChips([...companyChips, { ...val }]);
    }
    fetchDepartments(val.id)
   }

   const handleDepartmentChange = (val) => {
    formData.department_id = val.id;
    const opcionEncontrada = departmentChips.find((opcion) => opcion.id === val.id);
    if(opcionEncontrada == null){
      setDepartmentChips([...departmentChips, { ...val }]);
    }
   }

  const handleSpecialtyChange = (val) => {
    const opcionEncontrada = specialtyChips.find((opcion) => opcion.id === val.id);
    if(opcionEncontrada == null){
     setSpecialtyChips([...specialtyChips, { ...val }]);
    }
    }

  const fetchDepartments = async (companyId) => {
    try {
        const company = await OrganizationService.getById(companyId)
        console.log('THIS IS A ORGANIZATION', company)
        setDepartments(company.Departments)
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 500) {
      setDescripcion(event.target.value);
       formData.description = event.target.value
    }
  };

  const handleChipDeleteSpecialty = (option) => {
    setSpecialtyChips(specialtyChips.filter((item) => item !== option));
  };

  const handleChipDeleteCompany = (option) => {
    setCompanyChips(companyChips.filter((item) => item !== option));
  };

  const handleChipDeleteDepartment = (option) => {
    setDepartmentChips(departmentChips.filter((item) => item !== option));
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
        navigate('/editCoach', {state: {coach: response.user}});
        console.log('USER CREATE', response.user);
        resetForm()
      } catch (error) {
          message.error(error.response.data.msg);
        console.error('error',error.response.data);
      }
    } else {
      setErrors(validationErrors);
    }
  };

 const resetForm = () => {
  formRef.current.reset();
  setFormData(initialCoachState)
  setSpecialtyChips([])
  setCompanyChips([])
  setDepartmentChips([])
  setDescripcion('')
 }

  return (

    <div className='generalAddCoachContainer'>
      <TopNavBar text="Agregar coach"></TopNavBar>
      <form ref={formRef} onSubmit={handleSubmit}>

      <div className='form-container'>

      <div className='formAddPhoto'>
           <form >
            <div className='avatarStyle' >
                <input
                type="file"
                id="photoInput"
                name="image"
                accept="image/*"
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
        type="password" changeValue={handleChange} value={formData.password1}> </InputText>
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
        <InputText placeholder="Ingresar contraseña"
         name="password2"
         type="password" changeValue={handleChange} value={formData.password2}> </InputText>
        {errors.password && <p>{errors.password}</p>}
         </div>
         </div>
        </div>
    <div>
      <textarea className="descripcion-coach"
        id="descripcion"
        name="descripcion"
        maxLength={500}
        value={descripcion}
        onChange={handleInputChange}
        placeholder="Escribe una descripción profesional.."
        rows={5}
        cols={50}
      />
      <div>
        <small>{descripcion.length}/500</small>
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
          formData.country_id = val;
        }}></CountryDropdown>
         </div>
         <div className='form-field-dropdown'>
         <GeneralDropdown options={cities} initialText="Ciudad" onChange={(val)=>{
          formData.city = val;
        }}></GeneralDropdown>
         </div>
         </div>

         <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
        <SpecialtiesDropdown initialText="Especialidades" onChange={handleSpecialtyChange}></SpecialtiesDropdown>
         </div>
         <div className='form-field-dropdown'>
         <CompaniesDropdown initialText="Empresa" onChange={handleCompanyChange}></CompaniesDropdown>
         </div>
         <div className='form-field-dropdown'>
         <DepartmentDropdown options={departments} initialText="Departamento" onChange={handleDepartmentChange}></DepartmentDropdown>
         </div>
         </div>

  <div className="chips-row-container">
         <div className="chips-container">
        {specialtyChips.map((option) => (
          <div key={option.id} className="chip">
            <span>{option.name}</span>
            <button onClick={() => handleChipDeleteSpecialty(option)}>&times;</button>
          </div>
        ))}
      </div>

      <div className="chips-container">
        {companyChips.map((option) => (
          <div key={option.id} className="chip">
            <span>{option.name}</span>
            <button onClick={() => handleChipDeleteCompany(option)}>&times;</button>
          </div>
        ))}
      </div>


      <div className="chips-container">
        {departmentChips.map((option) => (
          <div key={option.id} className="chip">
            <span>{option.name}</span>
            <button onClick={() => handleChipDeleteDepartment(option)}>&times;</button>
          </div>
        ))}
      </div>
      </div>

         {/*<div className='flexEnd'>
         <p className='textTimeTitle'>Horarios de atención</p>
         <div className='timeButton' >
         <Button text="Agregar horarios" pres={()=>{}}></Button>
         </div>
        </div>*/}

         </div>
          {/*<Eventcalendar
              className={'calendar'}
              themeVariant="light"
              newEventText={'Work'}
              event
              dragToCreate={true}
              clickToCreate={false}
              dragToMove={false}
              colorEventList={true}
              day
              colors={['#0F1841']}
              onEventCreate={e => {
                  console.log('THIS IS AN EVENT', e)
              }}
              invalid={[]}
              data={[]}
              view={{
                  schedule: {
                      type: 'week',
                      startDay: 1,
                      endDay: 0,
                      startTime: '06:00',
                      endTime: '22:00',
                  }
              }}
          />*/}
         {/*<div className='form-field-table'>
          <TimeSheet></TimeSheet>
         </div>*/}
         <div className='center'>
        <Button text="Guardar" type="submit" ></Button>
        </div>
        <div className='margin-bottom'>

        </div>
    </form>
    <div>
    <Modal
        showModal={showModal}
        closeModal={closeModal}
        title="Correcto!"
        description="Se ha creado un coach correctamente."
      />
</div>
    </div>
);};

export default AddCoach;
