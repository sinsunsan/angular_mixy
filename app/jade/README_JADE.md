# holafront
Holaspirit Frontend

# Fresh install

## Main dependencies 

* node
Installation depend of the system http://nodejs.org/

* npm
https://github.com/npm/npm
```shell
curl -L https://npmjs.com/install.sh | sh
```

* bower / Client side depencies 
```shell
npm install -g bower
```

* ruby 
https://www.ruby-lang.org/en/documentation/installation/
Sous Debian
`apt-get install ruby1.9.1 ruby1.9.1-dev`

Sass and compass need to installed with sudo 
* sass (dependent of ruby)
```shell
sudo gem install sass
```

* compass (dependent of sass)
```shell
sudo gem install compass
```

Note: the ruby dependency can be removed later, if we get rid of compass
which is possible (as we user autoprefixer). This will make possible to use 
ruby free sass lib which are faster to compile...

The grunt sass compiler will then be 
https://www.npmjs.com/package/grunt-libsass


## Clone the projet

### Short method
```shell
make dist
```
Make process is defined in the Makefile file at the root of the project

### Long method 
* Clone the repo
```shell
git clone git@github.com:talkspirit/holafront.git
```


* install all project specific node packages with npm
```shell
npm install
```

* install all front end dependencies in bower_components directory
```shell
bower install
```

* Grunt build will compile all elements not already compiled (html, json...) and do all minification and postprocess tasks
```shell
grunt build
```

## Known issues

## Tests

### Launch cucumber tests

./node_modules/.bin/protractor ./test/protractor/cucumber.conf.js

### Launch test with phantomjs

* First install globally phantomjs
```shell
npm install -g phantomjs
```

* Run phantom as webdriver 
```shell
phantomjs --webdriver==4444
```

* Run test
```shell
./node_modules/.bin/protractor ./test/protractor/cucumber.conf.js --browsername phantomjs
```

# How to create a new page 

* Create the page in the app router (Ui router) :appRouting.js
* Create the jade file in the directory app/jad/pages 
* Create specific mixins of page blocks or reuse existing blocks
* Fill page information in yaml files
* If the page is public (don't need authentication)
    * add it's states id in APP.PUBLIC_PAGES in "APP" angular service
    * add this settings to the state (@todo find other solution to exploit APP.PUBLIC_PAGES Service)
    ```js
    data: {
        publicPage: true
    }
    ``
# How to create a modal page 

# How to create a table page 

* add the page jade page with the mixin +tableView('circles')
* create the column definition if the columns types has not already been used in another tables in tables.yml
* Create a new table instance, and add column instances (tables.yml)
* Add the correct ngModel > the scope property where the ressource to be listed in tables will be available.
* By default for list items pages, the ressource which has the same name as the Ui router state name is loaded, so you don't need to edit any js. For exemple if the states is "circles" the ressource circles will be available in "main.data.user.circles" / So we only have to tell in the yaml where is this data, but the data it self is loaded anyway
* save the yaml, it will recompile all jade files 
* It may be necessary to restart the express server

# How to create a new menu item 
* add the menu entry in menu.yml in the specific menu zone 

# How to create a new public page 
Public pages are pages that don't require you to be signed in
* add the page state name in APP.PUBLIC_PAGE Constant, this list of pages is used to determined if you ought to redirect to signin if the user is not conneceted or not 

# Grunt plugins 

* **wiredep**: Autofill html js and css with information coming from bower.json
* **Jade** : Only unprefixed jade file are recompiled when one of them has changed, we don't recompile automatically when only a mixin file (prefixed by _) is changed 
* ... 

# Architecture 

### [Yaml Configuration files](./app/data/README.md)

### [Stylesheets](./app/styles/README.md)

### [Angular app and js](./app/scripts/README.md)

### [JAde Templating](./app/jade/README.md) 
