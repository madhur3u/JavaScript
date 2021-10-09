// node topManga.js --file=va.xls

const axios = require('axios');
const cheerio = require('cheerio');
const excel = require('excel4node');
const minimist = require('minimist');
const fs = require('fs');

let args = minimist(process.argv);

console.log('Welcome !!!')
let urls =
	   ['https://myanimelist.net/people/24413/Miku_Itou',
	   'https://myanimelist.net/people/34951/Akari_Kitou',
	   'https://myanimelist.net/people/21517/Sora_Amamiya',
		'https://myanimelist.net/people/185/Kana_Hanazawa',
		'https://myanimelist.net/people/34785/Rie_Takahashi',
		'https://myanimelist.net/people/11297/Inori_Minase',
		'https://myanimelist.net/people/6996/Ayana_Taketatsu',
		'https://myanimelist.net/people/11184/Nao_Touyama',
		'https://myanimelist.net/people/11622/Ayane_Sakura',
		'https://myanimelist.net/people/10765/Ai_Kayano'];

ScrapeData(urls , urls.length);

// this function is getting all data which is in list pages
// since genre is not in main page, so we need to open that LN link to take genre
async function ScrapeData(url , n) {

	try {

		let va = [];

		for (let i = 0; i < n; i++) {

			let info = {
				name : ' ',
				birthday : ' ',
				fav : ' ',
				bio : ' ',
				roles : []
			};

			const {data} = await axios.get(url[i]);
			const $ = cheerio.load(data)

			info.name = $('h1.title-name').text();
			info.birthday = $('span.dark_text:contains("Birthday")').parent().text().replace('Birthday: ','');
			info.fav = $('span.dark_text:contains("Member Favorites")').parent().text().replace('Member Favorites: ','');
			info.bio = $('div.people-informantion-more.js-people-informantion-more').text();

			let animeBlocks = $('tr.js-people-anime');
			console.log(animeBlocks.length);

			animeBlocks.each(function (_, el) {

				let dtail = {
					anime : ' ',
					type : ' ',
					season : ' ',
					character : ' ',
					role : ' ',
					year : ' ',
				};

				dtail.anime = $('a.js-people-title', el).text();
				dtail.character =$('div.spaceit_pad:contains("Main")', el).prev().text().trim() + $('div.spaceit_pad:contains("Supporting")', el).prev().text().trim();
				dtail.role = $('div.spaceit_pad:contains("Main")', el).text() + $('div.spaceit_pad:contains("Supporting")', el).text();

				let date = $('div.spaceit_pad:contains("TV,")', el).text() + $('div.spaceit_pad:contains("OVA,")', el).text()+ $('div.spaceit_pad:contains("ONA,")', el).text()+ $('div.spaceit_pad:contains("Special,")', el).text()+ $('div.spaceit_pad:contains("Movie,")', el).text()+ $('div.spaceit_pad:contains("Music,")', el).text();

				date = date.split(' ')
				if (date.length == 3){
					dtail.type = date[0].replace(',','')+ " ";
					dtail.season = date[1] + " ";
					dtail.year = date[2]+ " ";
				}
				else if (date.length == 2) {
					dtail.type = date[0].replace(',','')+ " ";
					dtail.year = date[1]+ " ";
				}

				info.roles.push(dtail);
			})

			va.push(info);


		}
		fs.writeFileSync('va.json', JSON.stringify(va), 'utf-8');
		// console.log(va);

		writeExcel(va);

	}
	catch (err) {
		console.log(err)
	}
}

function writeExcel(valist){

	let wb = new excel.Workbook();

	let headingStyle = wb.createStyle({

		alignment: {
			horizontal : "center",
			vertical : "center"
		},
		font: {
			bold: true,
			underline: true,
			size: 12,
			color: "white",
		},
		fill: {
			type: "pattern",
			patternType: "solid",
			fgColor: "black"
		}
	});
	let center = wb.createStyle({ alignment: {horizontal : "center"}});
	let boldRed = wb.createStyle({font : {bold : true, color:"00008b"}});
	let green = wb.createStyle({font : {color:"green"}});
	let grey = wb.createStyle({font : {color:"808080"}});

	for (let i = 0; i < valist.length; i++) {

		let va = valist[i];
		let sheet = wb.addWorksheet(va.name);

		sheet.cell(1, 1).string("Name").style(headingStyle);
		sheet.cell(2, 1).string(va.name).style(center).style(boldRed);
		sheet.cell(4, 1).string("Birthday").style(headingStyle);
		sheet.cell(5, 1).string(va.birthday).style(center);
		sheet.cell(7, 1).string("Favourites").style(headingStyle);
		sheet.cell(8, 1).string(va.fav).style(center);
		sheet.cell(10, 1).string("Bio").style(headingStyle);
		sheet.cell(11, 1).string(va.bio);
		sheet.cell(12, 1).string("Double click on above cell to expand").style(grey);

		sheet.cell(1, 2).string("Anime Name").style(headingStyle);
		sheet.cell(1, 3).string("Character Voiced").style(headingStyle);
		sheet.cell(1, 4).string("Role").style(headingStyle);
		sheet.cell(1, 5).string("Type").style(headingStyle);
		sheet.cell(1, 6).string("Season").style(headingStyle);
		sheet.cell(1, 7).string("Year").style(headingStyle);

		sheet.column(1).setWidth(30);
		sheet.column(2).setWidth(85);
		sheet.column(3).setWidth(25);

		for (let j = 0; j < va.roles.length; j++) {

			let role = va.roles[j];

			sheet.cell(2 + j, 2).string("  " + role.anime);
			sheet.cell(2 + j, 3).string("  " + role.character);

			if (role.role[0] == "M"){
				sheet.cell(2 + j, 4).string(role.role).style(green);
			}
			else {
				sheet.cell(2 + j, 4).string(role.role).style(grey);
			}

			sheet.cell(2 + j, 5).string(role.type);
			sheet.cell(2 + j, 6).string(role.season);
			sheet.cell(2 + j, 7).string(role.year).style(center);

		}
	}
	wb.write('va.xls')

}
