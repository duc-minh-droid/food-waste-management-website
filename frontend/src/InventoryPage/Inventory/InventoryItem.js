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

  return (
    <div>
        <li onClick={handleClick}>{item.name}</li>
        <InventoryModal item={item} closeModal={closeModal} openModal={openModal}/>
    </div>
  )
}

export default InventoryItem