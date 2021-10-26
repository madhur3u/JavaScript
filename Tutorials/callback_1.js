// without callback
// we are going to do two tasks and see how much time it take without callback
// without call back means, normally, in series like we always do
// node callback_1.js --file1=file1.txt --file2=file2.txt --num=10000

// task 1 -> read from a file 
// task 2 -> store squares of prime numbers in an array till n

let minimist = require('minimist');
let fs = require('fs');
let args = minimist(process.argv);

function check_prime(n){

    for (let i = 2; i < n; i++) {

        if (n % i == 0)
            return false;   
    }
    return true;
}

// task 1 starts
////////////////////////////////////////////////
let t1 = Date.now();                                // this give us time at when task 1 start
console.log('Task 1 start :', t1 % 100000);

    read_text = fs.readFileSync(args.file1 , "utf-8");

let t2 = Date.now();                                
console.log('Task 1 ends :', t2 % 100000);
console.log(t2-t1)
////////////////////////////////////////////////

// task 2 starts
////////////////////////////////////////////////
let t3 = Date.now();                                // this give us time at when task 2 start
console.log('Task 2 start :', t3 % 100000);

    squares =[]

    for (let i = 1; i < args.num; i++) {
        
        if (check_prime(i))
            squares.push(i*i)
        
    }

let t4 = Date.now();                                
console.log('Task 2 ends :', t4 % 100000);
console.log(t4-t3)
////////////////////////////////////////////////

console.log('Total Time',t4-t1)


// node callback_1.js --file1=file1.txt --file2=file2.txt --num=10000
// Task 1 start : 38358
// Task 1 ends : 38453
// 95
// Task 2 start : 38454
// Task 2 ends : 38496
// 42
// Total Time 138