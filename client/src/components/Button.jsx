import React from 'react';
import './Button.css';

function Button({ label, onClick }) {
  const handleClick = () => {
    // You can also perform other actions or state updates here
    onClick(); // Invoke the provided onClick function
  };

  return (
    <button className="button" onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;