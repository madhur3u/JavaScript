// node solution.js
// this 1st open the site which contain all java solutions
// take out the links of all codes store it in an array
// using another function open each link and write the code from that link in same array

const cheerio = require('cheerio');
const fs = require('fs');
const axios = require('axios');
console.log('Welcome !!!');

(async function(){

    const {data} = await axios.get('https://github.com/Java-aid/Hackerrank-Solutions#java');
    const $ = cheerio.load(data);
    
    // td:nth-child(2) a

    let block = $('h1:contains("JAVA")').next().children('tbody').children('tr');
    console.log(block.length);

    let ans = [];

    block.each(function(_, el){

        let d = {
            name: '',
            link: '',
            sol: ''
        }

        d.name = $('td:nth-child(2) a', el).text();
        d.link = $('td:nth-child(3) a', el).prop('href');
        console.log(d.name , d.link);

        ans.push(d);
        // fs.writeFileSync('java2.json', JSON.stringify(ans), 'utf-8');

    })
    answer(ans);

})();

async function answer(ans){

    for (let i = 0; i < ans.length; i++) {
        
        try{
            const {data} = await axios.get(ans[i].link);
            const $ = cheerio.load(data);	
            
            let lines = '';

            let code = $('div[itemprop="text"] > table > tbody > tr > td');
            code.each(function(_, el){
                let line = $(el).text();
                lines += line.trim() + '\n';
            })

            ans[i].sol = lines;
        }
        catch{
            ans[i].sol = 'Solution Not Found In Provied Link'
        }

        console.log(i+1,'done');
    }
    fs.writeFileSync('java.json', JSON.stringify(ans), 'utf-8');
}
