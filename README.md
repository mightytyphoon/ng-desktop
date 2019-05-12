# NOT USABLE YET IN PROD

# Angular 7 Desktop QuickStart with nw (node webkit)

    `npm i` to install
    `npm run dev:build` to build the app in dist folder and watch changes
    `npm run dev:serve` to serve the build on disk in dist folder
    `npm run dev:start` to start the app with nw and reload if there are changes

# Steps
    1. create angular app
    2. dev:build line : ```cd desktop-app && ng build --watch --output-path=../dist --base-href=.```
    3. added lite-server
    4. add nw to global with polyfills in window.nw
    5. add fs to global with polyfills in window.fs
    6. keep track of window.global in index.html
    7. added require('fs') in index.html

# Things to do
    1. build the app for production
    2. protect source code in production
    3. add electron support
    4. make a better dev workflow
    5. add types and node methods/classes
    6. add the npm run commands to vs code tasks
    7. forbid opening in browser (any it can't work)

# Things to upgrade
    1. use nw on the disk directly instead of using lite-server
    2. reload page on dist folder changes, using location.reload() which will be faster than current method