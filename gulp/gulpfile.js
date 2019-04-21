
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
// var sourcemaps = require('gulp-sourcemaps');
// var assign = require('lodash.assign');
var es = require('event-stream')
const rename = require('gulp-rename')
const glob = require('glob')
const spwan = require('child_process').spawn
const del = require('del')
const uglify = require('gulp-uglify')
const lazypipe = require('lazypipe')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const inject = require('gulp-inject')
const gulpSequence = require('gulp-sequence')

const BUILD_DIR =  'dist'

let x = []

let lazyRev = lazypipe()
  .pipe(buffer)
  // .pipe(uglify)
  .pipe(rev)
  .pipe(gulp.dest, BUILD_DIR)

let lazyManifest = lazypipe()
  .pipe(rev.manifest, 'dist/m.json', {
    base: 'dist',
    merge: true
  })
  .pipe(gulp.dest, BUILD_DIR)


function bundle (b, entry) {
  console.log(entry)

  return b.transform('babelify', {
      presets: [
        '@babel/preset-env',
      ],
      plugins: []
    })
    .bundle()
    .on('error', function (err) {
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source(entry))
    .pipe(rename({
      // extname: '.bundle.js'
    }))
    .pipe(lazyRev())
    
}

function bundle2 (b, entry) {

  return b.transform('babelify', {
      presets: [
        '@babel/preset-env',
      ],
      plugins: []
    })
    .bundle()
    .on('error', function (err) {
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source(entry))
    .pipe(rename({
      // extname: '.bundle.js'
    }))
    .pipe(lazyRev())
    .pipe(lazyManifest())
    
}
    
// 清空目录
gulp.task('clean', cb => {

  return del(['./dist']) 
})

// 修改gulpfile重启任务
gulp.task('gulp-reload', cb => {

  let p

  function spawnChildren (e) {
    p && p.kill()

    p = spwan('gulp', ['dev'], { stdio: 'inherit' })
  }

  gulp.watch('gulpfile.js', spawnChildren)

  spawnChildren()
})

// polyfill
gulp.task('js', function (cb) {

  glob('./entry/**/*.js', (err, files) => {

    if (err) cb(err)

    let tasks = files.map(function (entry) {

      const b = browserify({
        entries: [entry],
        plugin: [watchify],
        debug: true
      })

      x.push({ b, entry })
      // b.on('update', bundle.bind(null, b, entry))

      return bundle(b, entry)

    })

    return es.merge(tasks)
      .on('end', cb)
      .pipe(lazyManifest())
  })
})

function watchTask () {
  x.forEach(({ b, entry }) => {
    b.on('update', bundle2.bind(null, b, entry))
    b.on('log', gutil.log)
  })
}

gulp.task('watch', ['js'], cb => {
  watchTask()
  cb()
})

gulp.task('rev', ['watch'], cb => {
  return gulp.src([`dist/m.json`, 'pages/pageB.html'])
    .pipe(revCollector())
    // .pipe(revCollector({
    //   replaceReved: true,
    //   dirReplacements: {
    //     // 'css': '/dist/css',
    //     '/js/': '/dist/entry/',
    //   }
    // }))
    .on('error', gutil.log)
    .pipe(gulp.dest( BUILD_DIR))
})

gulp.task('dev', ['js', 'watch', 'rev'])

gulp.task('default', ['clean', 'gulp-reload'])