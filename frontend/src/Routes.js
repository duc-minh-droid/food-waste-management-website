import {BrowserRouter as Router, Routes as ReactRoutes, Route} from 'react-router-dom'
import InventoryPage from './InventoryPage/InventoryPage'
import React from 'react'
import RecipePage from './InventoryPage/Recipes/RecipePage/RecipePage'
import LandingPage from './LandingPage/LandingPage'
import ShoppingPage from './ShoppingPage/ShoppingPage'
import NavBar from './NavBar/NavBar'

function Routes() {
    return (<Router>
        <NavBar />
        <ReactRoutes>
            <Route exact path='/food-waste-management-website/inventory' element={<InventoryPage/>}/>
            <Route path="/food-waste-management-website/" element={<LandingPage />}/>
            <Route path="/food-waste-management-website/shoppingList" element={<ShoppingPage />}/>
                
            <Route path='/food-waste-management-website/inventory/:recipeID' element={<RecipePage />}/>
            <Route>
                <React.Fragment>404 Not Found</React.Fragment>
            </Route>
        </ReactRoutes>
    </Router>)
}

export default Routes