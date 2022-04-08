import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import TheLayout from './layouts/TheLayout'
import configureStore, { history } from './utils/store'
import './assets/scss/style.scss'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import RoadSearchPopup from 'components/common/RoadSearchPopup'

const store = configureStore()

export default function App() {
    return (
        <>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Router>
                        <Switch>
                            <Route
                                path="/roadApi"
                                component={RoadSearchPopup}
                                exact
                            />
                            <Route path="/" component={TheLayout} />
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </Provider>
        </>
    )
}
