### tablesColumns

* **colName**: id of the column to be inserted in the table
  * **header**: Text that is displayed in the table header
  
  What to display in the cell
  * **field**: Id of the field to display / The table will be produce by a ng-repeat of an array of object, so field is the properties of this object to display
  * **value**: @todo how value is different from field (? deprecated ?)
  * **text** a simple text (not binded, and not using any ng-repeated object properties). Override value
  * **listInstance**: a list by Id as defined in listsInstances.yml
  * **formField** : a form in a table cell 
    - **id**: id of the form to instanciate
  
  * **sortable**: Is the column sortable (by alphabetetical order) / Will display a reorder icon in top of the table
  * **translateHeader**: Should be default / Make the table header translatable
  * **uiSref**: Link with the ui router ui-sref directive syntax
  * **ngHref**: Alternative link system
  * **target**: Target of the link

  Some vizualisation options
  * **valueDetails**: if this field is set a show more icon will allow to diplay a detailed version
  * **tooltip**
    - **position**: (top || bottom ||?) position of the tooltip relative to the text 
    - **value**: what is displayed in the tooltip with "{{ }}" if bindes ex: {{ item.link }}
  * **class**: class to be added to this cell
 

### tablesInstances + listInstances common 

* **ngRepeatItems** : Main data array of objects used by ng-repeat in the expression ng-repeat="item in ngModel"
* **value** : the value to display in the item object. value is always prefixed by item, as item which refere to the ng-repeat "item in items".
*  **listInstance** : id of the list to instantiate, can be used in tables (list in a table cell), or in a list (sublist)

### tablesInstances

* **formId**: id of the form
    * **noHeader** (true || false) : Do we display the table header
    * **defaultTxt** : Text to display when the table is empty
    * **listInstance**: id of the subList to insert in the table column
    * **rawHtml**: chunk of html to be used directly

### listInstances

* **listId**: id of the list

### formsInstances 
* formInstances
  * **formId**: id of the form
    * **title**: Title to display on top of the form
    * **ngSubmit**: submit function to call to submit the form
    * **states**
      * create
        * [Sub Properties to overrides form properties]
      * edit
      * delete
      * ...[Other non standard statesId]
    * **fieldsInstances** : Instances of field Id
      * fieldId1
      * fieldId2
      * ...
