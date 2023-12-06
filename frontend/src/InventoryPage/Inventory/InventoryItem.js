import React, { useEffect, useRef, useState } from 'react'

import InventoryModal from './InventoryModal';

function InventoryItem({item}) {
    const [openModal, setOpenModal] = useState(false)
    const handleClick = () => {
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false);
    };
    
    const liStyle = {
        listStyle: 'none', // Remove default list styling
        cursor: 'pointer', // Show cursor as pointer on hover
        padding: '8px', // Add padding for better spacing
        border: '1px solid #ccc', // Border for the <li>
        borderRadius: '4px', // Rounded corners for the border
        display: 'inline-block', // Set display to inline-block
        width: 'fit-content',
      };

  return (
    <div>
        <li style={liStyle} onClick={handleClick} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = 'inherit'}
        >{item.name}</li>
        <InventoryModal item={item} closeModal={closeModal} openModal={openModal}/>
    </div>
  )
}

export default InventoryItem