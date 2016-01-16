var _ = require('lodash');
var gulp = require('gulp');
var debug = require('gulp-debug'); // debug files streams
var gulpCopy = require('gulp-copy');
var runSequence = require('run-sequence');

var app = "./app/"
var mixyDest = "./app/lib/angular_mixy/app/";
var mixyDestNameSpace  = "ars";


// locate the component directory in the current app
var componentsDir = {
  jade: app + "jade/mixins/ui/",
  scss: app + "styles/arsultima/ui/",
  scssVar: app + "styles/arsultima/variables/",
  yml: app + "data/yaml/",
};
// locate the component directory in the destination library
var componentsDest = {
  jade: mixyDest + "jade/_global_ui/mixins/ui/" + mixyDestNameSpace,
  scss: mixyDest + "styles/_global_ui/mixins/ui/" + mixyDestNameSpace,
  scssVar: mixyDest + "styles/_global_ui/mixins/vars/" + mixyDestNameSpace,
  yml: mixyDest + "data/yaml/" + mixyDestNameSpace,
};

var componentsFiles = {
  jade: [],
  yml: [],
  scss: []
};

var componentsName = [
  'subheader',
  'contact',
  'footer',
  'block'
];
// the part should match the file extension
var componentsParts = [
  'jade',
  'scss',
  'yml'
];
var componentsPartsOpts = {
  jade: {
    prefix: '_',
    ext: 'jade',

  },
  scss: {
    prefix: '_',
    ext: 'scss'
  },
  yml: {
    prefix: '',
    ext: 'yml',
    name: 'contactBlock',
  }
};

_.each(componentsName, function(name) {
  _.each(componentsParts, function(part) {
    var fileName = name;
    if (componentsPartsOpts[part].name)  {
      fileName  = componentsPartsOpts[part].name;
    }
    componentsFiles[part].push(componentsDir[part] + componentsPartsOpts[part].prefix + fileName + '.' + componentsPartsOpts[part].ext);
  });
});
// Copy paste element in mixy library

// List all yaml files to sync
_.each(componentsParts, function(part) {
  gulp.task('mixy:' + part, function() {
    console.log('The list of files of type ' + part + ':', componentsFiles[part]);
    gulp.src(componentsFiles[part])
    .pipe(debug())
    .pipe(gulp.dest(componentsDest[part]));
  });
});

// Auto copy the gulp file it self for further componentisation!
gulp.task('mixy:gulp', function() {
  gulp.src('./gulpMixy.js')
  .pipe(debug())
  .pipe(gulp.dest(mixyDest));
});

// Auto copy the gulp file it self for further componentisation!
gulp.task('mixy:scssVar', function() {
  gulp.src(componentsDir.scssVar + '_ui.scss')
  .pipe(debug())
  .pipe(gulp.dest(componentsDest.scssVar));
});

gulp.task('mixy', function() {
  runSequence(['mixy:yml', 'mixy:scss', 'mixy:jade', 'mixy:gulp','mixy:scssVar'])
});
