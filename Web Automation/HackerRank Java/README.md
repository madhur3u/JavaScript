# Web Automation - HackerRank Problem Solver

In this activity I have made an automation script which can solve all the unsolved questions from HackerRank JAVA section. The script is written in JavaScript and automation is done using Puppeteer NPM module.

[JSON file](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/java.json)

[Automation script](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/script.js)

Motive behind this activity is to learn JavaScript and Web Automation.

> **DISCLAIMER**
> 
> This project is only made for learning purposes. It does not promote cheating and copying anyone's work to achieve any target. Do not use this script for solving questions in your HackerRank account. Using automation to solve question may lead to permanent ban of your HackerRank ID. If you want to try this make a temporary account and try in that.

## Contents

1.  [Web Scraping And Automation](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#web-scraping-and-automation)
2.  [Installation](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#installation)
3.  [Creating Answers JSON File](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#creating-answers-json-file)
4.  [Creating Automation Script](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#creating-automation-script)
5.  [Try It Yourself](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#try-it-yourself)
6.  [Other Exercises You Can Try](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#other-exercises-you-can-try)

## Web Scraping And Automation

**Web scraping**, web harvesting, or web data extraction is data scraping used for extracting data from websites. The web scraping software may directly access the World Wide Web using the Hypertext Transfer Protocol or a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a bot or web crawler. It is a form of copying in which specific data is gathered and copied from the web, typically into a central local database or spreadsheet, for later retrieval or analysis. - ([*Wikipedia*](https://en.wikipedia.org/wiki/Web_scraping))

**Web automation** is a concept of letting ***robots or web automation tools*** perform tasks and processes on a web browser or web application. To perform repetitive and error-prone tasks, such as filling out long HTML forms, browser automation tools are used that automate your Web browser.

## Installation

**JavaScript** is the language used here, to run .js files **node** must be installed in your system. [Click Here](https://nodejs.org/en/download/) to download node for your Operating System.
After installing node, install the **npm modules** listed below using terminal.

```bash
npm init -y
npm install axios
npm install cheerio
npm install puppeteer
```

## Creating Answers JSON File

First step is to create a JSON file ([*java.json*](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/java.json)) which will have solution to each problem from the [JAVA Questions Page](https://www.hackerrank.com/domains/java). This can be achieved by scraping answers from GitHub. You can easily find many GitHub repositories which will have solutions of the questions we need.

> Solutions used in this activity are taken from many sources majority of which are from the two repositories mentioned below.

***GitHub repositories*** I used in this activity to get solutions :

1.  [Java-aid/Hackerrank-Solutions](https://github.com/Java-aid/Hackerrank-Solutions)
2.  [RodneyShag/HackerRank_solutions](https://github.com/RodneyShag/HackerRank_solutions)

Rather than taking solutions from one sources at least two must be used. Since the solutions might be wrong or outdated so we have to be careful while choosing them.
One way is to make two JSON files from two sources and *run the main code* using both files. We will now have list of all those questions which are wrong in a particular file. Just replace the wrong solutions from one file with correct solutions from other files. Sometimes you may have to look for solutions from other sources too. **This is the most time consuming part of this activity.**

```javascript
const {data} = await axios.get('https://github.com/Java-aid/Hackerrank-Solutions#java');
fs.writeFileSync('java.json', JSON.stringify(ans), 'utf-8');
```

*Replace the link and filename in above expressions in [solution.js](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/solution.js) file while scraping data from other sources.*

Using the above approach I have created the [*java.json*](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/java.json) file.

### Scraping Data

`Axios` is used to load the HTML file.
`Cheerio` is used to get data from the HTML file.

After loading the HTML file first we need to save **name of each question** and **link to its solution** in an array. We then use this array to open every link and store **solution** from each link in our array.

```javascript
d.name = $('td:nth-child(2) a', el).text();
d.link = $('td:nth-child(3) a', el).prop('href');

// getting solution from each link
let code = $('div[itemprop="text"] > table > tbody > tr > td');
code.each(function(_, el){
        let line = $(el).text();
        lines += line.trim() + '\n';
})
ans[i].sol = lines;
```

## Creating Automation Script

We have our [JSON file](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/java.json) with all correct answers. Now we need to create an automation script which will submit every question. The [Automation script](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/script.js) is created using **puppeteer** npm module.
[**Puppeteer**](https://github.com/puppeteer/puppeteer) is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

The script will be doing the following tasks.

1.  Open HackerRank login page.
2.  Type username and password then click on login.
3.  Open JAVA section from the homepage.
4.  Click on unsolved checkbox, this will only show unsolved questions in the page.
5.  Scroll down to load every question.
6.  Open every unsolved question one-by-one in a new tab.
7.  Type the solution and click on submit.
8.  After submission close the current tab and open next question. This process will repeat till every question is solved.
9.  Close the browser after every question is submitted.
10. A [details.txt]() file is also created which will have name and status of every question. If any question is not submitted successfully you can check that in this file.

### Possible Reasons For Getting Errors

1.  Check your Internet connection. `await page.waitForSelector()` has a timeout of 30 seconds, so if it is unable to find the selector within 30 seconds, it will throw an error.
2.  If the question is not getting submitted, check the name of question in JSON file. The name of question in JSON file and main link should be same. Also there may be few cases like `new questions are added` in the link or `question is changed`.

## Try It Yourself

If you want to try how this is working you just need to follow these steps.

1.  Install node and required NPM modules as [explained above](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/README.md#installation).
2.  Download the [JSON file](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/java.json) and [Script](https://github.com/madhur3u/JavaScript/blob/main/Web%20Automation/HackerRank%20Java/script.js).
3.  Make a folder in your PC and place the above downloaded file in it. Open terminal in this folder and type the command given below in your terminal.

```javascript
node script.js username password java.json
```

*Replace the username and password with the userid and password of the temporary account you created.*

> I once again request you for not using your original account for this activity, make a temporary account for this. If you try to solve questions using automation your HackerRank ID may get blocked therefore it is advisable to use a Temporary Account.

> [Click Here](https://temp-mail.org/en/) to make temporary account using temp mail.

4.  The automation process may take up to 10 - 20 minutes depending upon your internet speed and processor. The browser will close automatically after completion.
5.  A *details.txt* file will be created in your folder which will have details of submission of each question.

## Other Exercises You Can Try

1.  This activity is only solving JAVA section of HackerRank, you can also try solving for other sections in a single code.
2.  Now that you know web automation you can create more scripts for example, filling forms automatically, reading mails and saving it into a file etc.
