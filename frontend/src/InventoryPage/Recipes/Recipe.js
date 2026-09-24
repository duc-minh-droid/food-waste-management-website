import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RecipeThumb } from '../../components/Thumb'

const mapIngredientsToString = (arr) => {
  const names = arr.map((i) => i.name)
  if (names.length <= 1) return names.join('')
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1]
}

function Recipe({ item }) {
  const used = item.usedIngredients.length
  const total = used + item.missedIngredients.length
  const pct = total ? Math.round((used / total) * 100) : 0

  return (
    <Link to={`/inventory/${item.id}`} className='recipe-link'>
      <motion.div className='recipe-card' whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}>
        <RecipeThumb recipe={item} className='recipe-card-img' />
        <div className='recipe-text'>
          <div className='recipe-title'>{item.title}</div>
          <div className='match'>
            <div className='match-track'>
              <motion.div className='match-fill' initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }} />
            </div>
            <span className='match-label'>{used}/{total} in your kitchen</span>
          </div>
          {used > 0 && <div className='recipe-have'>You have {mapIngredientsToString(item.usedIngredients)}</div>}
          {item.missedIngredients.length > 0 && <div className='recipe-miss'>Missing {mapIngredientsToString(item.missedIngredients)}</div>}
        </div>
      </motion.div>
    </Link>
  )
}

export default Recipe
