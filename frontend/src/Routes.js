import {BrowserRouter as Router, Routes as ReactRoutes, Route} from 'react-router-dom'
import InventoryPage from './InventoryPage/InventoryPage'
import React from 'react'

function Routes() {
    return (<Router>
        <ReactRoutes>
            <Route exact path='/inventory' element={<InventoryPage/>}/>
            {/* <Route path="/">
            </Route> */}
            <Route>
                <React.Fragment>404 Not Found</React.Fragment>
            </Route>
        </ReactRoutes>
    </Router>)
}

export default Routes