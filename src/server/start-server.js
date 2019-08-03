import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from 'pages/home';
import template from 'src/template';
const express = require('express');
const path = require('path');
const app = express();
const port = 7000;
const todoRouter = require('./routes.js');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'utils/reducers';
import * as actions from 'utils/actions';


const KEY = '98chnIiwtQ6eWBMtlRKFj7p7CqoxGf3c8y4NYGuE';

app.use(bodyParser.json());
app.use(todoRouter);

app.use('/assets', express.static('build/assets'));

app.use('/testing-api', (req, res) => {
    fetch('https://testing-api.lensa.com/jobalert/send-test', {
        method: 'POST',
        headers: {
          'X-API-Key': KEY,
          'content-type': 'application/json;'
        },
        body: JSON.stringify({
          jobalert_type: req.body.jobalertType,
          email: req.body.email,
        }),
    })
      .then(testingApiResult => {
          return testingApiResult.json();
      })
      .then((response) => {
        res.json({ ...response, success: true });
      })
      .catch((err) => {
        console.log('err', err);
        res.json({ success: false });
      });
});

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
