import React, { useState } from 'react';

const DepartmentDropdown = ({ options, initialText, onChange, disabled }) => {
  const [selectedOption, setSelectedOption] = useState(initialText);

  const handleOptionChange = (event) => {
    const idSeleccionado = parseInt(event.target.value, 10);
    const opcionEncontrada = options.find((opcion) => opcion.id === idSeleccionado);
    setSelectedOption(opcionEncontrada.id);
    onChange(opcionEncontrada)
  };

  return (
    <div >
      <select className='containerStyle' id="dropdown-select" onChange={handleOptionChange} value={selectedOption} disabled={disabled}>
        <option value="">{initialText}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentDropdown;
