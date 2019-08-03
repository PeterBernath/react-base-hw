import ReactDOM, { hydrate } from 'react-dom';
import React from 'react';
import HomePage from 'pages/home';
import 'styles/global.less';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'utils/reducers';
import * as actions from 'utils/actions';

const store = createStore(reducer);

store.dispatch(actions.addTodo('tanulni'));

hydrate(
  <Provider store={ store }>
    <HomePage
      prop1={ 123 }
    />
  </Provider>
  , document.getElementById('root'));
