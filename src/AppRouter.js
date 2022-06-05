import Dashboard from 'layouts/dashboard'
import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route
                    path="/admin"
                    render={() => {
                        return localStorage.getItem('accessToken') ? (
                            <Dashboard></Dashboard>
                        ) : (
                            <Redirect to="/authentication/sign-in" />
                        )
                    }}
                />
            </Switch>
        </Router>
    )
}
