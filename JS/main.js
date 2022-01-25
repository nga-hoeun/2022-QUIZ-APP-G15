
const arrayOfContext=[{
    picIcon:"./IMG/Vector.png",
    title:"Test Your Knowledge",
    imageBody:"./IMG/quiz.png",
    text:"Quiz"
},
{
    picIcon:"./IMG/Vector (1).png",
    title:"Create Something New",
    imageBody:"./IMG/question.png",
    text:"Create"
}];

let myQuestions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: {
        a: "<javascript>",
        b: "<scripting>",
        c: "<js>",
        d: "<script>"
      },
      correctAnswer: "d"
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: {
        a: "function = myFunction()",
        b: "function myFunction()",
        c: "function:myFunction()",
        d: "function::myFunction()"
      },
      correctAnswer: "b"
    },
    {
      question: "How do you call a function named 'myFunction'?",
      answers: {
        a: "call function myFunction() ",
        b: "jQuerymyFunction()",
        c: "call myFunction()",
        d: "myFunction()"
      },
      correctAnswer: "d"
    },
    {
      question: "How to write an IF statement in JavaScript?",
      answers: {
        a: "if i == 5 then",
        b: "if (i == 5)",
        c: "if i = 5",
        d: "if i = 5 then"
      },
      correctAnswer: "b"
    }
  ];

// let myQuestions = [];

document.querySelector(".finalResult").style.display = "none";
document.querySelector(".start").style.display = "none";
// document.querySelector(".finalResult").style.display = "none";
document.querySelector(".btnSubmitResult").style.display = "none";
// document.querySelector(".nextQ").style.display = "none";
// document.querySelector(".backBtn").style.display = "none";
function displayOption(){ 
    index = 0;
    let oldContainer = document.getElementsByClassName("newContainer")
    if (oldContainer.length > 0){
      oldContainer[0].remove();
    }

    let answerContainer = document.getElementsByClassName("questionContainer")
    if (answerContainer.length !== 0){
      for (let i=0;i<answerContainer.length;i++){
        console.log(answerContainer[i]);
        answerContainer[i].style.display = "none";
        } 
    }

    let displayQ = document.querySelector(".quizContainer");
    if (displayQ !== null){
      displayQ.style.display = "none";
    } 

    let oldContainerF = document.getElementsByClassName("addContainer")
    if (oldContainerF.length > 0){
      oldContainerF[0].remove();
    }

    let btnNext = document.querySelector(".nextQ");
    if (btnNext !== null){
      btnNext.style.display = "none";
    } 
    let btnBack = document.querySelector(".backBtn");
    if (btnBack !== null){
      btnBack.style.display = "none";
    } 

    document.querySelector(".finalResult").style.display = "none";
    document.querySelector(".btnSubmitResult").style.display = "none";


    let container=document.getElementById("home-page");
    let newContainer = document.createElement("div");
    newContainer.setAttribute("class", "newContainer");
    container.style.display="none";
    for(let object of arrayOfContext){
        let card=document.createElement("div");
        card.className="card";
        let cardTitle=document.createElement("div");
        cardTitle.className="card-title"
        let iconQuiz=document.createElement("img");
        iconQuiz.className="icon";
        iconQuiz.src=object.picIcon;
        cardTitle.appendChild(iconQuiz);
        let title=document.createElement("h3");
        title.className="title";
        title.textContent=object.title
        cardTitle.appendChild(title);
        card.appendChild(cardTitle);
        let cardBody=document.createElement("img");
        cardBody.src=object.imageBody;
        cardBody.className="image";
        card.appendChild(cardBody);
        let button=document.createElement("button");
        button.textContent=object.text;
        button.className="btnStart";
        card.appendChild(button);
        newContainer.appendChild(card);
    }
    
    document.body.appendChild(newContainer);
    let btnStart = document.getElementsByClassName("btnStart")[0];
    let btnQuiz = document.getElementsByClassName("btnStart")[1];
    btnQuiz.addEventListener("click",addQuestion);
    btnStart.addEventListener("click",startQuiz);
}


document.querySelector(".info").style.display = "none";

