document.addEventListener('DOMContentLoaded', () => {
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const scoreXDisplay = document.getElementById('scoreX');
    const scoreODisplay = document.getElementById('scoreO');
    const congratsPopup = document.getElementById('congratsPopup');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeBtn = document.querySelector('.close-btn');
    const board = document.getElementById('board');
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let scores = { X: 0, O: 0 };
    
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
    
    const winningMessageText = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
    
    statusDisplay.innerHTML = currentPlayerTurn();
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
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
            statusDisplay.innerHTML = winningMessageText();
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
            showCongratsPopup(currentPlayer);
            
            return;
        }
        
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
        
        changePlayer();
    }
    
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = currentPlayerTurn();
    }
    
    function updateScoreDisplay() {
        scoreXDisplay.textContent = scores.X;
        scoreODisplay.textContent = scores.O;
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = currentPlayerTurn();
        
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
        winnerMessage.textContent = `Player ${winner} wins the game!`;
        congratsPopup.style.display = 'flex';
    }
    
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
    
    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', () => {
        handleRestartGame();
        congratsPopup.style.display = 'none';
    });
});