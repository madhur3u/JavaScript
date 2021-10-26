// we have created a JSON file va.json in last example
// now we will read that JSON file
// to use JSON file, to read its properties
// we first need to JSON -> JSO

// node json_read.js --file=va.json

let minimist = require('minimist');
let fs = require('fs');

let args = minimist(process.argv);

fs.readFile(args.file, 'utf-8', function(err, json) {
    
    if (err){
        console.log('ERROR OCCURED TRY AGAIN');     // if we encounter error while reading file
    }

    else{
        // if we are here means our JSON file is read in json
        // this json need to be converted to JSO first
        // JSON.parse(json) -> this converts to JSON
        let details = JSON.parse(json);

        // now we have a JSO named details, so we can acces it like this now
        console.log(details[0].name)
        console.log(details[0].age)
        console.log(details[1].name)
        console.log(details[1].age)
        console.log(details[2].name)
        console.log(details[2].age)
        console.log(details[0].roles[1].name)
        console.log(details[1].roles[0].anime)

        // if we print json it will be printed whole as a string
        // we cannot manipulate a JSON 
        console.log(json);
    }
});