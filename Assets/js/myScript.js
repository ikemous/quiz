//Set time lengths for the quiz
let totalTimeLeft = 10;//Total Time for quiz in seconds
let timeForQuestion = 30;//Total Time for Question In Seconds
let score = 0;//Score for The Quiz
let questionNumber = 0//Number Of Current Question 0 = 1
let currentId = 0;//Variable Used To count through the buttons

//Gather All needed elements
let listEl = document.querySelector("#answerButtons");
let timerEl = document.getElementById("timer");
let startEl = document.getElementById("startButton")
let displayEl = document.getElementById("display");


//Define first question as an object
let question1 = {
    q: "is the answer Maybe?",
    a: "maybe",
    options: ["yes", "no", "also no"],
};

let question2 = {
    q: "This Is Another test Question",
    a: "This is the right answer",
    options: ["not the answer", "is the answer not this", "also not the answer"],
};

//Array Of Questions
let questionList = [question1, question2];




function startQuiz()
{
    totalTimeLeft = 10;

    let timerInteral = setInterval(function(){

        //Update The Total Time Of The Quiz
        totalTimeLeft--;

        //Update The Display Time
        timerEl.textContent = "Timer: " + totalTimeLeft;

        //Check If Time Is Up
        if(totalTimeLeft <= 0)
        {
            //Stop Doing the loop
            clearInterval(timerInteral);
        }



    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End StartQuiz()


function clickHandler(event)
{
    if(event.target.matches("button"))
    {
        event.preventDefault();//Stop refresh 
        currentId = parseInt(event.target.parentElement.id);


    }
}

function populateMaterial(){

    //Display The Question
    displayEl.textContent = questionList[questionNumber].q;
    
    //Pick a Random Number to for the answer to be displayed
    let ranNum = Math.floor(Math.random() * 4);
    //Display Random Number In The Button
    listEl.children[ranNum].firstElementChild.textContent = questionList[questionNumber].a;

    //Go through All The Buttons to Display The Possible Options
    for(let i = 0; i < 4; i++)
    {
        //Used to assign the last button element
        if(i === 3 && i !== ranNum)
        {
            //Assign button element the last option
            listEl.children[i].firstElementChild.textContent = questionList[questionNumber].options[2];  
        }
        //Check if the current number isnt the position of the answer
        else if(i !== ranNum)
        {
            //Assign button the option
            listEl.children[i].firstElementChild.textContent = questionList[questionNumber].options[i];  
        }
    }

    //Increment Questino Number
    questionNumber++;

}//End pupulateMaterial()

listEl.addEventListener("click", clickHandler);

startEl.addEventListener("click", function(){

        event.preventDefault();//Stop Refresher
        //Hide the start button
        startEl.style.visibility = "hidden";

        //Unhide the Options for the test
        for(let i = 0; i < listEl.childElementCount; i++)
        {
            //Set Style To Visible
            listEl.children[i].firstElementChild.style.visibility = "visible";
            

        }

        populateMaterial();
        startQuiz();
});




