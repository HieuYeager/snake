var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var timeUpdate = 150;
var gameOver = false;
var intervalId;

//snake head
var snake = {X: 5, Y: 15};
var snakeBody = [[]];

var veclocity = {X: 0, Y: 0};

//food
var food = {X: 0, Y: 0};

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    intervalId = setInterval(update, timeUpdate);
}

function update(){
    if(gameOver){
        alert("Game Over");
        console.log("ngu");
        clearInterval(intervalId);
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    if(snake.X == food.X && snake.Y == food.Y){
        snakeBody.push([snake.X, snake.Y]);
        placeFood();
    }

    context.fillStyle = "red";
    context.fillRect(food.X * blocksize, food.Y * blocksize, blocksize, blocksize);

//logic sanke
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snake.X, snake.Y];
    }
    snake.X += veclocity.X ;
    snake.Y += veclocity.Y ;

    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0] * blocksize, snakeBody[i][1] * blocksize, blocksize, blocksize)
    }
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

function placeFood(){
    food.X = Math.floor(Math.random() * cols);
    food.Y = Math.floor(Math.random() * rows);
}

function changeDirection(e){
    if(e.code == "KeyW" && veclocity.Y != 1){
        veclocity.X = 0;
        veclocity.Y = -1;
    }

    else if(e.code == "KeyS" && veclocity.Y != -1){
        veclocity.X = 0;
        veclocity.Y = 1;
    }
    
    else if(e.code == "KeyA" && veclocity.X != 1){
        veclocity.X = -1;
        veclocity.Y = 0;
    }
    
    else if(e.code == "KeyD" && veclocity.X != -1){
        veclocity.X = 1;
        veclocity.Y = 0;
    }
    else if(e.code == "Space"){
        veclocity.X = 0;
        veclocity.Y = 0;
    }
    console.log(e.code);
}