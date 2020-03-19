// grab the body of the HTML page
var pageBody = document.body;

//Create The Initial Tags
let infoEl = document.createElement("header");//Header for time tracking and scoreboard
let headerDivEl = document.createElement("div");//Creates All Div Elements
let scoreBoardEl = document.createElement("a");//Link for the scoreboard
let timerEl = document.createElement("h3");//header used for the timer
let mainEl = document.createElement("main");//Holds The scoreboard
let mainDivEl = document.createElement("div");//Div for the main tag
let questionEl = document.createElement("h1");//Header used for display
let quizRulesEl = document.createElement("p");
let startButtonEl = document.createElement("button");//Button To Start The Game


//Create Tags For The Questions
let answerOneEl = document.createElement("button");//First option for question
let answerTwoEl = document.createElement("button");//Second option for question
let answerThreeEl = document.createElement("button");//Third option for question
let answerFourEl = document.createElement("button");//Fourth option for question

//Append body elements
pageBody.appendChild(infoEl);//Put the header tag to the body
pageBody.appendChild(mainEl);//Put the main tag to the body

//All Changes done to header
infoEl.setAttribute("style", "width: 100%; padding: 25px; display: inline-block;");//Set style for
infoEl.appendChild(headerDivEl);//Add A Div element to the header
    headerDivEl.appendChild(scoreBoardEl);//add link to the header div
    headerDivEl.appendChild(timerEl);//add a h3 to the header
        scoreBoardEl.setAttribute("style", "left:0;");//Set Styles for the scoreBoardEl
        scoreBoardEl.textContent = "See Score Board";//Set Text For The Scoreboard
        timerEl.setAttribute("style", "right:0; float:right");//Set the style of the scoarboard
        timerEl.textContent = "Timer: "//Set The initial text of the site

//All Changes Done to the main 
mainEl.setAttribute("style", "display: block; width: 100%; margin-left: auto; margin-right: auto; text-align: center;");//make objects be in a block
mainEl.appendChild(mainDivEl);//Add Div in the main tp hold all content
    mainDivEl.appendChild(questionEl);//Add Header for question
    mainDivEl.appendChild(quizRulesEl);//Paragraph Used To Set The Quiz Rules
    mainDivEl.appendChild(startButtonEl);//Add Starting Button For The Start of The Quiz
    mainDivEl.appendChild(answerTwoEl);
    mainDivEl.appendChild(answerThreeEl);
    mainDivEl.appendChild(answerFourEl);
        startButtonEl.setAttribute("style", "height: 50px; width: 300px; background-color: lightblue;");//modify button style
        startButtonEl.textContent = "Start The Quiz";//Set The text of the button
        answerTwoEl.setAttribute("style", "display: block; height: 50px; width: 300px; background-color: lightblue; margin-left: auto; margin-right: auto;");//modify button style
        answerThreeEl.setAttribute("style", "display: block; height: 50px; width: 300px; background-color: lightblue; margin-left:auto; margin-right: auto");//modify button style
        answerFourEl.setAttribute("style", "display: block; height: 50px; width: 300px; background-color: lightblue; margin-left: auto; margin-right: auto");//modify button style
        questionEl.textContent = "Coding Quiz!!";//Give header a string value
        quizRulesEl.textContent = "This Quiz Is To Test Your Understanding Of The Javascript Language. You'll Have 30 seconds for each question for a total of 10 questions. May The Force Be With You";//Tell the rules
        startButtonEl.addEventListener("click", function(){startQuiz();});//Event On Click To Start Quiz


//Set time lengths for the quiz
let totalTimeLeft = 300;//Total Time for quiz in seconds
let timeForQuestion = 30;//Total Time for Question In Seconds


//Define first question
let question1 = {
    q: "is the answer Maybe?",
    a: "maybe",
    options: [
        "yes", "no", this.a, "also no"
    ],
}



let questionList = [question1];



function startQuiz()
{
    //Display The Total Time
    timerEl.textContent = "Timer: " + totalTimeLeft;

    //Change Header To Question
    quizRulesEl.textContent = question1.q;
    startButtonEl.style.visibility = "hidden";

    for(let i = 0; i < questionsList.length; i++)
    {

    }
    

    let timerInteral = setInterval(function(){

        //Update The Total Time Of The Quiz
        totalTimeLeft--;



        //Update The Display Time
        timerEl.textContent = "Timer: " + totalTimeLeft;

        //Check If Time Is Up
        if(totalTimeLeft === 0)
        {
            //Stop Doing the loop
            clearInterval(timerInteral);
        }



    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End StartQuiz()



function updateQuestion()
{

}//End updateQuestion()
