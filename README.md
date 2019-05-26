# NOT USABLE YET IN PROD

# Angular 7 Desktop QuickStart with nw (node webkit)

    `npm i` to install (long install)
    `npm run dev:build` to build the app in dist folder and watch changes
    `npm run dev:serve` to serve the build on disk in dist folder
    `npm run dev:start` to start the app with nw and reload if there are changes (wait for build + server launch before starting nw)

    UPDATES (get rid of lite-server and electron for now)

    `npm run ng:serve` to serve the app on port 8000 (change it later)
    `npm run build:prod` to build the project for production // finish the build.js script
    `npm run build:package` to build the project package

    later change all commands for simplier ones
    in package launch js scripts with npm run "command": "node code.js";

    can pass argument with : npm run build:prod -- --output-dir banane --encrypt

# Steps
    1. create angular app
    2. dev:build line : ```cd desktop-app && ng build --watch --output-path=../dist --base-href=.```
    3. added lite-server
    4. add nw to global with polyfills in window.nw
    5. add fs to global with polyfills in window.fs
    6. keep track of window.global in index.html
    7. added require('fs') in index.html
    8. add a lite-server-config file to forbidd opening and choose port for local dev
    9. add node-remote: 'http://localhost:port' and main: 'http://localhost:port'
       1.  node remote is very important

# Things to do
    1. build the app for production
    2. protect source code in production
    3. add electron support // ELECTRON SUPPORT WILL NOT WORKS WITH CODE PROTECTION
    4. make a better dev workflow
    5. add types and node methods/classes
    6. add the npm run commands to vs code tasks
    7. forbid opening in browser (any it can't work)

# Things to upgrade
    1. use nw on the disk directly instead of using lite-server
    2. reload page on dist folder changes, using location.reload() which will be faster than current method
    3. launching => wait for angular to finish build, then launch server, then launch the app
    4. "window": {"frame": false,"transparent": false} => 
    5. make a node package from build sources => using https://github.com/evshiron/nwjs-builder-phoenix
    6. IMPORTANT => make build for mac / unix / other win flavors with nwjc js => bin.
       1. WHY ? nwjs builder phoenix will build for win, mac etc... BUT the build with nwjc to bin will work only on the system where it was created
       2. FOR EXAMPLE => if you use nwjc on windows 10 it will work on win 10 only
       3. SO ? => make some virtual machines with auto generation of bin files
    7. LATER => make the builds during development
       1. this is to be faster !
       2. make ng build prod --watch => on change update the build of production and make bin files on the fly
       3. creating the package is the very last thing to do (and it's long)
    8. SEPARATE bin files to have only a exe in the principal folder of the app => this means updating the link to .bin files in boot.js
    9. CREATE THE PACKAGES ON THE FLY WITH INFOS FOR BUILD, FOR TRANSPARENT FRAMES, node-remote, ETC..., 
    10. control the host for dev => if user change local dev server port, restart the app
        1.  change port automatically if taken
    11. ADD draggable areas  : https://github.com/nwjs/nw.js/issues/2680 / https://github.com/nwjs/nw.js/wiki/Frameless-window
        1.  make a frameless transparent window with a header that can be dragged
    12. make a command line tool that will handle the creation of ng desktop app
    13. dont take the package with nw and install out of the angular interface
        1.  ng interface must be mixed with nw . as it will take the new installations
        2.  all needed stuff should be put first in global interface of polyfills
        3.  cant use the native nodejs module sadly...
        4.  finish the command line that will create the ng interface + change polyfills + change package scripts + install nw if needed + change index.html
# Packaging nwjs

{
  "name": "build",
  "version": "1.0.0",
  "description": "",
  "main": "index.html",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dist": "build --tasks win-x86,win-x64,linux-x86,linux-x64,mac-x64 --mirror https://dl.nwjs.io/ .", // full build linux, mac etc...
    "start": "run --x86 --mirror https://dl.nwjs.io/ ."
  },
  "author": "",
  "license": "ISC",
  "build": {
    "nwVersion": "0.38.3" // dynamic version
  },
  "devDependencies": {
    "nwjs-builder-phoenix": "^1.15.0"
  }
}



# Bugs
    1. on lite server reload, the ng build watch doesn't have the time to actually change the file


# Lite Server Config // DELETE LITE SERVER AFTER AND ELECTRON (this will make a lighter build too)
{
    "open": false, // open or not
    "port": 8000, // port
    "server" : { "baseDir": "./dist" }, // base directory
    "files": null, // track files or not
    "notify": false // show badge 'browsersync connected' or not
}