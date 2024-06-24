const gameBoard = document.getElementById("board");
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const boardBg = "black";
const SnakeColor = "green";
const foodColor = "red";
const SnakeBorder = "black";
const HightScoreText = document.querySelector("#highScore");
const unitSize = 20;
let HighScore = 0;
let running = false;
let Xv = unitSize;
let Yv = 0;
let foodX ;
let foodY;
let SCORE = 0;
let snake = [
    {x:unitSize*1 , y:0},
    {x:0 , y:0}

];
window.addEventListener("keydown" , changeDir);
resetBtn.addEventListener("click" , resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = SCORE;
    SpawnFood();
    drawFood();
    nextFrame();

};

function nextFrame(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextFrame();
        },95);
        HighScore = Math.max(HighScore,SCORE);
        HightScoreText.textContent = "Highscore:" +HighScore;
    }else{
        displayGameover();
    }
};
function clearBoard(){
   ctx.fillStyle = boardBg;
   ctx.fillRect(0,0,WIDTH,HEIGHT);

};
function SpawnFood(){
    function randomFood(min , max){
        const rand = Math.round((Math.random() * (max - min) + min)/unitSize) * unitSize;
        return rand;
    }
    let accepted = true;
    do{  
    accepted = true;
    tempX = randomFood(0 , WIDTH - unitSize );
    tempY = randomFood(0 , HEIGHT - unitSize );
    snake.forEach((block) =>{
    if(block.x == tempX && block.y == tempY){
        accepted = false
    }
    })
  }while(!accepted);
  foodX = tempX;
  foodY = tempY;  
};   
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY , unitSize,unitSize);

};
function moveSnake(){
    const head = {x:snake[0].x + Xv , y:snake[0].y + Yv};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        SCORE++;
        scoreText.textContent = SCORE;
        SpawnFood();
    }else{
        snake.pop();
    }    
};
function drawSnake(){
    ctx.fillStyle = SnakeColor;
    ctx.strokeStyle = SnakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x , snakePart.y ,unitSize,unitSize);
        ctx.strokeRect(snakePart.x , snakePart.y ,unitSize,unitSize);

    })
}
function changeDir(event){
    const keyPressed = event.keyCode;
    const LEFT = 65;
    const RIGHT = 68;
    const UP = 87;
    const DOWN = 83;
    const ResetKey =82;

    const goingUp = (Yv == -unitSize);
    const goingRight = (Xv == unitSize);
    const goingDown = (Yv == unitSize);
    const goingLeft = (Xv == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            Xv = -unitSize;
            Yv = 0;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            Xv = unitSize;
            Yv = 0;
            break;
        case(keyPressed == UP && !goingDown):
            Xv = 0;
            Yv = -unitSize;
            break;
        case(keyPressed == DOWN && !goingUp):
            Xv = 0;
            Yv = unitSize; 
            break; 
        case(keyPressed == ResetKey):
            resetGame();
            break;                      
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x <0):
        running = false;
        break;
        case(snake[0].x > WIDTH - unitSize):
        running = false;
        break;
        case(snake[0].y < 0):
        running = false;
        break;
        case(snake[0].y > HEIGHT - unitSize):
        running = false;
        break;
    }
    for(let i = 1;i < snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
            break;
        }
    }
}
function displayGameover(){
    ctx.font = "40px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAllign = "center";
    ctx.fillText("Game Over!" , WIDTH/2 - 110,HEIGHT/2);
    running =false;


};
function resetGame(){
    SCORE = 0;
    Xv = unitSize;
    Yv = 0;
    snake = [
        {x:unitSize*1 , y:0},
        {x:0 , y:0}
    
    ];
    gameStart();
    

};




