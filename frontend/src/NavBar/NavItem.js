import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function NavItem({ children, to }) {
  return (
    <NavLink to={to} end className='nav-item'>
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span
              className='nav-underline'
              layoutId='nav-underline'
              transition={{ type: 'spring', stiffness: 500, damping: 36 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavItem
