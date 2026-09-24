import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaDeleteLeft } from 'react-icons/fa6'
import { FaSave } from 'react-icons/fa'
import { api } from '../../services'
import { IngredientThumb } from '../../components/Thumb'
import { useToast } from '../../components/Toast'

function Check({ checked, onChange, label }) {
  return (
    <button className={`check ${checked ? 'is-on' : ''}`} onClick={onChange} role='checkbox' aria-checked={checked} aria-label={label}>
      <svg viewBox='0 0 24 24'>
        <motion.path
          d='M5 12.5l4.5 4.5L19 7.5'
          fill='none'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
          initial={false}
          animate={{ pathLength: checked ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </button>
  )
}

function ShoppingRow({ item, checked }) {
  const toast = useToast()
  const [updatedQuantity, setUpdatedQuantity] = useState(item.quantity)
  useEffect(() => setUpdatedQuantity(item.quantity), [item.quantity])
  const dirty = updatedQuantity !== item.quantity

  // Ticking an item puts it in the inventory (the "instantly update your
  // inventory" feature). Unticking is a no-op, as in the original.
  const handleCheckboxChange = async () => {
    if (checked) return
    await api.addToInventory({ id: item.foodID, name: item.name, image: item.image })
    toast(`${item.name} moved into your kitchen`)
  }

  const handleSave = () => {
    api.setShoppingQuantity(item.id, updatedQuantity)
    toast(`Saved ${item.name} x${updatedQuantity}`)
  }
  const handleDelete = () => {
    api.removeFromShopping(item.id)
    toast(`Removed ${item.name} from list`, 'info')
  }

  return (
    <motion.li
      layout
      className={`sb-row ${checked ? 'is-checked' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
    >
      <Check checked={checked} onChange={handleCheckboxChange} label={`Bought ${item.name}`} />
      <div className='sb-name'>
        <IngredientThumb item={item} size={30} />
        <span className='strike'>{item.name}</span>
      </div>
      <div className='stepper'>
        <button onClick={() => setUpdatedQuantity((q) => Math.max(0, q - 1))} aria-label='Decrease'>-</button>
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={updatedQuantity}
            className='stepper-val'
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {updatedQuantity}
          </motion.span>
        </AnimatePresence>
        <button onClick={() => setUpdatedQuantity((q) => q + 1)} aria-label='Increase'>+</button>
      </div>
      <div className='sb-actions'>
        {dirty && !checked && (
          <motion.button className='icon-btn save' onClick={handleSave} initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ scale: 0.9 }} aria-label='Save quantity'>
            <FaSave />
          </motion.button>
        )}
        <motion.button className='icon-btn del' onClick={handleDelete} whileTap={{ scale: 0.9 }} aria-label={`Remove ${item.name}`}>
          <FaDeleteLeft />
        </motion.button>
      </div>
    </motion.li>
  )
}

export default ShoppingRow
