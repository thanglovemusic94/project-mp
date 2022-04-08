import React from "react";
import {Route} from "react-router-dom";
import routes from '../routes'

function TheContent({onSelected}) {

    return (
        <React.Suspense fallback={<></>}>
            {routes.map((item, index) => {

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
    );
}

export default TheContent;
