## Generic properties in all yaml 

* **Html properties**
  * **class** : class to add to the element 

* **Angular core properties**
  * **ngShow** : Angular ng-show
  * **ngHide** : Angular ng-hide
  * **ngChange** : Angular ng-change
   
* **Angular libs properties**
  * **uiSref** : Angular UI router ui-sref
  
## Data structure per data file

### pages
Global settings of a page, insertion of it's block 

* **pages**:
  * **id**: unique id of the page (will be used as call identifier)
  * **blocks** : page elements
    * **id**: unique id of the block (will be used as call identifier)
    * **title** : title of the block 
    * **titleClass** : class applied to title element
    * **toolbar** : groups of buttons (toolbar) displayed under the block title and above it's content

### Buttons 
  
* **buttons**
  * **buttonId** Unique identifier of the button
    - **parent**: parent button to copy properties from
    - **title**: Title that display on mouse over / If not set the label is useful
    - **label**: Visible button label
    - **ngShow**: Expression to make the button visible
    - **ngHide**: Expresssion to hide the button
    - **ngClick** Expression to trigger when click on the button
    - **uiSref**: Link with ui-sref syntax
    

