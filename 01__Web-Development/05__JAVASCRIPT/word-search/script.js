// Word Search Game Script

// Game variables
let grid = [];
let words = [];
let foundWords = [];
let selectedCells = [];
let difficulty = 'medium';
let timer;
let seconds = 0;
let score = 0;
let hintsUsed = 0;
let gameActive = false;

// Word lists by difficulty
const wordLists = {
    easy: [
        'CAT', 'DOG', 'SUN', 'RUN', 'FUN', 'HAT', 'MAP', 'BUG', 'CAR', 'BOX',
        'PEN', 'CUP', 'BAG', 'BED', 'TOY', 'KEY', 'JAR', 'LOG', 'FAN', 'MUG'
    ],
    medium: [
        'APPLE', 'BEACH', 'CHAIR', 'DANCE', 'EARTH', 'FLAME', 'GRAPE', 'HOUSE', 'JUICE', 'KITE',
        'LEMON', 'MUSIC', 'NIGHT', 'OCEAN', 'PIANO', 'QUEEN', 'RIVER', 'SNAKE', 'TABLE', 'WATER'
    ],
    hard: [
        'AMAZING', 'BICYCLE', 'CRYSTAL', 'DOLPHIN', 'ELEGANT', 'FANTASY', 'GRAVITY', 'HARMONY', 'JOURNEY', 'KINGDOM',
        'MYSTERY', 'NETWORK', 'OLYMPIC', 'PYRAMID', 'QUANTUM', 'RAINBOW', 'SYMPHONY', 'TORNADO', 'UNIVERSE', 'VOLCANO'
    ]
};

// Grid sizes by difficulty
const gridSizes = {
    easy: 8,
    medium: 12,
    hard: 15
};

// DOM elements
const wordGridElement = document.getElementById('word-grid');
const wordListElement = document.getElementById('word-list');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const difficultySelector = document.getElementById('difficulty');
const newGameBtn = document.getElementById('new-game-btn');
const hintBtn = document.getElementById('hint-btn');
const gameMessage = document.getElementById('game-message');
const messageTitle = document.getElementById('message-title');
const messageText = document.getElementById('message-text');
const finalTimeElement = document.getElementById('final-time');
const finalScoreElement = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');

// Initialize the game
function initGame() {
    // Reset game state
    grid = [];
    words = [];
    foundWords = [];
    selectedCells = [];
    seconds = 0;
    score = 0;
    hintsUsed = 0;
    gameActive = true;
    
    // Update UI
    updateScore();
    updateTimer();
    
    // Get difficulty
    difficulty = difficultySelector.value;
    
    // Generate grid and words
    const gridSize = gridSizes[difficulty];
    generateGrid(gridSize);
    
    // Start timer
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    
    // Hide game message if visible
    gameMessage.classList.remove('show');
}

