import utils from './utils';

describe('Test body formatting', () => {

  it('should format request body with staging key, endpoint and with cluster', (done) => {
    const testBody = {
      jobalertType: 'jobalert',
      email: 'test@test.test',
      env: 'staging',
      cluster: 'demo-sa',
    }
    const { key, endpoint, body } = utils.formatBody(testBody);

    expect(key).toEqual('PZ5WBbINs37iH9IBggeRT3ojw1hyoCW24AfbQH7j');
    expect(endpoint).toEqual('https://testing-api.pooledlabs.com/jobalert/send-test');
    expect(body).toEqual({
      jobalert_type: 'jobalert',
      email: 'test@test.test',
      custom_db_cluster: 'demo-sa'
    });

    done();
  });

  it('should format request body with production key, endpoint and without cluster', (done) => {
    const testBody = {
      jobalertType: 'aggregated',
      email: 'test@test.test',
      env: 'production',
    }
    const { key, endpoint, body } = utils.formatBody(testBody);

    expect(key).toEqual('98chnIiwtQ6eWBMtlRKFj7p7CqoxGf3c8y4NYGuE');
    expect(endpoint).toEqual('https://testing-api.lensa.com/jobalert/send-test');
    expect(body).toEqual({
      jobalert_type: 'aggregated',
      email: 'test@test.test',
    });

    done();
  });

});
