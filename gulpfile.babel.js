import {src, watch, dest} from 'gulp';
import {create} from 'browser-sync';
const browserSync = create(),
  reload = browserSync.reload,
  paths = {
    styles: {
      src: 'src/styles/**/*.css',
      dest: 'assets/styles/'
    },
    scripts: {
      src: 'src/scripts/**/*.js',
      dest: 'assets/scripts/'
    },
    html: {
      src: './*.html'
    }
  };


export function scripts() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest));
}

export function styles() {
  return src(paths.styles.src)
    .pipe(dest(paths.styles.dest));
}

export function browserSyncServer() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

function watchFiles() {
  watch(paths.scripts.src, scripts);
  watch(paths.styles.src, styles);
}
export { watchFiles as watch };

function defaultGulpTask() {
  browserSyncServer();
  watchFiles();
  watch([ paths.styles.src, paths.styles.src, paths.html.src ], reload);
}

export default defaultGulpTask;
