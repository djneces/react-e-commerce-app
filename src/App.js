import React, { Component } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import SignInPage from './containers/SignInPage/SignInPage';

//Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //storing user in the DB (Firestore)
        const userRef = await createUserProfileDocument(userAuth);
        //get Snapshot from the DB with an Id
        userRef.onSnapshot((snapShot) => {
          const { createdAt, email, displayName } = snapShot.data();
          this.setState({
            currentUser: {
              id: snapShot.id,
              username: displayName,
              email: email,
              createdAt: createdAt.toDate(),
            },
          });
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  //we need to close the subscription - avoid memory leaks
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Header currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path='/login' component={SignInPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
