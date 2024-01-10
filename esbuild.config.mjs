import { build } from 'esbuild'
import {sassPlugin} from 'esbuild-sass-plugin'
import fs from 'fs';
import copydir from 'copy-dir';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

build({
  entryPoints: {
    main: './src/main/js/main.js',
  },
  entryNames: 'index',
  outdir: './dist',
  assetNames: '.[dir]/',
  chunkNames: 'index.js',
  loader: {
    '.js': 'jsx',
    '.ts': 'ts',
    '.jpg': 'dataurl',
    '.png': 'file',
    '.cur': 'file',
    '.html': 'file',
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  metafile: true,
  publicPath: '/',
})

build({
  entryPoints: {
    main: './src/main/html/main.html',
  },
  outdir: './dist',
  assetNames: './index',
  chunkNames: 'index.html',
  loader: { '.html': 'file' },
});

build({
  entryPoints: {
    main: './src/main/css/main.scss',
  },
  entryNames: 'index',
  outdir: './dist',
  assetNames: 'index',
  chunkNames: 'index.css',
  bundle: true,
  watch: true,
  plugins: [
    sassPlugin({
        async transform(source) {
            const { css } = await postcss([autoprefixer]).process(
                source
            );
            return css;
        },
    }),
    ],
  loader: { '.css': 'file' },
});

// if ./dist is not exist, mkdir
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

copydir.sync('./assets', './dist/assets', {
  utimes: true, // keep add time and modify time
  mode: true, // keep file mode
  cover: true, // cover file when exists, default is true
});