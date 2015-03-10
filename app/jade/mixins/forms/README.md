### exemple grunt file

```
jade: {
  dist: {
    // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
    expand: true, //Enable dynamic expansion.
    cwd: 'app/jade', // Src are relative to this path
    // We use _ to differentiate pages from mixins
    src: ['**/*.jade', '!**/_*.jade'],
    dest: 'app/views',
    flatten: true,
    ext: '.html', // will be apended to the original file name without extension
  },
  options: {
    doctype: 'html',
    client: false,
    pretty: true, // Output HTML in indented style
    data: function(dest, src) {
      return {
        gData: grunt.file.readJSON('app/data/hola.json'),
        _: _, // Make lodash available in jade templates
        util: require('./app/jade/mixins/forms/global/_jadeUtil.js') // load utility function
      };
    }
  },
```
### Grunt configuration

The util library is necessary so if
util: require('./app/jade/mixins/forms/global/_jadeUtil.js') // load utility function
is not correctly set, it will fail

### Make gData available to js jade function (@todo improve this)

Also the util library load directly the json configuration file
var gData = require('./../../../../../data/hola.json');
This is not a good pratice but temporarly it works
@todo how to defined the json file in the grunt >
require the util library, and in the same context make other files available

