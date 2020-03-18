// grab the body of the HTML page
var pageBody = document.body;

//Create The Initial Tags
let infoEl = document.createElement("header");//Header for time tracking and scoreboard
let headerDivEl = document.createElement("div");//Creates All Div Elements
let scoreBoardEl = document.createElement("a");//Link for the scoreboard
let timerEl = document.createElement("h3");//header used for the timer
let mainEl = document.createElement("main");//Holds The scoreboard
let questionEl = document.createElement("h1");//Header used for question display



//Append body elements
pageBody.appendChild(infoEl);//Put the header tag to the body
pageBody.appendChild(mainEl);//Put the main tag to the body

//All Changes done to header
infoEl.setAttribute("style", "width: 100%; padding: 25px");//Set style for
infoEl.appendChild(headerDivEl);//Add A Div element to the header
    headerDivEl.appendChild(scoreBoardEl);//add link to the header div
    headerDivEl.appendChild(timerEl);//add a h3 to the header
        scoreBoardEl.setAttribute("style", "left:0;");//Set Styles for the scoreBoardEl
        scoreBoardEl.textContent = "See Score Board";//Set Text For The Scoreboard
        timerEl.setAttribute("style", "right:0; float:right");//Set the style of the scoarboard
        timerEl.textContent = "Timer: "//Set The initial text of the site

//All Changes Done to the main 
mainEl.setAttribute("style", "display: inline-block");//make objects be in a block
mainEl.appendChild(questionEl);//Add Header for question

