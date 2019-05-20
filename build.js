'use strict';
console.time('time used');

// build script

/*
1. make the ng build in production mode // ADD THIS
2. put the files needed by nwjc in the build folder
3. list all .js files that will be changed to .bin
4. make the build for every files (delete js files once done)
5. change the <script src=""> in index for a window.nw.EVALBIN....


*/

const exit = function() {
    console.timeEnd('time used');
    process.exit();
}

const args = process.argv
console.log(args);
console.log('remove the exit in build.js to continue the build script');
exit();

const cp = require('child_process');
const fs = require('fs');

let nwjcDir;
let natives_blob_path = null;
let v8_context_snapshot_path = null;
const ngBuildPath = './build';
const jsFiles = [];


// ADD RECURSIVE FOR JS FILES

// create the build here


 // nw.Window.get().evalNWBin(null, 'runtime.26209474bfa8dc87a77c.bin');
// nw.Window.get().evalNWBin(null, 'es2015-polyfills.1e04665e16f944715fd2.bin');


// check where nwjc is

// if OS = windows
cp.exec('where nwjc' , (error , stdout , stderr) => {
    // console.log(stderr);
    if(error) {
        console.log(`nwjc wasn't found, is it in the PATH environment variable ?`);
    } else if(stdout) {
        nwjcDir = stdout;
        console.log('\n \nnwjc.exe is here : ' , nwjcDir);
        console.log('copying needed files');
        // take out the \nwjc.exe at the end
        nwjcDir = nwjcDir.slice(0 , nwjcDir.length - 11);
        fs.readdir(nwjcDir , 'utf8' , (error , data) => {
            for(const file of data) {
                if(file === 'natives_blob.bin') {
                    natives_blob_path = nwjcDir + `\\` + file;
                }
                if(file === 'v8_context_snapshot.bin') {
                    v8_context_snapshot_path = nwjcDir + `\\` + file;
                }
            }
            if(natives_blob_path && v8_context_snapshot_path) {
                copyFileSync(natives_blob_path , ngBuildPath + '/natives_blob.bin');
                copyFileSync(v8_context_snapshot_path , ngBuildPath +  '/v8_context_snapshot.bin');
                console.log('files copied in ' + ngBuildPath);
                listBuildFiles();
            } else {
                console.log('Error , natives_blob.bin and/or ./v8_context_snapshot.bin not found in : ' + nwjcDir);
            }
        });
    } else {
        console.log('something went wrong');
    }
});

const listBuildFiles = function() {
    fs.readdir(ngBuildPath , 'utf-8' , (error , data) => {
        for(const file of data) {
            if(file.slice(file.length - 3 , file.length) === '.js') {
                jsFiles.push(file);
            }
        }
        if(jsFiles.length > 0) {
            console.log('here are the js files found in build folder : ');
            console.log(jsFiles);
            encryptFiles(jsFiles);

        } else {
            console.log('no js file found');
            exit();
        }
    })
}

const encryptFiles = function(files) {
    // ADD file to encrypt selection later
    // with GUI => GUI should propose to select the js files found in the build folder and encrypt the selected ones
    // maybe avoid to encrypt boot.js (if possible encrypt it also)
    // check in working-build for import structure of js scripts and bin scripts
    // all js files should be deleted after encryption
    // bin files should be all put in a bin folder
    // there should be just one boot.js file imported that will handle the binaries import and the shit with window.global needed by angular to be undefined
    console.log('start file encryption');
    for(const file of files) {
        const fileName = file.slice(0 , file.length - 3);
        cp.execSync('nwjc ' + fileName + '.js ' + fileName + '.bin' , {cwd: ngBuildPath});
    }
    console.log('files encrypted , need to add in index their import and delete js files encrypted');
    importEncryptedFilesInIndex();
}

const importEncryptedFilesInIndex = function() {
    let index = fs.readFileSync(ngBuildPath + '/index.html' , {encoding: 'utf8'});
    // const scriptRegex = /<script>\[\s\S]*?\<\/script>/g;
    const scriptRegex = /<script/g;
    let match;

    for(const file of jsFiles) {
        // console.log(file);
        // const regString = '(<script(\\s|\\S)*?(' + file + ')(\\s|\\S)*?><\\/script>)';
        // const regString2 = /(<script(\s|\S)*?( + file + )(\s|\S)*?><\/script>)/g;
        const regex = /(<script (\s|\S)*?><\/script>)/g; // get all <script...></script>
        // const regex = new RegExp( regString3 , 'g');
        // console.log(regex)
        while(match = regex.exec(index)) {
            if(match[0].indexOf(file) !== -1 && match[0].indexOf('src=') !== -1) {
                console.log('matched dynamic regex : ' , match[0]);
                index = index.replace(match[0], ''); // .toString().splice(index.indexOf(match[0]) , match[0].length);
                console.log(index);
                // TODO REMOVE THE SCRIPT TO REMOVE AND REPLACE BY THE NW BIN IMPORT
            }
        }
    }
    // the match should take filenames // 
    // <script type="text/javascript" src="runtime.26209474bfa8dc87a77c.js"></script>
    // <script type="text/javascript" src="es2015-polyfills.1e04665e16f944715fd2.js" nomodule></script>
    // <script %anything% JSFILENAME.JS %anything% /script>

/*     const regx = /(<script(\s|\S)*?(runtime.26209474bfa8dc87a77c.js)(\s|\S)*?><\/script>)/g
    let matchedCount = 0;
    while (match = regx.exec(index)) {
        const matchedString = match[0];
        // console.log('matched regx : ' , matchedString);
    } */
/*     while (match = scriptRegex.exec(index)) {
        // console.log(match);
        const matchedString = match[0];
        // console.log('matched : ' , matchedString);
        matchedCount++;
        // const displayAbleName = matchedString.split(`'`)[0] + `'` + matchedString.split(`'`)[1] + `')`; // or just @get('PATH')
        // const path = match[0].split(`'`)[1].split(`'`)[0];
        // console.log(match.index , displayAbleName , element , 'path : ' + path);
        // endpointCount++;
        // ghost.endpoints.push([match.index , match[0] , element , 'path : ' + path]);
    }
    console.log(matchedCount); */

    // console.log(index);
    exit();
}

const deleteJsFiles = function() {}


// TO FINISH !!!!!!!!!!!

// delete js files
// pack bin files
// dont let user debug on prod
// put all imports in boot.js & delete the <script> imports

/* SHOULD GIVE THIS :

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Desktop App</title>
  <base href="/">
  <!-- import boot script from assets/boot.js -->
  <script type="text/javascript" src="assets/boot.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.eeb28b0834a101b20426.css"></head>
<body>
  <app-root></app-root>
<!--     <script type="text/javascript" src="runtime.26209474bfa8dc87a77c.js"></script>
    <script type="text/javascript" src="es2015-polyfills.1e04665e16f944715fd2.js" nomodule></script>
    <script type="text/javascript" src="polyfills.a16053fa098c27838537.js"></script> -->
<!--     <script type="text/javascript" src="main.f4c286e7f9b6229f12bc.js"></script> -->

  <script>
    window.global = window.nw_global;
      nw.Window.get().evalNWBin(null, 'runtime.26209474bfa8dc87a77c.bin');
      nw.Window.get().evalNWBin(null, 'es2015-polyfills.1e04665e16f944715fd2.bin');
      nw.Window.get().evalNWBin(null, 'polyfills.a16053fa098c27838537.bin');
      nw.Window.get().evalNWBin(null, 'main.f4c286e7f9b6229f12bc.bin');
</script>
  <!--



  -->
</body>
</html>


*/