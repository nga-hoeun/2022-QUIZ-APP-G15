
const arrayOfContext=[{
    picIcon:"./IMG/Vector.png",
    title:"Test Your Knowledge",
    imageBody:"./IMG/quiz.png",
    text:"Quiz"
},
{
    picIcon:"./IMG/Vector (1).png",
    title:"Edit or Add Quiz Form",
    imageBody:"./IMG/question.png",
    text:"Edit"
}];

// let myQuestions = [
//     {
//       question: "Inside which HTML element do we put the JavaScript?",
//       answers: {
//         a: "<javascript>",
//         b: "<scripting>",
//         c: "<js>",
//         d: "<script>"
//       },
//       correctAnswer: "d"
//     },
//     {
//       question: "How do you create a function in JavaScript?",
//       answers: {
//         a: "myFunction()",
//         b: "myFunction{}",
//         c: "function:",
//         d: "function:()"
//       },
//       correctAnswer: "a"
//     },
//     {
//       question: "How do you call a function named 'myFunction'?",
//       answers: {
//         a: "myFunction()= ",
//         b: "Function:()",
//         c: "call my()",
//         d: "myFunction()"
//       },
//       correctAnswer: "d"
//     },
//     {
//       question: "How to write an IF statement in JavaScript?",
//       answers: {
//         a: "if i == 5 then",
//         b: "if (i == 5)",
//         c: "if i = 5",
//         d: "if i = 5 then"
//       },
//       correctAnswer: "b"
//     }
//   ];


// Form Edit alert =====================================
document.querySelector(".editFormContainer").style.display = "none";

document.querySelector(".finalResult").style.display = "none";

document.querySelector(".saveEditBtn").style.display = "none";

document.querySelector(".btnSubmitResult").style.display = "none";

// Come back to home page ======================
let logo = document.querySelector('.logo')
logo.addEventListener("click", displayOption)

