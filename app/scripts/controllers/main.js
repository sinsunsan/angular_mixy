'use strict';

/**
 * @ngdoc function
 * @name angularMixyStartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMixyStartApp
 */
angular.module('angularMixyStartApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
