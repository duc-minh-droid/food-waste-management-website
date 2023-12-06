import React, { useState } from 'react'
import DropdownItem from './DropdownItem'

function DropdownMenu({data, closeDropdown}) {

  return (
    <div>
        <ul>
            {data.map((item, index) => <DropdownItem key={index} item={item} closeDropdown={closeDropdown}/>)}
        </ul>
    </div>
  )
}

export default DropdownMenu