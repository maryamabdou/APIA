import React from 'react'

const TextBox = (props) => {

    const { type,value, onChange, placeholder } = props;
  
    return (
      <input
        className='textbox'
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

export default TextBox;