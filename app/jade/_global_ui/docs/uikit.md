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
    * **title** : the displayed title of the block
    * **toolbar** : a list of buttons (buttonsInstances)
    * **anchorLink**: 
        - **id**: the id of the anchor, it could a string or an expression
        - **idType**: 'bind' || 'string' Tell if we have an angular expression or a simple string
    Only the header is configurable, the content is wrapped

* **pageHeader** Header of the page 
    * **title** : Non angular binded title 
    * **ngBind** : Angular binded title (that replace the title when the js is loaded)

* **pageHeaderBar** Header of the page including toolbar
    The same as pageHeader plus the following
    * **subtitle** : Subtitle
    * **toolbar**: id of toolbar instance
    * **breadcrumb**: id of a breadcrumb

* **pageTitle** Title of the page 
    * **ngBind** : Angular binded value
    * **title** : Static value (will be overriden by ngBind if provided)
