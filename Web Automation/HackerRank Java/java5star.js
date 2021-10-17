// node java5star.js naoyui 12345678900 java.json
//                   userid   password   json file 
// npm i puppeteer

const puppeteer = require('puppeteer');
const fs = require('fs');

let args = process.argv;

console.log(args[2])
console.log(args[3])
console.log(args[4])

let dataJ = fs.readFileSync(args[4], 'utf-8');
let data = JSON.parse(dataJ);


(async function () {

	// opening browser
	let browser = await puppeteer.launch(
		{
			headless: false,
			defaultViewport: null,
			args: ['--start-maximized']
		}
	);

	const pages = await browser.pages();
	const page = pages[0];
	
	// opening site
	await page.goto('https://www.hackerrank.com/auth/login');
	// input credentials and click on login
	await page.type('input#input-1', args[2], { delay: 100 });
	await page.type('input#input-2', args[3], { delay: 100 });
	await delay(2000);

	await page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
	
	// since we are automating for all java questions, so wait and click on java
	await waitandclick(page, 'div[data-automation="java"]');

	// now we need to solve all questions, which are unsolved so clicked on unsolved
	await waitandclick(page, 'input[value="unsolved"]');
	await delay(2000);
	
	// now we need to load all the questions first so scroll till end first
	// this is used to scroll till we have all questions loaded (500 is use arbitarily here, have to inc or dec value depending on questions)
	let blocks = await page.$$('a[class="js-track-click challenge-list-item"]');
	let i = 0
	while (i < 800) {
		await page.keyboard.press('ArrowDown');
		blocks = await page.$$('a[class="js-track-click challenge-list-item"]');
		i++;
	}

	// now we need to take out link of every unsolved question, so 1st take all elements in blocks,  $$ --> queryselectorAll
	blocks = await page.$$('a[class="js-track-click challenge-list-item"]');
	// take out the href from blocks (a)
    const link_temp = await Promise.all(
      	blocks.map(handle => handle.getProperty('href'))
    );
	// convert it to string
    const links = await Promise.all(
		link_temp.map(handle => handle.jsonValue())
    );

    console.log(links);
    console.log(links.length);

	// now we have all links in an array of UNSOLVED questions --> links[]
	// we will be using loops now to open each link and solve the question
	i = 0
	details = []
	while (i < links.length) {
		
		// opening each link in new tab
		const page2 = await browser.newPage();
		// this will bring new tab to front
		await page2.bringToFront(); 
		await page2.goto(links[i]);

		// taking out the name of question in head
		await page2.waitForSelector("h1.ui-icon-label.page-label");
		const element = await page2.$("h1.ui-icon-label.page-label");
		const head = await page2.evaluate(element => element.textContent, element);

		d = {
			'Question' : '',
			'Status' : ''
		}
		d.Question = head + '\n';

		// this function code will write and submit our code and return its status submitted / not submitted
		d.Status = await code(page2, head)

		console.log(i+1,d.Question)
		console.log(d.Status)

		details.push(d)

		// closing the tab
		await page2.close();
		await delay(500);

		i++;
	}

	// writing every question and its status in a file
	i = 0
	fs.writeFileSync('details.txt', '', 'utf-8');
	while(i < details.length){

		fs.appendFileSync('details.txt', 'Question : ', 'utf-8')
		fs.appendFileSync('details.txt', details[i].Question, 'utf-8')
		fs.appendFileSync('details.txt', 'Status : ', 'utf-8')
		fs.appendFileSync('details.txt', details[i].Status, 'utf-8')

		i++;
	}
	await delay(1500);
	await browser.close();

}());

async function code(page, head) {

	let index = -1;

	for (let i = 0; i < data.length; i++) {
		if (data[i].name == head.trim()) {
			index = i;
			break;
		}
	}
	if (index == -1){
		return ' Not Submitted - Question Not Found\nPossible Errors :\n1. This might have been a new question or\n2. Name of question is different in JSON file\n\n';
	}

	try{
		await waitandclick(page, '.checkbox-wrap');
		await delay(200);
		await page.type('#input-1', data[index].sol);

		await page.keyboard.down('Control');
		await page.keyboard.press('A');
		await page.keyboard.press('X');
		await page.keyboard.up('Control');

		await page.click('.css-2b097c-container');
		await delay(200);
		await page.type('.css-2b097c-container', '15')
		await page.keyboard.press('Enter');

		await waitandclick(page, 'div[class="view-lines"]');
		await page.keyboard.down('Control');
		await page.keyboard.press('A');
		await page.keyboard.press('V');
		await page.keyboard.up('Control');

		try{
			await page.click('button.hr-monaco-submit', { delay: 20 });

			await page.waitForSelector('.compiler-message__value');
			let element = await page.$(".compiler-message__value");
			let msg = await page.evaluate(element => element.textContent, element);

			if (msg.trim() == 'Success'){

				return ' Submitted Successfully\n\n';
			}
			else{

				await page.click('.css-2b097c-container');
				await delay(200);
				await page.type('.css-2b097c-container', '8')
				await page.keyboard.press('Enter');

				await waitandclick(page, 'div[class="view-lines"]');
				await page.keyboard.down('Control');
				await page.keyboard.press('A');
				await page.keyboard.press('V');
				await page.keyboard.up('Control');

				await page.click('button.hr-monaco-submit', { delay: 20 });

				await page.waitForSelector('.compiler-message__value');
				let element = await page.$(".compiler-message__value");
				let msg = await page.evaluate(element => element.textContent, element);

				if (msg.trim() == 'Success'){

					return ' Submitted Successfully\n\n';
				}
			}
		}
		catch{
			return ' Timeout while waiting for Submission - Slow internet connection or large testcases - Check manually\n\n'
		}

		return ' Not Submitted\nPossible Errors :\n1. Question Might Have Changed\n2. The Solution in JSON file might be wrong\n3. It might have submitted but success screen took time to appear\n\n';
	}
	catch{
		// return 'Error - The Editor is Different - Do this manually'

		await waitandclick(page, '#customtestcase');
		await delay(200);
		await page.type('#custominput',  data[index].sol)

		await page.keyboard.down('Control');
		await page.keyboard.press('A');
		await page.keyboard.press('X');
		await page.keyboard.up('Control');

		await page.click('a[href="javascript:void(0)"]');
		await delay(200);
		await page.type('.select2-input', '15')
		await page.keyboard.press('Enter');

		await waitandclick(page, '.code-checker');
		await page.keyboard.down('Control');
		await page.keyboard.press('A');
		await page.keyboard.press('V');
		await page.keyboard.up('Control');

		await delay(1000);
		await page.click('button[data-analytics="Submit Code"]')

		await page.waitForSelector('.compiler-message__value');
		let element = await page.$(".compiler-message__value > code");
		let msg = await page.evaluate(element => element.textContent, element);

		if (msg.trim() == 'Success'){

			return ' Submitted Successfully\n\n';
		}
		else return ' Not Submitted\nPossible Errors :\n1. Question Might Have Changed\n2. The Solution in JSON file might be wrong\n3. It might have submitted but success screen took time to appear\n\n';
	}
}

// to give delay, using this insted of waitFor
function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
}

// wait for selector and then click
async function waitandclick(page, s) {
	await page.waitForSelector(s, {timeout: 10000});
	await page.click(s, { delay: 500 })
}
