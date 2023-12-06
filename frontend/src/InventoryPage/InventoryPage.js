import React, { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Recipes from './Recipes/Recipes'
import Inventory from './Inventory/Inventory'

function InventoryPage() {
    

  return (
    <div>
        <SearchBar/>
        <Inventory />
        <Recipes />
    </div>
  )
}

export default InventoryPage