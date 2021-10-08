# MyAnimeList Top Manga / LN
In this we are creating an excel file of all the top mangas in myanimelist section with details like score, release date, type, genre etc. The code is written in JAVASCRIPT and executed using node. 
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
3. Now create a folder and add *topManga.js* file in that folder.
4. Open the above folder in your terminal and paste the following command.
```bash
node topManga.js --url="https://myanimelist.net/topmanga.php?limit=" --pages=1 --file=manga1.xls
``` 
5. A [single page](https://myanimelist.net/topmanga.php) in MyAnimeList displays only 50 results, so if we need more data we need to manipuate the url, in the end we need to add multiples of 50 to go to the next page, this is taken care of in the code. You just need to change the pages in the above command for getting data fro more than 1 page.
6. It may take some minutes to complete the process depending upon your internet speed.
7. After completion you can find the excel sheet in your folder with all the manga details.

## Code Summary
1. Read the command line arguments using minimist (url and output file name).
2. Read the HTML file use axios.
3. Load the HTML fie using cheerio and with the help of HTML elements and class read the necessary data from the page.
4. In the main page we have all the information which we need except genre, so for genre we need to open the manga / LN link in our code and get that data. This is done by creating an array with links of all manga / LN in order, after the main page is completely processed, we call our genre function which write genre in our excel file by getting the data from their link.
5. Storing the data in a JSO and then writing it into our excel file using excel4node module.

## Extra Exercise
1. You can get more details like description, voice actor details, character details etc., when we are opening our main page of the manga in getGenre() function.
2. The same exercise can be done to get data of top anime by changing some HTML elements and classes.
