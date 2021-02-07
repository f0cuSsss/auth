import React from 'react'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom'

import Header from './Header'
import NewsList from './NewsList'
import Profile from './Profile'
import '../styles/index.css'
import { checkAuth } from '../actions'
import history from '../history'

class App extends React.Component {
    componentDidMount() {
        this.props.checkAuth();
    }

    render() {
        return(
            <Router history={history}>
                <div className="wrap">
                    <Header />
                    <div className="content">
                        <Route path="/" exact component={NewsList} />
                        <Route path="/news" component={NewsList} />
                        <Route path="/profile/:id" component={Profile} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect(null, { checkAuth })(App);