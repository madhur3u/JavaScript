// Map is itself a function
// Map takes as input a callback fn (with value and index)
// map will call the callback multiple times (once for each value)
// for each run of callback, map will pass v and i to callback
// callback will process the value and index and return a single value
// Single value returned by each run of callback will be collected in a new array
// Map returns that new array

let arr = [2, 5, 9, 8, 15, 11, 6];

// maps using callbacks, make a array of squares of arr values
let sqarr = arr.map(function(value, index){
	console.log(value, index);
    return value * value;
});
console.log('Using callback\n', sqarr);

// map using arrow function, one liner and does same work as above
let sqarr2 = arr.map(v => v * v);
console.log('Using arrow function\n', sqarr2);

// ---------------------------------------------------------------------------------
// using conditionals inside map
// to give true if even else false

// using callback
let evenodd = arr.map(function(v, i){
    if(v % 2 == 0){
        return true;
    } else {
        return false;
    }
});

console.log(evenodd);

// using arrow function
let evenodd2 = arr.map(v => v % 2 == 0);
console.log(evenodd2);

// ---------------------------------------------------------------------------------
// strings and maps
// display 1st name only

let names = ['Miku Ito', 'Sora Amamiya', 'Akari Kitou']

// when there is nothing to return it can be used directly
// and since we dont need index so we gave only one parameter to fn
// but if we need index and not vaue then we need to give 2 parameters
// as index is stored in 2nd parameter only
names.map(function(value) {
	console.log(value.split(" ")[0])
})