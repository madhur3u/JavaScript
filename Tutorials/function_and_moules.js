let minimist = require('minimist');
let arg = minimist(process.argv);
// taking low and high from command line, and printing squares from low to high 
// node test.js --low=2 --high=10  input using minimist

print_squares(arg.low, arg.high);           // function call

function print_squares(low, high) {         // function defining
    for (let i = low; i <= high; i++) {
        console.log(i*i);
    }
}
