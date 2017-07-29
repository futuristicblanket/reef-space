var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    env: {
      'NODE_ENV': 'development'
    }
  })
});

gulp.task('prod', function () {
  nodemon({
    legacyWatch: true,
    env: {
      'NODE_ENV': 'production'
    }
  })
});
