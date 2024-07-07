const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

const grid = 20;
let count = 0;
let score = 0;
let speed = 10; // initial speed

let snake = {
    x: 300,
    y: 300,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
    snake.x = 300;
    snake.y = 300;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score = 0;
    speed = 10;

    apple.x = getRandomInt(0, 30) * grid;
    apple.y = getRandomInt(0, 30) * grid;
}

function gameLoop() {
    if (++count < speed) {
        requestAnimationFrame(gameLoop);
        return;
    }

    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        resetGame();
        startButton.style.display = 'block';
        return;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

    ctx.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            speed = Math.max(4, speed - 0.5); // increase speed

            apple.x = getRandomInt(0, 30) * grid;
            apple.y = getRandomInt(0, 30) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                resetGame();
                startButton.style.display = 'block';
                return;
            }
        }
    });

    document.getElementById('score').innerText = score;
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(e) {
    if ([37, 38, 39, 40].includes(e.which)) {
        e.preventDefault();
    }

    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

startButton.addEventListener('click', function() {
    resetGame();
    startButton.style.display = 'none';
    requestAnimationFrame(gameLoop);
});