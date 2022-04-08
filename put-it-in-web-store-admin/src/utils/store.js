import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/rootReducer";
import {createBrowserHistory} from "history";
import {routerMiddleware} from 'connected-react-router'
import {createLogger} from "redux-logger";
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                loggerMiddleware,
                thunkMiddleware,
            )
        )
    )
}
