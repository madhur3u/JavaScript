# Voice Actors Details
In this we are creating an excel file with details of all the VAs (links in code) like Name, Details, Anime they featured in and their character details. In the excel file there are multiple sheets, each sheet contains details of one VA.

1. [CODE](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/VA%20List/main.js)
2. [JSON FILE](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/VA%20List/va.json)
3. [EXCEL SHEET](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/VA%20List/va.xls)
## Web Scraping
Web scraping, web harvesting, or web data extraction is data scraping used for extracting data from websites. The web scraping software may directly access the World Wide Web using the Hypertext Transfer Protocol or a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a bot or web crawler. It is a form of copying in which specific data is gathered and copied from the web, typically into a central local database or spreadsheet, for later retrieval or analysis. - ([_Wikipedia_](https://en.wikipedia.org/wiki/Web_scraping))

## Installation and Execution

1. **JavaScript** is the langauage used here, to run .js files node must be installed in your system. [Click Here](https://nodejs.org/en/download/) to download node for your Operating System.   
3. After installing node, install the **npm modules** listed below using terminal.

```bash
npm init -y
npm install minimist
npm install axios
npm install cheerio
npm install excel4node
```
3. Now create a folder and add [main.js](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/VA%20List/main.js) file in that folder.
4. Open the above folder in your terminal and paste the following command.
```bash
node main.js
``` 
5. You can add or delete the URL of VA's page in the URL block of the code (*line number 14*). The URLs have been taken from myanimelist [people section](https://myanimelist.net/people.php).
6. Run the code.


## Code Summary
1. Calling our async function with URLs and no. of URL(VAs) as parameters.
2. Read the HTML file use axios.
3. Load the HTML file using cheerio and with the help of HTML elements and class read the necessary data from the page.
4. Storing the data in a JSO and then writing it into our excel file using excel4node module.
5. Creating JSON file using filesystem.

## Extra Exercise
1. You can add or delete links and try for your favourite voice actors.
2. You can also try to get more information from the page like theme song performances comments etc.
