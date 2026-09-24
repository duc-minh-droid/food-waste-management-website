import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PiBowlFoodFill } from 'react-icons/pi'
import Recipe from './Recipe'
import { api } from '../../services'

function Recipes({ inventory }) {
  const [recipes, setRecipes] = useState(null)
  const [error, setError] = useState(null)
  // Only refetch when the set of ingredient names changes, not on every
  // expiry-date edit (each Spoonacular call costs API quota).
  const names = inventory ? inventory.map((i) => i.name).sort().join('|') : null

  useEffect(() => {
    if (names === null) return
    let cancelled = false
    setError(null)
    setRecipes(null)
    api.findRecipes(inventory)
      .then((r) => !cancelled && setRecipes(r))
      .catch((e) => { if (!cancelled) { setError(e.message); setRecipes([]) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names])

  return (
    <section className='rcp'>
      <div className='card-head'>
        <div className='title-icon'><PiBowlFoodFill /> Recipes you can make</div>
        {recipes && recipes.length > 0 && <span className='muted small'>ranked by ingredients you already have</span>}
      </div>
      {error && <p className='text-error'>Could not load recipes: {error}</p>}
      <ul>
        {!recipes ? (
          [0, 1, 2].map((i) => <li key={i} className='skeleton recipe-skel' />)
        ) : !recipes.length ? (
          <li className='card muted'>No recipes yet. Add a few ingredients to get suggestions.</li>
        ) : (
          <AnimatePresence>
            {recipes.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                exit={{ opacity: 0 }}
              >
                <Recipe item={item} />
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </ul>
    </section>
  )
}

export default Recipes
