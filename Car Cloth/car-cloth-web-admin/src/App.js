import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TheLayout from './containers/TheLayout';
import Login from './views/login/Login';
import {Redirect} from "react-router";
import {useContext} from "react";
import {UserContext} from "./context/user-context/UserProvider";

function App() {
    const {state} = useContext(UserContext);
    return (
        <Router>
            <Switch>
                <Route exact path="/login" render={props => <Login {...props}/>}/>
                {
                    state.isLogin ?  // or LocalStorageManager.exitTokenUser() ?   (state after login re render component by dispatch)
                        <Route path="/" render={props => <TheLayout {...props}/>}/>
                        :
                        <Redirect to="/login"/>
                }
            </Switch>
        </Router>
    );
}

export default App;
