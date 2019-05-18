console.log('lauching dev watch');
const fs = require('fs');
const cp = require('child_process');
os = require('os');

// DONT USE THIS


// var ps = child_process.spawn('node', ['.\\node_modules\\babel\\bin\\babel.js', 'input.js', '--out-file', 'output.js', '--watch'])

// Use windows taskkill command with \T flag to kill the process and all the child processes started by it:


const path = './dist';
const index = `D:/Work/playground/ng-desktop-app/dist/index.html`;

let desktopApp;

desktopApp = cp.exec('nw .' , (error , stdout , stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
});

const reloadWatcher = fs.watch(path, { recursive: true } , () => {
  console.log('file changed');
    if(os.platform() === 'win32'){
        try{
            cp.execSync('taskkill /pid ' + desktopApp.pid + ' /T /F')
        } catch {
            console.log('app already stopped');
        }
    }else{
        desktopApp.kill();  
    }
    desktopApp = cp.exec('nw .' , (error , stdout , stderr) => {
        if(error) {
            if(error.killed === false) {
                console.log('app not killed yet');
            }
        }
        console.log(stdout);
        console.log(stderr);
    });
});