import React, { useState } from 'react'

function InventoryItem({item}) {
    const [openModal, setOpenModal] = useState(false)
    const handleClick = () => {
        setOpenModal(true)
    }

  return (
    <li onClick={handleClick}>{item.name}</li>
  )
}

export default InventoryItem