import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaShoppingBasket } from 'react-icons/fa'
import InventoryItem from './InventoryItem'
import InventoryModal from './InventoryModal'

function Inventory({ inventory }) {
  const [openId, setOpenId] = useState(null)
  const selected = inventory?.find((i) => i.id === openId) || null

  return (
    <section className='card inventory-box'>
      <div className='card-head'>
        <div className='title-icon'><FaShoppingBasket /> Inventory</div>
        {inventory && <span className='count'>{inventory.length}</span>}
      </div>
      {!inventory ? (
        <div className='chip-skeletons'>{[70, 90, 60, 80, 100, 65].map((w, i) => <span key={i} className='skeleton chip-skeleton' style={{ width: w }} />)}</div>
      ) : !inventory.length ? (
        <p className='muted'>Nothing here yet. Use the search bar to add what is in your fridge.</p>
      ) : (
        <ul className='inven-ul'>
          <AnimatePresence initial={false}>
            {inventory.map((item) => <InventoryItem key={item.id} item={item} onOpen={() => setOpenId(item.id)} />)}
          </AnimatePresence>
        </ul>
      )}
      <InventoryModal item={selected} closeModal={() => setOpenId(null)} />
    </section>
  )
}

export default Inventory
