# List of yaml data files 

## Directories 

* **yaml**: The original files to edit
* **Json**: Automatically compiled json files (one per yaml original)
* hola.json:  All Json files in one file that is used every where


## Files

The data in the yaml are exploited by the jade mixins and
sometimes at by angular, it the central place to set the specific content of the app

* **General**
  * **settings** Global settings of the app
  * **buttons** : actions buttons 
  * **listInstances** Specific List

* **Forms**
  * **fields** : form individual fields 
  * **forms** : generic forms defaut settings 
  * **formsInstances** Specific form using a set of fields 

* **Page, blocks and menus**
  * **blocks** : small element of the page 
  * **pages** Pages composition
  * **menus** Menus items

* **Tables**
  * **tables** Generic table default settings
  * **tablesColumns** Individual column of a data table 
  * **tablesInstances** Specific table using a specific set of columns