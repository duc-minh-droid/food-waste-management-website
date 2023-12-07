import React, { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import Recipes from './Recipes/Recipes'
import Inventory from './Inventory/Inventory'
import ExpiringIngredients from './ExpiringIngredients/ExpiringIngredients'

function InventoryPage() {
    

  return (
    <div>
        <SearchBar/>
        <ExpiringIngredients />
        <Inventory />
        <Recipes />
    </div>
  )
}

export default InventoryPage