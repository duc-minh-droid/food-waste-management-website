import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { motion } from 'framer-motion'
import Modal from '../../components/Modal'
import { IngredientThumb } from '../../components/Thumb'
import { useToast } from '../../components/Toast'
import { api } from '../../services'
import { DAILY_VALUES } from '../../services/demoData'

const QUICK = [['Tomorrow', 1], ['3 days', 3], ['1 week', 7], ['2 weeks', 14]]

function NutritionBars({ nutrients }) {
  return (
    <div className='nutri'>
      {nutrients.map((n, i) => {
        const pct = Math.min(100, (n.amount / (DAILY_VALUES[n.name] || 100)) * 100)
        return (
          <div className='nutri-row' key={n.name}>
            <span className='nutri-name'>{n.name}</span>
            <div className='nutri-track'>
              <motion.div
                className='nutri-fill'
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(pct, 1.5)}%` }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className='nutri-val'>{Math.round(n.amount * 10) / 10} {n.unit}</span>
          </div>
        )
      })}
    </div>
  )
}

function InventoryModal({ item, closeModal }) {
  const toast = useToast()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const foodID = item?.foodID

  // Fetch nutrition when the modal opens. The original re-added a document
  // listener on every render; the Modal component now owns outside-clicks.
  useEffect(() => {
    if (!foodID) return
    let cancelled = false
    setInfo(null)
    setError(null)
    api.getIngredientInfo(foodID)
      .then((d) => !cancelled && setInfo(d))
      .catch((e) => !cancelled && setError(e.message))
    return () => { cancelled = true }
  }, [foodID])

  const setDate = (date) => {
    api.setExpiryDate(item.id, date)
    toast(date ? `${item.name}: expiry set to ${date.toLocaleDateString()}` : `${item.name}: expiry cleared`)
  }
  const quick = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    setDate(d)
  }

  return (
    <Modal open={Boolean(item)} onClose={closeModal} label='Ingredient details'>
      {item && (
        <div className='imodal'>
          <div className='imodal-head'>
            <IngredientThumb item={item} size={56} />
            <div>
              <h2>{item.name}</h2>
              {info?.categoryPath?.length > 0 && (
                <div className='tags'>{info.categoryPath.map((c) => <span key={c} className='tag'>{c}</span>)}</div>
              )}
            </div>
          </div>

          <h4>Nutrition <span className='muted'>per {info?.per || '100 g'}, bar = % of daily value</span></h4>
          {error ? <p className='text-error'>Could not load nutrition: {error}</p>
            : !info ? <div className='nutri'>{[0, 1, 2, 3, 4].map((i) => <div key={i} className='skeleton nutri-skel' />)}</div>
            : <NutritionBars nutrients={info.nutrients} />}

          <h4>Expiry date</h4>
          <div className='quick-dates'>
            {QUICK.map(([label, d]) => <button key={label} className='chip-btn' onClick={() => quick(d)}>{label}</button>)}
          </div>
          <div className='date-row'>
            <DatePicker
              selected={item.expiryDate}
              onChange={setDate}
              placeholderText='Pick a date'
              dateFormat='d MMM yyyy'
              className='date-input'
              isClearable
            />
          </div>
        </div>
      )}
    </Modal>
  )
}

export default InventoryModal
