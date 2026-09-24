import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoArrowBack, IoTimeOutline, IoPeopleOutline } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
import { api, useInventory } from '../../../services'
import { RecipeThumb, IngredientThumb } from '../../../components/Thumb'
import { useToast } from '../../../components/Toast'

// Spoonacular summaries contain broken anchors and "spoonacular score"
// sentences; the original page cleaned them the same way.
function filterHTMLstring(string) {
  if (!string) return ''
  const fixed = string.replace(/<\s*href=/g, '<a href=')
  return fixed.split('. ').filter((s) => !s.toLowerCase().includes('score')).join('. ')
}

function RecipePage() {
  const { recipeID: id } = useParams()
  const toast = useToast()
  const inventory = useInventory()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    api.getRecipe(id)
      .then((r) => { if (!cancelled) r ? setRecipe(r) : setError('Recipe not found') })
      .catch((e) => !cancelled && setError(e.message))
    return () => { cancelled = true }
  }, [id])

  if (error) return <div className='page-shell empty-state'><h2>{error}</h2><Link to='/inventory' className='btn btn-ghost'>Back to kitchen</Link></div>
  if (!recipe) return <div className='page-shell'><div className='skeleton recipe-hero-skel' /></div>

  const have = new Set((inventory || []).map((i) => i.name))
  const ingredients = recipe.extendedIngredients || []
  const isHave = (g) => have.has(g.name) || [...have].some((h) => g.name?.includes(h))
  const missing = ingredients.filter((g) => !isHave(g))

  const addMissing = async () => {
    let n = 0
    for (const g of missing) {
      if (await api.addToShopping({ id: g.id, name: g.name, image: g.image })) n++
    }
    toast(n ? `Added ${n} missing item${n > 1 ? 's' : ''} to your shopping list` : 'Already on your shopping list', n ? 'ok' : 'info')
  }

  return (
    <div className='page-shell recipe-page'>
      <Link to='/inventory' className='back'><IoArrowBack /> Back to kitchen</Link>
      <div className='recipe-hero'>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <RecipeThumb recipe={recipe} className='recipe-hero-img' />
        </motion.div>
        <motion.div className='recipe-hero-text' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
          <h1>{recipe.title}</h1>
          <div className='recipe-meta'>
            {recipe.readyInMinutes && <span><IoTimeOutline /> {recipe.readyInMinutes} min</span>}
            {recipe.servings && <span><IoPeopleOutline /> serves {recipe.servings}</span>}
            <span className='text-ok'><FaCheck /> {ingredients.length - missing.length}/{ingredients.length} in your kitchen</span>
          </div>
          <p className='recipe-summary' dangerouslySetInnerHTML={{ __html: filterHTMLstring(recipe.summary) }} />
          {missing.length > 0 && (
            <motion.button className='btn btn-primary' whileTap={{ scale: 0.96 }} onClick={addMissing}>
              Add {missing.length} missing to shopping list
            </motion.button>
          )}
        </motion.div>
      </div>

      <div className='recipe-cols'>
        <section className='card'>
          <h3>Ingredients</h3>
          <ul className='ing-list'>
            {ingredients.map((g, i) => {
              const ok = isHave(g)
              return (
                <motion.li key={i} className={ok ? 'is-have' : 'is-miss'} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.04 }}>
                  <IngredientThumb item={g} size={28} />
                  <span>{g.original}</span>
                  <span className={`badge ${ok ? 'badge-ok' : 'badge-miss'}`}>{ok ? 'have' : 'need'}</span>
                </motion.li>
              )
            })}
          </ul>
        </section>
        <section className='card'>
          <h3>Method</h3>
          {recipe.steps?.length ? (
            <ol className='steps-list'>
              {recipe.steps.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>{s}</motion.li>
              ))}
            </ol>
          ) : null}
          {recipe.sourceUrl && <p>Full instructions <a href={recipe.sourceUrl} target='_blank' rel='noreferrer'>here</a>.</p>}
        </section>
      </div>
    </div>
  )
}

export default RecipePage
