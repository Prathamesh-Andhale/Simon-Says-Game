let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","green","purple"]

let started=false;
let level=0;
let h2=document.querySelector("h2");

let highScore=0;
let score=0;
let btnContaier=document.querySelector(".btnContainer");


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});
document.addEventListener("click",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)
}
function gameOver(){
    if(level==1 || started==false){
        h2.innerHTML=`GAME OVER! Your score was <b>0</b> \n Press any key to Restart.`;
    }else{
        h2.innerHTML=`GAME OVER! Your score was <b>${score}</b> \n Press any key to Restart.`;
    }
    let body=document.querySelector("body");
        body.classList.add("gameOver");
        setTimeout(function(){
            body.classList.remove("gameOver")
        },200);        
}
function levelUp() {
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
    score=level;
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        HighScore();
        gameOver();  
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    setTimeout(()=>{started=false;
    gameSeq=[];
    userSeq=[];
    level=0;},100)
}

function HighScore(){
    score=level-1;
    console.log(score);
    if(score>highScore){
        highScore=score;
        document.querySelector(".highScore").innerHTML=`HIGH SCORE: ${highScore}`;
    }
    else{
        document.querySelector(".highScore").innerHTML=`HIGH SCORE: ${highScore}`;
    }
}