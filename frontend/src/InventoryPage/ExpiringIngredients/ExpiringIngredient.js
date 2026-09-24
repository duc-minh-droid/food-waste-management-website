import React from 'react'
import { motion } from 'framer-motion'
import { daysLeft } from '../../services'
import { IngredientThumb } from '../../components/Thumb'
import { urgency } from '../Inventory/InventoryItem'

const HORIZON = 10 // days shown by a full bar

function label(d) {
  if (d < -1) return `Expired ${-d} days ago`
  if (d === -1) return 'Expired yesterday'
  if (d === 0) return 'Expires today'
  if (d === 1) return 'Expires tomorrow'
  return `${d} days left`
}

function ExpiringIngredient({ item, handleDelete }) {
  const d = daysLeft(item.expiryDate)
  const u = urgency(item.expiryDate)
  const pct = d < 0 ? 100 : Math.max(6, 100 - (d / HORIZON) * 100)

  return (
    <motion.li
      layout
      className={`exp-li u-${u}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
    >
      <IngredientThumb item={item} size={34} />
      <div className='exp-body'>
        <div className='exp-top'>
          <span className='exp-name'>{item.name}</span>
          <span className='exp-label'>{label(d)}</span>
        </div>
        <div className='exp-track'>
          <motion.div className='exp-fill' initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
        </div>
        {d < 0 && (
          <button className='link-danger' onClick={() => handleDelete(item)}>Already expired. Remove it?</button>
        )}
      </div>
    </motion.li>
  )
}

export default ExpiringIngredient