// Generate the word search grid
function generateGrid(size) {
    // Clear previous grid and word list
    wordGridElement.innerHTML = '';
    wordListElement.innerHTML = '';
    
    // Set grid size
    wordGridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    wordGridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    // Initialize empty grid
    grid = Array(size).fill().map(() => Array(size).fill(''));
    
    // Select random words based on difficulty
    const availableWords = [...wordLists[difficulty]];
    const numWords = difficulty === 'easy' ? 6 : (difficulty === 'medium' ? 8 : 10);
    words = [];
    
    for (let i = 0; i < numWords; i++) {
        if (availableWords.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        words.push(availableWords[randomIndex]);
        availableWords.splice(randomIndex, 1);
    }
    
    // Place words in the grid
    placeWords(words, size);
    
    // Fill remaining cells with random letters
    fillEmptyCells();
    
    // Render the grid
    renderGrid();
    
    // Render the word list
    renderWordList();
}

// Place words in the grid
function placeWords(words, size) {
    // Sort words by length (longest first)
    words.sort((a, b) => b.length - a.length);
    
    for (const word of words) {
        let placed = false;
        let attempts = 0;
        const maxAttempts = 100;
        
        while (!placed && attempts < maxAttempts) {
            attempts++;
            
            // Random direction (0-7)
            // 0: right, 1: down-right, 2: down, 3: down-left, 4: left, 5: up-left, 6: up, 7: up-right
            const direction = Math.floor(Math.random() * 8);
            
            // Direction vectors
            const dx = [1, 1, 0, -1, -1, -1, 0, 1][direction];
            const dy = [0, 1, 1, 1, 0, -1, -1, -1][direction];
            
            // Random starting position
            const startX = Math.floor(Math.random() * size);
            const startY = Math.floor(Math.random() * size);
            
            // Check if word fits
            if (wordFits(word, startX, startY, dx, dy, size)) {
                // Place the word
                for (let i = 0; i < word.length; i++) {
                    const x = startX + i * dx;
                    const y = startY + i * dy;
                    grid[y][x] = word[i];
                }
                placed = true;
            }
        }
        
        // If word couldn't be placed after max attempts, remove it from the list
        if (!placed) {
            const index = words.indexOf(word);
            if (index !== -1) {
                words.splice(index, 1);
            }
        }
    }
}

// Check if a word fits in the grid at the given position and direction
function wordFits(word, startX, startY, dx, dy, size) {
    // Check if word goes out of bounds
    const endX = startX + (word.length - 1) * dx;
    const endY = startY + (word.length - 1) * dy;
    
    if (endX < 0 || endX >= size || endY < 0 || endY >= size) {
        return false;
    }
    
    // Check if word overlaps with existing letters
    for (let i = 0; i < word.length; i++) {
        const x = startX + i * dx;
        const y = startY + i * dy;
        
        // If cell is not empty, check if it's the same letter
        if (grid[y][x] !== '' && grid[y][x] !== word[i]) {
            return false;
        }
    }
    
    return true;
}

// Fill empty cells with random letters
function fillEmptyCells() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '') {
                const randomIndex = Math.floor(Math.random() * letters.length);
                grid[y][x] = letters[randomIndex];
            }
        }
    }
}

// Render the grid
function renderGrid() {
    wordGridElement.innerHTML = '';
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = grid[y][x];
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            // Add event listeners
            cell.addEventListener('mousedown', startSelection);
            cell.addEventListener('mouseover', updateSelection);
            
            wordGridElement.appendChild(cell);
        }
    }
    
    // Add mouseup event to the document
    document.addEventListener('mouseup', endSelection);
}

// Render the word list
function renderWordList() {
    wordListElement.innerHTML = '';
    
    for (const word of words) {
        const li = document.createElement('li');
        li.textContent = word;
        li.dataset.word = word;
        wordListElement.appendChild(li);
    }
}

// Start word selection
function startSelection(e) {
    if (!gameActive) return;
    
    // Clear previous selection
    clearSelection();
    
    // Add first cell to selection
    const cell = e.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    
    selectedCells.push({ x, y, element: cell });
    cell.classList.add('selected');
}

// Update word selection
function updateSelection(e) {
    if (!gameActive || selectedCells.length === 0) return;
    
    const cell = e.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    
    // Check if cell is already in selection
    const isSelected = selectedCells.some(c => c.x === x && c.y === y);
    if (isSelected) return;
    
    // Check if cell is in a valid direction from the first cell
    const firstCell = selectedCells[0];
    const dx = x - firstCell.x;
    const dy = y - firstCell.y;
    
    // Only allow straight lines (horizontal, vertical, diagonal)
    if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return;
    
    // Clear previous selection except the first cell
    while (selectedCells.length > 1) {
        const cell = selectedCells.pop();
        cell.element.classList.remove('selected');
    }
    
    // Calculate all cells in the line between first cell and current cell
    const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
    const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    for (let i = 1; i <= steps; i++) {
        const newX = firstCell.x + i * stepX;
        const newY = firstCell.y + i * stepY;
        const newCell = document.querySelector(`.grid-cell[data-x="${newX}"][data-y="${newY}"]`);
        
        if (newCell) {
            selectedCells.push({ x: newX, y: newY, element: newCell });
            newCell.classList.add('selected');
        }
    }
}

