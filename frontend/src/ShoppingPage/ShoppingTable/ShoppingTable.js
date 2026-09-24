import React from 'react'
import { AnimatePresence } from 'framer-motion'
import ShoppingRow from './ShoppingRow'
import { useInventory } from '../../services'

function ShoppingTable({ data }) {
  const inventory = useInventory()
  const inKitchen = new Set((inventory || []).map((i) => String(i.foodID)))

  if (!data) {
    return <div className='card sb-table'>{[0, 1, 2].map((i) => <div key={i} className='skeleton row-skel' />)}</div>
  }

  const done = data.filter((i) => inKitchen.has(String(i.foodID))).length

  return (
    <div className='card sb-table'>
      <div className='sb-head'>
        <span>Product</span>
        <span>Quantity</span>
        <span className='sb-progress'>{done}/{data.length} in basket</span>
      </div>
      {!data.length && <p className='muted'>Your list is empty. Search above to add something.</p>}
      <ul>
        <AnimatePresence initial={false}>
          {data.map((item) => (
            <ShoppingRow key={item.id} item={item} checked={inKitchen.has(String(item.foodID))} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default ShoppingTable
