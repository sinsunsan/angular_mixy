# Data configuration files 

## Directories 

* yaml: The original files to edit
* Json: Automatically compiled json files (one per yaml original)
* hola.json:  All Json files in one file that is used every where

## best pratice for naming the properties

* When naming html properties, use the camel case version of the element 
For example ngClick in yaml file relate to ng-click in html
* use english only : the translation are handled with .po files and then excluded from the configurations files
* always wrap settings in an objects : all blocks configuration are wrapped in object "blocks". This is important when the independants files are merged in one file
* 
## Subblock and standard properties 

In the following example:
id, title, text are standard propertis

```yml
blocks:
  signin:
    id: 'signin'
    title: '#holaSpirit'
    forgotPassword:
      title: "Hello worl"
      text: "Have an access problem ? "
      ngClick: "main.fn.askPasswordReset()"
```

## List of yaml data files 

The data in the yaml are exploited by the jade mixins and
sometimes at by angular, it the central place to set the specific content of the app

* **settings** Global settings of the app

* **Forms**
* **fields** : form individual fields 
* **forms** : generic forms defaut settings 
* **formsInstances** Specicic Form using a specific set of fields 

* **Page, blocks and menus**
* **blocks** : small element of the page 
* **pages** Pages composition
* **menus** Menus item

* **buttons** : actions buttons 

* **listInstances** Specific List

* **Tables**
* **tables** Generic table default settings
* **tablesColumns** Individual column of a data table 
* **tablesInstances** Specific table using a specific set of columns
