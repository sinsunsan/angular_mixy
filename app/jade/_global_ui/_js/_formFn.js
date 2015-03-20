// Utility functions to be used in the context
// of jade loaded by the grunt process
var _ = require('lodash');
// var gData1 = require('gData');
// @todo replace by a config to change that easily
var gData = require('./../../../data/hola.json');
// ######
// there is a potential problem with _.defaults, that don't merge nested object.
//  var g = {test: {blue: "road"}}
// var t = {test: {red: "street", black: "candy"}}
// _.defaults(g, t) = {test: {blue: "road"}}
// _.defaults(g.test, t.test) =  {blue: "road", red: "street", black: "candy"}

//- http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
exports.checkNested = function(obj/*, level1, level2, ... levelN*/) {
   var args = Array.prototype.slice.call(arguments, 1);
   for (var i = 0; i < args.length; i++) {
     if (!obj || !obj.hasOwnProperty(args[i])) {
       return false;
     }
     obj = obj[args[i]];
   }
   return true;
};

//- 4 levels overrides for form fields : stateType, formType, fieldType, fieldsDefaults
exports.setFieldDefaults = function(formId, fieldId, stateId) {
  var self = this;
  var formsData = gData['forms'];
  var stateType, formType, fieldType, formTypeDefaults, defaults = {};
  // field id settings defined at the state level
  stateType = (stateId && self.checkNested(formsData, 'forms', formId, 'states', stateId, 'fields', fieldId)) ? formsData['forms'][formId]['states'][stateId]['fields'][fieldId] : {};
  // field id settings defined at the form level
  formType = (formId && self.checkNested(formsData, 'forms', formId, 'fields', fieldId)) ? formsData['forms'][formId]['fields'][fieldId] : {};
  // default field settings defined at the state level
  // May be useful for example to state all fields in the "delete" state is disabled
  //
  // default field settings defined at the form level
  formTypeDefaults = (formId && self.checkNested(formsData, 'forms', formId, 'fields')) ? formsData['forms'][formId]['field'] : {};
  // global field id settings
  fieldType = (fieldId && self.checkNested(formsData, 'defaults', 'fields', fieldId)) ? formsData['defaults']['fields'][fieldId] : {};
  // gloval field settings
  defaults = (self.checkNested(formsData, 'defaults', 'field')) ? formsData['defaults']['field'] : {};

  var field = _.defaults(stateType, formType, formTypeDefaults, fieldType, defaults);

  if (fieldId === 'email' && formId === 'signup') {
    console.log('\n\nFields settings !!!! for formId : "' + formId + '", fieldId : "' + fieldId + '", stateId "' + stateId + '"');
    console.log('\nState settings', stateType);
    console.log('\nForm settings', formType);
    console.log('\nField settings', fieldType);
    console.log('\nDefaults settings', defaults);
    console.log('\nThe combined field settings are : ', field);
  }
  return field;
};

//- 3 levels override for global form data : stateType, formType, formsDefaults
exports.setFormDefaults = function(formId, stateId) {
  var self = this;
  var formsData = gData['forms'];
  var stateType, formType, fieldType, defaults = {};
  // form id settings overrides for the state
  stateType = (stateId && self.checkNested(formsData, 'forms', formId, 'states', stateId)) ? formsData['forms'][formId]['states'][stateId] : {};
  // form id settings
  formType = (formId && self.checkNested(formsData, 'forms', formId)) ? formsData['forms'][formId] : {};
  // default form settings
  defaults = (self.checkNested(formsData, 'defaults', 'form')) ? formsData['defaults']['form'] : {};
  // console.log('\nForm settings !!!! for formId : "' + formId + '", stateId "' + stateId + '"');
  // console.log('\nState settings', stateType);
  // console.log('\nForm settings', formType);
  // console.log('\nDefaults settings', defaults);
  return _.defaults(stateType, formType, defaults);
};

//- 3 levels override for global form data : stateType, formType, formsDefaults
exports.setTableDefaults = function(tableId) {
  var self = this;
  // console.log('\n\n\nthe table object is ', tableId);
  var tablesData = gData['tables'];
  // console.log('\n\n\nthe table object ' + tableId + 'has datas\n' , tablesData);
  var tableType, defaults = {};
  tableType = (tableId && self.checkNested(tablesData, 'tables', tableId)) ? tablesData['tables'][tableId] : {};
  // console.log('\n\n\ntable type for type ' + tableId + ' is ', tableType);
  defaults = (self.checkNested(tablesData, 'defaults')) ? tablesData['defaults'] : {};
  // console.log('\n\n\ndefaults for tables are ', defaults);
  var returnDefaults = _.defaults(tableType, defaults);
  // console.log('\n\n\nmerge settings are ', returnDefaults);
  return returnDefaults;
};

// set default ng model when no field specific ngModel is set
// ngModel can be set to false, to disable ngModel
// for fields like password confirm, that don't need it
// field.ngModel override field id if for example
// an api require a field be named  in a specific way
exports.setDefaultNgModel = function(field, form) {
  var ngModel = '';
  if (!(field.ngModel === false)) {
    ngModel = form.ngModel + '.';
    ngModel += (field.ngModel) ? field.ngModel : field.id;
  } else {
    ngModel = false;
  }
  // console.log('\n\n\nthe ngModel use the data ', field.ngModel, form.ngModel, 'and is ', ngModel);
  return ngModel;
};

// set a new id for forms that is a compound of formId and stateId
exports.setFormStateId = function(formId, stateId) {
  //console.log('received formId: ' + formId + " stateId : " + stateId);
  formId = formId || '';
  stateId = stateId || '';
  // console.log('defaultized formId: ' + formId + " stateId : " + stateId);
  var formStateId = formId;
  formStateId += (!_.isEmpty(stateId)) ? '__' + stateId : '';
  //console.log('the formStateId is ', formStateId);
  return  formStateId;
};

