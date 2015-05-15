# JADE UIKIT / List of jade UI mixins 

## List elements

* **[angularTables](../mixins/list/_tables.jade)** : Simple tables system : user columns instances that can be of different types : 
    * binded field
    * sublist 
    * form
    * raw html
* **[tableView](../mixins/list/_tables.jade)** : a table with a header button

## Blocks

Reusable elements that can be used several times on a single page 

* **[pageBlock](../mixins/ui/_pageElements.jade)** Generic wrapper for page block 
    Page block has the following configurable properties
    * Title : the displayed title of the block
    * Toolbar : a list of buttons (buttonsInstances)
    
    Only the header is configurable, the content is wrapped
