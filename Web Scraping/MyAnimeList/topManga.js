// node topManga.js --url="https://myanimelist.net/topmanga.php?limit=" --pages=1 --file=manga1.xls

const axios = require('axios');
const cheerio = require('cheerio');
const excel = require('excel4node');
const minimist = require('minimist');

let args = minimist(process.argv);

console.log('Welcome !!!')
console.log('Here we will be scrapping myanimelist.com top Mangas')
console.log('You wanted to scrap',args.pages,'page(s) i.e.',(args.pages)*50,'Manga/LN')
console.log('\nStarting Now ... \n\nThis may take time depending upon your internet speed')
ScrapeData(args.url, args.pages);

// this function is getting all data which is in list pages
// since genre is not in main page, so we need to open that LN link to take genre
async function ScrapeData(url, n) {

	try{

		let topAnime = [];
		let links = [];

		for (let i = 0; i < n; i++) {

			let url1 = url + (i * 50);

			const {data} = await axios.get(url1);
			const $ = cheerio.load(data);

			let animeBlockList = $('tr.ranking-list');
			console.log(animeBlockList.length)

			animeBlockList.each(function(_, el){

				details = {};

				details.name = $('h3.manga_h3',el).text();
				// details.name = $(el).children('td.title.al.va-t.clearfix.word-break').children('div.detail').children('h3.manga_h3').text();

				let info_list = $('div.information.di-ib.mt4', el).text().trim().split('\n')
				details.typeVol = info_list[0];
				details.date = info_list[1].trim();

				details.score = $('.text.on.score-label',el).text();
				details.link = $('h3.manga_h3 > a',el).attr('href');

				topAnime.push(details);
				links.push(details.link);

			})
		}
		// console.log(topAnime)

		let wb = new excel.Workbook();
		let sheetName = "Top " + n*50 + " Manga LN"
		let sheet = wb.addWorksheet(sheetName);

		let headingStyle = wb.createStyle({

			alignment : {
				horizontal : "center"
			},
			font : {
				bold : true,
				underline : true,
				size : 12,
				color : "white",
			},
			fill : {
				type : "pattern",
				patternType : "solid",
				fgColor : "black"
			}
		});

		let linkStyle = wb.createStyle({font : {color: "blue", underline : true}})
		let bold = wb.createStyle({font : {bold: true}})
		let dBlue = wb.createStyle({font : {bold: true, color : "00008B"}})
		let centerAl = wb.createStyle({alignment : { horizontal : "center"}})

		sheet.cell(1,1).string("Rank").style(headingStyle);
		sheet.cell(1,2).string("Name").style(headingStyle);
		sheet.cell(1,3).string("Volume and Type").style(headingStyle);
		sheet.cell(1,4).string("Release Date").style(headingStyle);
		sheet.cell(1,5).string("Score").style(headingStyle);
		sheet.cell(1,6).string("Genre").style(headingStyle);
		sheet.cell(1,7).string("Link").style(headingStyle);

		sheet.column(2).setWidth(70);
		sheet.column(3).setWidth(20);
		sheet.column(4).setWidth(20);
		sheet.column(6).setWidth(60);
		sheet.column(7).setWidth(100);

		for (let i = 0; i < topAnime.length; i++) {

			let row = (1 + (i + 1));
			let rank = row  - 1;

			sheet.cell(row, 1).number(rank).style(centerAl).style(bold);
			sheet.cell(row, 2).string(topAnime[i].name);
			sheet.cell(row, 3).string(topAnime[i].typeVol);
			sheet.cell(row, 4).string(topAnime[i].date);
			sheet.cell(row, 5).string(topAnime[i].score).style(centerAl).style(dBlue);
			sheet.cell(row, 7).string(topAnime[i].link).style(linkStyle);
		}

		getGenre(links, sheet, wb)
		wb.write(args.file)

	}
	catch(err){
		console.log(err)
	}
}

// this function is called when everything else is written in excel sheet except genre
// we have a list in which all link are present in order made in previos
// we need to open these link and get genre and place in the required cell
async function getGenre(links, sheet, wb) {
	try {

		let genreCol = wb.createStyle({font : {color: "#808080"}})

		for (let j = 0; j < links.length ; j++) {

			try{
				const {data} = await axios.get(links[j]);
				const $ = cheerio.load(data);
				let i = 0

				let genre = $('td.borderClass div.spaceit_pad:contains("Genres:") > a').text().trim().split('\n');

				for (i = 0; i < genre.length - 1; i++) {
					genre[i] = genre[i].trim() + ', ';
				}

				genre[i] = genre[i].trim();
				genre.push($('td.borderClass div.spaceit_pad:contains("Genre:") > a').text().trim())
				genre = genre.join(' ')

				// console.log(genre)
				console.log(j+1,'Mangas / LNs scrapped')

				let row = (1 + (j + 1));

				sheet.cell(row, 6).string(genre.trim()).style(genreCol);
				wb.write(args.file)
			}
			catch{
				continue
			}
		}
	}
	catch(err){
		console.log(err)
	}
}
