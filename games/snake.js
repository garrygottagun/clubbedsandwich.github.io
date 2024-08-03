const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

const grid = 20;
let count = 0;
let score = 0;
let speed = 10; // Initial speed

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

// Generate a random integer within a given range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Reset the game to its initial state
function resetGame() {
    snake.x = 300;
    snake.y = 300;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    score = 0;
    speed = 10; // Reset speed

    // Generate a new position for the apple
    apple.x = getRandomInt(0, 30) * grid;
    apple.y = getRandomInt(0, 30) * grid;
}

// The main game loop
function gameLoop() {
    if (++count < speed) {
        requestAnimationFrame(gameLoop);
        return;
    }

    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update the snake's position
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Check for collision with the canvas boundaries
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        resetGame();
        startButton.style.display = 'block';
        return;
    }

    // Add a new head to the snake
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove the tail if the snake is longer than its maximum length
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Check for collision with the apple
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score++;
            speed = Math.max(6, speed - 0.3); // Increase speed more smoothly

            // Generate a new position for the apple
            apple.x = getRandomInt(0, 30) * grid;
            apple.y = getRandomInt(0, 30) * grid;
        }

        // Check for collision with the snake itself
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                resetGame();
                startButton.style.display = 'block';
                return;
            }
        }
    });

    // Update the score display
    document.getElementById('score').innerText = score;
    requestAnimationFrame(gameLoop);
}

// Listen for keyboard input
document.addEventListener('keydown', function (e) {
    if ([37, 38, 39, 40].includes(e.which)) {
        e.preventDefault();
    }

    // Update the snake's direction based on the arrow keys
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

// Add touch event listeners for mobile compatibility
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Horizontal swipe
        if (xDiff > 0 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        } else if (xDiff < 0 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        }
    } else {
        // Vertical swipe
        if (yDiff > 0 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        } else if (yDiff < 0 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    }

    // Reset touch coordinates
    xDown = null;
    yDown = null;
}

// Listen for the start button click to start the game
startButton.addEventListener('click', function () {
    resetGame();
    startButton.style.display = 'none';
    requestAnimationFrame(gameLoop);
});