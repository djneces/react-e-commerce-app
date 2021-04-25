import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
// export default { store, persistor };
