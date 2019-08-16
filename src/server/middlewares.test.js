import middlewares from './middlewares';
import httpMocks from 'node-mocks-http';

describe('middleware getResponseFromTestingApi', () => {

  it('should send formatted body to testing api', (done) => {
    fetch.resetMocks();
    const req  = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      body: {
        jobalertType: 'jobalert',
        email: 'test@test.test',
        env: 'staging',
        cluster: 'demo-sa',
      }
    });
    const res = httpMocks.createResponse();
    fetch.mockResponse(JSON.stringify({ json: '12345' }));
    middlewares.getResponseFromTestingApi(req, res);
    const data = res._getJSONData();
    console.log(data);
  });

});
