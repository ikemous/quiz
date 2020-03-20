//Set time lengths for the quiz
let totalTimeLeft = 10;//Total Time for quiz in seconds
let timeForQuestion = 30;//Total Time for Question In Seconds
let score = 0;//Score for The Quiz


let listEl = document.querySelector("#buttonList");
let timerEl = document.getElementById("timer");
let answerValue = "";
let currentId = 0;

//Define first question as an object
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
        console.log(currentId);
        if(listEl.children[currentId].firstElementChild.textContent === "START")
        {
            startQuiz();
        }
        else{
            
            answerValue = listEl.children[currentId].firstElementChild.textContent;
        }
    }
}

// listEl.addEventListener("click", function(event){
//     if(event.target.matches("button"))
//     {
//         event.preventDefault();//Stop refresh 
//         currentId = parseInt(event.target.parentElement.id);
//         console.log(currentId);
//         if(listEl.children[currentId].firstElementChild.textContent === "START")
//         {
//             startQuiz();
//         }
//         else{
            
//             answerValue = listEl.children[currentId].firstElementChild.textContent;
//         }
//     }
// });

listEl.addEventListener("click", clickHandler);
