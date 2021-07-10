import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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

    // Hover effect enabled for mobile devices
    document.addEventListener('touchstart', function () {}, true);
  }

  //we need to close the subscription - avoid memory leaks
  componentWillUnmount() {
    subscribeUser()();
  }

  render() {
    const { currentUser } = this.props;

    let routes = (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={SignInPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Redirect to='/' />
      </Switch>
    );
    if (currentUser) {
      routes = (
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/orders' component={PurchaseHistory} />
          <Route exact path='/profile' component={ProfilePage} />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <Router history={history}>
        <div className='App'>
          <Alert />
          <Header />
          {routes}
          <Footer />
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
