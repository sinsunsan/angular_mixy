# angular-mixy-start

### Dependencies

Lodash and merge-default are required libraries
"merge-defaults": "^0.2.1"


### Include the main jade lib 

In you jade main file include the lib main file
```
include angular_mixy/dist/_global_ui.jade
```

### Configure your grunt file 

Example of jade section of the file

Load the main concatanated json file
```
gData: grunt.file.readJSON('app/data/hola.json'),
```

Load lodash to be used in the templates
```
_: _, // Make lodash available in jade templates
```

Load utility function (Change the path to match your installation)
```
util: require('./angular_mixy/dist/jade/js/formFn.js')
```

```
jade: {
  app: {
      expand: false,
      src: ['<%= yeoman.app %>/jade/index.jade'],
      dest: '<%= yeoman.app %>/index.html',
      ext: '.html'
  },
  options: {
    doctype: 'html',
    client: false,
    pretty: true, // Output HTML in indented style
    data: function(dest, src) {
      return {
        gData: grunt.file.readJSON('app/data/hola.json'),
        _: _, // Make lodash available in jade templates
        util: require('./app/jade/_global_ui/js/formFn.js') // load utility function for global_ui libs
      };
    }
  },
}
```