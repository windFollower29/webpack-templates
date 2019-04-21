const gulp = require('gulp')
// const watch = require('gulp-watch')
const watch = gulp.watch
const filter = require('gulp-filter')
const glob = require('glob')
const logger = require('gulp-logger')

const eventTypes = require('./eventTypes')

gulp.task('copyjs', (done) => {

  return gulp.src('./entry/**/*.js')
    .pipe(gulp.dest('dist'))

})

// gulp.task('watchjs', (done) => {

//   return gulp.src('./entry/**/*.js')
//     .pipe(watch('./entry/**/*.js'))
//     .pipe(logger({
//       before: 'Starting replace...',
//       after: 'replacing complete!',
//       // extname: '.js.gz',
//       showChange: true
//     }))
//     .pipe(filter(eventTypes.isChanged))
//     .pipe(gulp.dest('dist'))
// })

gulp.task('watchjs', (done) => {

  return gulp.watch('./entry/**/*.js', (file) => {
    console.log('====', file)
    gulp.src(file.path)
      .pipe(logger({
        before: 'Starting replace...',
        after: 'replacing complete!',
        showChange: true
      }))
      .pipe(gulp.dest('dist'))
  })
})

gulp.task('copy', ['copyjs'])
gulp.task('watch', ['watchjs'])

gulp.task('default', ['copy', 'watch'])

