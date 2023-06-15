import React, { useState } from 'react';
import './countryDropdown.css';

const countries = [
  { id: 1, name: 'España' },
  { id: 2, name: 'United States' },
  { id: 3, name: 'Canada' },
  { id: 4, name: 'Mexico' },
  // Agrega más países aquí si lo deseas
];


const CountryDropdown = ({ initialText, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialText);

  const handleOptionChange = (event) => {
    const countryId = parseInt(event.target.value);
    const country = countries.find((c) => c.id === countryId);
    setSelectedOption(event.target.valu);
    onChange(event.target.value)
  };

  return (
    <div >
      <select className='containerStyle' id="dropdown-select" onChange={handleOptionChange} value={selectedOption}>
        <option value="">{initialText}</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export default CountryDropdown;