function displayOption(){ 
    index = 0;
    score = 0;

    let oldContainer = document.getElementsByClassName("newContainer")
    if (oldContainer.length > 0){
      oldContainer[0].remove();
    }
    
    document.querySelector(".editFormContainer").style.display = "none";


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

    let displayMainEdit = document.querySelector(".mainContainerEdit");
    if (displayMainEdit !== null){
      displayMainEdit.style.display = "none";
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
    btnQuiz.addEventListener("click", displayQuestion);
    btnStart.addEventListener("click", startQuiz);
}



// ADD QUESTION FROM +++++++++++++++++++++++++++++++++++++++++++=

// Change the page of edit +++++++++++++++++++++++++++++++++

let addPage = document.getElementById("add-mode");
addPage.addEventListener("click", addQuestion)

let editPage = document.getElementById("edit-mode");
editPage.addEventListener("click", displayQuestion)


let addQuizCon = document.querySelector(".addContainer");
addQuizCon.style.display = "none";
document.querySelector(".mainContainerEdit").appendChild(addQuizCon);

let optionCon = document.querySelector(".newContainer");

function addQuestion(){
  // style to show the page ==============
  document.getElementById("add-mode").style.display = "none";
  // document.getElementById("add-mode").style.backgroundColor = "grey";

  // Disable style from edit page 
  document.getElementById("edit-mode").style.display = "";
  document.getElementById("edit-mode").style.backgroundColor = "#116CFF";


  document.querySelector(".mainContainerQ").style.display = "none";
  addQuizCon.style.display = "";
  document.querySelector(".newContainer").style.display = "none"
  document.querySelector(".add").addEventListener("click", addToArray)
  document.getElementsByClassName("cancel")[0].addEventListener("click", displayQuestion)
  // document.getElementsByClassName("cancel")[1].addEventListener("click", displayQuestion)
}

let questionValue = document.getElementById("getQuestion");
let answerVaule = document.getElementsByClassName("getAnswer")

function addToArray(){
  // CHECK VALIDATION OF SELECT RIGHT ANSWER ======================================
  let temp = {};
  let correctAn = "";
  let radio = document.getElementsByName('answer');
  for (let i in radio){
    if(radio[i].checked){
      correctAn = radio[i].value
      console.log(radio[i].value)}
    }

  if (correctAn!=="" && checkValidationQ()!==false && questionValue.value !=="" && checkValidationAnInput()!==true && checkValidationAnDou()!==true){
    swal("Good job!", "You added the Question", "success");
    temp.question = questionValue.value;
    temp.answers = {};

    let answerVaule = document.getElementsByClassName("getAnswer")
    temp.answers.a = answerVaule[0].value;
    temp.answers.b = answerVaule[1].value;
    temp.answers.c = answerVaule[2].value;
    temp.answers.d = answerVaule[3].value;
  
    temp.correctAnswer = correctAn;
    myQuestions.push(temp)

    // Save to localStorage ++++++++++++++++++++++++++++++++++++++++++ 
    saveMyQuestions(myQuestions)

    resetData();

  }else{
    if(checkValidationQ(questionValue)===false){
      swal("Oops...!", "You had add this question before!", "error");
    }else if(questionValue.value ===""){
      swal("Oops...!", "Please input your question!", "error");
    }else if(checkValidationAnInput(answerVaule)===true){
      swal("Oops...!", "Please input all of your answers!", "error");
    }else if(checkValidationAnDou(answerVaule)===true){
      swal("Oops...!", "You have the duplicate answers!", "error");
    }else{
      swal("Oops...!", "You didn't select the right answer yet!", "error");
    }
  }
}



// CHECK VALIDATION =============================================
function checkValidationQ(){
  if (localStorage.length > 0){
    for (let i=0;i<myQuestions.length;i++){
      if (questionValue.value===myQuestions[i].question){
        return false;
      }
    }
  }
}

function checkValidationAnInput(answerVaule){
  for (let i in answerVaule){
    if(answerVaule[i].value === ""){
      return true
      // console.log(true)
    }
    }
}

function checkValidationAnDou(answerVaule){
  let list = [];
  for (let i=0;i<answerVaule.length;i++){
    list.push(answerVaule[i].value)
  }
  console.log(list);
  return new Set(list).size !== list.length
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

// Show list of question have in array ++++++++++++++++++++++++++
let page_editQ = document.querySelector(".mainContainerEdit");
page_editQ.style.display = "none";

function displayQuestion(){
  if (localStorage.length>0){
    myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
    document.querySelector(".editFormContainer").style.display = "none";
  
    page_editQ.style.display = "";
    addQuizCon.style.display = "none";
    document.querySelector(".mainContainerQ").style.display = "";
  
    document.getElementById("edit-mode").style.display = "none";
    // document.getElementById("edit-mode").style.backgroundColor = "grey";
    
    // hide style prevouse page ==============================
    // style to show the page ==============
    document.getElementById("add-mode").style.display = "";
    document.getElementById("add-mode").style.backgroundColor = "#116CFF";
  
    document.querySelector('.newContainer').style.display = "none";
    let allQuestions = document.querySelector(".mainContainerQ")
  
    let oldQ = document.getElementsByClassName("manageCon");
    if (oldQ.length > 0){
      oldQ[0].remove();
    }
    let mainCon = document.createElement("div");
    mainCon.setAttribute("class", "manageCon");
    allQuestions.appendChild(mainCon);
  
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
        }else{
          choice.disabled=true
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
        questionContainer.appendChild(answerCon);
        mainCon.appendChild(questionContainer);
      }
      
    }
  
  }
  document.body.addEventListener("click", deleteQuestion)
  document.body.addEventListener("click", editQuestion)
}

function deleteQuestion(event){
  let els=document.getElementsByClassName("imageDelete");
  for(i=0; i < els.length; i++) {
    els[i].index = i;
    els[i].addEventListener('mouseover', function(e) {
      console.log(e.target.index);
      indexOfQ = e.target.index
    }, false);
  }

  if(event.target.className==="imageDelete"){
    let quesCon = event.target.parentElement.parentElement.parentElement.firstChild;
    swal({
      title: "Are you sure?",
      text: "Do you really want to delete this question?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your question has been deleted successfully!!", {
          icon: "success",
        });
        event.target.parentElement.parentElement.parentElement.remove();
        myQuestions.splice(indexOfQ,1);
        // push data to localStorage again +++++++++++++++++++++++
        saveMyQuestions(myQuestions)
      } else {
        swal("Nothing deleted!");
      }
    });
  }
}

