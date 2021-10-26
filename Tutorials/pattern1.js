// node pattern1.js 5

let arg = process.argv
let n = parseInt(arg[2])

for (let i = 1; i <= n; i++) {

    let line = ""
    for (let j = 1; j<=i; j++){

        line = line + "* "
    }
    console.log(line)
}