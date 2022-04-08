import { Suspense } from "react";
import { Route, Switch } from "react-router";
import routes from "../../routes";

function TheContent() {

    return (
        <Switch>
            <Suspense fallback={<></>}>
                {
                    routes.map((item, index) => {

                        return (
                            item.skip ??
                            <Route
                                key={index}
                                path={item.path}
                                exact={item.exact}
                                component={item.component}
                            />
                        )
                    })
                }
            </Suspense>
        </Switch>
    );
}

export default TheContent;