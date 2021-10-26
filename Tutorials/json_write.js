// npm init
// npm install minimist
// node json_write.js --file=va.json

// writing a JSON file 
// in this we will convert a JSO to JSON and then write in file

let minimist = require('minimist');
let fs = require('fs');

let args = minimist(process.argv);

// we will write this JSO 
// into file given in args.file
// after converting JSO -> JSON
VA = [
    {                               // data within {} is an object
        name: 'Miku',               // name, age and roles are properties of the object
        age: 24,
        roles: [                    // we can also use a object to define a property [ {}, {} ] in this format
            {
                name: 'Nakano Miku',
                anime: 'The Quintessential Quintuplets'
            },
            {
                name: 'Shimamura',
                anime: 'Adachi to Shimamura'
            }
        ]
    },
    {
        name: 'Hana',
        age: 30,
        roles: [
            {
                name: 'Ichika',
                anime: 'The Quintessential Quintuplets'
            },
            {
                name: 'Onodera Kosaki',
                anime: 'Nisekoi'
            }
        ]
    },
    {
        name: 'Rie',
        age: 27,
        roles: [
            {
                name: 'Megumin',
                anime: 'Konosuba'
            },
            {
                name: 'Emilia',
                anime: 'Re:Zero'
            }
        ]
    }
];

// the above created object is known as JSO -> JAVA SCRIPT OBJECT
// we need a JSO to make a JSON file

// stringify convert JSO to JSON. JSO can't be printed or saved
// It has to be converted to json via JSON.stringify so that it can be printed or saved
// this module to stringify is inbuilt, dont even need to require
let json = JSON.stringify(VA);

// now our JSO -> JSON
// so we can write it into file
fs.writeFileSync(args.file, json, 'utf-8');

// the JSON file created will have all property as string
// stringify is used to convert them into string
// the value inside a property if was int, will remain int
// property inside property, in roles will also stringify