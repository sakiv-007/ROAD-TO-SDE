const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('scoreValue');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('playerModal');
const playerNameInput = document.getElementById('playerName');
const startGameButton = document.getElementById('startGame');
const leaderboardList = document.getElementById('leaderboardList');
const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let currentPlayer = '';
let leaderboard = JSON.parse(localStorage.getItem('snakeLeaderboard')) || [];

function resizeCanvas() {
    if (window.innerWidth <= 768) {
        canvas.width = 300;
        canvas.height = 300;
    } else {
        canvas.width = 400;
        canvas.height = 400;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = 'right';
let score = 0;
let gameLoop;

function updateLeaderboard() {
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem('snakeLeaderboard', JSON.stringify(leaderboard));
    
    leaderboardList.innerHTML = leaderboard
        .map((entry, index) => `
            <div class="leaderboard-item ${entry.name === currentPlayer ? 'current-player' : ''}">
                <span>${index + 1}. ${entry.name}</span>
                <span>${entry.score}</span>
            </div>
        `)
        .join('');
}

function generateFood() {
    const newFood = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
    
    const isOnSnake = snake.some(segment => 
        segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) return generateFood();
    return newFood;
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.beginPath();
            ctx.fillStyle = '#2ecc71';
            ctx.strokeStyle = '#27ae60';
            ctx.lineWidth = 2;
            ctx.arc(segment.x + gridSize/2, segment.y + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = '#000';
            let eyeX1, eyeX2, eyeY1, eyeY2;
            switch(direction) {
                case 'right':
                    eyeX1 = eyeX2 = segment.x + gridSize * 0.7;
                    eyeY1 = segment.y + gridSize * 0.3;
                    eyeY2 = segment.y + gridSize * 0.7;
                    break;
                case 'left':
                    eyeX1 = eyeX2 = segment.x + gridSize * 0.3;
                    eyeY1 = segment.y + gridSize * 0.3;
                    eyeY2 = segment.y + gridSize * 0.7;
                    break;
                case 'up':
                    eyeX1 = segment.x + gridSize * 0.3;
                    eyeX2 = segment.x + gridSize * 0.7;
                    eyeY1 = eyeY2 = segment.y + gridSize * 0.3;
                    break;
                case 'down':
                    eyeX1 = segment.x + gridSize * 0.3;
                    eyeX2 = segment.x + gridSize * 0.7;
                    eyeY1 = eyeY2 = segment.y + gridSize * 0.7;
                    break;
            }
            ctx.beginPath();
            ctx.arc(eyeX1, eyeY1, 2, 0, Math.PI * 2);
            ctx.arc(eyeX2, eyeY2, 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.fillStyle = index % 2 === 0 ? '#2ecc71' : '#27ae60';
            ctx.strokeStyle = '#219f54';
            ctx.lineWidth = 2;
            ctx.arc(segment.x + gridSize/2, segment.y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
}

function drawFood() {
    ctx.beginPath();
    ctx.fillStyle = '#e74c3c';
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.arc(food.x + gridSize/2, food.y + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.arc(food.x + gridSize * 0.3, food.y + gridSize * 0.3, gridSize/4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 2;
    ctx.moveTo(food.x + gridSize/2, food.y + gridSize/4);
    ctx.lineTo(food.x + gridSize/2 + 3, food.y);
    ctx.stroke();
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    
    for (let i = 0; i <= canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y -= gridSize; break;
        case 'down': head.y += gridSize; break;
        case 'left': head.x -= gridSize; break;
        case 'right': head.x += gridSize; break;
    }

    if (head.x < 0) head.x = canvas.width - gridSize;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - gridSize;
    if (head.y >= canvas.height) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score += 10;
        scoreElement.textContent = score;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameLoop);
    
    const existingPlayerIndex = leaderboard.findIndex(p => p.name === currentPlayer);
    if (existingPlayerIndex !== -1) {
        if (score > leaderboard[existingPlayerIndex].score) {
            leaderboard[existingPlayerIndex].score = score;
        }
    } else {
        leaderboard.push({ name: currentPlayer, score: score });
    }
    updateLeaderboard();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    
    ctx.font = '25px Arial';
    ctx.fillText(`${currentPlayer}: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    
    ctx.shadowBlur = 0;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    moveSnake();
    
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    drawFood();
    drawSnake();
}

let lastKeyTime = 0;
const keyDelay = 50;

document.addEventListener('keydown', (event) => {
    const currentTime = Date.now();
    if (currentTime - lastKeyTime < keyDelay) return;
    lastKeyTime = currentTime;

    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

function addTouchControls() {
    upBtn.addEventListener('click', () => {
        if (direction !== 'down') direction = 'up';
    });
    
    downBtn.addEventListener('click', () => {
        if (direction !== 'up') direction = 'down';
    });
    
    leftBtn.addEventListener('click', () => {
        if (direction !== 'right') direction = 'left';
    });
    
    rightBtn.addEventListener('click', () => {
        if (direction !== 'left') direction = 'right';
    });
}

function startNewGame() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter a name!');
        return;
    }
    
    currentPlayer = playerName;
    modal.style.display = 'none';
    
    const existingPlayer = leaderboard.find(p => p.name === currentPlayer);
    if (existingPlayer) {
        console.log(`Welcome back, ${currentPlayer}!`);
    }
    
    snake = [{ x: Math.floor(canvas.width/2/gridSize)*gridSize, 
              y: Math.floor(canvas.height/2/gridSize)*gridSize }];
    food = generateFood();
    direction = 'right';
    score = 0;
    scoreElement.textContent = score;
    clearInterval(gameLoop);
    
    // Set different game speeds based on device size
    const gameSpeed = window.innerWidth <= 768 ? 150 : 100; // Slower on mobile
    gameLoop = setInterval(update, gameSpeed);
}

function resetGame() {
    modal.style.display = 'block';
}

startGameButton.addEventListener('click', startNewGame);
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startNewGame();
});
restartButton.addEventListener('click', resetGame);

addTouchControls();
modal.style.display = 'block';
updateLeaderboard();
