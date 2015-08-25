# Fields types and properties

Fields are the building blocks of forms.

They can be instanciated by their id in formsInstances.yml
Or by field groups

## Type of fields 

There is predefined type of fields using different widgets and library
To use a field type just fill the type property with the correct type id

### Text input fields
* **text** : A simple small input text box using html  input(type="text")
* **textarea** : A simple big input text box for paragrapher using input(type="textarea"
* **password** : A password field using html input(type="password")

### Select and checkboxes fields 
* **checkbox** : a standard html checkbox [deprecated use nicecheckbox instead]
* **nicecheckbox** : a standard replacement of checkbox

* **select** : A select list using standard html select list (deprecated use ui-selec)
* **uiselect** : A angular UI replacement of standard select 
* **multiselect** : a multi select widget

### Specific widget fields

* **datepicker** : a datepicker field using ui-router

### Field groups

* **bundle** : a field that contain several field like the profile uploader
* **fieldGroup** : a field group wrapper

## Fields properties 

### Generic field properties

* **fields**
  * **fieldId**: this field id should be unique in fields.yml, used only by jade
    **Field basic properties**
    * **id**: html identifier used in class name... (ex: "username")
    * **apiId**: api id useful for example to deal with form error
    * **type**: Predefined field type change the UI element  ("text" || "textarea"..) All available properties above 
    * **class**: classes to be added to the wrapper div
    * **placeholder**: Text to be shown when the field is not filled (Ex: "User name") 

    **Error Handling**
    Both properties are needed and no error message will be printed if only one is present. errorsInstance inform about the use of a message type, but also it's order in the dom, so it's priority according to ng-mesage behavior
    An exeption is required message, which can be outputed if required: true
    * **errorsInstances**: Error type ids to implement on thus field, the error message should be set in forms.errors[errorId]
    * **errors**: Custom overrides of a errors instances
    
    **Standard Validators** 
    * **ngMinlength**: Set the minimal number of character in this field
    * **ngMaxlength**: Set the maximal number of character in this field
    
    **Field data and validation**
    * **ngModel**: The ngModel is where angular bind the jd model with the html form value. The true ngModel when a field is used in a form is a of a concatenation of formNgModel + fieldNgModel to force uniqueness.
    * **ngModelOptions**: specify how the ng-model should update. Useful to set a delay between the moment we type and the api call especially with automatic update (ng-change). This settings can be made at the form level to prevent repeating it for all fields. [Angular Doc](https://docs.angularjs.org/api/ng/directive/ngModelOptions)
    * **ngChange**: Automatically trigger a fonction when the field change. Set ngModelOptions to fine tune the delay to process this update relative to user activity
    
    **Field state**
    * **required**: (true || false (default) ) If required, the field trigger an error, and prevent the form to be submitted
    * **ngRequired**: angular version to be used preferably
    * **disabled**: The field appearance is greyed and it is not possible to type in it [deprecated]
    * **ngDisabled**: Angular version of disabled to be used preferably
    
    **Field visibility**
    * **ngShow**: Show when the expression is true
    * **ngHide**: Hide when the expression is true

    **Field custom attributes**
    * **customAttributes** : Will add custom attributes to the field  div / Useful to add custom directives         
    * **wrapperCustomAttributes** : : Will add custom attributes to the field  wrapper div / Useful to add custom directives
    
    ? 

### Properties for multiple value fields (several input text for example)

* **fields**
  * **fieldId**:
    + **multiple**: true (default false) allow to set multiple value of the field (don't work for all field type). Works only with type "textarea" and "text". If multiple is set to true ngModel would be an array of values instead of a value
    + **multipleAddField** (object) allow to customize the add field 
      * **ngModel** multipleAddField ngModel is required
      * **ngChange** to allow dinamyc submit of the add field
      * **ngModelObjectProperties**: when we have multiple field that are object, we need to specify a property of the object, this string will be appeded to ngModel identifier

### Properties for specific fields type
  
  * All types of select fields
  
    * **optionsValues**: If we want to set the options in the yaml, we access the data accessible from the scope at main.gData.fields.govAddPartsSelect.optionsValues for example 
  
  * **select**
    * **ngRepeat**: ngRepeat expression (for example : "item in modal.datas")
    * **ngRepeatBind**: visible value of the list
    * (**ngRepeatValue**): data value if different from the visible value
    * **ngOptions** If set change the mixin to use ngOptions instead of ngRepat
    
  * **uiselect**
    * **options**: the scope properties where is saved the the list of choices array of objects 
    * **ngBind**: selected value of the select object to display (for example if we want to display the name  or a user stored in object and accessible from user.name property, we just fill "name" here and user in the options properties)
    * **placeholder**: Placeholder works for this type of select list, so as you would expect, if no value is selected, it is what is displayed.
    * **allowClear**: true // If set, a checkbox will be available on select list to restore unselected state

  * **niceCheckbox**
    * **ngTrueValue**: Value of the ngModel when the checkbox is checked
    * **ngFalseValue**: Value of the ngModel when the checkbox is checked
    * **label**: Visible text at the right side of the checkbox

  * **niceCheckboxMultiple**
    Idem as niceCheckbox
    * **ngRepeat**: Data to repeat as in (item in data)
    * **ngRepeatBind**: Property of an individual item as in (item.property)
    * **label**: For multiple checkoboxes a label is displayed on top of checkboxes
    * **selectAll**: function to call to select all checkboxes 
    * **clearAll**: function to call to unselect all checkboxes
         
  * **datepicker**
    * **dateFormat**: Set the date format for example 'dd-MM-yyyy'
