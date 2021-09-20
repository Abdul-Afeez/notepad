import React from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {Login} from "../../pages/authentication/Login";
import {Dashboard} from "../../pages/Dashboard";
export function AppRoot() {
        return <Router>
                <Switch>
                    <Route exact path={'/login'}>
                        <Login />
                    </Route>
                    <Route exact path={'/dashboard'}>
                        <Dashboard />
                    </Route>
                    <Route path={'/'}>
                        <Login />
                    </Route>
                </Switch>
            </Router>;
}
