import React, {useContext} from 'react'
import routes from '../routes'
import { Redirect, Route } from 'react-router-dom'
import {AppContext} from "../contexts/AppContext";

const loading = (
    <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
    </div>
)

export default function TheBody() {
    const {isLogined} = useContext(AppContext)
    console.log(isLogined)
    return (
        <main className="lc-body">
            <div className="container">
                <React.Suspense fallback={loading}>
                    {routes.map((item, index) => {
                        // if (item.path === '/write-inquiry' && isLogined === false){
                        //         return (
                        //             <Redirect to='/login' />
                        //         )
                        // }

                        return (
                            <Route
                                key={index}
                                path={item.path}
                                exact={item.exact}
                                component={item.component}
                            />
                        )
                    })}
                </React.Suspense>
            </div>
        </main>
    )
}
