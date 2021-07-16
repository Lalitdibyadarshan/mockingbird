const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

const jsBuildPath = 'build/static/js';
const cssBuildPath = 'build/static/css';

function renameCSS(done) {
    renamefiles(cssBuildPath);
    done();
}

function renameJS(done) {
    renamefiles(jsBuildPath);
    done();
}

function removeIndexHtml(done) {
    fs.unlinkSync(path.resolve(__dirname, 'build/index.html'));
    done();
}

function removeMapFiles(done) {
    let jsFiles = fs.readdirSync(path.resolve(__dirname, jsBuildPath));
    jsFiles.forEach((file) => {
        if (file.endsWith('map')) {
            fs.unlinkSync(path.resolve(__dirname, jsBuildPath, file));
        }
    });
    done();
}

function renamefiles(contextPath) {
    let locatedFiles = fs.readdirSync(path.resolve(__dirname, contextPath));
    locatedFiles.forEach(file => {
        const oldPath = path.resolve(__dirname, contextPath, file);
        const newFileName = file.replace(/\.[a-zA-Z0-9]+\./, '.');
        const newPath = path.resolve(__dirname, contextPath, newFileName);
        fs.rename(oldPath, newPath, (err) => {
           if(err) throw err;
        });
    });
};

function moveBackgroundJs(done) {
    fs.renameSync(
        path.resolve(__dirname, 'build/static/js/background.js'),
        path.resolve(__dirname, 'build/background.js'),
        (err) => {
            if (err) throw err;
        });
    done();
}

function moveContentCss(done) {
    gulp.src('./src/chrome/styles/content.css')
        .pipe(gulp.dest('./build/static/css'));
    done();
}

exports.renameBuildFiles = gulp.parallel(gulp.series(removeMapFiles, renameJS, moveBackgroundJs), renameCSS, removeIndexHtml, moveContentCss);
