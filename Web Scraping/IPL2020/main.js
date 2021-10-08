// ToDo - take a url of ipl 2020 -> read match details in JSON file -> write excel and pdfs
// download all required libraries / modules
// npm init -y
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib

// node projectMain.js --excel=ipl2020.xls --folder=IPL2020 --source=https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results
// source is the url from which we extract data

const minimist = require('minimist');       // to take arguments from terminal
const axios = require('axios');             // to get our html from web
const jsdom = require('jsdom');             // for reading HTML
const excel = require('excel4node');        // to write data into excel file
const pdf = require('pdf-lib');             // making pdf

const fs = require('fs');                   // to read file, make folders
const path = require('path');               // to join directories, making folders and pdf files

let args = minimist(process.argv);          // to read input in args --> args.source for url

// TODO --> STEP1 --> reading HTML file from web using axios

// we get a promise in the variable
let htmlPromise = axios.get(args.source);

htmlPromise.then(function (response) {

    let html = response.data;               // we have stored our HTML file in variable html
    let dom = new jsdom.JSDOM(html);        // this give us DOM of html in variable dom
    let doc = dom.window.document;          // now we have a plain HTML document in variable doc

    let matches = [];                       // this will be the jso with all match details

    // here we are selcting all the blocks inside which match information is present, this five us array with length = no. of matches
    let matchScoreBlocks = doc.querySelectorAll('div.match-info.match-info-FIXTURES');

    // now we need to get information inside each block
    // so we loop each block
    for (let i = 0; i < matchScoreBlocks.length; i++) {

        let match = {
            team1: '',
            team2: '',
            team1Score: '',
            team2Score: '',
            result:'',
            number: '',
            place: '',
            date: ''
         }; // this will go inside matches with all content filled for all matches

        // selecting teams from the block which we are reading
        let teamNames = matchScoreBlocks[i].querySelectorAll('p.name');
        match.team1 = teamNames[0].textContent;
        match.team2 = teamNames[1].textContent;

        // selecting scores, have to handle special cases, like when team didnt played due to rain
        let teamScores = matchScoreBlocks[i].querySelectorAll('span.score');

        if(teamScores.length == 2){
            match.team1Score = teamScores[0].textContent;
            match.team2Score = teamScores[1].textContent;
        }
        else if(teamScores.length == 1){
            match.team1Score = teamScores[0].textContent;
            match.team2Score = "Did not played";
        }
        else {
            match.team1Score = "Did not played";
            match.team2Score = "Did not played";
        }

        // putting result
        let resultSpan = matchScoreBlocks[i].querySelector('div.status-text > span');
        match.result = resultSpan.textContent;

        let d = matchScoreBlocks[i].querySelector('div.description').textContent.split(',');
        match.number = d[0].trim();
        match.place = d[1].trim();
        match.date = d[2].trim();

        matches.push(match);
    }
    // when we come out of loop we will have our JSO matches with all match details
    // console.log(matches);

    // now we have a JSO in which all matches are there with details
    // now what we need to do is make another JSO in which every team has one object
    // and iniside that object all matches played by that team will be present
    // so first we will create a simple JSO file with name of team and matches object using matches

    let teams = [];
    for (let i = 0; i < matches.length; i++) {
        makeTeamObject(teams, matches[i]);
    }

    // now we have an array with all team name and a object inise that which will have matches
    // now we will be filling matches
    for (let i = 0; i < matches.length; i++) {
        fillTeams(teams, matches[i]);
    }

    // fs.writeFileSync('teams.json', JSON.stringify(teams), 'utf-8')

    // now we will be writing all this in excel sheet
    createExcel(teams);

    // making folder of each team and then pdfs with match details
    createFolders(teams);

})

// here we have sent match from all matches and the array we need to make
// if the team name already exist in array we dont do anything
// if team name is not present means index will remain -1 so we push that team in array
// checking for both teams 1 and 2
function makeTeamObject(teams , match){

    let index1 = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.team1){
            index1 = i;
            break;
        }
    }
    if (index1 == -1){
        teams.push({
            name : match.team1,
            matches : []
        })
    }

    let index2 = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.team2){
            index2 = i;
            break;
        }
    }
    if (index2 == -1){
        teams.push({
            name : match.team2,
            matches : []
        })
    }
}

// in this we are filling all team with deatils
// sending a match to this function
// check the index of team 1 in jso and place all details in its matches
// check the index of team 2 in jso and place all details in its matches
function fillTeams(teams , match){

    let index1 = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.team1){
            index1 = i;
            break;
        }
    }
    let team1 = teams[index1];
    team1.matches.push({
        mno : match.number,
        mplace : match.place,
        mdate : match.date,
        vs : match.team2,
        teamS : match.team1Score,
        oppS : match.team2Score,
        result : match.result
    })

    let index2 = -1;
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].name == match.team2){
            index2 = i;
            break;
        }
    }
    let team2 = teams[index2];
    team2.matches.push({
        mno : match.number,
        mplace : match.place,
        mdate : match.date,
        vs : match.team1,
        teamS : match.team2Score,
        oppS : match.team1Score,
        result : match.result
    })
}

