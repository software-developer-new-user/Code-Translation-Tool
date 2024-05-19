import React, { useState } from 'react';

function Dropdown({selectedOption, setSelectedOption, title}) {
  //const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">{title}: </label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="C">C</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="Go">Go</option>
      </select>
      
    </div>
  );
};

export default Dropdown;
