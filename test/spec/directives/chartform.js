'use strict';

describe('Directive: chartForm', function () {

  // load the directive's module
  beforeEach(module('data4PruebaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chart-form></chart-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chartForm directive');
  }));
});
