import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/home" render={() => <Home />} />
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="*" render={() => <Redirect to="/home" />} />
            </Switch>
        </Router>
    )
}
