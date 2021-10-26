# Stats Extractor


<img src="https://user-images.githubusercontent.com/89251393/138819888-eac4f2f8-5779-4e7a-b43e-aa56e5c965fa.png" width="123"/> <img src="https://user-images.githubusercontent.com/89251393/137633513-09436b0b-fafb-4efb-8a62-b03a1d3f8e1d.png" width="70"/> <img src="https://user-images.githubusercontent.com/89251393/137633548-8c3ddff2-1eb7-4672-9054-6803404eeb6f.png" width="100"/>

You might be aware of the poupularity of apps like Dream11 and other apps like these in which you have to make a team of 11 players and play. Though this task of creating a team might look easy but it isn't. 

Selecting 11 best players from 22 is quite time consuming task. First you need to check the stats of all players and then accordingly you have to create your team. This may take a good amount of time as you have to search each and every player and check thier latest stats.

**So what's the most important criteria to have the best in form players in our team ?** Just select those who have performed good in say like last 5 - 10 matches, right ?

So keeping the above criteria in mind I have made this activity. You just need to provide the link to the match from [EspnCricinfo](https://www.espncricinfo.com/) and within minutes you will have an excel file with stats of players of both teams from last 10 matches with you. 
So no searching through the net for hours and manually keeping track of stats of each player. Not only that you will also have an accurate and clean excel sheet too. Seems interesting isn't it. So if you want to try it yourself just follow these [instructions](https://github.com/madhur3u/JavaScript/new/main/Web%20Scraping/Stats%20Extractor#installation-and-execution) and you are good to go.

1. [CODE](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/Stats%20Extractor/script.js)
2. [EXCEL SHEET](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/Stats%20Extractor/teams.xls)

## Web Scraping
Web scraping, web harvesting, or web data extraction is data scraping used for extracting data from websites. The web scraping software may directly access the World Wide Web using the Hypertext Transfer Protocol or a web browser. While web scraping can be done manually by a software user, the term typically refers to automated processes implemented using a bot or web crawler. It is a form of copying in which specific data is gathered and copied from the web, typically into a central local database or spreadsheet, for later retrieval or analysis. - ([_Wikipedia_](https://en.wikipedia.org/wiki/Web_scraping))

## Installation and Execution

1. **JavaScript** is the langauage used here, to run .js files node must be installed in your system. [Click Here](https://nodejs.org/en/download/) to download node for your Operating System.   
2. After installing node, install the **npm modules** listed below using terminal.

```bash
npm init -y
npm install minimist axios cheerio excel4node
```
3. Download the [script.js](https://github.com/madhur3u/JavaScript/blob/main/Web%20Scraping/Stats%20Extractor/script.js) file. Create a new folder in your PC and move the downoaded file there.
4. Open the above folder in your terminal and paste the following command. After the *url=* paste the link of the match you want to get data from.
```
node script.js --url=
```
<img src="https://user-images.githubusercontent.com/89251393/138821145-c72a1deb-8104-4e4f-b259-7bba20c4246a.png" width="500"/>

*It will look like this after adding the link*

5. Now hit enter after pasting the above command in your terminal. The process will start and within 1 - 2 minutes you will have an excel file in the same folder with the data you need.

<img src="https://user-images.githubusercontent.com/89251393/138821269-ef65962e-cfbf-4525-b026-d4ed9d651674.png" width="500"/>

## Conclusion
After the successful run of the script you will have a excel file which will look the this. With players of both teams in seprate tabs, you can easily choose the best players from this with the stats provided.
![Screenshot from 2021-10-26 11-59-52](https://user-images.githubusercontent.com/89251393/138821433-ebf26d95-cad3-4fdf-8f11-525a2f4a4458.png)
![Screenshot from 2021-10-26 12-00-06](https://user-images.githubusercontent.com/89251393/138821441-2c4ed964-a412-4636-ae08-a604869949b1.png)


I hope you like this activity or might have learnt something. If you want you can modify or add features in the script according to your prefrences. 
If you hve any query, suggestion, doubts etc., you can contact me on the given links below. 


<img src="https://user-images.githubusercontent.com/89251393/138821704-5538f667-ca94-4d9f-ad49-b3c48e1cdb0c.png" width="15"/> [LinkedIn](https://www.linkedin.com/in/madhur3u/)

<img src="https://user-images.githubusercontent.com/89251393/138821710-7b7585e0-4766-49ba-8543-c116d4da82c4.png" width="15"/> [Instagram](https://www.instagram.com/madhur3u/)

<img src="https://user-images.githubusercontent.com/89251393/138821715-eab2496c-e895-4113-a26b-96c087a83d9b.png" width="15"/> m3333u@gmail.com

<img src="https://user-images.githubusercontent.com/89251393/138822281-9aaf6bdc-2fe0-469a-bd31-ed43bc96dcc2.png" width="15"/> @madhur3u
