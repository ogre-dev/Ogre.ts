/* eslint-disable no-console */
import gulp, { series } from 'gulp';
import del from 'del';
import { createProject } from 'gulp-typescript';
import fs from 'fs';

gulp.task('clean', async () => del(['dist', 'docs', 'coverage']));

gulp.task('license', async () => {
  const year = new Date().getFullYear();

  fs.writeFile(
    'LICENSE',
    'MIT License\n'
    + '\n'
    + `Copyright (c) ${year === 2021 ? 2021 : `2021-${year}`} Maxence Maire <framework@ogre.dev>\n`
    + 'Permission is hereby granted, free of charge, to any person obtaining a copy\n'
    + 'of this software and associated documentation files (the "Software"), to deal\n'
    + 'in the Software without restriction, including without limitation the rights\n'
    + 'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n'
    + 'copies of the Software, and to permit persons to whom the Software is\n'
    + 'furnished to do so, subject to the following conditions:\n'
    + '\n'
    + 'The above copyright notice and this permission notice shall be included in all\n'
    + 'copies or substantial portions of the Software.\n'
    + '\n'
    + 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n'
    + 'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n'
    + 'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n'
    + 'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n'
    + 'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n'
    + 'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n'
    + 'SOFTWARE.',
    (error) => {
      if (error) {
        console.error(error);
        throw new Error('error when generating license file');
      }

      console.log('license successfully generated');
    },
  );
});

gulp.task('build', async () => (
  gulp
    .src('lib/**')
    .pipe(createProject('tsconfig.json')())
    .pipe(gulp.dest('dist'))
));

gulp.task('package', series(['clean', 'build', 'license']));