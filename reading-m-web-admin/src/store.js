import { createBrowserHistory } from "history";
import { createStore } from 'redux';
import rootReducer from "./reducers/root.reducer";

export const history = createBrowserHistory();

const initialState = {
    sidebarShow: 'responsive',
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

const store = createStore(
    rootReducer(history),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
