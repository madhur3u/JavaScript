// WE CREATE FOLDERS HERE FIRST
// then we make pdf files inside teams folder with match information
// node makingPDF.js --source=teams.json --folder=WorldCup

let minimist = require('minimist');
let fs = require('fs');
let path = require("path");
let pdf = require("pdf-lib");
let args = minimist(process.argv);

// first step is to read the JSON file
// since we need to take out the data from JSON file
// so we need to convert it into JSO first
let teams_JSON = fs.readFileSync(args.source, 'utf-8');
let teams = JSON.parse(teams_JSON); 

// first we need to create main folder worldcup in current directory
// can create folders using fs, argument is a string
fs.mkdirSync(args.folder);

// now we have a worldcup folder inside these we will make teams folders
// we will use teams[i].name for that
// folders are made like this WorldCup/India --> to join we use path module
for (let i = 0; i < teams.length; i++) {

    // we made a team folder, and we will put pdfs in this
    let teamFolder = path.join(args.folder, teams[i].name);
    fs.mkdirSync(teamFolder);

    for (let j = 0; j < teams[i].matches.length; j++) {
        
        // this is how we make pdf file, inside our team folder
        // we add .pdf in end to make pdfs
        // then we pass to function to create pdfs using pdf-lib and save them 
        let fileName = path.join(teamFolder, teams[i].matches[j].vs + ".pdf");
        createPDF(teams[i].name, teams[i].matches[j], fileName);
    }
}

function createPDF(teamname, matches, filename) {
    
    let t1 = teamname;
    let t2 = matches.vs;
    let result = t1 + " " + matches.result;

    // loading our template pdf in which we need to write
    // we have to use bytes so dont use utf-8
    let originalPdfBytes = fs.readFileSync('template.pdf');

    // this is how we load our template bytes to pdf so we can edit it
    // PDFDocument.load make a promise
    let loadDoc = pdf.PDFDocument.load(originalPdfBytes);

    loadDoc.then( function pdfDoc(pdfDoc) {
        
        let page = pdfDoc.getPage(0);   // this give us 1st page of our pdf file

        // now we have page of our pdf loaded in bytes
        // we will edit this add text using drawtext
        // we give position where we need to add text and other things
        page.drawText(t1, {
            x : 310,
            y : 720,
            size : 10
        })
        page.drawText(t2, {
            x : 310,
            y : 700,
            size : 10
        })
        page.drawText(result, {
            x : 310,
            y : 680,
            size : 10
        })

        // now we have edited our page we need to make a pdf from it
        // save is a promise and it give us chnaged bytes in our function
        let savePromise = pdfDoc.save();
        savePromise.then(function (changedBytes) {
            
            // now we have our changed pdf in chnagedBytes
            // this this time everything is being done in RAM not in harddisk
            // now we need to write these changes into our pdf file which we sent in function parameters 
            // dont use utf-8
            fs.writeFileSync(filename, changedBytes)
        })
    })
}
