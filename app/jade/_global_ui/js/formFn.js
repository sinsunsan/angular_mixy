// Utility functions to be used in the context
// of jade loaded by the grunt process
var _ = require('lodash');
// https://github.com/balderdashy/merge-defaults
// Or you can add it as a new method

// To use this lib
// we need to set gData using the exports.setGdata
var gData;
var formsData;
var formsInstancesData;
var fieldsData;

// Set the Data to be done when importing the jade mixins
// - util.setGdata(gData); Provided gData is available in jade mixins

exports.setGdata = function(data) {
  gData = data;
  formsData = gData['forms'];
  formsInstancesData = gData['formsInstances'];
  fieldsData = gData['fields'];
  console.log('the gData is being set > Exemple fieldData', data);
};

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
  formTypeDefaults = (formId && self.checkNested(formsInstancesData, formId, 'field')) ? formsInstancesData[formId]['field'] : {};

  // fields.yml / global field id settings : the settings for all fields of a given type
  fieldType = (fieldId && self.checkNested(fieldsData, fieldId)) ? fieldsData[fieldId] : {};

  // We first merge the current field and it's possible parent
  if (fieldType.parent && self.checkNested(fieldsData, fieldType.parent)) {
    _.defaultsDeep(fieldType, fieldsData[fieldType.parent])
  }

  if (!(fieldId && self.checkNested(fieldsData, fieldId))) {
    console.log('THE FIELD ' + fieldId + ' Has not been found in the fields settings ');
    console.log('Double check your instance settings ! ');
  };

  // forms.yml / global field settings (the lowest level default settings for all fields)
  defaults = (self.checkNested(formsData, 'defaults', 'field')) ? formsData['defaults']['field'] : {};
  var field = {};
  _.defaultsDeep(field, stateType, formType, formTypeDefaults, fieldType, defaults);

  //  delete fields are disabled by default
  if (stateId === 'delete' && (typeof(field.disabled) === 'undefined'))  {
    field.disabled = true
  }
  //  if (fieldId === 'addPolicyDomain') {
  //    console.log('\n\nFields settings !!!! for formId : "' + formId + '", fieldId : "' + fieldId + '", stateId "' + stateId + '"');
  //    console.log('\nState settings', stateType);
  //    console.log('\nForm settings', formType);
  //    console.log('\nField settings', fieldType);
  //    console.log('\nDefaults settings', defaults);
  //    console.log('\nThe combined field settings are : ', field);
  //  }

  // For convenience, we pass all useful ids in the field object
  field.formId = formId;
  field.fieldId = fieldId;
  field.stateId = stateId;
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
  }
  else {

    //console.log('THE CACHE FOLDER IS ', gData.cache);
    formDefaults = {};

    console.log('the form instance', formsInstancesData);

    formType = (formId && self.checkNested(formsInstancesData, formId)) ? formsInstancesData[formId] : {};

    console.log('the form for ' + formId + ' is : ',  formType);

    // We first merge the current form and it's possible parent
    if (formType.parent && self.checkNested(formsInstancesData, formType.parent)) {
      _.defaultsDeep(formType, formsInstancesData[formType.parent])
    }

    // Then we retrieve state and global form defaults
    // formsInstances.yml / form id settings overrides for the state
    stateType = (stateId && self.checkNested(formsInstancesData, formId, 'states', stateId)) ? formsInstancesData[formId]['states'][stateId] : {};
    // formsInstances.yml / form id settings

    // forms.yml / default form settings
    defaults = (self.checkNested(formsData, 'defaults', 'form')) ? formsData['defaults']['form'] : {};

    console.log('\nForm Data >>>>>');
    console.log('\nState settings', stateType);
    console.log('\nForm settings', formType);
    console.log('\nDefaults settings', defaults);
    console.log('\n<<<< Form Data end');

    _.defaultsDeep(formDefaults, stateType, formType, defaults);

    console.log('\n<<<< From final default data', formDefaults);

    self.setFormCache(formId, stateId, formDefaults);
    console.log('the form default', formDefaults);
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
  if (gData['listsInstances'][listId]) {
    return gData['listsInstances'][listId];
  }
  else if (gData['buttonsInstances'][listId]) {
    return gData['buttonsInstances'][listId];
  }
  return {};
};

