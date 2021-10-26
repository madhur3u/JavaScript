// node script.js --url=https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/india-vs-new-zealand-28th-match-group-2-1273739/live-cricket-score

const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const excel = require('excel4node');
const minimist = require('minimist');

let args = minimist(process.argv);

console.log('Welcome !!!');

mainFunction(args.url);
// console.log(args.url)

async function mainFunction(url) {

	console.log('Opening Link')

	let player_link = await playerNameArray(url);
	// console.log(player_link);

	let details = [];

	console.log('Total Players', player_link.length);
	console.log('Getting information of each player')

	for (let i = 0; i < player_link.length; i++) {
		await stats(details, player_link[i]);
		console.log(i + 1, 'of', player_link.length);
	}

	console.log('Data Reading Complete');

	// fs.writeFileSync('data.json', JSON.stringify(details), 'utf-8');

	let team1 = details[0].country;
	let team2 = '';
	i = 1
	while (i < player_link.length) {

		if (details[i].country != team1) {
			team2 = details[i].country;
			break;
		}
		i++;
	}
	console.log('The teams are');
	console.log(team1)
	console.log(team2)
	console.log('Making Excel File')

	let wb = new excel.Workbook();

	make_excel1(wb, team1, details);
	make_excel1(wb, team2, details);

	wb.write('teams.xls')

	console.log('Completed')
}

async function make_excel1(wb, team, details) {

	// let file1 = fs.readFileSync('data.json', 'utf-8')
	// let details = JSON.parse(file1);
	// let wb = new excel.Workbook();

	let headingStyle = wb.createStyle({

		alignment: {
			horizontal: "center",
			vertical: "center"
		},
		font: {
			bold: true,
			underline: true,
			size: 14,
			color: "white",
		},
		fill: {
			type: "pattern",
			patternType: "solid",
			fgColor: "black"
		}
	});
	// let center = wb.createStyle({ alignment: { horizontal: "center" } });
	let boldRed = wb.createStyle({ font: { bold: true, color: "00008b" } });
	let grey = wb.createStyle({ font: { color: "808080" } });


	let sheet = wb.addWorksheet(team);

	sheet.column(1).setWidth(30);
	sheet.column(2).setWidth(30);
	sheet.column(3).setWidth(30);
	sheet.column(4).setWidth(15);
	sheet.column(5).setWidth(20);
	sheet.column(6).setWidth(20);

	let j = 1

	for (let i = 0; i < details.length; i++) {

		let player = details[i];

		if (player.country == team) {
			sheet.cell(j, 1).string(player.name).style(headingStyle);
			// sheet.cell(j, 2).string(player.country).style(headingStyle);
			sheet.cell(j, 2).string(player.type).style(headingStyle);

			let matches = player.matches;

			j++;
			sheet.cell(j, 1).string("Match").style(boldRed);
			sheet.cell(j, 2).string("Batting Performance").style(boldRed);
			sheet.cell(j, 3).string("Bowling / WK Performance").style(boldRed);
			sheet.cell(j, 4).string("Date").style(boldRed);
			sheet.cell(j, 5).string("Venue").style(boldRed);
			sheet.cell(j, 6).string("Match Format").style(boldRed);

			for (let k = 0; k < matches.length; k++) {

				let match = matches[k];
				j++;
				sheet.cell(j, 1).string(match.match)
				sheet.cell(j, 2).string(match.bat)
				sheet.cell(j, 3).string(match.bowl)
				sheet.cell(j, 4).string(match.date).style(grey);
				sheet.cell(j, 5).string(match.venue).style(grey);
				sheet.cell(j, 6).string(match.format).style(grey);
			}

			j += 2;
		}
	}
	j += 1
	sheet.cell(j++, 1).string("* = NOT OUT").style(grey);
	sheet.cell(j++, 1).string("-- = DID NOT BAT/BOWL/WK").style(grey);
	sheet.cell(j++, 1).string("c = NO. OF CATCHES").style(grey);
	sheet.cell(j++, 1).string("s = STUMPINGS").style(grey);
	// wb.write('team1.xls')
}

async function stats(details, url) {

	let d = {
		name: '',
		country: '',
		type: '',
		matches: []
	}

	let { data } = await axios.get(url);
	const $ = cheerio.load(data);

	d.country = $('span[class="player-card__country-name"]').text()
	d.type = $('span[class="player-card__player-type"]').text()
	d.name = $('.player-card__details > h2').text()

	let matchBlock = $('div.recent-matches-table tbody > tr');
	// console.log(matchBlock.length);

	matchBlock.each(function (_, el) {

		let size = $('td', el);
		// console.log(size.length);


		let mat = {
			match: ' ',
			bat: ' ',
			bowl: '--',
			date: ' ',
			venue: ' ',
			format: ' ',
		}

		if (size.length == 5) {
			mat.match = $('td:nth-child(1)', el).text().trim();
			mat.bat = $('td:nth-child(2)', el).text().trim();
			mat.date = $('td:nth-child(3)', el).text().trim();
			mat.venue = $('td:nth-child(4)', el).text().trim();
			mat.format = $('td:nth-child(5)', el).text().trim();
		}
		else {
			mat.match = $('td:nth-child(1)', el).text().trim();
			mat.bat = $('td:nth-child(2)', el).text().trim();
			mat.bowl = $('td:nth-child(3)', el).text().trim();
			mat.date = $('td:nth-child(4)', el).text().trim();
			mat.venue = $('td:nth-child(5)', el).text().trim();
			mat.format = $('td:nth-child(6)', el).text().trim();
		}

		// console.log(mat.match)
		// console.log(mat.bat)
		// console.log(mat.bowl)
		// console.log(mat.date)
		// console.log(mat.venue)
		// console.log(mat.format)

		d.matches.push(mat);

	})

	details.push(d);
	// console.log(details);
	// fs.writeFileSync('data.json', JSON.stringify(details), 'utf-8');

}

// this function takes out the link of squad and return array with players links
async function playerNameArray(url) {

	let { data } = await axios.get(url);
	const $ = cheerio.load(data);

	let squad_url = $('div.widget-tab:contains("Squads")').parent().attr('href');
	// console.log('https://www.espncricinfo.com' + squad_url);
	squad_url = 'https://www.espncricinfo.com' + squad_url;

	return await getPlayersName(squad_url);
}

// this function provide list of squad to playerNameArray function
async function getPlayersName(squad_url) {

	const { data } = await axios.get(squad_url);
	const $ = cheerio.load(data);

	let players = $('.match-squad-grid .player-name');
	// console.log(players.length);

	let parr = [];

	players.each(function (_, el) {

		let link = $(el).attr('href');
		parr.push('https://www.espncricinfo.com' + link + '/matches');

	})
	// console.log(parr);
	return parr
}