function addQuestion(){
  document.querySelector(".newContainer").style.display = "none";

  let getPrevouseEle = document.getElementsByClassName("addContainer");
  if (getPrevouseEle.length > 0){
    getPrevouseEle[0].remove();
  }

  backBtn()

  let newAddContainer = document.createElement("div");
  newAddContainer.setAttribute("class", "addContainer");

  let title = document.createElement("h1");
  title.setAttribute("class", "title");
  title.textContent = "Create Question";
  newAddContainer.appendChild(title);

  let form = document.createElement("form");
  form.setAttribute("class", "manageForm");
  newAddContainer.appendChild(form);

  let inputForm = document.createElement("div");
  inputForm.setAttribute("id", "inputForm");
  form.appendChild(inputForm);
  
  // info Question icon --------------------------------------
  let info = document.createElement("i");
  info.setAttribute("class", "fa fa-info-circle");
  inputForm.appendChild(info);

  info.addEventListener("mouseover", alertMessage);
  info.addEventListener("mouseout", hideAlertMessage);

  // info Answers icon --------------------------------------
  let infoA = document.createElement("i");
  infoA.setAttribute("class", "fa fa-info-circle infoA");
  inputForm.appendChild(infoA);

  infoA.addEventListener("mouseover", alertMessage);
  infoA.addEventListener("mouseout", hideAlertMessage);

  let question = document.createElement("input");
  question.setAttribute("id", "getQuestion");
  question.setAttribute("type", "text");
  question.setAttribute("placeholder", "Questions");
  inputForm.appendChild(question);

  let answer = document.createElement("input");
  answer.setAttribute("id", "getAnswer");
  answer.setAttribute("type", "text");
  answer.setAttribute("placeholder", "Answers");
  inputForm.appendChild(answer);

  answer.addEventListener("input", addToArray);
  question.addEventListener("input", addToArray);

  document.body.appendChild(newAddContainer);

  btnSubmit.addEventListener("input",addToArray);
  
  if (myQuestions.length > 0){
    displayQuestion()
  }
}

function alertMessage(){
  document.querySelector(".info").style.display = "";
}
function hideAlertMessage(){
  document.querySelector(".info").style.display = "none";
}

let temp = {};
function addToArray(event){
  event.preventDefault();
  let questionValue = document.getElementById("getQuestion").value;
  let answerValue = document.getElementById("getAnswer").value;

  temp.question = questionValue;
  temp.answers = {};
  // listOfAnswers = devideAnswer(answerValue);
  temp.answers.a = devideAnswer(answerValue)[0];
  temp.answers.b = devideAnswer(answerValue)[1];
  temp.answers.c = devideAnswer(answerValue)[2];
  temp.answers.d = devideAnswer(answerValue)[3];
  
  // appear question & answers -----------------------------------
  // delete prevouse Element 
  
  let getPrevouseEle = document.getElementsByClassName("showAnswer");
  if (getPrevouseEle.length > 0){
    getPrevouseEle[0].remove();
  }
  
  let appearAllQuiz = document.createElement("div");
  appearAllQuiz.setAttribute("class", "showAnswer");

  let appearQuestion = document.createElement("p");
  appearQuestion .setAttribute("class", "showQuestionCon");
  appearQuestion .textContent = temp.question;
  appearAllQuiz.appendChild(appearQuestion);

  let valueFromAnswer = document.getElementById("getAnswer").value;
  let valueFromQues = document.getElementById("getQuestion").value;
  if (valueFromAnswer!=="" && valueFromQues !==""){
    let appearAnswers = document.createElement("div");
    appearAnswers.setAttribute("id", "showAnswers")
    appearAllQuiz.appendChild(appearAnswers)
  
    for (let i in temp.answers){
      let eachAnswer = document.createElement("input");
      eachAnswer.setAttribute("type", "radio");
      eachAnswer.setAttribute("name", "answerSelect");
      eachAnswer.setAttribute("value", i);
      let text = document.createElement("span");
      text.textContent = temp.answers[i];
      console.log(temp.answers[i]);
      appearAnswers.appendChild(eachAnswer);
      appearAnswers.appendChild(text);
      
      let lengthOfAns = devideAnswer(answerValue).length
      if (lengthOfAns === 5 ){
        appearAllQuiz.appendChild(btnSubmit)
        btnSubmit.style.display = "";
      }else{
        btnSubmit.style.display = "none";
      }
    }
  }

  document.querySelector("#inputForm").appendChild(appearAllQuiz);
}



function devideAnswer(a){
  let result = [];
  let temp = "";
  for (let i=0;i<a.length+1;i++){
    if (a[i]!=="," && i!==a.length){
      if (a[i]==" "){
        temp+="";
      }else if(a[i]=="-"){
        temp+=" ";
      }
      else{
        temp+=a[i];
      }
    }else{
      result.push(temp);
      temp = "";
    }
  }
  return result;
}
/**
 * Display the quetions base on the input of the  user
 */