// creating ecxel
// every team will have a seprate sheet and details of matches that tem played in sheet
// styling excel
function createExcel(teams){

    let wb = new excel.Workbook();
    let headingStyle = wb.createStyle({

        alignment : {
            horizontal : "center"
        },
        font : {
            bold : true,
            underline : true,
            size : 13,
            color : "white",
        },
        fill : {
            type : "pattern",
            patternType : "solid",
            fgColor : "black"
        }
    });
    let teamStyle = wb.createStyle({

        alignment : {
            horizontal : "center"
        },
        font : {
            color : "blue",
        }
    });
    let oppStyle = wb.createStyle({

        alignment : {
            horizontal : "center"
        },
        font : {
            color : "006400",
        }
    });
    let oppStyleName = wb.createStyle({
        font : {
            color : "006400",
        }
    });
    let detailStyle = wb.createStyle({
        font : {
            color : "808080",
        }
    });

    for (let i = 0; i < teams.length; i++) {
        let sheet = wb.addWorksheet(teams[i].name);

        sheet.cell(1, 1).string("Match").style(headingStyle);
        sheet.cell(1, 2).string("Venue").style(headingStyle);
        sheet.cell(1, 3).string("Date").style(headingStyle);
        sheet.cell(1, 4).string("Team").style(headingStyle);
        sheet.cell(1, 5).string("Opponent").style(headingStyle);
        sheet.cell(1, 6).string("Team Score").style(headingStyle);
        sheet.cell(1, 7).string("Opponent Score").style(headingStyle);
        sheet.cell(1, 8).string("Result").style(headingStyle);

        sheet.column(1).setWidth(15);
        sheet.column(2).setWidth(15);
        sheet.column(3).setWidth(15);
        sheet.column(4).setWidth(28);
        sheet.column(5).setWidth(25);
        sheet.column(6).setWidth(15);
        sheet.column(7).setWidth(20);
        sheet.column(8).setWidth(45);


        for (let j = 0; j < teams[i].matches.length; j++) {

            sheet.cell(2 + j, 1).string(teams[i].matches[j].mno).style(detailStyle);
            sheet.cell(2 + j, 2).string(teams[i].matches[j].mplace).style(detailStyle);
            sheet.cell(2 + j, 3).string(teams[i].matches[j].mdate).style(detailStyle);
            sheet.cell(2 + j, 4).string(teams[i].name).style(teamStyle);
            sheet.cell(2 + j, 5).string(teams[i].matches[j].vs).style(oppStyleName);
            sheet.cell(2 + j, 6).string(teams[i].matches[j].teamS).style(teamStyle);
            sheet.cell(2 + j, 7).string(teams[i].matches[j].oppS).style(oppStyle);
            sheet.cell(2 + j, 8).string(teams[i].matches[j].result);
        }
    }

    wb.write(args.excel);
}

// in this we create folders with team name
// inside every team folder we have pdfs of match details
function createFolders(teams){

    fs.mkdirSync(args.folder)

    for (let i = 0; i < teams.length; i++) {

        let teamFN = path.join(args.folder, teams[i].name);
        fs.mkdirSync(teamFN);

        for (let j = 0; j < teams[i].matches.length; j++) {

            let matchNumber = teams[i].matches[j].mno.split(' ')

            let matchFileName = path.join(teamFN, matchNumber[0]+ " " + teams[i].matches[j].vs + ".pdf");
            createScoreCard(teams[i].matches[j], matchFileName, teams[i].name);
        }
    }
}

function createScoreCard(match, file, teamName) {

    let details = match.mno + ", " + match.mplace + ", " + match.mdate;

    let pdfBytes = fs.readFileSync("template.pdf");
    let pdfPromise = pdf.PDFDocument.load(pdfBytes);

    pdfPromise.then(function(pdfdoc){

        let page = pdfdoc.getPage(0);

        page.drawText(details, {
            x: 165,
            y: 746,
            size: 15
        });
        page.drawText(teamName, {
            x: 230,
            y: 686.5,
            size: 12
        });
        page.drawText(match.teamS, {
            x: 230,
            y: 664,
            size: 12
        });
        page.drawText(match.vs, {
            x: 230,
            y: 642.5,
            size: 12
        });
        page.drawText(match.oppS, {
            x: 230,
            y: 620.5,
            size: 12
        });
        page.drawText(match.result, {
            x: 230,
            y: 598.5,
            size: 12
        });

        let createdPdfPromise = pdfdoc.save();
        createdPdfPromise.then(function(finalPDFBytes){
            fs.writeFileSync(file, finalPDFBytes);
        })
    })
}
