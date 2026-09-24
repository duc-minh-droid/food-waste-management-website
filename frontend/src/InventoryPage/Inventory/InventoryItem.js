import React from 'react'
import { motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { api, daysLeft } from '../../services'
import { IngredientThumb } from '../../components/Thumb'
import { useToast } from '../../components/Toast'

export function urgency(date) {
  const d = daysLeft(date)
  if (d === null) return 'none'
  if (d < 0) return 'expired'
  if (d <= 2) return 'soon'
  return 'fresh'
}

function InventoryItem({ item, onOpen }) {
  const toast = useToast()
  const handleDelete = (e) => {
    e.stopPropagation()
    api.removeFromInventory(item.id)
    toast(`Removed ${item.name}`, 'info')
  }
  return (
    <motion.li
      layout
      className={`inven-item u-${urgency(item.expiryDate)}`}
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      title='Click for nutrition and expiry date'
    >
      <IngredientThumb item={item} size={24} />
      <span>{item.name}</span>
      <span className='u-dot' />
      <button className='inven-btn' onClick={handleDelete} aria-label={`Remove ${item.name}`}><IoMdClose /></button>
    </motion.li>
  )
}

export default InventoryItem
