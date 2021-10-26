// in this we will download data from the web
// we will provide a url and the html file should be downloaded
// for this we use a library axios

// node downloading_html.js --url="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --file="download.html"

let axios = require('axios');                           // module needed for downloading data from web
let minimist = require('minimist');                     // for args input
let fs = require('fs');                                 // filesystem

let args = minimist(process.argv);

let downloaded_data_promise = axios.get(args.url);      // we will get the html file in the promise

// this is a callback, it will start reading the data in promise, and then promise will provide the data to our 1st function
// if data found, else it will call error

downloaded_data_promise.then (function(response){       // using promise to store our data in response // here we use CALLBACK

    let html_file = response.data;                      // data is first stored on a string 
    fs.writeFileSync(args.file, html_file, 'utf-8');    // and that is given to our file which we input
    
}).catch(function(err){                                 // this will be called when any error occur

    console.log('Error Occured');

});


// the file download.html will be created and will have the html of the link stored in it
