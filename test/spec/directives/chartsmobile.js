'use strict';

describe('Directive: chartsMobile', function () {

  // load the directive's module
  beforeEach(module('data4PruebaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<charts-mobile></charts-mobile>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chartsMobile directive');
  }));
});
