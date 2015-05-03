// Utility functions to be used in the context
// of jade loaded by the grunt process
var _ = require('lodash');
// var gData1 = require('gData');
// @todo replace by a config to change that easily
var gData = require('./../../../data/hola.json');
var formsData = gData['forms'];
var formsInstancesData = gData['formsInstances'];
var fieldsData = gData['fields'];

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

  var stateType, formType, fieldType, formTypeDefaults, defaults = {};

  // formsInstances.yml / field id settings defined at the state level
  stateType = (stateId && self.checkNested(formsInstancesData, formId, 'states', stateId, 'fields', fieldId)) ? formsInstancesData[formId]['states'][stateId]['fields'][fieldId] : {};

  // formsInstances.yml / field id settings defined at the form id level
  formType = (formId && self.checkNested(formsInstancesData, formId, 'fields', fieldId)) ? formsInstancesData[formId]['fields'][fieldId] : {};

  // default field settings defined at the state level
  // @todo
  // May be useful for example to state all fields in the "delete" state is disabled

  // formsInstances.yml / formsInstances default field settings defined at the form id level
  formTypeDefaults = (formId && self.checkNested(formsInstancesData, formId, 'fields')) ? formsInstancesData[formId]['field'] : {};

  // fields.yml / global field id settings : the settings for all fields of a given type
  fieldType = (fieldId && self.checkNested(fieldsData, fieldId)) ? fieldsData[fieldId] : {};

  // forms.yml / global field settings (the lowest level default settings for all fields)
  defaults = (self.checkNested(formsData, 'defaults', 'field')) ? formsData['defaults']['field'] : {};
  var field = {};
  _.defaults(field, stateType, formType, formTypeDefaults, fieldType, defaults);

  if (fieldId === 'email') {
    console.log('\n\nFields settings !!!! for formId : "' + formId + '", fieldId : "' + fieldId + '", stateId "' + stateId + '"');
    console.log('\nState settings', stateType);
    console.log('\nForm settings', formType);
    console.log('\nField settings', fieldType);
    console.log('\nDefaults settings', defaults);
    console.log('\nThe combined field settings are : ', field);
  }
  return field;
};

// Create the cache folder if it doesn't exist
exports.isCached = function(cacheType) {
  if (! gData.cache) {
    gData.cache = {};
  }
  if (gData.cache && ! gData.cache[cacheType]) {
    gData.cache[cacheType] = {};
    //console.log('the cache is created', gData.cache[cacheType])
    return false;
  }
  return true;
};

exports.setFormCache = function(formId, stateId, formData) {
  if (!gData.cache.forms[formId]) {
    gData.cache.forms[formId] = {};
  }
  gData.cache.forms[formId][stateId] = formData;
  //console.log('the CACHE is SAVED !!! ', gData.cache);
};

exports.getFormCache = function(formId, stateId) {
  var self = this;
  if (!self.isCached('forms')) {
    return false;
  }
  else if (formId && stateId) {
    if (gData.cache.forms[formId] && gData.cache.forms[formId][stateId]) {
      //console.log('there is cached data for this ids');
      return gData.cache.forms[formId][stateId];
    }
    else {
      return false;
    }
  }
};

exports.getFieldCache = function(formId, stateId, fieldId) {
  //console.log('HEEELAAA');
};

//- 3 levels override for global form data : stateType, formType, formsDefaults
exports.setFormDefaults = function(formId, stateId) {

  var self = this;
  var stateType, formType, fieldType, defaults = {};
  var formDefaults = {};

  formDefaults = self.getFormCache(formId, stateId);
  if (formDefaults) {
    //console.log('RETURN FROM CACHE for ', formId, stateId);
    return formDefaults;
  } else {
    //console.log('THE CACHE FOLDER IS ', gData.cache);
    formDefaults = {};
    // formsInstances.yml / form id settings overrides for the state
    stateType = (stateId && self.checkNested(formsInstancesData, formId, 'states', stateId)) ? formsInstancesData[formId]['states'][stateId] : {};
    // formsInstances.yml / form id settings
    formType = (formId && self.checkNested(formsInstancesData, formId)) ? formsInstancesData[formId] : {};

    // forms.yml / default form settings
    defaults = (self.checkNested(formsData, 'defaults', 'form')) ? formsData['defaults']['form'] : {};

    _.defaults(formDefaults, stateType, formType, defaults);

    // if (fieldId === 'email') {
      // console.log('\nForm settings !!!! for formId : "' + formId + '", stateId "' + stateId + '"');
      // console.log('\nState settings', stateType);
      // console.log('\nForm settings', formType);
      // console.log('\nDefaults settings', defaults);
      // console.log('\nCombination settings', formDefaults);
    // }

    self.setFormCache(formId, stateId, formDefaults);
    return formDefaults;
  }
};

//- 2 levels override for global tables : tableType, default
exports.setTableDefaults = function(tableId) {

  var self = this;
  //console.log('\n\n\nthe table object is ', tableId);
  var tablesData = gData['tables'];
  var tablesInstancesData = gData['tablesInstances'];

  // console.log('\n\n\nthe table object ' + tableId + 'has datas\n' , tablesData);
  var tableType, defaults = {};

  tableType = (tableId && self.checkNested(tablesInstancesData, tableId)) ? tablesInstancesData[tableId] : {};

  // console.log('\n\n\ntable type for type ' + tableId + ' is ', tableType);
  defaults = (self.checkNested(tablesData, 'defaults')) ? tablesData['defaults'] : {};
  // console.log('\n\n\ndefaults for tables are ', defaults);
  var returnDefaults = _.defaults(tableType, defaults);
  // console.log('\n\n\nmerge settings are ', returnDefaults);
  return returnDefaults;
};

//- 2 levels override for global lists
exports.setListDefaults = function(listId) {
  return gData['listsInstances'][listId];
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

// Centralized way to get form data giving the form Id
exports.getFormData = function(formId) {
  console.log('\n\n\n form data for formId dsdsds');
  return formsInstancesData[formId];
};

