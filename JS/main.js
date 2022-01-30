const arrayOfContext=[{
    title:"Test Your Knowledge",
    imageBody:"./IMG/quiz.png",
    text:"Quiz"
},
{
    title:"Edit or Add Quiz Form",
    imageBody:"./IMG/question.png",
    text:"Edit"
}];

// Form Edit alert =====================================
document.querySelector(".editFormContainer").style.display = "none";

document.querySelector(".finalResult").style.display = "none";

// document.querySelector(".saveEditBtn").style.display = "none";

document.querySelector(".correctionList").style.display = "none";

document.querySelector(".btnSubmitResult").style.display = "none";

// Come back to home page ======================
let logo = document.querySelector('.logo')
logo.addEventListener("click", displayOption)

// display the page 
function displayOption(){ 
    index = 0;
    score = 0;
    inCoAnlist = [];


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
    document.querySelector(".correctionList").style.display = "none";



    let container=document.getElementById("home-page");
    let newContainer = document.createElement("div");
    newContainer.setAttribute("class", "newContainer");
    container.style.display="none";
    for(let object of arrayOfContext){
        let card=document.createElement("div");
        card.className="card";
        let cardTitle=document.createElement("div");
        cardTitle.className="card-title"
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
    resetDataEdit();
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

  // Disable style from edit page 
  document.getElementById("edit-mode").style.display = "";
  document.getElementById("edit-mode").style.backgroundColor = "#116CFF";


  document.querySelector(".mainContainerQ").style.display = "none";
  addQuizCon.style.display = "";
  document.querySelector(".newContainer").style.display = "none"
  document.querySelector(".add").addEventListener("click", addToArray)
  document.getElementsByClassName("cancel")[0].addEventListener("click", displayQuestion)
}

let questionValue = document.getElementById("getQuestion");
let answerVaule = document.getElementsByClassName("getAnswer")
// Add to the local storage
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
    // event.preventDefault();  
    temp.question = questionValue.value;
    temp.answers = {};

    let answerVaule = document.getElementsByClassName("getAnswer")
    temp.answers.a = answerVaule[0].value;
    temp.answers.b = answerVaule[1].value;
    temp.answers.c = answerVaule[2].value;
    temp.answers.d = answerVaule[3].value;
  
    temp.correctAnswer = correctAn;
    myQuestions.push(temp)
    saveMyQuestions(myQuestions)
    resetData();
    // Save to localStorage ++++++++++++++++++++++++++++++++++++++++++ 
  }else{
    if(checkValidationQ()===false){
      swal("Oops...!", "You had add this question before!", "error");
    }else if(questionValue.value ===""){
      swal("Oops...!", "Please input your question!", "error");
    }else if(checkValidationAnInput()===true){
      swal("Oops...!", "Please input all of your answers!", "error");
    }else if(checkValidationAnDou()===true){
      swal("Oops...!", "You have the duplicate answers!", "error");
    }else{
      swal("Oops...!", "You didn't select the right answer yet!", "error");
    }
  }
}



// CHECK VALIDATION =============================================
// Check for repeated questions
function checkValidationQ(){
  if (localStorage.length != 0){
    for (let i=0;i<myQuestions.length;i++){
      if (questionValue.value===myQuestions[i].question){
        return false;
      }
    }
  }
}
// Check for blank inputs
function checkValidationAnInput(){
  for (let i in answerVaule){
    if(answerVaule[i].value ===""){
      return true
      console.log(true)}
    }
}
// Check if duplicated answers
function checkValidationAnDou(){
  let list = [];
  for (let i=0;i<answerVaule.length;i++){
    list.push(answerVaule[i].value)
  }
  console.log(list);
  return new Set(list).size !== list.length
}

/**
 * Display the quetions base on the input of the  user
 */

// Show list of question have in array ++++++++++++++++++++++++++
let page_editQ = document.querySelector(".mainContainerEdit");
page_editQ.style.display = "none";

function displayQuestion(){
  document.querySelector(".editFormContainer").style.display = "none";

  page_editQ.style.display = "";
  addQuizCon.style.display = "none";
  document.querySelector(".mainContainerQ").style.display = "";

  document.getElementById("edit-mode").style.display = "none";
  
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

  if (localStorage.length>0){
    myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
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
      questionContainer.appendChild(answerCon);
      mainCon.appendChild(questionContainer);
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
      // e.target.innerHTML = e.target.index;
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
// Edit the question page
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
  saveMyQuestions(myQuestions)
  displayQuestion();
  resetDataEdit();
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
    saveMyQuestions(myQuestions)
    displayQuestion();
  }
}

// Home page ===============================
let homePage = document.querySelector(".home-page");
function startQuiz(){
  index = 0;
  // document.querySelector(".mainContainerEdit").style.display = "";
  document.querySelector(".newContainer").style.display = "none"; 
  if (myQuestions.length !== 0 && localStorage.length > 0){
    myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
    loadData();
  }else{
    swal("Oops...!", "You don't have created Quiz Yet!", "error");
    displayOption()
  }
}

