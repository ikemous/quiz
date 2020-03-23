//#region vairables

//Initialize Variables To Be Used throughout funcions
let totalTimeLeft = 100;//Total Time for quiz in seconds
const PENALTY = 10;//Penalty For Incorrect Answer
let score = 0;//Score for The Quiz
let questionNumber = 0;//Number Of Current Question 0 = 1
let currentId = 0;//Variable Used To count through the buttons
let highScoreList = [];//Array used To Store Scores
let timerInterval;//Interval For Test Timer
let displayInterval;//Interval For Answer Repsonse Time
let displayTime = 2;//Display Time For Answer Response

//Gather All needed elements
let listEl = document.getElementById("buttons");//Element for changing buttons and lists
let timerEl = document.getElementById("timer");//Span for changing timer
let displayEl = document.getElementById("display");//Display To show topics
let responseEl = document.getElementById("response");//El to show tell user if answer was correct or incorrect


//Define All Questions
let question1 = {//First Question
    q: "is the answer Maybe?",//Question
    a: "maybe",//Answer
    options: ["yes", "no", "also no"],//Possible options
};

let question2 = {//Second Question
    q: "This Is Another test Question",//Question
    a: "This is the right answsser",//Answer
    options: ["not the answer", "is the answer not this", "also not the answer"],//Possible Questions
};

//Array To Hold All Questions
let questionList = [question1, question2];


//#endregion variables


//initialize Program
init();

//#region functions

//              init()
//  Purpose: To load the quiz vefire yser ckucjs start
//  Parameters: None
//  Returns: None 
function init()
{
    //Grab Scorelist From The Local Storage
    highScoreList = JSON.parse(localStorage.getItem("scoreList"));

    //Check If The ScoreList is empty
    if(highScoreList === null)
    {
        //Make Score List An Empty Array
        highScoreList = [];
    }
    
    //Change The Display To The Quiz Title
    displayEl.textContent = "!!!Javascript Quiz!!!";
    //Make Question Number = 0
    questionNumber = 0;

    //Check If The list HTML is Empty
    if(listEl.innerHTML === "")
    {
        //display a new button
        loadStartButton();
    }
}//End init()

//              listEl Event Listener
//  Purpose: To give purpose to The buttons Populated
//  Parameters: event action and function to happen during event
//  Return: None
listEl.addEventListener("click", function(event){

    //Check if even was a button
    if(event.target.matches("button"))
    {
        //Check Text Of The Button
        switch(event.target.textContent) 
        {
            //Button Says Start
            case "START":
                populate();
                startQuiz();
                break;
            //Button Says Submit
            case "SUBMIT":
                storeScoreBoard();
                loadScoreBoard();
                break;
            //Button Says Clear
            case "CLEAR":
                clearScore();
                loadScoreBoard();
                break;
            //Buttons Says Return
            case "RETURN":
                listEl.innerHTML = "";
                init();
                break;
            //check To See If Button Text is Equal To The Answer
            default:
                checkAnswer(event);
                populate(); 
        }
    }
});//End List El Event Listener

//              populate()
//  Purpose: Clear List El then check if results or test options need to be loaded
//  Parameters: None
//  Return: None
function populate()
{
    //Clear List element
    listEl.innerHTML = "";

    //Check ifthere are still test questions
    if(questionNumber < questionList.length)
    {

        loadOptions();
    }
    //There are no more test questions
    else
    {
        loadResults();
        //Stop Test Time
        clearInterval(timerInterval);
    }

}//End populate()

