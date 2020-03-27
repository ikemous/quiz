//#region vairables

//Initialize Variables To Be Used throughout funcions
let totalTimeLeft = 100;//Total Time for quiz in seconds
const PENALTY = 10;//Penalty For Incorrect Answer
let score = 0;//Score for The Quiz
let questionNumber = 0;//Number Of Current Question 0 = 1
let highScoreList = [];//Array used To Store Scores
let timerInterval;//Interval For Test Timer
let displayInterval;//Interval For Answer Repsonse Time
let displayTime = 2;//Display Time For Answer Response

//Gather All needed elements
let listEl = document.getElementById("information");//Element for changing buttons and lists
let timerEl = document.getElementById("timer");//Span for changing timer
let displayEl = document.getElementById("display");//Display To show topics
let responseEl = document.getElementById("response");//El to show tell user if answer was correct or incorrect
let scoreBoardEl = document.getElementById("scoreBoard");//El to load ScoreBoard
let bellAudio = document.getElementById("bellAudio");//El for correct answer audio
let fartAudio = document.getElementById("fartAudio");//el for incorrect answer audio
let cheerAudio = document.getElementById("cheerAudio");//el for incorrect answer audio


//Define All Questions
let question1 = {//First Question
    q: "You Thought This Would Be A JavaScript Quiz Didn't You?",//Question
    a: "maybe",//Answer
    options: ["yes", "no", "also no"],//Possible options
};

let question2 = {//Second Question
    q: "This Is Another test Question",//Question
    a: "This is the right answsser",//Answer
    options: ["not the answer", "is the answer not this", "also not the answer"],//Possible Questions
};

let question3 = {//third Question
    q: "Which Battle Royal Just Came Out?",//Question
    a: "Warzone",//Answer
    options: ["PUBG", "APEX", "Fortnite"],//Possible Questions
};

let question4 = {//Fourth Question
    q: "Which League Champion Dies And Becomes An Egg?",//Question
    a: "Anivia",//Answer
    options: ["Blitzcrank", "Xerath", "Trundle"],//Possible Questions
};

let question5 = {//Fifth Question
    q: "Which Isn't A Video Game Streaming Platform?",//Question
    a: "Instagram",//Answer
    options: ["Facebook", "Mixer", "Twitch"],//Possible Questions
};

let question6 = {//Sixth Question
    q: "What Is Does 2+2 Equal?",//Question
    a: "Fish",//Answer
    options: ["Two", "Three", "Juan"],//Possible Questions
};