//- 2 leveles overrides for buttons  : buttons and parent button
//- @todo create a third function and a common function to this process
exports.setInstancesDefaults = function(instanceId, instancesData) {
  var self = this;
  if (instancesData) {
    // console.log('\n\n\n we ask for instance ', instanceId);
    // console.log('\n\n\n the instanceData defs ', instancesData);

    var instance = (instanceId && self.checkNested(instancesData, instanceId)) ? instancesData[instanceId] : {};

    // We use parent button as a default button
    if (instance.parent) {
      var instanceParent = (self.checkNested(instancesData, instance.parent)) ? instancesData[instance.parent] : {};
      var returnDefaults = _.defaultsDeep(instance, instanceParent);
      // console.log('\n\n\n Instance combined properties for ' + instanceId + ' with parent ' + instanceParent + ' : ', returnDefaults);
      return returnDefaults;
    }
    else {
      return instance;
    }
  }
  return {};
};

exports.setButtonsDefaults = function(buttonId) {
  var self = this;
  var buttonsData = gData['buttons'];
  return self.setInstancesDefaults(buttonId, buttonsData);
};

exports.setColumnsDefaults = function(columnId) {
  var self = this;
  var columnsData = gData['tablesColumns'];
  return self.setInstancesDefaults(columnId, columnsData);
};

// Some error messages like required, have special handling and even default values
exports.setDefaultFieldErrors = function(fieldErrors, field, errorsGlobal, defErrorId, defErrorMsg) {

  // Only add this message if manual errorsInstances has not been used
  // manual errorsInstances can help set more precisely message order
  if (!fieldErrors[defErrorId] && field[defErrorId] && !_.isEmpty(errorsGlobal[defErrorId])) {
    fieldErrors[defErrorId] = errorsGlobal[defErrorId];
  }
  // Use the default message is not customization is provided in the yaml
  else if (!fieldErrors[defErrorId] && field[defErrorId]) {
    fieldErrors[defErrorId] = defErrorMsg;
  }
};

// Set errors message globally and with field overrides
exports.setFieldErrors = function(field) {

  var errorsGlobal = gData.forms.errors;
  var fieldErrors = {};
  if (field.errorsInstances) {
    _.each(field.errorsInstances, function(errorId) {
      //- If the message is set at the field level, it win
      if (field.errors && field.errors[errorId]) {
        fieldErrors[errorId] = field.errors[errorId];
      }
      // If it is set at gobal all forms level, we take it
      else {
        fieldErrors[errorId] = (errorsGlobal[errorId]) ? errorsGlobal[errorId] : '';
      }
    });
  }

  if (field.type === 'email') {
    field.email = true;
  }

  if (field.ngMinlength) {
    field.minLength = field.minLength;
  }

  if (field.ngMaxlength) {
    field.ngMaxlength = field.maxLength;
  }

  var defaultMessages = {
    required: 'This field is required.',
    minLength: 'This field is too short.',
    maxLength: 'This field is too long.',
    email: 'This email is not valid.'
  };
  _.each(defaultMessages, function(defErrorMsg, defErrorId) {

    exports.setDefaultFieldErrors(fieldErrors, field, errorsGlobal, defErrorId, defErrorMsg);
  });

  return fieldErrors
};

exports.setNgModel = function(field, form) {
  var ngModel = '';
  if (!(field.ngModel === false)) {
    ngModel = form.ngModel + '.';
    ngModel += (field.ngModel) ? field.ngModel : field.id;
  }
  else {
    ngModel = false;
  }
  return ngModel;
};

// set default ng model when no field specific ngModel is set
// ngModel can be set to false, to disable ngModel
// for fields like password confirm, that don't need it
// field.ngModel override field id if for example
// an api require a field be named  in a specific way
exports.setDefaultNgModel = function(field, form) {
  var self = this;

  var ngModel = self.setNgModel(field, form);

  // for field that are object, where the ngModel is only a single of its properties
  // The case for accoutabilities and domains
  if (field.ngModelObjectProperties) {
    if (field.multiple) { ngModel += '[$index]'; }
    ngModel += '.' + field.ngModelObjectProperties;
  }
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
  // console.log('\n\n\n form data for formId dsdsds');
  return formsInstancesData[formId];
};

