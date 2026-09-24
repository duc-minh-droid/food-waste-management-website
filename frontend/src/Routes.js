import React from 'react'
import { BrowserRouter as Router, Routes as ReactRoutes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import InventoryPage from './InventoryPage/InventoryPage'
import RecipePage from './InventoryPage/Recipes/RecipePage/RecipePage'
import LandingPage from './LandingPage/LandingPage'
import ShoppingPage from './ShoppingPage/ShoppingPage'
import NavBar from './NavBar/NavBar'

function NotFound() {
    return (
        <div className='page-shell notfound'>
            <div className='notfound-emoji'>🥡</div>
            <h1>404: nothing in this cupboard</h1>
            <Link className='btn btn-primary' to='/'>Back home</Link>
        </div>
    )
}

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode='wait'>
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onAnimationStart={() => window.scrollTo(0, 0)}
            >
                <ReactRoutes location={location}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/inventory' element={<InventoryPage />} />
                    <Route path='/inventory/:recipeID' element={<RecipePage />} />
                    <Route path='/shoppingList' element={<ShoppingPage />} />
                    <Route path='*' element={<NotFound />} />
                </ReactRoutes>
            </motion.main>
        </AnimatePresence>
    )
}

function Routes() {
    return (
        <Router>
            <NavBar />
            <AnimatedRoutes />
        </Router>
    )
}

export default Routes
