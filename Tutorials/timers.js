// node timers.js --n=10 --d=500

let minimist = require("minimist");
let args = minimist(process.argv);

let count = args.n;
let time = args.d;

// timers are used to use our function after a particular time repeatedly
// seInterval is used to start timer, this timer will run the function inside its arguments
// it runs after 'time' milliseconds infinitely
// to come out of this timer, we ise clearInterval after our work is done
// we give it the ID of setInterval
// if clearINterval not used then it becomes infinite
let id = setInterval(function(){
    console.log(count + " time units to go.");
    count--;

    if(count == 0){
        console.log("Timeout.")
        clearInterval(id);
    }
}, time);