//              startQuiz()
//  Purpose: Start Quiz Timer
//  Parameters: None
//  Return: None
function startQuiz()
{
    //Set Interval For Timer
    timerInterval = setInterval(function(){

        //Update The Total Time Of The Quiz
        totalTimeLeft--;

        //Update The Display Time
        timerEl.textContent = totalTimeLeft;

        //Check If Time Is Up
        if(totalTimeLeft <= 0)
        {
            
            //Stop Timer Loop
            clearInterval(timerInterval);
            
            populate(); 
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End StartQuiz()

//              storeScoreBoard()
//  Purpose: Store Users Initials with their score and add it to the scoreboard
//  Parameters: None
//  Return: None
function storeScoreBoard()
{
    //Grab user tester Initials
    let theInitials = document.getElementById("userInitials").value;

    //Check If There is User Input
    if(theInitials === undefined || theInitials === "")
    {
        alert("You must put something in the box");
        return;
    }
        
    //Store Information to an object
    let tempObj = {
        quizer: theInitials,//user input
        quizScore: totalTimeLeft//Store Score
    };

    //Push new Score into highScoreList Array
    highScoreList.push(tempObj);

    //Store Array Into localStorage
    localStorage.setItem("scoreList", JSON.stringify(highScoreList));

}//End storeScoreBoard()

//              clearScore()
//  Purpose: Clear Score Board From The Local Storage
//  Parameters: None
//  Return: None
function clearScore()
{
    //Clear local Storage
    localStorage.clear();
    //Update HighScoreList
    highScoreList = [];
}//End clearScore()

//              loadScoreBoard()
//  Purpose: Display Score Of All Quizers Who've Taken The Test
//  Parameters: None
//  Return: None
function loadScoreBoard()
{
    //Clear Elements
    listEl.innerHTML = "";
    responseEl.innerHTML = ""; 
    
    //Display Page Subject
    displayEl.textContent = "Score Board!";  

    //Filter Through Scores
    for(let i  = 0; i < highScoreList.length; i++)
    {
        //Display Users Score
        let userInitials = document.createElement("li");//Create List Element
        userInitials.textContent = highScoreList[i].quizer + ": " + highScoreList[i].quizScore;//Give Element text
        listEl.appendChild(userInitials);//Add Element To HTML
    }

    //Make a spot to insert buttons
    let newDiv = document.createElement("li");//Div element for buttons
    newDiv.setAttribute("class", "row");//Give Element a class from bootstrap
    listEl.appendChild(newDiv);//Add Element to the unordered list

    //Insert a clear button
    let clearButton = document.createElement("button");//Create button Element
    clearButton.textContent = "CLEAR";//Add text to element
    newDiv.appendChild(clearButton);//Add button to div element

    //Insert a return button
    let returnButton = document.createElement("button");//Create button Element
    returnButton.textContent = "RETURN";//Add text to Button
    newDiv.appendChild(returnButton);//Add button to the div element

}//End loadScoreboard

//              checkAnswer()
//  Purpose: Check If the User clicked The Correct Answer
//  Parameters: None
//  Return: None
function checkAnswer(event)
{
    //User Clicked Right Answer
    if(event.target.textContent === questionList[questionNumber].a)
    {
        // Display Answer Was Correct
        startAnswerResponse("CORRECT");
        //Increase Question Number
        questionNumber++;
    }
    //User Didn't Click The Right Answer
    else
    {
        //Display Answer Was Wrong
        startAnswerResponse("INCORRECT");
        //Create Variable to check if the time would be below 0
        let timeAfterPen = totalTimeLeft - PENALTY;

        //time is below 0
        if(timeAfterPen <= 0)
        {
            //Change Total Time left to 0
            totalTimeLeft = 1;
        }
        //Time Doesn't Equal 0
        else
        {
            //Enforce Penalty
            totalTimeLeft -= PENALTY;
        }
    }

}//End checkAnswer()

//              startAnswerResponse()
//  Purpose: Display If the users Answer Is Correct Or Incorrect for a period of time
//  Parameters: showThis - String To Display in an element
//  Return: None
function startAnswerResponse(showThis)
{

    
    //Stop Doing the loop
    clearInterval(displayInterval);
    
    //Reset Display Time
    displayTime = 2;

    //Display Text
    responseEl.textContent = showThis;

    //Interval for how long the text will be displayed
    displayInterval = setInterval(function(){

        //Update The Total Time Of The Quiz
        displayTime--;

        //Check If Time Is Up
        if(displayTime <= 0)
        {
            
            //Stop Doing the loop
            clearInterval(displayInterval);
            //Clear Text
            responseEl.innerHTML = "";
            
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End startAnswerResponse()

//              loadStartButton()
//  Purpose: Check If the User clicked The Correct Answer
//  Parameters: None
//  Return: None
function loadStartButton()
{
    //Create Start Button
    let newButton = document.createElement("button")//Create Button element
    newButton.textContent = "START";//Give element text
    newButton.setAttribute("data-number", 0);//give element attribute
    listEl.appendChild(newButton);//Put element inside the HTML
}//End loadStartButton()

//              loadResults()
//  Purpose: Load The Results page of the quiz
//  Parameters: None
//  Return: None
function loadResults()
{
    //Change Topic of the Page
    displayEl.textContent = "Results!";

    //Create a spot for the user to input results
    let newDiv = document.createElement("li");//create new list element
    newDiv.setAttribute("class", "row");//Give element a class from bootstrap
    listEl.appendChild(newDiv);//Put element inside HTML

    //Header To Tell User To Input their initials
    let promptText = document.createElement("h6");//Create header element
    promptText.textContent = "Enter Initials:";//Give element Text
    newDiv.appendChild(promptText);//Put element inside HTML

    //Create a Input For The User To Put Their Initials In
    let scoreInitials = document.createElement("input");//Create Input Element
    scoreInitials.type = "text";//Give Element Text
    scoreInitials.placeholder = "AIB";//Put Placeholder for an example
    scoreInitials.setAttribute("style", "padding-right: 400px;");//give input padding for a longer box
    scoreInitials.setAttribute("id", "userInitials");//Give the input an ID for future interaction
    newDiv.appendChild(scoreInitials);//Put input in HTML

    //Create Button To Allow User To Submit Initials In ScoreBoard
    let submitButton = document.createElement("button");//create button element
    submitButton.textContent = "SUBMIT";//Give button text
    newDiv.appendChild(submitButton);//Add Button To HTML
    
    //Stop Doing the loop
    clearInterval(timerInterval);

}//End loadResults()

//              loadOptions()
//  Purpose: Load The Test Options For The Quiz
//  Parameters: None
//  Return: None
function loadOptions()
{
    
    let randomNumber = Math.floor(Math.random() * 4);//Create Random Number For a PlaceHolder For The Answer
    let optionNumber = 0;//Temp Variable To Go Through Question Options
    displayEl.textContent = questionList[questionNumber].q;//Display Question as topic of the page

    //Create buttons for question options
    for(let i = 0; i < 4; i++)
    {
        //Create button with question option
        let newButton = document.createElement("button");//Create Button Element
        //Check If the button needs to be the answer
        if(i === randomNumber)
        {
            newButton.textContent = questionList[questionNumber].a;//Give Button A Text To The Answer
        }
        //Buttons Doesn't Need to Be The Answer
        else
        {
            newButton.textContent = questionList[questionNumber].options[optionNumber];//Give Button a text of one of the question options
            optionNumber++;//Increase Option number for next button
        }
        listEl.appendChild(newButton);//Add Button To HTML
    }
}//End loadOptions()

//#endregion functions