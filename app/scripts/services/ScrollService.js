'use strict';

angular.module('holaApp')
.service('ScrollService', function () {

  // http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
  var keys = [37, 38, 39, 40];

  var preventDefault = function (e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };

  var keydown = function(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  };

  var wheel = function(e) {
    preventDefault(e);
  };

  var scrollDisable = function() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  };

  var scrollEnable = function() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  };

  /**
   * @ngdoc function
   * @name scrollTo
   * @description enable anchor links
   */
   // http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs
   // https://docs.angularjs.org/api/ng/service/$anchorScroll
  var scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };

  return {
    scrollDisable: scrollDisable,
    scrollEnable: scrollEnable,
    scrollTo: scrollTo
  };

});