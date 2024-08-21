var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var timeUpdate = 300;
var gameOver = false;
var intervalId;
var point = 0;
var pointCounter;
var pause = false;

//snake head
var snake = {X: 5, Y: 15};
var snakeBody = [[]];

var veclocity = {X: 0, Y: 0};
var newVeclocity = {X: 0, Y: 0};

//food
var food = {X: 0, Y: 0};

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");
    pointCounter = document.getElementById("point");
    placeFood();
    document.addEventListener("keyup", newDirection);
    intervalId = setInterval(update, timeUpdate);
    alert("use AWSD to move, space to pause/resume");
}

//update
function update(){
    if(gameOver){
        alert("Game Over");
        // console.log("ngu");
        clearInterval(intervalId);
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);


//eat
    if(snake.X == food.X && snake.Y == food.Y){
        snakeBody.push([snake.X, snake.Y]);
        placeFood();
        point++;
        pointCounter.textContent = point;
        if(timeUpdate > 200){
            timeUpdate -= 10;
        }
        else if(timeUpdate > 150){
            timeUpdate -= 5;
        }
        else if(point > 25 && timeUpdate > 100  ){
            timeUpdate -= 2;
        }
        console.log(timeUpdate);
        clearInterval(intervalId);
        intervalId = setInterval(update, timeUpdate);
    }

//logic snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snake.X, snake.Y];
    }
    changeDirection();
    snake.X += veclocity.X ;
    snake.Y += veclocity.Y ;
    // console.log(veclocity);

    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0] * blocksize, snakeBody[i][1] * blocksize, blocksize, blocksize)
    }

    context.fillStyle = "red";
    context.fillRect(food.X * blocksize, food.Y * blocksize, blocksize, blocksize);

    context.fillStyle = "yellow";
    context.fillRect(snake.X * blocksize, snake.Y * blocksize, blocksize, blocksize);

// game over conditions
    if (snake.X < 0 || snake.Y < 0 || snake.X > cols - 1 || snake.Y > rows - 1) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] == snake.X && snakeBody[i][1] == snake.Y && (veclocity.X != 0 || veclocity.Y != 0)) {
            gameOver = true;
        }
    }
}


//func
function placeFood(){
    food.X = Math.floor(Math.random() * cols);
    food.Y = Math.floor(Math.random() * rows);
}

function changeDirection(){
    if(veclocity.X + newVeclocity.X != 0){
        veclocity.X = newVeclocity.X;
        veclocity.Y = newVeclocity.Y;
    }
    else if (veclocity.Y + newVeclocity.Y != 0) {
        veclocity.Y = newVeclocity.Y;
        veclocity.X = newVeclocity.X;
    }

}

function newDirection(e){
    if(e.code == "KeyW"){
        newVeclocity.X = 0;
        newVeclocity.Y = -1;
    }

    else if(e.code == "KeyS"){
        newVeclocity.X = 0;
        newVeclocity.Y = 1;
    }
    
    else if(e.code == "KeyA"){
        newVeclocity.X = -1;
        newVeclocity.Y = 0;
    }
    
    else if(e.code == "KeyD"){
        newVeclocity.X = 1;
        newVeclocity.Y = 0;
    }
    else if(e.code == "Space"){
        veclocity.X = 0;
        veclocity.Y = 0;
        if(pause){
            intervalId = setInterval(update, timeUpdate);
            pause = false;
            console.log("resume");
        }
        else{
            clearInterval(intervalId);
            pause = true;
            console.log("pause");
        }
        
    }
    console.log(e.code);
}