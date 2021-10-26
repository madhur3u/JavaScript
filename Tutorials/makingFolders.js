// suppose we need a floder name worldcup in th ecurrent directory
// and inside that folder we need folders according to the team name
// we take json file of teams and make a world vup folder
// and then we add teams folder inside that folder
// node makingFolders.js --source=teams.json --folder=WorldCup

let minimist = require('minimist');
let fs = require('fs');
let args = minimist(process.argv);
let path = require("path");

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

    // folder name is worldcup and teams name will join to make folder path this make string not folder drectly
    let folderName = path.join(args.folder, teams[i].name);
    // console.log(folderName);
    // now we make folder using fs
    fs.mkdirSync(folderName);
}
