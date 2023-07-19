//Select Element
let spans = document.querySelector(".spans")
let Count = document.querySelector(".Count")
let QuestionsParent = document.querySelector(".Questions-parent h2")
let AnswerQuestions = document.querySelector(".Questions-parent h3")
let QuestionsParent2 = document.querySelector(".Questions-parent ")
let QuestionsAnswer = document.querySelector(".Questions-parent .Questions")
let submit = document.querySelector(".submit")
let Bulltes = document.createElement("span")
let BulltesParent = document.querySelector(".spans")
let result = document.querySelector(".result")
let counter = document.querySelector(".count")
let countDiv = document.querySelector(".countDiv")
let head = document.getElementsByTagName("header")[0];
console.log(countDiv)


let CurrentIndex = 0;
let TheRightAnsweres = 0;
let countdownInterval;

function data() {
    var myrequsets = new XMLHttpRequest();
    myrequsets.onreadystatechange = function (){
        if (this.readyState === 4 && this.status === 200 ) {
            let obj = JSON.parse(this.responseText)
            let countObj = obj.length;
            createBulltes(countObj)
            
            AddQuestionsAnswer(obj[CurrentIndex] , countObj)

            //Start Countdown
                // countdown( 1 , countObj)

            // Click On Submit
            submit.onclick = () => {
                let rightAnswer = obj[CurrentIndex].Rigth_Answer;
                
                //Incress Index
                    CurrentIndex++;
                
                //Check The Answer
                CheckAnswer(rightAnswer , countObj)
                //Remove Provider 
                QuestionsParent.innerHTML = "";
                QuestionsAnswer.innerHTML = "";
                AddQuestionsAnswer(obj[CurrentIndex] , countObj)
                // Handle Buleets
                handleBuleets();

                // clearInterval(countdownInterval)
                // countdown( 1 , countObj)

                
                showResult(countObj);   
                console.log(countObj)
            };


        }
    }; 
    myrequsets.open("GET" ,"htmlquestions.json", true);
    myrequsets.send();

};
data()





function createBulltes (num){
    Count.innerHTML = num;
    //CreateSpans
    for (let i = 0 ; i < num ; i++){
        let Bulltes = document.createElement("span")
        if (i === 0 ){
            Bulltes.className = "star"
        }
        //CreateBulltes  
        //Append Bulltes 
        spans.append(Bulltes)
        // console.log(Bulltes)
    }
}






function AddQuestionsAnswer (obj , count){
    if (CurrentIndex < count) {
        // Create Element
    let qh2 = document.createElement("h2");
    // Create Text Questions
    let qTitle = document.createTextNode(obj['Title'])

    qh2.appendChild(qTitle)

    QuestionsParent.appendChild(qh2)

    // Create Answer 
    for (let i = 1; i <= 3 ; i++) {
        let mainDiv = document.createElement("div")
        mainDiv.className = "Questions"

        let radioInbut = document.createElement("input")
        radioInbut.type = "radio";
        radioInbut.name = "Questions";
        radioInbut.id = `Answer_${i}`;
        radioInbut.dataset.answer = obj[`Answer_${i}`];

        if ( i === 1) {
            radioInbut.checked = true
        }

        //creat Label
        let theLabel = document.createElement("label")
        theLabel.htmlFor = `Answer_${i}`
        //createLabelText
        let theLabelText = document.createTextNode(obj[`Answer_${i}`])
        //Add The Text To Label
        theLabel.append(theLabelText)
        //Add Inbut + label To MainDiv
        mainDiv.appendChild(radioInbut)
        mainDiv.appendChild(theLabel)
        QuestionsAnswer.append(mainDiv)
    }
    }
    
}








function CheckAnswer (rightAnswer , countObj)  {

    let answers = document.getElementsByName("Questions");
    let TheChoosenAnswer;
    for(i = 0; i < answers.length; i++) {
        if(answers[i].checked) {
            TheChoosenAnswer = answers[i].dataset.answer
        }
    }
    // AnswerQuestions.innerHTML = rightAnswer;
    // console.log(`The rightAnswer  ///////////////// ${rightAnswer}`)
    // console.log(`The TheChoosenAnswer ///////////// ${TheChoosenAnswer}`)
    if(rightAnswer === TheChoosenAnswer) {
        TheRightAnsweres++;
    }
}








function handleBuleets() {
    let buleetsSpan = document.querySelectorAll(".spans span")
    let AraaySpan = Array.from(buleetsSpan);
    AraaySpan.forEach((span , index) => {
        if (CurrentIndex === index) {
            span.className = "star"
        }
    })
}




function showResult(count) {
    let theResult = "dsfsfdsd";
    if (CurrentIndex === count) {
        QuestionsParent2.remove()
        submit.remove()
        BulltesParent.remove()
        // counter.remove()


        if (TheRightAnsweres > Count / 2 && TheRightAnsweres < count) {
            theResult = `<span class="prefect">prefect</span> , ${TheRightAnsweres} From ${count}Is good`
        }
        else if(TheRightAnsweres === count) {
            theResult = `<span class="good">Good</span>,  ${TheRightAnsweres} From ${count}Is prefect`
        }
        else{
            theResult = `<span class="bad">bad</span> , ${TheRightAnsweres} From ${count}Is bad`
        }
        result.innerHTML = theResult;
    }
}


// function countdown (duration , count) {
//     if (CurrentIndex < count) {
//         let minutes , seconed;
//         countdownInterval = setInterval(function () {
//             minutes = parseInt(duration / 60)
//             seconed = parseInt(duration % 60)

//             minutes = minutes < 10 ? `0${minutes}`: minutes ;
//             seconed = seconed < 10 ? `0${seconed}`: seconed ;


//             countDiv.innerHTML = `${minutes}::${seconed}`;
//             if(--duration < 0) {
//                 clearInterval(countdownInterval);
//                 console.log("finish")
//                 submit.click();
//             }
//         }, 1000)
//     }
// }
