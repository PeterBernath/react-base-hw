import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from 'pages/home';
import template from 'src/template';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'utils/reducers';
import * as actions from 'utils/actions';
const express = require('express');
const path = require('path');
const app = express();
const port = 7000;
const todoRouter = require('./routes.js');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
const _ = require('lodash');

app.use(bodyParser.json());
app.use(todoRouter);

app.use('/assets', express.static('build/assets'));

app.use('/testing-api', (req, res) => {
    console.log(req.body);
    const domain = req.body.env === 'staging' ? 'pooledlabs' : 'lensa';
    const endpoint = `https://testing-api.${domain}.com/jobalert/send-test`;
    const key = domain === 'lensa' ? '98chnIiwtQ6eWBMtlRKFj7p7CqoxGf3c8y4NYGuE' : 'PZ5WBbINs37iH9IBggeRT3ojw1hyoCW24AfbQH7j';
    let body = {
      jobalert_type: req.body.jobalertType,
      email: req.body.email,
      custom_db_cluster: req.body.cluster,
    };
    if (domain === 'lensa') {
      body = _.omit(body, 'custom_db_cluster')
    }
    console.log(body);
    console.log(endpoint);
    fetch(endpoint, {
        method: 'POST',
        headers: {
          'X-API-Key': key,
          'content-type': 'application/json;'
        },
        body: JSON.stringify(body),
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
