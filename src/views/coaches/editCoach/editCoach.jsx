import React, { useState, useRef, useEffect } from 'react';
import AddAvatar from '../../../components/avatar/addAvatar';
import AddButton from '../../../components/addButton/addButton.component';
import './editCoach.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import TimeSheet from '../../../components/timeSheet/timeSheet';
import {OrganizationService, UserService, ImageService, CoachService} from '../../../services/mbc.service';
import DepartmentDropdown from '../../../components/departmentDropdown/departmentDropdown';
import CompaniesDropdown from '../../../components/companiesDropdown/companiesDropdown';
import SpecialtiesDropdown from '../../../components/specialtiesDropdown/specialtiesDropdown';
import Modal from '../../../components/modal/modalComponent';
import InputDateText from '../../../components/inputDateText/inputDateText';
import CountryDropdown from '../../../components/countryDropdown/countryDropdown.component';
import GeneralDropdown from '../../../components/generalDropdown/generalDropdown.component';
import { useLocation } from 'react-router-dom';
import { ImagesUrl } from '../../../utils/ImageAssets';
import {Eventcalendar} from "@mobiscroll/react";
import moment from 'moment';


const EditCoach = () => {
  const location = useLocation();
  const coach = location.state.coach;
  const [file, setFile] = useState(null);

  console.log('coach in editcoach', location.state.coach)

    let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const [name, setName] = useState(location.state.coach.name);
    const [lastname, setLastname] = useState(location.state.coach.lastname);
    const [email, setEmail] = useState(location.state.coach.email);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [image, setImage] = useState(location.state.coach.image);
    const [birthday, setBirthday] = useState(location.state.coach.birthday);
    const [gender, setGender] = useState(location.state.coach.gender);
    const [countryId, setCountryId] = useState(location.state.coach.country_id);
    const [city, setCity] = useState(location.state.coach.city);
    const [description, setDescription] = useState(location.state.coach.description);
    const [organizationId, setOrganizationId] = useState(location.state.coach.organization_id);
    const [departmentId, setDepartmentId] = useState(location.state.coach.department_id);
    const [myEvents, setMyEvents] = useState([]);
    const [userType, setUserType] = useState('coach');

    const [workingHours, setWorkingHours] = useState([]);

  const initialCoachState =
    {
      name: coach.name,
      lastname: coach.lastname,
      email: coach.email,
      password: coach.password,
      image: coach.image,
      birthday: coach.birthday,
      gender: coach.gender,
      country_id: coach.country_id,
      city: coach.city,
      description: coach.description != null ? coach.description : "",
      organization_id: coach.organization_id,
      department_id: coach.department_id,
      user_type: 'coach'
  }

  useEffect(() => {
    if(file == null){
    if(coach.image != null ){
      console.log(coach.image)
      setPreview(ImagesUrl.base_url_img + coach.image)
      }
    }
  });

    useEffect(() => {
        console.log('WHOIUYT', location.state.coach.WorkingHours)
        let events = [];
        location.state.coach.WorkingHours.map(event => {
            console.log('EVENT', event);
            events.push(event.recurring);
        })
        setMyEvents(events);
    }, [])

  const cities = [
    { id: 1, name: 'Barcelona' },
    { id: 2, name: 'Alicante' },
    { id: 3, name: 'Valencia' },
  ]

  const [initialData, setinitialData] = useState(initialCoachState);
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [specialtyChips, setSpecialtyChips] = useState([]);
  const [companyChips, setCompanyChips] = useState([]);

  const [departmentChips, setDepartmentChips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef(); // Crear referencia al formulario


  const closeModal = () => {
    setShowModal(false);
  };

  const handleCompanyChange = (val) => {
    setFormData({ ...formData, organization_id: val.id });
    const opcionEncontrada = companyChips.find((opcion) => opcion.id === val.id);
    if(opcionEncontrada == null){
      setCompanyChips([...companyChips, { ...val }]);
    }
    fetchDepartments(val.id)
   }

   const handleDepartmentChange = (val) => {
    setFormData({ ...formData, department_id: val.id });
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
        setDepartments(company.Departments)
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
  };

  const handleInputChange = (event) => {
    if (event.target.value.length <= 500) {
      setFormData({ ...formData, description: event.target.value });
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


  const handleSubmit = async (e) => {
      e.preventDefault();
      let dataUpdate;
      if (password !== '' && password2 !== '' && password === password2) {
          dataUpdate = {
              name: name,
              lastname: lastname,
              email: email,
              password: password,
              image: image,
              birthday: birthday,
              gender: gender,
              country_id: countryId,
              city: city,
              description: description,
              organization_id: organizationId,
              department_id: departmentId,
              user_type: userType
          }
      } else {
          dataUpdate = {
              name: name,
              lastname: lastname,
              email: email,
              image: image,
              birthday: birthday,
              gender: gender,
              country_id: countryId,
              city: city,
              description: description,
              organization_id: organizationId,
              department_id: departmentId,
              user_type: userType
          }
      }
      console.log('Procesar el envío del formulario:', dataUpdate);
      try {
        const response = await UserService.update(coach.id, dataUpdate);
        console.log('THIS IS RESPONSE EDIT', response)
        if (password !== '' && password2 !== '' && password === password2) {
            setPassword('');
            setPassword2('');
        }
        await uploadImage()
        setShowModal(true);
      } catch (error) {
        console.error(error);
        alert('Error al actualizar');
      }
  };


  const uploadImage = async () => {
    console.log("uploadImage")
    if(file != null){
    try {
      const imageData = new FormData();
      imageData.append('file',file);
      imageData.append('user_id',coach.id)
      console.log(imageData)
      console.log('Procesar el envío del formulario:', imageData);
      const response = await ImageService.upload(imageData);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }
  };

  const deleteWorkingHour = (id) => {
      const result = CoachService.deleteHours({id: id})
      console.log('hora eliminada con exito', result)
  }


  return (

    <div className='generalContainerEditCoach'>
      <TopNavBar text="Editar coach"></TopNavBar>
      <form ref={formRef} onSubmit={handleSubmit}>

      <div className='form-container'>

      <div className='formAddPhoto'>
           <form >
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
        <InputText placeholder={'Nombre'}
        name="name"
        oneData={true}
        value={name} changeValue={value => setName(value)}> </InputText>
        {errors.name && <p>{errors.name}</p>}
       </div>

       <div className='form-field'>
        <InputText placeholder={'Apellido'}
        name="lastname"
       oneData={true}
        value={lastname} changeValue={value => setLastname(value)}> </InputText>
        {errors.lastname && <p>{errors.lastname}</p>}
       </div>

        <div className='form-field'>
        <InputText
        name="email"
        oneData={true}
        placeholder={'Email'}
          type="email"
        value={email} changeValue={value => setEmail(value)}> </InputText>
        {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-field'>
        <InputText placeholder="Contraseña"
         name="password"
       oneData={true}
        type="password" changeValue={value => setPassword(value)} value={password}> </InputText>
        {errors.password && <p>{errors.password}</p>}
         </div>
         <div className='form-field'>
        <InputText  placeholder="Repetir contraseña"
         name="password2"
        oneData={true}
         type="password" changeValue={value => setPassword2(value)} value={password2}> </InputText>
        {errors.password && <p>{errors.password}</p>}
         </div>
         </div>
        </div>
    <div>
      <textarea className="descripcion-coach"
        id="description"
        name="description"
        maxLength={500}
        value={description}
        onChange={value => setDescription(value.target.value)}
        placeholder={'Descripción'}
        rows={5}
        cols={50}
      />
      <div>
        {/* <small>{formData.description.length}/500</small> */}
      </div>
    </div>


<div className='containerDropdowns'>
<div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
             {console.log('CUMPLEAÑOS', moment(formData.birthday).format('DD/mm/yyyy'))}
         <InputDateText placeholder="Fecha de nacimiento"
        oneData={true}
         name="birthday" changeValue={value => setBirthday(value)} value={moment(birthday).format('yyyy-MM-DD')}> </InputDateText>
         </div>
         <div className='form-field-dropdown'>
        <CountryDropdown  initialText={countryId} onChange={(val)=>{
          setCountryId(val)
        }}></CountryDropdown>
         </div>
         <div className='form-field-dropdown'>
         <GeneralDropdown options={cities} initialText={city} onChange={(val)=>{
          setCity(val)
        }}></GeneralDropdown>
         </div>
         </div>

         <div className='form-fields-dropdowns'>
         <div className='form-field-dropdown'>
        <SpecialtiesDropdown initialText="Especialidades" onChange={handleSpecialtyChange}></SpecialtiesDropdown>
         </div>
         <div className='form-field-dropdown'>
         <CompaniesDropdown initialText={initialData.organization_id} onChange={handleCompanyChange}></CompaniesDropdown>
         </div>
         <div className='form-field-dropdown'>
         <DepartmentDropdown options={departments} initialText={initialData.department_id} onChange={handleDepartmentChange}></DepartmentDropdown>
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

         <div className='flexEnd'>
         <p className='textTimeTitle'>Horarios de atención</p>
         <div className='timeButton' >
         {/*<Button text="Agregar horarios" ></Button>*/}
         </div>
        </div>
            <Eventcalendar
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
                onEventCreate={async e => {
                    console.log('THIS IS AN EVENT CREATED', e)
                    let dateStart = new Date(e.event.start);
                    let yearStart = dateStart.getFullYear();
                    let monthStart = ("0" + (dateStart.getMonth() + 1)).slice(-2);
                    let dayStart = ("0" + dateStart.getDate()).slice(-2);
                    let hoursStart = ("0" + dateStart.getHours()).slice(-2);
                    let minutesStart = ("0" + dateStart.getMinutes()).slice(-2);
                    let secondsStart = ("0" + dateStart.getSeconds()).slice(-2);
                    let dateStartFormated = `${yearStart}-${monthStart}-${dayStart}T${hoursStart}:${minutesStart}:${secondsStart}+02:00`;
                    console.log('DIA DE LA SEMANA', dateStartFormated)
                    let dateEnd = new Date(e.event.end);
                    let yearEnd = dateEnd.getFullYear();
                    let monthEnd = ("0" + (dateEnd.getMonth() + 1)).slice(-2);
                    let dayEnd = ("0" + dateEnd.getDate()).slice(-2);
                    let hoursEnd = ("0" + dateEnd.getHours()).slice(-2);
                    let minutesEnd = ("0" + dateEnd.getMinutes()).slice(-2);
                    let secondsEnd = ("0" + dateEnd.getSeconds()).slice(-2);
                    let dateEndFormated = `${yearEnd}-${monthEnd}-${dayEnd}T${hoursEnd}:${minutesEnd}:${secondsEnd}+02:00`;
                    let result = await CoachService.addHours(
                        {
                            user_id: location.state.coach.id,
                            start: dateStartFormated,
                            end: dateEndFormated,
                            weekday: days[dateStart.getDay()]
                        }
                    );

                    console.log('RESULT', result)
                }}
                onEventUpdated={e => {
                    console.log('THIS IS AN EVENT UPDATES', e);
                    deleteWorkingHour(e.event.id)
                }}
                onEventDeleted={e => {
                    console.log('THIS IS AN EVENT DELETED', e)
                    deleteWorkingHour(e.event.id)
                }}
                invalid={[]}
                data={myEvents}
                view={{
                    schedule: {
                        type: 'week',
                        startDay: 1,
                        endDay: 0,
                        startTime: '06:00',
                        endTime: '22:00',
                    }
                }}
            />
            <div className='center'>
                <Button text="Guardar" type="submit" ></Button>
            </div>
         </div>

         {/*<div className='form-field-table'>
          <TimeSheet></TimeSheet>
         </div>*/}

        <div className='margin-bottom'>

        </div>
    </form>
    <div>
    <Modal
        showModal={showModal}
        closeModal={closeModal}
        title="Correcto!"
        description="Se ha modificado el coach correctamente."
      />
</div>
    </div>
);};

export default EditCoach;
