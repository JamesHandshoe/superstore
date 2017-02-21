'use strict';

describe('Specials E2E Tests:', function () {
  describe('Test Specials page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/specials');
      expect(element.all(by.repeater('special in specials')).count()).toEqual(0);
    });
  });
});