// End word selection
function endSelection() {
    if (!gameActive || selectedCells.length === 0) return;
    
    // Check if selected cells form a word
    const selectedWord = selectedCells.map(cell => {
        return grid[cell.y][cell.x];
    }).join('');
    
    // Check if word is in the list and not already found
    const wordIndex = words.findIndex(word => 
        word === selectedWord || word === selectedWord.split('').reverse().join('')
    );
    
    if (wordIndex !== -1 && !foundWords.includes(words[wordIndex])) {
        // Word found!
        foundWords.push(words[wordIndex]);
        
        // Mark cells as found
        selectedCells.forEach(cell => {
            cell.element.classList.remove('selected');
            cell.element.classList.add('found');
        });
        
        // Mark word as found in the list
        const wordElement = document.querySelector(`li[data-word="${words[wordIndex]}"]`);
        if (wordElement) {
            wordElement.classList.add('found');
        }
        
        // Update score
        updateScore(words[wordIndex]);
        
        // Check if all words are found
        if (foundWords.length === words.length) {
            endGame(true);
        }
    } else {
        // Word not found, clear selection
        clearSelection();
    }
}

// Clear cell selection
function clearSelection() {
    selectedCells.forEach(cell => {
        cell.element.classList.remove('selected');
    });
    selectedCells = [];
}

// Update the score
function updateScore(foundWord = null) {
    if (foundWord) {
        // Base points for finding a word
        let points = 10;
        
        // Bonus points based on word length
        points += foundWord.length * 5;
        
        // Bonus points based on difficulty
        if (difficulty === 'medium') points *= 1.5;
        if (difficulty === 'hard') points *= 2;
        
        // Penalty for using hints
        if (hintsUsed > 0) {
            points *= (1 - (hintsUsed * 0.1));
        }
        
        // Add to score
        score += Math.floor(points);
    }
    
    // Update score display
    scoreElement.textContent = score;
}

// Update the timer
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Provide a hint
function giveHint() {
    if (!gameActive || foundWords.length === words.length) return;
    
    // Increase hint counter
    hintsUsed++;
    
    // Find a word that hasn't been found yet
    const remainingWords = words.filter(word => !foundWords.includes(word));
    if (remainingWords.length === 0) return;
    
    // Select a random word to hint
    const wordToHint = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    
    // Find the word in the grid
    const wordCells = findWordInGrid(wordToHint);
    
    // Highlight the first letter of the word
    if (wordCells.length > 0) {
        const firstCell = wordCells[0];
        const cellElement = document.querySelector(`.grid-cell[data-x="${firstCell.x}"][data-y="${firstCell.y}"]`);
        
        if (cellElement) {
            cellElement.classList.add('hint-highlight');
            setTimeout(() => {
                cellElement.classList.remove('hint-highlight');
            }, 3000);
        }
    }
}

// Find a word in the grid
function findWordInGrid(word) {
    const size = grid.length;
    const cells = [];
    
    // Check all possible directions and starting positions
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Skip if the first letter doesn't match
            if (grid[y][x] !== word[0]) continue;
            
            // Check all 8 directions
            for (let dir = 0; dir < 8; dir++) {
                const dx = [1, 1, 0, -1, -1, -1, 0, 1][dir];
                const dy = [0, 1, 1, 1, 0, -1, -1, -1][dir];
                
                let found = true;
                const wordCells = [];
                
                // Check if word fits in this direction
                for (let i = 0; i < word.length; i++) {
                    const newX = x + i * dx;
                    const newY = y + i * dy;
                    
                    // Check bounds
                    if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
                        found = false;
                        break;
                    }
                    
                    // Check letter
                    if (grid[newY][newX] !== word[i]) {
                        found = false;
                        break;
                    }
                    
                    wordCells.push({ x: newX, y: newY });
                }
                
                if (found) {
                    return wordCells;
                }
            }
        }
    }
    
    return [];
}

// End the game
function endGame(won = false) {
    gameActive = false;
    clearInterval(timer);
    
    // Show game message
    if (won) {
        messageTitle.textContent = 'Congratulations!';
        messageText.textContent = 'You found all the words!';
    } else {
        messageTitle.textContent = 'Game Over';
        messageText.textContent = 'Better luck next time!';
    }
    
    finalTimeElement.textContent = timeElement.textContent;
    finalScoreElement.textContent = score;
    gameMessage.classList.add('show');
}

// Event listeners
difficultySelector.addEventListener('change', () => {
    difficulty = difficultySelector.value;
});

newGameBtn.addEventListener('click', initGame);
hintBtn.addEventListener('click', giveHint);
playAgainBtn.addEventListener('click', initGame);

// Initialize the game when the page loads
window.addEventListener('load', initGame);

// Prevent context menu on right-click
wordGridElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});