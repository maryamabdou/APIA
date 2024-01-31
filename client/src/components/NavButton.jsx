import React from "react";
import './NavButton.css';

function NavButton({ label, onClick }) {
    const handleClick = () => {
        console.log('Button clicked!'); // Add this line to print a message
        // You can also perform other actions or state updates here
        onClick(); // Invoke the provided onClick function
      };

  return (
    <button className="navButton" onClick={handleClick}>
      {label}
    </button>
  );
}

export default NavButton;