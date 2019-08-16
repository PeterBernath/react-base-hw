const fetch = require('cross-fetch');
const utils = require('../utils/utils')

const getResponseFromTestingApi = (req, res) => {
  const { key, endpoint, body } = utils.formatBody(req.body);
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
}

module.exports = {
  getResponseFromTestingApi
};
