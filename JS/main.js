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
// const myQuestions = [
//     {
//       question: "Who invented JavaScript?",
//       answers: {
//         a: "Douglas Crockford",
//         b: "Sheryl Sandberg",
//         c: "Brendan Eich"
//       },
//       correctAnswer: "c"
//     },
//     {
//       question: "Which one of these is a JavaScript package manager?",
//       answers: {
//         a: "Node.js",
//         b: "TypeScript",
//         c: "npm"
//       },
//       correctAnswer: "c"
//     },
//     {
//       question: "Which tool can you use to ensure code quality?",
//       answers: {
//         a: "Angular",
//         b: "jQuery",
//         c: "RequireJS",
//         d: "ESLint"
//       },
//       correctAnswer: "d"
//     }
//   ];

// let myAnswers =[
//   {
//   question: "What is your name?",
//   answers: {
//     a:"Mengyi",
//     b:"Cham",
//     c:"I don't know",
//     d:"NO",
//   },
//   correctAnswer: "c",
//   },
//   {
//   question: "How old are you?",
//   answers: {
//     a: 18,
//     b: 19,
//     c: 20,
//     d: 32,
//   },
//   correctAnswer: "c",
//   }
// ]

let myQuestions = [];

function displayOption(){ 
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
    let btnQuiz = document.getElementsByClassName("btnStart")[1];
    btnQuiz.addEventListener("click",addQuestion);
}
// function startQuiz(){
//     console.log(myQuestions[0].answers.value);
// }
function addQuestion(){
  document.querySelector(".newContainer").style.display = "none";

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
  
  let question = document.createElement("input");
  question.setAttribute("id", "getQuestion");
  question.setAttribute("type", "text");
  question.setAttribute("placeholder", "Please input your question here !");
  inputForm.appendChild(question);

  let answer = document.createElement("input");
  answer.setAttribute("id", "getAnswer");
  answer.setAttribute("type", "text");
  answer.setAttribute("placeholder", "Your answer....");
  inputForm.appendChild(answer);

  answer.addEventListener("input", addToArray);
  question.addEventListener("input", addToArray);

  document.body.appendChild(newAddContainer);

  // btnSubmit.addEventListener("input",addToArray);

}

let temp = {};
function addToArray(event){
  event.preventDefault();
  let questionValue = document.getElementById("getQuestion").value;
  let answerValue = document.getElementById("getAnswer").value;
  // let listOfAnswers = [];
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
  // for (let i in getPrevouseEle){
  //   getPrevouseEle[1].remove();
  // }

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
      if (lengthOfAns === 5){
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
        choice.style.backgroundColor="green";
      }
      answerChoice.appendChild(choice);
      answerChoice.appendChild(label);
      answerCon.appendChild(answerChoice);
    }
    questionContainer.appendChild(answerCon)
    document.body.appendChild(questionContainer);
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
    window.alert("Your answer has save to storage!");
    let answered = document.querySelector('input[name="answerSelect"]:checked').value;
    console.log(selectedAnswer());
    temp.correctAnswer = answered;
    myQuestions.push(temp);
    displayQuestion();
    console.log(myQuestions);
    console.log(answered);
    temp = {};
    resetData();
  }else{
    window.alert("Please Select your correct answer!");
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

function resetData(){
  document.getElementById("getQuestion").value = "";
  document.getElementById("getAnswer").value = "";
  document.querySelector(".showAnswer").style.display = "none"
}


let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);



