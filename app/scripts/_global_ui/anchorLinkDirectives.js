'use strict';

/**
 * @ngodc directives
 * @name anchorLink
 * @description Display a anchor link when hovering a title element
 */
angular.module('globalUI')
.directive('anchorLink', function($log, ScrollService) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.addClass('anchor-link');
      element.append('<i class="fa fa-anchor">');
      element.click(function() {
        ScrollService.scrollTo(element.attr('id'))
      });
    }
  };
});