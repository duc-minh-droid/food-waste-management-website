import React from 'react'
import { Link } from 'react-router-dom'
import { BsBasket } from 'react-icons/bs'
import Register from './Register/Register'
import NavItem from './NavItem'
import { DEMO_MODE } from '../services'

function NavBar() {
  return (
    <nav className='navbar'>
      <Link to='/' className='brand'>
        <span className='brand-logo'><BsBasket /></span>
        <span>Waste<b>Less</b></span>
      </Link>
      <div className='nav-items'>
        <NavItem to='/'>Home</NavItem>
        <NavItem to='/inventory'>Inventory</NavItem>
        <NavItem to='/shoppingList'>Shopping List</NavItem>
      </div>
      <div className='nav-right'>
        {DEMO_MODE && (
          <span className='demo-pill' title='No backend: sample data is stored in this browser only'>
            <span className='demo-dot' /> Demo<span className='hide-sm'>&nbsp;mode</span>
          </span>
        )}
        <Register />
      </div>
    </nav>
  )
}

export default NavBar
