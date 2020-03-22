//#region initialize vairables


//Set time lengths for the quiz
let totalTimeLeft = 100;//Total Time for quiz in seconds
const PENALTY = 10;
let score = 0;//Score for The Quiz
let questionNumber = 0;//Number Of Current Question 0 = 1
let currentId = 0;//Variable Used To count through the buttons

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
    a: "This is the right answer",
    options: ["not the answer", "is the answer not this", "also not the answer"],
};

//Array Of Questions
let questionList = [question1, question2];

//initialize Program
init();

//#endregion

function init()
{
    if(listEl.innerHTML === "")
    {
        let newButton = document.createElement("button")
        newButton.textContent = "START";
        newButton.setAttribute("data-number", 0);
        listEl.appendChild(newButton);
    }

}

listEl.addEventListener("click", function(event){
    console.log(event.target);
    console.log(questionList[questionNumber].a)

    if(event.target.matches("button") && event.target.textContent === "START")
    {
        populate();
        startQuiz();
    }
    else if(event.target.textContent === "SUBMIT")
    {

    }
    else if(event.target.textContent === questionList[questionNumber].a)
    {
        responseEl.textContent = "CORRECT!";
        questionNumber++;
        populate(); 
    }
    else
    {
        
        responseEl.textContent = "BOOO YOU SUK!";
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
});

function populate()
{
    listEl.innerHTML = "";
    //random number to be assigned the answer

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
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "row");
        listEl.appendChild(newDiv);

        let promptText = document.createElement("h6");
        promptText.setAttribute("class", "col-sm-3");
        promptText.textContent = "YO INITAILS HERE";
        newDiv.appendChild(promptText);


        let scoreInitials = document.createElement("input");
        scoreInitials.type = "text";
        scoreInitials.setAttribute("class", "col-sm-6");
        newDiv.appendChild(scoreInitials);

        let submitButton = document.createElement("button");
        submitButton.textContent = "SUBMIT"
        submitButton.setAttribute("class", "col-sm-3");
        newDiv.appendChild(submitButton);

        totalTimeLeft = 1;

    }

}

function startQuiz()
{

    let timerInteral = setInterval(function(){

        //Update The Total Time Of The Quiz
        totalTimeLeft--;

        //Update The Display Time
        timerEl.textContent = totalTimeLeft;

        //Check If Time Is Up
        if(totalTimeLeft <= 0)
        {
            
            //Stop Doing the loop
            clearInterval(timerInteral);
            
            questionNumber = questionList.length;
            populate(); 
        }

    }, 1000 /* Speed For The Timer = 1 Second*/);
}//End StartQuiz()



//#region outAreas

/*
function checkAnswer(event)
{
    if(event.target.matches("button"))
    {
        currentId = parseInt(event.target.parentElement.id);
        console.log(event.target.textContent);

        if(questionNumber >= questionList.length)
        {
            alert("Out Of Questions");
        }
        else if(event.target.textContent === questionList[questionNumber].a)
        {

            alert(event.target.textContent + " " + questionList[questionNumber].a + "correct!");
            populateMaterial();
        }
        else if(event.target.textContent !== questionList[questionNumber].a)
        {
            alert("correct!");
            populateMaterial();
        }

    }
} */

// function populateMaterial(){

//     //Display The Question
//     displayEl.textContent = questionList[questionNumber].q;
    
//     //Pick a Random Number to for the answer to be displayed
//     let ranNum = Math.floor(Math.random() * 4);
//     //Display Random Number In The Button
//     listEl.children[ranNum].firstElementChild.textContent = questionList[questionNumber].a;

//     //Go through All The Buttons to Display The Possible Options
//     for(let i = 0; i < 4; i++)
//     {
//         //Used to assign the last button element
//         if(i === 3 && i !== ranNum)
//         {
//             //Assign button element the last option
//             listEl.children[i].firstElementChild.textContent = questionList[questionNumber].options[2];  
//         }
//         //Check if the current number isnt the position of the answer
//         else if(i !== ranNum)
//         {
//             //Assign button the option
//             listEl.children[i].firstElementChild.textContent = questionList[questionNumber].options[i];  
//         }
//     }

//     //Increment Questino Number
//     questionNumber++;

// }//End pupulateMaterial()

// listEl.addEventListener("click", checkAnswer);

// startEl.addEventListener("click", function(event){

//         event.preventDefault();//Stop Refresher
//         //Hide the start button
//         startEl.style.visibility = "hidden";

//         //Unhide the Options for the test
//         for(let i = 0; i < listEl.childElementCount; i++)
//         {
//             //Set Style To Visible
//             listEl.children[i].firstElementChild.style.visibility = "visible";
            

//         }

//         // populateMaterial();
//         startQuiz();
// });

    
/*
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
});*/


//#endregion outAreas