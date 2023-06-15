import React, { useState, useEffect } from 'react';
import { SpecialtiesService } from '../../services/mbc.service';

const SpecialtiesDropdown = ({initialText, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialText);
  const [specialities, setSpecialties] = useState([]);

  const handleOptionChange = (event) => {
    const idSeleccionado = parseInt(event.target.value, 10);
    const opcionEncontrada = specialities.find((opcion) => opcion.id === idSeleccionado);
    setSelectedOption(opcionEncontrada.id);
    onChange(opcionEncontrada)
  };

    useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await SpecialtiesService.getAll()
        setSpecialties(data);
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
    };
    fetchSpecialties();
  }, []);

  return (
    <div >
      <select className='containerStyle' id="dropdown-select" onChange={handleOptionChange} value={selectedOption}>
        <option value="">{initialText}</option>
        {specialities.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpecialtiesDropdown;
