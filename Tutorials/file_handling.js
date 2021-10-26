// TASK read a file, take out it words, capitalize each word and store all words in new file such that all words in different line

let minimist = require('minimist');         // import minimist for input
let fs = require('fs');                     // import fs for file handling

let arg = minimist(process.argv);           // taking input in arg from command line and minimist

// reading a file

let read_file = fs.readFileSync(arg.file1 , 'utf-8');   // reading file input through file1 in command line arg into a string read_file
// console.log('THIS IS CONTENT OF OUR FILE WHICH WE READ\n\n', read_file);

// changing content to make it as needed

let words = read_file.split(' ');                       // this make array of all words, split array using white spaces
// console.log(words);

for (let i = 0; i < words.length; i++) {
    
    words[i] = words[i].toUpperCase();                  // changing to upper case
    words[i] = words[i] + '\n';                         // adding \n after every word to get each word in new line          
}
// console.log(words);

let write_file = words.join('');                       // write_file is a string with all words joined together
// console.log(write_file)

// writing in a file

fs.writeFileSync(arg.file2 , write_file , 'utf-8')     // take file name input from args, if file not exist it will make one
// 1. file name, 2. content to write, 3. encoding
// if there is any content in file2 it will be overwritten

// node file_handling.js --file1=file1.txt --file2=file2.txt