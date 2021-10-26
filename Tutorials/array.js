// array using minimist

let minimist = require('minimist');
let arg = minimist(process.argv);
// node test.js --len=5 --array='1 2 3 4 5'
// give input as string with spaces

n = arg.len
arr = arg.array
arr = arr.split(' ')            // split string to array

let i = 0;
while (i < n) {
    arr[i] = parseInt(arr[i]);  // convert string to Int
    i++;
}

console.log(n, arr);

// array using command line arguments directly

let arg = process.argv;
let n = parseInt(arg[2])                    // length of array at 2nd position

let i = 0;
let array = [];

while (i < n) {
    array.push(parseInt(arg[i + 3]));       // at 2nd post we had length so value of array start from 3rd pos
       //array[i] = arg[i + 3]
    i++;
}

console.log(n,'\n',array)