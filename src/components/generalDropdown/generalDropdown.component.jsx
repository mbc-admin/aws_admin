import React, { useState } from 'react';

const GeneralDropdown = ({ options, initialText, onChange, returnId }) => {
  const [selectedOption, setSelectedOption] = useState(initialText);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onChange(event.target.value)
  };

  return (
    <div >
      <select className='containerStyle' id="dropdown-select" onChange={handleOptionChange} value={selectedOption}>
        <option value="">{initialText}</option>
        {options.map((option) => (
          <option key={option.id} value={returnId ? option.id : option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GeneralDropdown;
