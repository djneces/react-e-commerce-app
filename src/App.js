import React, { Component } from 'react';
import Header from './components/Header/Header';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import { connect } from 'react-redux';

import SignInPage from './containers/SignInPage/SignInPage';
import LandingPage from './containers/LandingPage/LandingPage';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import PurchaseHistory from './containers/PurchaseHistory/PurchaseHistory';
import Alert from './components/Alert/Alert';
import { subscribeUser } from './store/actions/user';

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
      <Router history={history}>
        <div className='App'>
          <Alert />
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
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/orders' component={PurchaseHistory} />
            <Route exact path='/profile' component={ProfilePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps, { subscribeUser })(App);
