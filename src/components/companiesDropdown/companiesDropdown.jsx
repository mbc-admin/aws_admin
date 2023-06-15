import React, { useState, useEffect } from 'react';
import { CoachService, OrganizationService } from '../../services/mbc.service';

const CompaniesDropdown = ({initialText, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialText);
  const [companies, setCompanies] = useState([]);


  const handleOptionChange = (event) => {
    const idSeleccionado = parseInt(event.target.value, 10);
    const opcionEncontrada = companies.find((opcion) => opcion.id === idSeleccionado);
    setSelectedOption(opcionEncontrada.id);
    onChange(opcionEncontrada)
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await OrganizationService.getAll()
        setCompanies(data);
      } catch (error) {
        console.error('Error al obtener los coaches:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div >
      <select className='containerStyle' id="dropdown-select" onChange={handleOptionChange} value={selectedOption}>
        <option value="">{initialText}</option>
        {companies.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompaniesDropdown;
