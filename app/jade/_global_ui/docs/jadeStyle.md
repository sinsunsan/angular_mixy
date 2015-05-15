# Jade Style

### Learn Jade
* http://jade-lang.com
* http://naltatis.github.io/jade-syntax-docs
* http://www.learnjade.com

### How we use jade
We don't use all jade stuff

What we use a lot  : Mixins

To define it

```jade
mixin wrapper
  div(class="wrapper")
    h1 Title of the wrapper
    p text to display
```
To use it
```jade
+wrapper
```

Adding arguments
```jade
mixin wrapper(data)
  div(class="wrapper")
    h1=data.title
    p=data.para
```
Passing argument data to the mixin
```jade
+wrapper({title:"hello world", para:"jade is a powerful template language"})
```
Using a global grunt loaded js variable
```jade
+wrapper(gData.wrapper.title)
```
Define block in mixin to use one mixin for multicases or do wrapper
```jade
mixin wrapper(data)
  div(class="wrapper")
    h1=data.title
    block
```
passing custom element inside the mixin with the block system
```jade
+wrapper({title: "hello word"})
    div Jade is a fun template language
```

What we don't use :

* **include** : except to load a library, don't use to combine several page element > using mixins is much more flexible and powerful
* **extends** : the extends system is powerful, but not as flexible as the mixins expecially for variable scope.. so we barely use it

### Defining dynamic value

Once the data is available we need to apply it to html attributes or value
this way is the cleanest
```jade
span(ng-click=blockData.noAccount.ngClick)=blockData.noAccount
```
If blockData.noAccount.ngClick doesn't exist or return false, the ng-click attribute won't be printed in the final html

To combine dynamic data with fix data
```jade
- var specificClass = "clear";
- var jobTitle = "developer";
span(class="col-xs-3 #{specificClass}") My job is #{jobTitle}
```
In specificClass is undefined, it will print undefined in the list of class !

### Styles and best practices

* when there is lot's of argument, leave a line between each
try to left align all arguments and put , that separate each argument at the end of the line
```jade
  div(class="edit-hover-btn",
      ng-mouseover="'btnDisplay = true'",
      ng-mouseout="'btnDisplay = false'",
      ng-click="edit.fn(edit.item)",
      ng-show="btnDisplay")
```
* Write the file name in camel Case

Yes : 
_forgotPassword.jade 

No 
_forgot-password.jade or _forgot_password.jad


* don't use .jade in include file, write file extension only if the file to include is not a jade file

yes 
include blocks/_footer

no
include blocks/_footer.jade

yes
include blocks/_functions.js
include blocks/_functions.html

* Prefer splitting file that making hundreds mixins files 

It's easier to find visually a file in a tree that digging in a unique file, so to able to find thing without using the search, it's important to split in files elements that are related

### Passing configuration data in jade

* directly in the file

```jade
- var myClass = "col-xs-3";
```

* globally with grunt

```js

    jade: {
      ...
      options: {
        doctype: 'html',
        client: false,
        pretty: true, // Output HTML in indented style
        data: function(dest, src) {
          return {
            gData: grunt.file.readJSON('app/data/hola.json'),
            _: _, // Make lodash available in jade templates
            util: require('./app/jade/mixins/forms/global/js/_formFn.js') // load utility function
          };
        }
      },
   }
```

