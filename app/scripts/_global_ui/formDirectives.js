'use strict';

/**
 * @name Avatar edit field
 * @description display an avatar image
 * and allow to upload or replace the image
 */

var compareTo = function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
};

angular.module('globalUI').directive("compareTo", compareTo);

