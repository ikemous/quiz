//#region initialize vairables


//Set time lengths for the quiz
let totalTimeLeft = 100;//Total Time for quiz in seconds
const PENALTY = 10;
let score = 0;//Score for The Quiz
let questionNumber = 0;//Number Of Current Question 0 = 1
let currentId = 0;//Variable Used To count through the buttons
let highScoreList = [];
let timerInterval;
let displayInterval;

//Gather All needed elements
let listEl = document.getElementById("buttons");
let timerEl = document.getElementById("timer");
let displayEl = document.getElementById("display");
let responseEl = document.getElementById("response");


//Define first question as an object
let question1 = {
    q: "is the answer Maybe?",
    a: "maybe",
    options: ["yes", "no", "also no"],
};

let question2 = {
    q: "This Is Another test Question",
    a: "This is the right answsser",
    options: ["not the answer", "is the answer not this", "also not the answer"],
};

//Array Of Questions
let questionList = [question1, question2];

//initialize Program
init();

//#endregion

function init()
{
    highScoreList = JSON.parse(localStorage.getItem("scoreList"));
    
    displayEl.textContent = "!!!Javascript Quiz!!!";
    questionNumber = 0;

    if(highScoreList === null)
    {
        highScoreList = [];
    }
    if(listEl.innerHTML === "")
    {
        let newButton = document.createElement("button")
        newButton.textContent = "START";
        newButton.setAttribute("data-number", 0);
        listEl.appendChild(newButton);
    }
}

listEl.addEventListener("click", function(event){

    if(event.target.matches("button")) 
    {
        //Start Quiz
        if(event.target.textContent === "START")
        {
            populate();
            startQuiz();
        }
        //Enter Into High Score
        else if(event.target.textContent === "SUBMIT")
        {
            storeScoreBoard();
            loadScoreBoard();

        }
        else if(event.target.textContent === "CLEAR")
        {
            clearScore();
            loadScoreBoard();
        }
        else if(event.target.textContent === "RETURN")
        {
            listEl.innerHTML = "";
            init();
        }
        else
        {
            checkAnswer(event);
            populate(); 
        }
    }
});

function populate()
{
    listEl.innerHTML = "";

    if(questionNumber < questionList.length)
    {
        
        let randomNumber = Math.floor(Math.random() * 4);
        let optionNumber = 0;
        displayEl.textContent = questionList[questionNumber].q;

        for(let i = 0; i < 4; i++)
        {
            let newButton = document.createElement("button")
            newButton.setAttribute("data-number", i);
            if(i === randomNumber)
            {
                newButton.textContent = questionList[questionNumber].a
            }
            else
            {
                newButton.textContent = questionList[questionNumber].options[optionNumber];
                optionNumber++;
            }
            listEl.appendChild(newButton);
        }
    }
    else
    {
        

        displayEl.textContent = "Results!";
        let newDiv = document.createElement("li");
        newDiv.setAttribute("class", "row");
        listEl.appendChild(newDiv);

        let promptText = document.createElement("h6");
        promptText.textContent = "Enter Initials:";
        newDiv.appendChild(promptText);


        let scoreInitials = document.createElement("input");
        scoreInitials.type = "text";
        scoreInitials.placeholder = "AIB";
        scoreInitials.setAttribute("style", "padding-right: 400px;");
        scoreInitials.setAttribute("id", "userInitials");
        newDiv.appendChild(scoreInitials);

        let submitButton = document.createElement("button");
        submitButton.textContent = "SUBMIT";
        newDiv.appendChild(submitButton);

        
        //Stop Doing the loop
        clearInterval(timerInterval);

    }

}

function startQuiz()
{

    timerInterval = setInterval(function(){

        //Update The Total Time Of The Quiz
        totalTimeLeft--;

        //Update The Display Time
        timerEl.textContent = totalTimeLeft;

        //Check If Time Is Up
        if(totalTimeLeft <= 0)
        {
            
            //Stop Doing the loop
            clearInterval(timerInterval);
            
            populate(); 
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End StartQuiz()


function storeScoreBoard()
{
    let theInitials = document.getElementById("userInitials").value;

        if(theInitials === undefined || theInitials === "")
        {
            alert("You must put something in the box");
            return;
        }
        

    let tempObj = {
        quizer: theInitials,
        quizScore: totalTimeLeft
    };

    highScoreList.push(tempObj);

    localStorage.setItem("scoreList", JSON.stringify(highScoreList));

}//End storeScoreBoard()

function clearScore()
{
    localStorage.clear();
    highScoreList = [];
}//End clearScore()

function loadScoreBoard()
{
    
    listEl.innerHTML = "";
    responseEl.innerHTML = ""; 
    displayEl.textContent = "Score Board!";  

    for(let i  = 0; i < highScoreList.length; i++)
    {
        let userInitials = document.createElement("li");
        userInitials.textContent = highScoreList[i].quizer + ": " + highScoreList[i].quizScore;
        listEl.appendChild(userInitials);
    }

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "row");
    listEl.appendChild(newDiv);

    let clearButton = document.createElement("button");
    clearButton.textContent = "CLEAR";
    newDiv.appendChild(clearButton);

    let returnButton = document.createElement("button");
    returnButton.textContent = "RETURN";
    newDiv.appendChild(returnButton);

}

function checkAnswer(event)
{
    if(event.target.textContent === questionList[questionNumber].a)
    {
        // responseEl.textContent = "CORRECT!";
        startAnswerResponse("CORRECT");
        questionNumber++;
    }
    else
    {
        // responseEl.textContent = "CORRECT!";
        startAnswerResponse("INCORRECT");
        let timeAfterPen = totalTimeLeft - PENALTY;
        if(timeAfterPen <= 0)
        {
            totalTimeLeft = 1;
        }
        else
        {
            totalTimeLeft -= PENALTY;
        }
    }

}

function startAnswerResponse(showThis)
{
    let displayTime = 2;

    responseEl.textContent = showThis;

    displayInterval = setInterval(function(){

        //Update The Total Time Of The Quiz
        displayTime--;

        //Check If Time Is Up
        if(displayTime <= 0)
        {
            
            //Stop Doing the loop
            clearInterval(displayInterval);

            responseEl.innerHTML = "";
            
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}