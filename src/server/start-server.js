import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from 'pages/home';
import template from 'src/template';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'utils/reducers';
import * as actions from 'utils/actions';
const express = require('express');
const app = express();
const port = 7000;
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

app.use(bodyParser.json());

app.use('/assets', express.static('build/assets'));

app.use('/testing-api', middlewares.getResponseFromTestingApi);

app.use((req, res) => {
  const store = createStore(reducer);

  store.dispatch(actions.addTodo('tanulni'));

  const appContent = renderToString(
    <Provider store={ store }>
      <HomePage/>
    </Provider>
  );
  const pageContent = template(appContent);

  res.send(pageContent);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.json({'error': err.message});
});

app.listen(port, () => {
    console.log('Started on ' + port);
});
