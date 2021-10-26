// with callback
// we are going to do two tasks , since both task are different one use DISK, one uses CPU
// we will do the in parallel
// node callback_2.js --file1=file1.txt --file2=file2.txt --num=10000

// task 1 -> read from a file   DISK
// task 2 -> store squares of prime numbers in an array till n  CPU

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

    fs.readFile(args.file1, 'utf-8', function(err, data){

        let t2 = Date.now();                                
        console.log('Task 1 ends  :', t2 % 100000);
        console.log(t2-t1);
        console.log(data);
    })
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
console.log('Task 2 ends  :', t4 % 100000);
console.log(t4-t3)

console.log(squares)
////////////////////////////////////////////////


// node callback_2.js --file1=file1.txt --file2=file2.txt --num=10000
// Task 1 start : 23129
// Task 2 start : 23138
// Task 2 ends : 23188
// 50
// Task 1 ends : 23245
// 116

// here we can see task 2 start immediately after task 1 has started and task 2 complets before task 1 as it is taking less time
// so we did parallel operations here

// fs.readFile(args.file1, function(read_text){
//     let t2 = Date.now();                                
//     console.log('Task 1 ends :', t2 % 100000);
//     console.log(t2-t1);
// })

// what readfile is doing is, it will execute the function when reading is comlete
// and it also allows the program to do other task while it is performing the given task
// task2 stared immediately after task1