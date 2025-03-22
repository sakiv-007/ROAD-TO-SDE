document.addEventListener('DOMContentLoaded', () => {
    // Game variables
    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let playerXName = "Player X";
    let playerOName = "Player O";
    let isPlayingAgainstAI = false;
    let scores = { X: 0, O: 0 };
    
    // DOM elements
    const statusDisplay = document.getElementById('status');
    const gameModePopup = document.getElementById('gameModePopup');
    const playerNamesPopup = document.getElementById('playerNamesPopup');
    const playWithAIButton = document.getElementById('playWithAI');
    const playWithFriendButton = document.getElementById('playWithFriend');
    const startGameButton = document.getElementById('startGame');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const scoreXDisplay = document.getElementById('scoreX');
    const scoreODisplay = document.getElementById('scoreO');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const congratsPopup = document.getElementById('congratsPopup');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeBtn = document.querySelector('.close-btn');
    const board = document.getElementById('board');
    
    // Winning conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    // Show game mode selection popup when page loads
    gameModePopup.style.display = 'flex';
    
    // Initially disable cell clicks until game starts
    gameActive = false;
    
    // Event listeners for game mode selection
    playWithAIButton.addEventListener('click', () => {
        isPlayingAgainstAI = true;
        playerXName = "Your";
        playerOName = "AI";
        gameModePopup.style.display = 'none';
        startGame();
    });
    
    playWithFriendButton.addEventListener('click', () => {
        isPlayingAgainstAI = false;
        gameModePopup.style.display = 'none';
        playerNamesPopup.style.display = 'flex';
    });
    
    // Event listener for player names submission
    startGameButton.addEventListener('click', () => {
        playerXName = player1NameInput.value.trim() || "Player 1";
        playerOName = player2NameInput.value.trim() || "Player 2";
        playerNamesPopup.style.display = 'none';
        startGame();
    });
    
    function startGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        
        // Clear the board
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
        
        // Remove winning line if it exists
        const existingLine = document.querySelector('.winning-line');
        if (existingLine) {
            existingLine.remove();
        }
        
        updateStatusDisplay();
    }
    
    function updateStatusDisplay() {
        const currentPlayerName = currentPlayer === "X" ? playerXName : playerOName;
        // Display player name with their symbol
        if (currentPlayerName === "Your") {
            statusDisplay.innerHTML = `${currentPlayerName} Turn <span class="player-symbol">(${currentPlayer})</span>`;
        } else {
            statusDisplay.innerHTML = `${currentPlayerName}'s Turn <span class="player-symbol">(${currentPlayer})</span>`;
        }
    }
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        
        // If game is still active and playing against AI, make AI move
        if (gameActive && isPlayingAgainstAI && currentPlayer === 'O') {
            makeAIMove();
        }
    }
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handleResultValidation() {
        let roundWon = false;
        let winningCombination = [];
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const position1 = gameState[a];
            const position2 = gameState[b];
            const position3 = gameState[c];
            
            if (position1 === '' || position2 === '' || position3 === '') {
                continue;
            }
            
            if (position1 === position2 && position2 === position3) {
                roundWon = true;
                winningCombination = [a, b, c];
                break;
            }
        }
        
        if (roundWon) {
            const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
            
            // Update status message for player win in AI mode
            if (isPlayingAgainstAI && currentPlayer === 'X') {
                statusDisplay.innerHTML = "You won the game!";
            } else {
                statusDisplay.innerHTML = `${winnerName} has won!`;
            }
            
            gameActive = false;
            
            // Highlight winning cells
            winningCombination.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            
            // Draw line over winning cells
            drawWinningLine(winningCombination);
            
            // Update score
            scores[currentPlayer]++;
            updateScoreDisplay();
            
            // Show congratulations popup
            showCongratsPopup(winnerName);
            
            return;
        }
        
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        changePlayer();
    }
    
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatusDisplay();
    }
    
    function updateScoreDisplay() {
        scoreXDisplay.textContent = scores.X;
        scoreODisplay.textContent = scores.O;
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        updateStatusDisplay();
        
        // Remove winning line if it exists
        const existingLine = document.querySelector('.winning-line');
        if (existingLine) {
            existingLine.remove();
        }
        
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    }
    
    // Function to draw a line over winning cells
    function drawWinningLine(combination) {
        // Remove any existing line
        const existingLine = document.querySelector('.winning-line');
        if (existingLine) {
            existingLine.remove();
        }
        
        const line = document.createElement('div');
        line.classList.add('winning-line');
        
        // Add player-specific color class
        line.style.backgroundColor = currentPlayer === 'X' ? '#e74c3c' : '#3498db';
        
        const firstCell = cells[combination[0]];
        const lastCell = cells[combination[2]];
        
        const firstCellRect = firstCell.getBoundingClientRect();
        const lastCellRect = lastCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        
        // Calculate positions relative to the board
        const startX = firstCellRect.left + firstCellRect.width / 2 - boardRect.left;
        const startY = firstCellRect.top + firstCellRect.height / 2 - boardRect.top;
        const endX = lastCellRect.left + lastCellRect.width / 2 - boardRect.left;
        const endY = lastCellRect.top + lastCellRect.height / 2 - boardRect.top;
        
        // Calculate line length and angle
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        
        // Set line position and dimensions
        line.style.width = `${length}px`;
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.transform = `rotate(${angle}deg)`;
        
        // Add line to the board
        board.style.position = 'relative';
        board.appendChild(line);
        
        // Animate the line
        setTimeout(() => {
            line.style.width = `${length}px`;
        }, 10);
    }
    
    // Show congratulations popup
    function showCongratsPopup(winner) {
        // Fix the selector to correctly target the h2 element
        const popupHeading = document.querySelector('#congratsPopup .popup-content h2');
        
        if (isPlayingAgainstAI) {
            if (winner === "Your") {
                winnerMessage.textContent = "You won the Game!";
                popupHeading.textContent = "Congratulations!";
            } else {
                winnerMessage.textContent = "AI won the Game!";
                popupHeading.textContent = "Game Over";
            }
        } else {
            winnerMessage.textContent = `${winner} won the game!`;
            popupHeading.textContent = "Congratulations!";
        }
        
        // Ensure the close button is visible and properly positioned
        if (!document.querySelector('.popup-close')) {
            const closeButton = document.createElement('span');
            closeButton.classList.add('popup-close');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '15px';
            closeButton.style.fontSize = '24px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#333';
            
            // Add event listener to close the popup
            closeButton.addEventListener('click', () => {
                congratsPopup.style.display = 'none';
            });
            
            // Add the close button to the popup content
            const popupContent = document.querySelector('#congratsPopup .popup-content');
            popupContent.style.position = 'relative';
            popupContent.appendChild(closeButton);
        }
        
        congratsPopup.style.display = 'flex';
    }
    
    // AI functionality
    function makeAIMove() {
        if (isPlayingAgainstAI && currentPlayer === "O" && gameActive) {
            // Simple AI implementation (random move)
            const emptyCells = gameState.reduce((acc, cell, index) => {
                if (cell === "") acc.push(index);
                return acc;
            }, []);
            
            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const cellIndex = emptyCells[randomIndex];
                
                // Simulate a delay for AI "thinking"
                setTimeout(() => {
                    if (gameActive) { // Check if game is still active after delay
                        const clickedCell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
                        handleCellPlayed(clickedCell, cellIndex);
                        handleResultValidation();
                    }
                }, 700);
            }
        }
    }
    
    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', () => {
        handleRestartGame();
        congratsPopup.style.display = 'none';
    });
    
    // Close popup when clicking the close button
    closeBtn.addEventListener('click', () => {
        congratsPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside the popup content
    window.addEventListener('click', (event) => {
        if (event.target === congratsPopup) {
            congratsPopup.style.display = 'none';
        }
    });
});