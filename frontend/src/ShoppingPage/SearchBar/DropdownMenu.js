import React, { useState, useRef, useEffect } from 'react'
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

  function DropdownMenu({ data, closeDropdown }) {
    const dropdownRef = useRef(null);
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownRef, closeDropdown]);
  
    return (
      <div style={dropdownStyle} ref={dropdownRef}>
        <ul style={ulStyle}>
          {data.map((item, index) => (
            <DropdownItem key={index} item={item} closeDropdown={closeDropdown} />
          ))}
        </ul>
      </div>
    );
  }

export default DropdownMenu