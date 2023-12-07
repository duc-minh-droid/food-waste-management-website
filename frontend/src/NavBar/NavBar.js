import React from 'react'
import Register from './Register/Register'
import { NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <nav>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/shoppingList">Shopping List</NavLink>
        <Register />
    </nav>
  )
}

export default NavBar