// Create container to add the data in and display it as a quiz one question by one
function loadData(){
  let oldContainer = document.getElementsByClassName("quizContainer")
  if (oldContainer.length > 0){
    oldContainer[0].remove();
  }
  clicked = false;
  if (localStorage.length > 0){
      myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
    
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
// Delete previous next button when clicked on the next button after selected an answer
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
// User is at the last question and a button to show result shows up when user
// already choosen an answer
function btnShowResult(){
  clicked = false;
  checkAnswer = false;
  let btnSubmit = document.querySelector(".btnSubmitResult");
  btnSubmit.style.display = "";
  btnSubmit.addEventListener("click", showResult)
}

// Check if user has more questions to do or they are at the last question
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

// Check whether the user have choosen an answer or not
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
      console.log(checkedSentenceA(event.target));
      inCoAnlist.push(checkedSentenceA(event.target));
      if (checkAnswerInData(checkedSentenceA(event.target))===true){
        event.target.style.background = "#06BF19";
        // create icon for right answer =========================
        let icon = document.createElement("i");
        icon.setAttribute("class","fa fa-check-circle-o")
        score += 1;
        event.target.appendChild(icon);
      }else{
        event.target.style.background = "#BF0606";
        // create icon for right answer =========================
        let iconX = document.createElement("i");
        iconX.setAttribute("class","fa fa-times-circle-o")
        event.target.appendChild(iconX);
      }
    }
  }
}

// Get the first letter of the selected answerchoice like a, b, c, d
function checkedSentenceA(sen){
  let str = sen.textContent;
  console.log(str[0]);
  return str[0]
}

// Check for the correct answer choosen by the user
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
  // score = 0;
  checkAnswer = false;
}
// Reset data after the question has been added
function resetData(){
  document.getElementById("getQuestion").value = "";
  document.getElementsByClassName("getAnswer")[0].value = "";
  document.getElementsByClassName("getAnswer")[1].value = "";
  document.getElementsByClassName("getAnswer")[2].value = "";
  document.getElementsByClassName("getAnswer")[3].value = "";
  let radio = document.getElementsByName("answer");
  for (let i in radio){
    radio[i].checked = false;
  }
}
// Reset data in the edit form page
function resetDataEdit(){
  document.getElementById("getQuestionEdit").value = "";
  document.getElementsByClassName("getAnswerEdit")[0].value = "";
  document.getElementsByClassName("getAnswerEdit")[1].value = "";
  document.getElementsByClassName("getAnswerEdit")[2].value = "";
  document.getElementsByClassName("getAnswerEdit")[3].value = "";
  let radio = document.getElementsByName("answer");
  for (let i in radio){
    radio[i].checked = false;
  }
}

// Store Data to localStorage +++++++++++++++++++++++++++++++++
function saveMyQuestions(data){
  localStorage.setItem('myQuestions', JSON.stringify(data));
}
// Give a percentage of the amount of questions that you get right+++++++++++
function sumScore(data){
  return (score/myQuestions.length * 100).toFixed(0) + "%"
}

// After you finish the test, a correction page will show up and you can see a 
// summary of what question you get right or wrong
document.querySelector(".showCorrection").addEventListener("click", showListCorrection)
function showListCorrection(){
  myQuestions = JSON.parse(localStorage.getItem('myQuestions'));
  document.querySelector(".finalResult").style.display = "none";
  document.querySelector(".correctionList").style.display = "";

  document.querySelector(".co").textContent = "Correct : " + score;
  document.querySelector(".inCo").textContent = "Incorrect : " + Number(myQuestions.length - score);
  document.querySelector(".totalResult").textContent = "Total percentage : " + sumScore();

  let oldCon = document.getElementsByClassName("mainList");
  if (oldCon.length>0){
    oldCon[0].remove();
  }

  let listResultCon = document.querySelector(".correctionList");
  let mainList = document.createElement("div");
  mainList.setAttribute("class", "mainList");
  listResultCon.appendChild(mainList);
  for (let i in myQuestions){
    let li = document.createElement("div");
    li.setAttribute("class", "listAnswer");
    li.textContent = myQuestions[i].question;

    let list = document.createElement("ul");
    li.appendChild(list)
    let rightAn = document.createElement("i")
    rightAn.setAttribute("class", "fa fa-check-circle-o")

    let wrongAn = document.createElement("i")
    wrongAn.setAttribute("class", "fa fa-times-circle-o")

    for (let j in myQuestions[i].answers){
      let answer = document.createElement("li")
      if (myQuestions[i].correctAnswer === j){
        answer.style.backgroundColor = "rgba(192, 192, 192, 0.288)";
        answer.textContent = myQuestions[i].answers[j];
        answer.appendChild(rightAn);
      }else if(inCoAnlist[i] === j){
        answer.style.backgroundColor = "rgba(192, 192, 192, 0.288)";
        answer.textContent = myQuestions[i].answers[j];
        answer.appendChild(wrongAn);
      }else{
        answer.textContent = myQuestions[i].answers[j];
      }
      list.appendChild(answer);
    }
    mainList.appendChild(li);
  }
}
// Variables
let index = 0;
let indexOfQ = 0;
let score = 0;
let result = 0
let clicked = false;
let checkAnswer = false;
let myQuestions = [];
let inCoAnlist = [];

let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);

