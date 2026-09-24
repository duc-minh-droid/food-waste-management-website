import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar/SearchBar'
import ShoppingTable from './ShoppingTable/ShoppingTable'
import { useShopping } from '../services'

function ShoppingPage() {
  const shopping = useShopping()
  return (
    <div className='page-shell sp-page'>
      <motion.header className='page-head' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1>Shopping list</h1>
          <p className='page-sub'>Tick an item when it is in the basket and it moves into your inventory.</p>
        </div>
      </motion.header>
      <SearchBar />
      <ShoppingTable data={shopping} />
    </div>
  )
}

export default ShoppingPage