let edited={question:"",answers:{a:"",b:"",c:"",d:""},correctAnswer:""}
function editQuestion(event){
  let els=document.getElementsByClassName("imageEdit");
  for(i=0; i < els.length; i++) {
    els[i].index = i;
    els[i].addEventListener('mouseover', function(e) {
      console.log(e.target.index);
      indexOfQ = e.target.index
    }, false);
  }

  if(event.target.className==="imageEdit"){
    
    console.log(event.target);
    let answers = event.target.parentElement.parentElement.parentElement.firstChild.nextSibling.children;
    console.log(answers);
    let question = document.getElementById("getQuestionEdit");
    question.value = myQuestions[indexOfQ].question;
    let answer = document.getElementsByClassName("getAnswerEdit");
    answer[0].value=myQuestions[indexOfQ].answers.a
    answer[1].value=myQuestions[indexOfQ].answers.b
    answer[2].value=myQuestions[indexOfQ].answers.c
    answer[3].value=myQuestions[indexOfQ].answers.d

    document.querySelector(".editFormContainer").style.display = "";
    document.querySelector(".mainContainerEdit").style.display = "none";
    document.querySelector(".cancel2").addEventListener("click", saveWhenCancel)
    document.querySelector(".save").addEventListener("click",editMyQuestion)    
  }
}
/**
 * When you start editing and want to cancel your edit, the list should have the original
 * questions and the correct answer.
 */
function saveWhenCancel(){
  edited.question=myQuestions[indexOfQ].question;
  edited.answers["a"]=myQuestions[indexOfQ].answers.a;
  edited.answers["b"]=myQuestions[indexOfQ].answers.b;
  edited.answers["c"]=myQuestions[indexOfQ].answers.c;
  edited.answers["d"]=myQuestions[indexOfQ].answers.d;
  edited.correctAnswer=myQuestions[indexOfQ].correctAnswer;
  myQuestions[indexOfQ]=edited;
  displayQuestion();
}
/**
 * Edit the questions
 */
function editMyQuestion(){
  let question = document.getElementById("getQuestionEdit");
  let answer = document.getElementsByClassName("getAnswerEdit");
  edited.question=question.value;
  edited.answers["a"]=answer[0].value;
  edited.answers["b"]=answer[1].value;
  edited.answers["c"]=answer[2].value;
  edited.answers["d"]=answer[3].value;
  let radioCorrect = document.getElementsByName("answer");
  for(let indexRadio in radioCorrect){
    if(radioCorrect[indexRadio].checked===true){
      edited.correctAnswer=radioCorrect[indexRadio].value
    }
  }
  console.log(myQuestions)
  if(edited.question===""){
    swal("Oops...!", "Question can't be empty", "error");
  }else if(edited.answers.a===""||edited.answers.b===""||edited.answers.c===""||edited.answers.d===""){
    swal("Oops...!", "Answers can't be empty", "error");
  }else if(radioCorrect[0].checked===false&&radioCorrect[1].checked===false&&radioCorrect[2].checked===false&&radioCorrect[3].checked===false){
    swal("Oops...!", "Correct answers cannot be unselected", "error");
  }else{
    swal("Good job!", "You edited the Question", "success");
    myQuestions[indexOfQ]=edited
    displayQuestion();
  }
}

function changeQuestionInData(event){
  event.preventDefault()
  console.log("hello");
  myQuestions[indexOfQ].question = myQuestions[indexOfQ].question;

  let textAn = "";
  for (let i in myQuestions[indexOfQ].answers){
    textAn += myQuestions[indexOfQ].answers[i] + ",";
  }

  myQuestions[indexOfQ].answers.a = devideAnswer(textAn)[0];
  myQuestions[indexOfQ].answers.b = devideAnswer(textAn)[1];
  myQuestions[indexOfQ].answers.c = devideAnswer(textAn)[2];
  myQuestions[indexOfQ].answers.d = devideAnswer(textAn)[3];
  myQuestions[indexOfQ].correctAnswer = "a";

}
document.querySelector(".saveEditBtn").addEventListener('click', changeQuestionInData)


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
function selectedAnswer(){
  let allRadioAnswer = document.getElementsByName('answerSelect')
  for (let a of allRadioAnswer){
    if(a.checked){
      return true;
    }
  }
}


