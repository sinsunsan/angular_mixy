'use strict';

angular.module('angularMixy')
.factory('mixyUtil', function() {

  /**
   * @ngdoc function
   * @name getUrlParts
   * @description Remove the url suffix present in the url
   * then split the url in parts separated by / and then return the array of components
   * @param  url {string} url string
   * @param urlSuffix {string} subUrl string to remove
   * @retun {array} an array of url part
   */
  var getUrlParts = function(url, urlSuffix) {
   if (_.isString(url) && _.isString(urlSuffix)) {
     url = url.replace(urlSuffix, '');
     url = url.split('/');
   }
   else if (_.isString(url)) {
     url = url.split('/');
   }
   return url;
  };

   /**
    * @ngdoc function
    * @name checkNested
    * @description check the existence of nested key without trigerring errors
    * when parent key don't exist
    */
  var checkNested = function(obj/*, level1, level2, ... levelN*/) {
   var args = Array.prototype.slice.call(arguments, 1);
   for (var i = 0; i < args.length; i++) {
     if (!obj || !obj.hasOwnProperty(args[i])) {
       return false;
     }
     obj = obj[args[i]];
   }
   return true;
  };

  /**
    * @ngdoc function
    * @decription remove the last char of a string or an array of strings
    * @return the string or array of strings with the last character trimmed
    * useful to put in singular forms plural form strings circles >  circle
    */
  var removeLastChar = function(input) {
    var output = _.cloneDeep(input);
    var removeLastCharAction = function(str) {
      // remove the last character the string
      return str.substring(0, str.length - 1);
    };

    if (_.isString(output)) {
      output = removeLastCharAction(output);
    }
    else if (_.isArray(input)) {
      _.each(output, function(val, key) {
        output[key] = removeLastCharAction(val);
      });
    }
    return output;
  };

  // https://triangle717.wordpress.com/2014/12/17/js-reverse-conversion-map/
  // simple one level reverse map
  var reverseMap = function(map) {
    var mapReverse = {};
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        mapReverse[map[key]] = key;
      }
    }
    return mapReverse;
  };

  return {
    getUrlParts: getUrlParts,
    checkNested: checkNested,
    removeLastChar: removeLastChar,
    reverseMap: reverseMap
  }
});