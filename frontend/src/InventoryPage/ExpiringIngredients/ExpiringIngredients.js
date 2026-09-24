import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaCarrot } from 'react-icons/fa'
import ExpiringIngredient from './ExpiringIngredient'
import { api } from '../../services'
import { useToast } from '../../components/Toast'

function ExpiringIngredients({ inventory }) {
  const toast = useToast()
  // Filter and sort client-side: the original Firestore query needed a
  // composite index (where != null + orderBy) that was never created.
  const expiring = (inventory || [])
    .filter((i) => i.expiryDate)
    .sort((a, b) => a.expiryDate - b.expiryDate)

  const handleDelete = (item) => {
    api.removeFromInventory(item.id)
    toast(`Removed ${item.name}`, 'info')
  }

  return (
    <section className='card exp'>
      <div className='card-head'>
        <div className='title-icon'><FaCarrot /> Expiring</div>
      </div>
      <ul>
        <AnimatePresence initial={false}>
          {expiring.map((item) => <ExpiringIngredient key={item.id} item={item} handleDelete={handleDelete} />)}
        </AnimatePresence>
        {inventory && !expiring.length && (
          <li className='muted'>No expiry dates yet. Click an inventory item to add one.</li>
        )}
      </ul>
    </section>
  )
}

export default ExpiringIngredients