function displayQuestion(){
  let allQuestions = document.querySelectorAll(".questionContainer");
  for(let que of allQuestions){
    que.parentNode.removeChild(que);
  }
  for(let i in myQuestions){
    let questionContainer=document.createElement("div");
    questionContainer.className="questionContainer";
    let questionShow=document.createElement("span");
    questionShow.textContent=Number(i)+1+" . "+myQuestions[i].question;
    questionShow.className="questionShow";
    questionContainer.appendChild(questionShow);
    let answerCon=document.createElement("div");
    answerCon.className="answers";
    for(let j in myQuestions[i].answers){
      let answerChoice = document.createElement("div");
      answerChoice.className="answerChoice";
      let choice = document.createElement("input");
      choice.setAttribute("type", "radio");
      choice.setAttribute("name", "answerSelect"+i);
      choice.setAttribute("value", j);
      let label=document.createElement("label");
      label.textContent=myQuestions[i].answers[j]
      if(myQuestions[i].correctAnswer==choice.value){
        choice.checked = true;
      }
      answerChoice.appendChild(choice);
      answerChoice.appendChild(label);
      answerCon.appendChild(answerChoice);
    }
    let edition = document.createElement("div");
    edition.className="edition"
    let edit=document.createElement("img");
    edit.className="imageEdit";
    edit.src="./IMG/edit.png";
    edition.appendChild(edit);
    let deleted = document.createElement("img");
    deleted.className="imageDelete";
    deleted.src="./IMG/delete.png";
    edition.appendChild(deleted);
    answerCon.appendChild(edition);
    questionContainer.appendChild(answerCon)
    document.body.appendChild(questionContainer)
  }
  document.body.addEventListener("click", deleteQuestion)
}

function deleteQuestion(event){
  if(event.target.className==="imageDelete"){
    console.log(event.target);
    event.target.parentElement.parentElement.parentElement.remove();
    let indexToRemove=document.getElementsByClassName("questionShow");
    myQuestions.splice(Number(indexToRemove[0])-1,1);
  }
}

// Button Save Data 
let btnSubmit = document.createElement("button");
btnSubmit.setAttribute("class", "saveToDate");
btnSubmit.setAttribute("type", "submit");
btnSubmit.textContent = "Save";
btnSubmit.addEventListener("click", addItemToData)

function addItemToData(event){
  event.preventDefault();
  if (selectedAnswer()){
    swal("Good job!", "You Saved the Question", "success");
    let answered = document.querySelector('input[name="answerSelect"]:checked').value;
    console.log(selectedAnswer());
    temp.correctAnswer = answered;
    myQuestions.push(temp);
    displayQuestion();
    console.log(myQuestions);
    console.log(answered);
    temp = {};
    // Show menu ===========================
    if (myQuestions.length > 1){
      createMenu()
    }
    resetData();
  }else{
    swal("Oops...!", "You didn't select the right answer yet!", "error");
  }
  
}
// Create Menu bar ++++++++++++++++++++++++++++++++++++++++++
function createMenu(){
  let btnStart = document.querySelector(".start");
  btnStart.style.display = "";
  btnStart.addEventListener("click", startQuiz);
}
function selectedAnswer(){
  let allRadioAnswer = document.getElementsByName('answerSelect')
  for (let a of allRadioAnswer){
    if(a.checked){
      return true;
    }
  }
}

function startQuiz(){
  index = 0;
  // let oldContainer = document.querySelector(".newContainer");
  // if (oldContainer!==null){
  //   oldContainer.style.display = "none";
  // }
  if (myQuestions.length !== 0){
    if (document.querySelector(".addContainer")!==null){
      let oldContainer = document.querySelector(".addContainer");
      oldContainer.style.display = "none";
    }else{
      let oldContainer = document.querySelector(".newContainer");
      oldContainer.style.display = "none"; 
    }

    loadData();
  
  }else{
    swal("Oops...!", "You don't have created Quiz Yet!", "error");
  }
}


