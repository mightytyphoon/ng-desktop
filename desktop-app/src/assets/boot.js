if(typeof require !== 'undefined') {
        // create the nw_global 
        window.nw_global = window.global;
        window.global = undefined;
        window.fs = require('fs');
        window.cp = require('child_process');
        // add other node modules here
    } else {
    // alert('this app must not run in browser');
        console.log("This is a desktop app, forbidden to run in browser");
    }