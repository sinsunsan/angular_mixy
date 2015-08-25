## Best pratices

* When naming html properties, use the camel case version of the element 
For example ngClick in yaml file relate to ng-click in html
* use english only : the translation are handled with .po files and then excluded from the configurations files
* always wrap settings in an objects : all blocks configuration are wrapped in object "blocks". This is important when the independants files are merged in one file
* use simple quotes '' always except when you need both types of quotes For example to write an angular expression... In this case, use double quotes "" ouside and '' simple quotes inside  