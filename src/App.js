import React, { Component } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInPage from './containers/SignInPage/SignInPage';
import LandingPage from './containers/LandingPage/LandingPage';
import { setCurrentUser, subscribeUser } from './store/actions/user';

import './App.scss';

class App extends Component {
  componentDidMount() {
    const { subscribeUser } = this.props;
    subscribeUser();
  }

  //we need to close the subscription - avoid memory leaks
  componentWillUnmount() {
    subscribeUser()();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            {/* redirects logged in user back to landing page if they try to access login */}
            <Route
              exact
              path='/login'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInPage />
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps, { setCurrentUser, subscribeUser })(App);