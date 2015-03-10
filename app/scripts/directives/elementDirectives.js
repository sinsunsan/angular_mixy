'use strict';
/**
 *
 * @name editHoverBtn
 * @description display an edit button while hovering on the parent element of the directive element
 * when click on it trigger the edit function passed to the directives
 */
angular.module('globalUI')
.directive('editHoverBtn', function() {
  return {
    templateUrl: 'views/editHoverBtn.html',
    restrict: 'A',
    scope: {
      editFn: '&', // the function defined in the parent scope to trigger, is we click on the button
      editItem: '=', // the item data to be sent to the edit function
    },
    replace: true,
    link: function($scope, $elem, $attrs) {
      $scope.btnDisplay = false; // the display status of the button
      var parentEle = $elem.parent();
      console.log('avatar edit directives is loaded with the parent ', $elem);
    }
  };
});