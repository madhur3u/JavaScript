// npm init
// npm install minimist
// node json_create.js 

// creating a JSON file 

details = [
    {                           // data within {} is an object
        name : 'Miku',          // name, age and roles are properties of the object
        age : 24 ,              
        roles : [               // we can also use a object to define a property [ {}, {} ] in this format
            {
                name : 'Nakano Miku',
                anime : 'The Quintessential Quintuplets'
            },
            {
                name : 'Shimamura',
                anime : 'Adachi to Shimamura'
            }
        ]
    },
    {
        name : 'Hana',
        age : 30,
        roles : [
            {
                name :'Ichika' ,
                anime :'The Quintessential Quintuplets'
            },
            {
                name :'Onodera Kosaki' ,
                anime :'Nisekoi'
            }
        ]
    },
    {
        name : 'Rie',
        age : 27,
        roles : [
            {
                name :'Megumin' ,
                anime :'Konosuba'
            },
            {
                name :'Emilia' ,
                anime :'Re:Zero'
            }
        ]
    }
]

// the above created object is known as JSO -> JAVA SCRIPT OBJECT
// we need a JSO to make a JSON file

// how to get data from a JSO file

console.log(details[0].name)
console.log(details[0].age)

console.log(details[1].name)
console.log(details[1].age)

console.log(details[2].name)
console.log(details[2].age)

// accessing roles, nested objects
console.log(details[0].roles[1].name)
console.log(details[1].roles[0].anime)