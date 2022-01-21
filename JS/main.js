let arrayOfContext=[{
    picIcon:"images/Vector.png",
    title:"Test Your Knowledge",
    imageBody:"image/quiz.png",
    text:"Quiz"
},
{
    picIcon:"images/Vector (1).png",
    title:"Create Something New",
    imageBody:"image/question.png",
    text:"Create",
}];
function displayOption(){ 
    let container=document.getElementById("container");
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
        let button=document.createElement("button");
        button.textContent=object.text;
        button.className="btnStart";
        card.appendChild(buttonStart);
        container.appendChild(card);
    }
    
}
let btn=document.getElementById("start");
btn.addEventListener("click",displayOption);
