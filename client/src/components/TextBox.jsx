import React from 'react'

const TextBox = (props) => {

    const { value, onChange, placeholder } = props;
  
    return (
      <input
        className='textbox'
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

export default TextBox;