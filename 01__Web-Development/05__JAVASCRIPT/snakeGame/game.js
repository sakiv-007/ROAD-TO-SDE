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
// Add pause button reference
const pauseBtn = document.querySelector('.pause-btn') || document.createElement('button');

// Add pause state variable
let isPaused = false;
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
            // Tom's head
            ctx.beginPath();
            ctx.fillStyle = '#A9A9A9'; // Gray color for Tom
            ctx.strokeStyle = '#696969';
            ctx.lineWidth = 2;
            ctx.arc(segment.x + gridSize/2, segment.y + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Tom's ears
            ctx.beginPath();
            ctx.fillStyle = '#A9A9A9';
            ctx.moveTo(segment.x + gridSize/4, segment.y);
            ctx.lineTo(segment.x + gridSize/2, segment.y - gridSize/3);
            ctx.lineTo(segment.x + gridSize*3/4, segment.y);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(segment.x + gridSize/4, segment.y);
            ctx.lineTo(segment.x, segment.y - gridSize/3);
            ctx.lineTo(segment.x, segment.y);
            ctx.fill();
            
            // Tom's eyes
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
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
            ctx.arc(eyeX1, eyeY1, 3, 0, Math.PI * 2);
            ctx.arc(eyeX2, eyeY2, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Tom's pupils
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(eyeX1, eyeY1, 1.5, 0, Math.PI * 2);
            ctx.arc(eyeX2, eyeY2, 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Tom's nose
            ctx.beginPath();
            ctx.fillStyle = '#FFC0CB'; // Pink nose
            ctx.arc(segment.x + gridSize/2, segment.y + gridSize*0.6, 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Tom's whiskers
            ctx.beginPath();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            // Left whiskers
            ctx.moveTo(segment.x + gridSize/3, segment.y + gridSize*0.6);
            ctx.lineTo(segment.x, segment.y + gridSize*0.5);
            ctx.moveTo(segment.x + gridSize/3, segment.y + gridSize*0.6);
            ctx.lineTo(segment.x, segment.y + gridSize*0.7);
            // Right whiskers
            ctx.moveTo(segment.x + gridSize*2/3, segment.y + gridSize*0.6);
            ctx.lineTo(segment.x + gridSize, segment.y + gridSize*0.5);
            ctx.moveTo(segment.x + gridSize*2/3, segment.y + gridSize*0.6);
            ctx.lineTo(segment.x + gridSize, segment.y + gridSize*0.7);
            ctx.stroke();
            
        } else {
            // Tom's body segments
            ctx.beginPath();
            ctx.fillStyle = index % 2 === 0 ? '#A9A9A9' : '#808080'; // Alternating gray shades
            ctx.strokeStyle = '#696969';
            ctx.lineWidth = 2;
            ctx.arc(segment.x + gridSize/2, segment.y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Add stripes to Tom's body
            if (index % 2 === 0) {
                ctx.beginPath();
                ctx.strokeStyle = '#696969';
                ctx.lineWidth = 1;
                ctx.moveTo(segment.x + gridSize*0.3, segment.y + gridSize*0.3);
                ctx.lineTo(segment.x + gridSize*0.7, segment.y + gridSize*0.7);
                ctx.stroke();
            }
        }
    });
}

function drawFood() {
    // Jerry's body (brown mouse)
    ctx.beginPath();
    ctx.fillStyle = '#B87333'; // Brown color for Jerry
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.arc(food.x + gridSize/2, food.y + gridSize/2, gridSize/2 - 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Jerry's ears
    ctx.beginPath();
    ctx.fillStyle = '#D2B48C'; // Lighter brown for ears
    ctx.arc(food.x + gridSize/3, food.y + gridSize/3, gridSize/4, 0, Math.PI * 2);
    ctx.arc(food.x + gridSize*2/3, food.y + gridSize/3, gridSize/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Jerry's inner ears
    ctx.beginPath();
    ctx.fillStyle = '#FFC0CB'; // Pink inner ears
    ctx.arc(food.x + gridSize/3, food.y + gridSize/3, gridSize/8, 0, Math.PI * 2);
    ctx.arc(food.x + gridSize*2/3, food.y + gridSize/3, gridSize/8, 0, Math.PI * 2);
    ctx.fill();

    // Jerry's eyes
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(food.x + gridSize/3, food.y + gridSize/2, 2, 0, Math.PI * 2);
    ctx.arc(food.x + gridSize*2/3, food.y + gridSize/2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Jerry's nose
    ctx.beginPath();
    ctx.fillStyle = '#FF9999';
    ctx.arc(food.x + gridSize/2, food.y + gridSize*2/3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Jerry's tail
    ctx.beginPath();
    ctx.strokeStyle = '#B87333';
    ctx.lineWidth = 2;
    ctx.moveTo(food.x + gridSize/2, food.y + gridSize);
    ctx.quadraticCurveTo(
        food.x + gridSize, food.y + gridSize, 
        food.x + gridSize, food.y + gridSize/2
    );
    ctx.stroke();

    // Jerry's whiskers
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    // Left whiskers
    ctx.moveTo(food.x + gridSize/3, food.y + gridSize*2/3);
    ctx.lineTo(food.x, food.y + gridSize/2);
    ctx.moveTo(food.x + gridSize/3, food.y + gridSize*2/3);
    ctx.lineTo(food.x, food.y + gridSize*3/4);
    // Right whiskers
    ctx.moveTo(food.x + gridSize*2/3, food.y + gridSize*2/3);
    ctx.lineTo(food.x + gridSize, food.y + gridSize/2);
    ctx.moveTo(food.x + gridSize*2/3, food.y + gridSize*2/3);
    ctx.lineTo(food.x + gridSize, food.y + gridSize*3/4);
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
    
    // Only update snake position if not paused
    if (!isPaused) {
        moveSnake();
        
        if (checkCollision()) {
            gameOver();
            return;
        }
    }
    
    // Always draw food and snake (even when paused)
    drawFood();
    drawSnake();
    
    // If paused, show a small indicator
    if (isPaused) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, 30);
    }
}

// Remove the drawPauseScreen function since we don't need it anymore

// Modify togglePause function
function togglePause() {
    isPaused = !isPaused;
    
    // Update pause button text to show current state
    if (pauseBtn) {
        pauseBtn.innerHTML = isPaused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    // Make sure the game loop is running if we're unpausing
    if (!isPaused && !gameLoop) {
        const gameSpeed = window.innerWidth <= 768 ? 150 : 100;
        gameLoop = setInterval(update, gameSpeed);
    }
}

let lastKeyTime = 0;
const keyDelay = 50;

document.addEventListener('keydown', (event) => {
    const currentTime = Date.now();
    if (currentTime - lastKeyTime < keyDelay) return;
    lastKeyTime = currentTime;

    // Don't process movement keys if game is paused
    if (!isPaused) {
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
    }
    
    // Process pause keys regardless of game state
    if (event.key === 'p' || event.key === 'P' || event.key === ' ') {
        togglePause();
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
    
    // Add pause button if it doesn't exist
    if (!document.querySelector('.pause-btn')) {
        pauseBtn.className = 'pause-btn';
        pauseBtn.innerHTML = '⏸️ Pause';
        
        // Find the control container and add the pause button
        const restartButtonParent = restartButton.parentElement;
        
        // Insert pause button after restart button
        if (restartButton.nextSibling) {
            restartButtonParent.insertBefore(pauseBtn, restartButton.nextSibling);
        } else {
            restartButtonParent.appendChild(pauseBtn);
        }
    }
    
    // Add pause button event listener
    pauseBtn.addEventListener('click', togglePause);
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
    
    // Reset pause state when starting new game
    isPaused = false;
    
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
