import React, { useState } from 'react'
import DropdownItem from './DropdownItem'

const dropdownStyle = {
    position: 'absolute',
    top: '30px', // Adjust as needed for positioning
    left: '0',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '8px 0',
    zIndex: '999',
  };
  
  const ulStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  };

function DropdownMenu({data, closeDropdown}) {

  return (
    <div style={dropdownStyle}>
        <ul style={ulStyle}>
            {data.map((item, index) => <DropdownItem key={index} item={item} closeDropdown={closeDropdown}/>)}
        </ul>
    </div>
  )
}

export default DropdownMenu