import React from "react";
import {Provider} from "react-redux";
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import './App.css';
import './custom.css';
import NavigationBar from './component/common/NavigationBar';

import configureStore, {history} from "./utils/store";
import {routes} from "./routes";

const store = configureStore()

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Header/>
                <div id="layoutSidenav">
                    <NavigationBar/>
                    <div id="layoutSidenav_content">
                        <Switch>
                            {routes.map((route, index) => {
                                return (
                                    <Route key={index} path={route.path} exact={route.exact}
                                           component={route.component}/>
                                );
                            })}
                        </Switch>
                        <br/><br/>
                        <Footer/>
                    </div>
                </div>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;
