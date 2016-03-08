import child from 'child_process'
import gulp from 'gulp'
import gulpUtil from 'gulp-util'


gulp.task('default', ['pm2-dev', 'watch'])

gulp.task('watch', () => {
  gulp.watch('test/**/*.js', ['mocha'])
})

gulp.task('pm2-dev', cb => {
  child.spawn('pm2-dev', ['--raw', 'package.json'], {
      stdio: 'inherit',
      env: Object.assign({}, process.env, {
        DEBUG: 'app:*,koa*,mquery,socket.io:*,-socket.io:client',
      }),
    })
    .on('exit', cb)
})

gulp.task('mocha', cb => {
  child.spawn('mocha', [], {
      stdio: 'inherit',
    })
    .on('exit', () => cb()) // ignore error bcs mocha print error.
})


process.on('SIGINT', function() {
  child.spawn('pm2', ['kill'], {
      stdio: 'inherit',
    })
    .on('exit', () => process.exit(0))
})

process.on('uncaughtException', (err) => {
  gulpUtil.log('uncaughtException', err)
})
