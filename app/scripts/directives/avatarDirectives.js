'use strict';

/**
 *
 * @name Avatar edit field
 * @description display an avatar image
 * and allow to upload or replace the image
 */
angular.module('globalUI')
.directive('avatarEdit', function() {
  return {
    templateUrl: 'views/avatarEditDirectives.html',
    restrict: 'A',
    link: function($scope, elem, attrs) {
      console.log('avatar edit directives is loaded');
    }
  };
});

/**
 *
 * @name Avatar show field
 * @description display a configurable size avatar image in a list
 */
angular.module('globalUI')
.directive('avatarShowList', function() {
  return {
    templateUrl: 'views/avatarEditDirectives.html',
    restrict: 'A',
    link: function($scope, elem, attrs) {
      console.log('avatar edit directives is loaded');
    }
  };
});

// Handle global LINK click
angular.module('globalUI')
.directive('avatarEdit', function() {
  return {
    templateUrl: 'views/avatarEditDirectives.html',
    restrict: 'A',
    link: function($scope, elem, attrs) {
      console.log('avatar edit directives is loaded');
    }
  };
});