//Array To Hold All Questions
let questionList = [question1, question2, question3, question4, question5, question6];

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
    //Reset Question Number = 0
    questionNumber = 0;
    //Reset Quiz Time
    totalTimeLeft = 100;

    //Clear Any Times 
    clearInterval(timerInterval);
    clearInterval(displayTime);

    //Check If The list HTML is Empty
    if(listEl.innerHTML === "")
    {
        //display a new button
        loadStartButton();
        //display Default Time
        timerEl.textContent = totalTimeLeft;
    }
}//End init()

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
            questionNumber = questionList.length;
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

    //user clicked on incorrect answer
    if(showThis === "INCORRECT")
    {
        responseEl.setAttribute("style", "border-top: solid red; color: red");//set wrong answer styles
        fartAudio.play();

    }
    //user clicked on right answer
    else
    {
        responseEl.setAttribute("style", "border-top: solid green; color: green;");//Set right answer styles
        bellAudio.play();
    }
    responseEl.style.fontWeight = "bold";

    //Interval for how long the text will be displayed
    displayInterval = setInterval(function(){

        //Update The Total Time Of The Quiz
        displayTime--;

        //Check If Time Is Up
        if(displayTime <= 0)
        {
            
            //Stop Doing the loop
            clearInterval(displayInterval);
            //Clear Text and styles
            responseEl.innerHTML = "";
            responseEl.style.borderTop = "";
            responseEl.style.fontWeight = "";
            
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End startAnswerResponse()


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
        newButton.style.marginTop = "5px";
        listEl.appendChild(newButton);//Add Button To HTML
    }
}//End loadOptions()


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

    //Sort Through scoreboard using the compare function
    highScoreList = highScoreList.sort(compare);

    //Display Each Score Stored
    for(let i  = 0; i < highScoreList.length; i++)
    {
        //Display Users Score
        let scoreHolder = document.createElement("li");//Create List Element to hold user score and initials
        listEl.appendChild(scoreHolder);//put list item in HTML
        let userInitials = document.createElement("h4");//create header element for user initials
        userInitials.textContent = highScoreList[i].quizer + " - ";//give element text
        scoreHolder.appendChild(userInitials);//put el inside list item element
        let userScore = document.createElement("h4");//Create header element for user score
        userScore.textContent = highScoreList[i].quizScore;//give element score text
        scoreHolder.appendChild(userScore);//Put score in list item

        

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

//              loadStartButton()
//  Purpose: Check If the User clicked The Correct Answer
//  Parameters: None
//  Return: None
function loadStartButton()
{
    //Create Start Button
    let newButton = document.createElement("button")//Create Button element
    newButton.textContent = "START";//Give element text
    listEl.appendChild(newButton);//Put element inside the HTML
}//End loadStartButton()

//              loadResults()
//  Purpose: Load The Results page of the quiz
//  Parameters: None
//  Return: None
function loadResults()
{
    //Change Topic of the Page
    displayEl.textContent = "Your Score is: " + totalTimeLeft;
    timerEl.textContent = totalTimeLeft;

    //Create a spot for the user to input results
    let newDiv = document.createElement("li");//create new list element
    newDiv.setAttribute("class", "row");//Give element a class from bootstrap
    listEl.appendChild(newDiv);//Put element inside HTML

    //Header To Tell User To Input their initials
    let promptText = document.createElement("h4");//Create header element
    promptText.setAttribute("class", "col-sm-3");
    promptText.textContent = "Enter Initials:";//Give element Text
    newDiv.appendChild(promptText);//Put element inside HTML

    //Create a Input For The User To Put Their Initials In
    let scoreInitials = document.createElement("input");//Create Input Element
    scoreInitials.type = "text";//Give Element Text
    scoreInitials.placeholder = "AIB";//Put Placeholder for an example
    scoreInitials.setAttribute("id", "userInitials");//Give the input an ID for future interaction
    scoreInitials.setAttribute("class", "col-sm-5");//Give the input an ID for future interaction
    newDiv.appendChild(scoreInitials);//Put input in HTML

    //Create Button To Allow User To Submit Initials In ScoreBoard
    let submitButton = document.createElement("button");//create button element
    submitButton.setAttribute("style", "");
    submitButton.setAttribute("class", "col-sm-4");
    submitButton.textContent = "SUBMIT";//Give button text
    newDiv.appendChild(submitButton);//Add Button To HTML
    
    //Stop Doing the loop
    clearInterval(timerInterval);

}//End loadResults()



//              compare()
//  Skeleton of code from https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
//  Purpose: compare To Values to help in sorting through an object
//  Parameters: firstNum and secondNum - The two objects to be compared
//  Return: comparison - to help move through the array of objects
function compare(firstNum, secondNum) {
    //store score object values to be compared
    const quizScoreOne = firstNum.quizScore;//First Quiz Score
    const quizScoreTwo = secondNum.quizScore;//Second Quiz Score

    
  
    //Compare The Two Values
    let comparison = 0;//Variable To Indicate where the object stands
    if (quizScoreOne < quizScoreTwo) //First Score Is less than the next
      comparison = 1;
    else if (quizScoreOne > quizScoreTwo)//First score is greater than the next
      comparison = -1;

    return comparison;
}//End compare()


//             scoreBoardEl Event Listener
//  Purpose: to give an action event for the scoreboard header
//  Parameters: "click" event and loadScoreBoardFunction to be called
//  Return: None
scoreBoardEl.addEventListener("click", loadScoreBoard);

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
                if(document.getElementById("userInitials").value === null || document.getElementById("userInitials").value === "")//Check User Input
                {
                    alert("Silly goose, you need to type something in");
                    break;
                }
                else
                {
                    cheerAudio.play();
                    storeScoreBoard();
                    loadScoreBoard();
                }
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


//#endregion functions