function loadData(){
  let oldContainer = document.getElementsByClassName("quizContainer")
  if (oldContainer.length > 0){
    oldContainer[0].remove();
  }
  document.querySelector(".start").style.display = "none";

  let newContainer = document.createElement("div");
  newContainer.setAttribute("class", "quizContainer");
  document.body.appendChild(newContainer);

  let countQ = document.createElement("h3");
  countQ.setAttribute("class", "titleQ");
  newContainer.appendChild(countQ);

  countQ.textContent = "Questions: " + Number(index+1) +"/"+ myQuestions.length;
  let question = document.createElement("h3");
  question.textContent = Number(index)+1 +". "+ myQuestions[index].question;
  newContainer.appendChild(question);

  let allAnswer = document.createElement("div");
  allAnswer.setAttribute("class", "appearAnswer");
  newContainer.appendChild(allAnswer)

  for (let j in myQuestions[index].answers){
    let textAnswer = j +". "+ myQuestions[index].answers[j];
    let answer = document.createElement("div");
    answer.setAttribute("class", "answer");
    answer.textContent = textAnswer;
    // let showAnswerCon = document.querySelector(".appearAnswer");
    allAnswer.appendChild(answer);
  }

  let answers = document.querySelector(".appearAnswer")
  answers.addEventListener("click", checkedAnswer)

  nextBtn()
  backBtn()
}

function nextBtn(){
  let oldBtn = document.getElementsByClassName("nextQ")
  if (oldBtn.length > 0){
    oldBtn[0].remove();
  }

  let btnNext = document.createElement("button");
  btnNext.setAttribute("class", "nextQ");
  // icon............ 
  let icon = document.createElement('i');
  icon.setAttribute("class", "fa fa-arrow-circle-o-right");
  btnNext.appendChild(icon);
  document.body.appendChild(btnNext);

  btnNext.addEventListener("click", nextQuestion)
}



function backBtn(){
  let answerContainer = document.getElementsByClassName("questionContainer")
  if (answerContainer.length !== 0){
    for (let i=0;i<answerContainer.length;i++){
      console.log(answerContainer[i]);
      answerContainer[i].style.display = "none";
      } 
  }

  checkAnswer = false;
  clicked = false;
  let oldBtn = document.getElementsByClassName("backBtn")
  if (oldBtn.length > 0){
    oldBtn[0].remove();
  }

  let btnBack = document.createElement("button");
  btnBack.setAttribute("class", "backBtn");
  // icon............ 
  let icon = document.createElement('i');
  icon.setAttribute("class", "fa fa-times");
  btnBack.appendChild(icon);
  document.body.appendChild(btnBack);

  btnBack.addEventListener("click", displayOption)
}

function btnShowResult(){
  clicked = false;
  checkAnswer = false;
  let btnSubmit = document.querySelector(".btnSubmitResult");
  btnSubmit.style.display = "";
  btnSubmit.addEventListener("click", showResult)
}

function nextQuestion(){
  if(myQuestions.length === index+1 && checkAnswer===true){
    document.querySelector(".nextQ").style.display = "none";
    btnShowResult();
    clicked = true;
  }
  if(myQuestions.length !== index+1 && checkAnswer===true){
    clicked = false;
    index += 1
    loadData();
  }
}


function checkedAnswer(event){
  if (clicked === false){
    checkAnswer = true;
    let toCheck = event.target.className;
    checkedSentenceA(event.target);
    if (toCheck === "answer"){
      clicked = true;
      if (checkAnswerInData(checkedSentenceA(event.target))===true){
        event.target.style.background = "#06BF19";
        // create icon for right answer =========================
        let icon = document.createElement("i");
        icon.setAttribute("class","fa fa-check-circle-o")
        score += 1;
        event.target.appendChild(icon);
      }else{
        console.log(event.target);
        event.target.style.background = "#BF0606";
        // create icon for right answer =========================
        let iconX = document.createElement("i");
        iconX.setAttribute("class","fa fa-times-circle-o")
        event.target.appendChild(iconX);
      }
    }
  }
}

function checkedSentenceA(sen){
  let str = sen.textContent;
  console.log(str[0]);
  return str[0]
}
function checkAnswerInData(getAn){
  if (myQuestions[index].correctAnswer == getAn){
    return true;
  }
}

function showResult(){
  document.querySelector(".quizContainer").style.display = "none";
  document.querySelector(".btnSubmitResult").style.display = "none";
  let result = document.querySelector(".finalResult");
  result.style.display = "";
  document.querySelector(".itemResult").textContent = "Correct: " + score;
  let incorrect = myQuestions.length - score;
  document.querySelector(".itemResultIn").textContent = "Incorrect: " + incorrect;
  score = 0;
  checkAnswer = false;
}

function resetData(){
  document.getElementById("getQuestion").value = "";
  document.getElementById("getAnswer").value = "";
  document.querySelector(".showAnswer").style.display = "none"
}



let index = 0;
let score = 0;
let clicked = false;
let checkAnswer = false;


if (index === myQuestions.length){
  document.querySelector(".finalResult").style.display = "";
}



let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);







