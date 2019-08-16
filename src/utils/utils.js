const _ = require('lodash');

const formatBody = (requestBody) => {
  const domain = requestBody.env === 'staging' ? 'pooledlabs' : 'lensa';
  const key = 'lensa' === domain ? '98chnIiwtQ6eWBMtlRKFj7p7CqoxGf3c8y4NYGuE' : 'PZ5WBbINs37iH9IBggeRT3ojw1hyoCW24AfbQH7j';
  const endpoint = `https://testing-api.${domain}.com/jobalert/send-test`;
  let body = {
    jobalert_type: requestBody.jobalertType,
    email: requestBody.email,
    custom_db_cluster: requestBody.cluster,
  };
  if ('lensa' === domain) {
    body = _.omit(body, 'custom_db_cluster')
  }
  return {key, endpoint, body}
}

module.exports = {
  formatBody
}