// Home page ===============================
let homePage = document.querySelector(".home-page");
function startQuiz(){
  index = 0;
  myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
  // document.querySelector(".mainContainerEdit").style.display = "";
  let oldContainer = document.querySelector(".newContainer");
  document.querySelector(".newContainer").style.display = "none"; 
  if (myQuestions.length !== 0 && localStorage.length > 0){
    loadData();
  }else{
    swal("Oops...!", "You don't have created Quiz Yet!", "error");
    displayOption()
  }
}


function loadData(){
  let oldContainer = document.getElementsByClassName("quizContainer")
  if (oldContainer.length > 0){
    oldContainer[0].remove();
  }
  clicked = false;
  if (localStorage.length > 0){
      myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
      // document.querySelector(".start").style.display = "none";
      // document.querySelector(".edit").style.display = "none";
    
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

  }
}

function nextBtn(){
  let oldBtn = document.getElementsByClassName("nextQ")
  if (oldBtn.length > 0){
    oldBtn[0].remove();
  }
  checkAnswer = false;
  clicked = false;
  // Add button grey when can click +++++++++++++++++++++++++++++++++++++ 
  let btnNext = document.createElement("button");
  btnNext.setAttribute("class", "nextQ");
  btnNext.style.backgroundColor = "grey";
  // icon............ 
  let icon = document.createElement('i');
  icon.setAttribute("class", "fa fa-arrow-circle-o-right");
  btnNext.appendChild(icon);
  document.body.appendChild(btnNext);
  btnNext.addEventListener("click", nextQuestion)
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
      if (index+1 == myQuestions.length){
        btnShowResult()
        document.querySelector(".nextQ").style.display = "none";
      }
    // Add button grey when can click +++++++++++++++++++++++++++++++++++++ 
      document.querySelector(".nextQ").style.backgroundColor = "#116CFF";
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
  let percent = document.querySelector(".finalResult h1");
  percent.textContent = sumScore();
  result.style.display = "";
  // document.querySelector(".itemResult").textContent = "Correct: " + score;
  let incorrect = myQuestions.length - score;
  // document.querySelector(".itemResultIn").textContent = "Incorrect: " + incorrect;
  score = 0;
  checkAnswer = false;
}

function resetData(){
  document.getElementById("getQuestion").value = "";
  let answers = document.getElementsByClassName("getAnswer");
  for (let i in answers){
    answers[i].value = "";
  }
  let radio = document.getElementsByName("answer");
  for (let i in radio){
    radio[i].checked = false;
  }
}

// Store Data to localStorage +++++++++++++++++++++++++++++++++
function saveMyQuestions(data){
  localStorage.setItem('myQuestions', JSON.stringify(data));
}

function sumScore(data){
  return Math.round(score/myQuestions.length * 100) + "%"
}


document.querySelector(".showCorrection").addEventListener("click", showListCorrection)
function showListCorrection(){
  myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
  console.log("Helloooo");
  let listResultCon = document.querySelector(".correctionList");
  for (let i in myQuestions){
    let li = document.createElement("div");
    li.setAttribute("class", "listAnswer");
    li.textContent = myQuestions[i].question;

    let list = document.createElement("ol");
    li.appendChild(list)
    for (let j in myQuestions[i].answers){
      let answer = document.createElement("li")
      answer.textContent = myQuestions[i].answers[j];
      list.appendChild(answer);
    }
    listResultCon.appendChild(li);
  }
}

let index = 0;
let indexOfQ = 0;
let score = 0;
let result = 0
let clicked = false;
let checkAnswer = false;

let myQuestions = [];


// if (index === myQuestions.length){
//   document.querySelector(".finalResult").style.display = "";
// }

let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);

