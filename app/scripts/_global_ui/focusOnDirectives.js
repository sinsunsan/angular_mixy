'use strict';

//http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
/**
 * @name focusOn
 * @description Use an event broadcast to set focus on a field
 * <input type="text" focus-on="focusMe"/> focusMe is the identifier of the field
 */

var focusOn = function($log, $rootScope) {
  return function(scope, elem, attr) {
    $log.debug('Ready to focus on  : ' + 'focusOn:' + attr.focusOn);
    $rootScope.$on('focusOn:' + attr.focusOn, function(e) {
      // $log.debug('hey that is my id ! ', attr.focusOn, elem[0]);
      elem[0].focus();
    });
  };
};

angular.module('globalUI').directive("focusOn", focusOn);

angular.module('globalUI')
.factory('focusOn', function ($rootScope, $timeout, $log) {
  // To call when we want to set the focus on an element
  return function(name) {

    $timeout(function (){
      // $log.debug('hey let\'s focus on field with id ', 'focusOn:' + name);
      $rootScope.$emit('focusOn:' + name, name);
    });
  }
});