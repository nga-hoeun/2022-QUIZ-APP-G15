
/**
 * function to hide the first page content and show the quiz and the create questions page
 * @param addEventListener("click")
 */
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
}
let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);

function displayQuestions(){
    // Prevent default to happen
    Event.preventDefault();
    

}


let arrayOfContext=[{
    picIcon:"./IMG/Vector.png",
    title:"Test Your Knowledge",
    imageBody:"./IMG/quiz.png",
    text:"Quiz"
},
{
    picIcon:"./IMG/Vector (1).png",
    title:"Create Something New",
    imageBody:"./IMG/question.png",
    text:"Create",
}];
let arrayOfQuestions=[{
    Questions: "What is the past simple of take?",
    answers:{
        a:"taken",
        b:"took",
        c:"taked",
        d:"None of the above"
    },
    correctAnswer:"took"
}];


