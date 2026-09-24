import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar/SearchBar'
import Recipes from './Recipes/Recipes'
import Inventory from './Inventory/Inventory'
import ExpiringIngredients from './ExpiringIngredients/ExpiringIngredients'
import { api, daysLeft, useInventory, useUser } from '../services'

function Summary({ inventory }) {
  const soon = inventory.filter((i) => { const d = daysLeft(i.expiryDate); return d !== null && d <= 3 }).length
  return (
    <p className='page-sub'>
      <b>{inventory.length}</b> items in your kitchen
      {soon > 0 && <> · <span className='text-warn'><b>{soon}</b> need using in the next 3 days</span></>}
    </p>
  )
}

function SignedOut() {
  return (
    <div className='page-shell empty-state'>
      <div className='empty-emoji'>🔒</div>
      <h2>Log in to see your kitchen</h2>
      <p>Your inventory is stored per Google account.</p>
      <button className='btn btn-primary' onClick={() => api.signIn()}>Log in with Google</button>
    </div>
  )
}

function InventoryPage() {
  const user = useUser()
  const inventory = useInventory()

  if (user === null) return <SignedOut />

  return (
    <div className='page-shell'>
      <motion.header className='page-head' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1>My kitchen</h1>
          {inventory && <Summary inventory={inventory} />}
        </div>
      </motion.header>
      <div className='inventory-page'>
        <div className='ip-left'>
          <Inventory inventory={inventory} />
          <ExpiringIngredients inventory={inventory} />
        </div>
        <div className='ip-right'>
          <SearchBar />
          <Recipes inventory={inventory} />
        </div>
      </div>
    </div>
  )
}

export default InventoryPage
