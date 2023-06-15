import React, { useState, useRef } from 'react';
import './addSpecialty.css';
import InputText from '../../../components/inputText/inputText.component';
import Button from '../../../components/button/button.component';
import TopNavBar from '../../../components/topNavBar/topNavBar.component';
import { SpecialtiesService } from '../../../services/mbc.service';
import Modal from '../../../components/modal/modalComponent';


const AddSpecialty = () => {

  const initialSpecialtyState = {
    name: '',
    description: '',
  }
  const [formData, setFormData] = useState(initialSpecialtyState);
  const formRef = useRef(); // Crear referencia al formulario
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.value.length <= 500) {
      setFormData({ ...formData, description: event.target.value });
      formData.description = event.target.value
    }
  };

  const handleChange = (name, value) => {
    console.log("handleChange")
    console.log(name)
    console.log(value)
    setFormData({ ...formData, [name]: value });
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.description) newErrors.description = 'La descripcíon obligatoria';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Procesar el envío del formulario:', formData);
      try {
        const response = await SpecialtiesService.create(formData);
        setShowModal(true);
        resetForm()
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    formRef.current.reset();
    setFormData(initialSpecialtyState)
   }

  return (
    <div className='generalContainer'>
      <TopNavBar text="Agregar especialidad"></TopNavBar>
      <form ref={formRef} onSubmit={handleSubmit}>

      <div className='form-containerSpecialty'> 
      <div >
        <div className='form-field'>
        <InputText placeholder="Nombre" 
        name="name"
        value={formData.name} changeValue={handleChange}> </InputText>    
       </div>

       <div>
      <textarea className="descripcion-coach"
        id="description"
        name="description"
        maxLength={500}
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Escribe una descripción profesional.."
        rows={5}
        cols={50}
      />
      <div>
        <small>{formData.description.length}/500</small>
      </div>
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
        description="Se ha creado la especialidad correctamente."
      />
</div>
    </div>
);};

export default AddSpecialty;