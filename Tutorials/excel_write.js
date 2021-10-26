// we have a JSON file with us
// we need to make a excel file from it
//! npm i excel4node
//* the above module will be used to make excel file

// node excel_write.js --source=teams.json --dest=teams.xls

const minimist = require('minimist');
const fs = require('fs');
const excel = require('excel4node');

let args = minimist(process.argv);

// first step is to read the JSON file
// since we need to take out the data from JSON file
// so we need to convert it into JSO first
let teams_JSON = fs.readFileSync(args.source, 'utf-8');
let teams_JSO = JSON.parse(teams_JSON); 
// console.log(teams_JSON)

// now we need to make a excel WORKBOOK
// using module we create a new Workbook
// wb is variable where we store the whole excel first
// and after all operation is done
// we will write this wb in a excel file
let wb = new excel.Workbook();

// styling in EXCEL
// we can chnage font, fgcolor, textcolor etc in our excel file
// we can create a style for our present workbook wb
// to use style add .style(style) at the end of cells
let style = wb.createStyle({

    font : {
        bold : true,
        underline : true,
        size : 15,
        color : "white"
    },
    fill : {
        type : "pattern",
        patternType : "solid",
        fgColor : "black"
    }
});

// adding SHEETS in excel
for (let i = 0; i < teams_JSO.length; i++) {
    
    // this loop will run the number of sheets we want in our excel file
    // using addWorksheet we create new worksheets in our Workbook wb
    let sheet = wb.addWorksheet(teams_JSO[i].name);

    // first we will add rank in the 1st row
    // since rank was not a string so use .number
    // .style(style) is used to give style to this cell
    sheet.cell(1,1).string("Rank").style(style);
    sheet.cell(1,2).number(teams_JSO[i].rank);

    // now we add two headings for match details, opponent and result
    sheet.cell(2,1).string("Opponent").style(style);
    sheet.cell(2,2).string("Result").style(style);

    // now since inside matches we have multiple teams
    // so we will run one more loop for this 
    // loop runs till matches.length
    for (let j = 0; j < teams_JSO[i].matches.length; j++) {

        // adding details of vs and result in cells
        // j + 3 th row as 1st and 2nd row was already used above
        // so this will print from 3rd row as j = 0 initially
        sheet.cell(j + 3, 1).string(teams_JSO[i].matches[j].vs);
        sheet.cell(j + 3, 2).string(teams_JSO[i].matches[j].result);   
    }   
}

// this is how we write into an excel file
wb.write(args.dest)