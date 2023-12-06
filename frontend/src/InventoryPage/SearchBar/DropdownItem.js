import React from 'react'

function DropdownItem({item, closeDropdown}) {
    const handleClick = () => {
        closeDropdown()
        // store in Inventory
    }

  return (
    <li onClick={handleClick}>
        {item.name}
    </li>
  )
}

export default DropdownItem