// init a ng desktop project
// create angular project
// add fs, nw to global in angular interface
// init package with name, scope, index
// ask for default port for ng serve & node remote + main in package.json
// maybe if port is already use, change it automatically
// add the build scripts, distro scripts etc...

console.log('init a desktop app');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", function(name) {
    rl.question("Where do you live ? ", function(country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});