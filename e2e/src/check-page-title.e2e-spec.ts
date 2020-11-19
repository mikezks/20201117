import { browser } from 'protractor';

describe('Page Title E2E Test', () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:4299');
    await browser.waitForAngularEnabled(true);
  });

  it('should verify the page title (async/await) ', async () => {
      // Asynchronous events are handled with async/wait
      const pageTitle = await browser.getTitle();
      expect(pageTitle).toEqual('Starter');
  });

  it('should verify the page title (promise then)', (done) => {
      // Asynchronous events are handled manually by providing a callback function to the promise "then" method
      browser.getTitle()
      .then((pageTitle) => {
          expect(pageTitle).toEqual('Starter');
          done();
      });
  });
});
