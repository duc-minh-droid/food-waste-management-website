import React from 'react'

const itemStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderBottom: '1px solid #eee',
  };
  
function DropdownItem({item, closeDropdown}) {
    const handleClick = () => {
        closeDropdown()
        // store in Inventory
    }

    const handleHover = (e) => {
        e.target.style.backgroundColor = '#f0f0f0';
      };
    
      const handleLeave = (e) => {
        e.target.style.backgroundColor = 'transparent';
      };

  return (
    <li
      style={itemStyle}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {item.name}
    </li>
  )
}

export default DropdownItem