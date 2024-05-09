import { expect, test } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://api.coindesk.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    //   'Authorization': `token ${process.env.API_TOKEN}`,
    },
  });
});

test.afterAll(async ({}) => {
  // Dispose all responses.
  await apiContext.dispose();
});

test('Verify currentprice endpoint is returing chartName', { 
  tag: ['@regression', '@api'], 
}, async ({}) => {
    const response = await apiContext.get('/v1/bpi/currentprice.json');
    expect(response.ok()).toBeTruthy();
    expect(response, `200 Status code was not returned.`).toBeOK();
    expect(response.json()).toEqual(expect.objectContaining({
        chartName: "Bitcoin"
    })); 
});

/* test('Post request example', { 
  tag: ['@regression', '@api'], 
},  async ({ }) => {
  const newIssue = await apiContext.post(`/repos/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();
}); */