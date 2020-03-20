//Set time lengths for the quiz
let totalTimeLeft = 10;//Total Time for quiz in seconds
let timeForQuestion = 30;//Total Time for Question In Seconds
let score = 0;//Score for The Quiz


let listEl = document.querySelector("#answerButtons");
let timerEl = document.getElementById("timer");
let startEl = document.getElementById("startButton")

let answerValue = "";
let questionNumber = 0
let currentId = 0;

//Define first question as an object
let question1 = {
    q: "is the answer Maybe?",
    a: "maybe",
    options: ["yes", "no", "also no", ],
};

//Array Of Questions
let questionList = [question1];




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

    

    listEl.children[0].firstElementChild.textContent = questionList[questionNumber].options[0];
    listEl.children[1].firstElementChild.textContent = questionList[questionNumber].options[1];
    listEl.children[2].firstElementChild.textContent = questionList[questionNumber].options[2];
    listEl.children[3].firstElementChild.textContent = questionList[questionNumber].options[3];


    questionNumber++;

}

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




