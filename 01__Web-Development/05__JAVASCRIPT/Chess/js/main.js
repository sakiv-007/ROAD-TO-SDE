// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create chess piece SVG assets folder
    createPieceAssets();
    
    // Initialize the game
    const game = window.game = new ChessGame();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Undo move with Ctrl+Z
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            game.moveHandler.undoMove();
        }
        
        // New game with Ctrl+N
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            game.newGame();
        }
        
        // Flip board with F
        if (e.key === 'f') {
            e.preventDefault();
            game.chessboard.flipBoard();
        }
    });
    
    // Handle window resize to maintain board proportions
    window.addEventListener('resize', () => {
        adjustBoardSize();
    });
    
    adjustBoardSize();
});

// Function to adjust the board size based on window dimensions
function adjustBoardSize() {
    const boardContainer = document.querySelector('.board-container');
    const main = document.querySelector('main');
    
    // On smaller screens, make the board take full width
    if (window.innerWidth < 900) {
        boardContainer.style.maxWidth = '90vw';
    } else {
        boardContainer.style.maxWidth = '600px';
    }
}

// Function to create SVG assets for chess pieces
function createPieceAssets() {
    // This function would normally create or load SVG assets for the chess pieces
    // For this implementation, we'll assume the SVG files already exist in the assets folder
    
    // Create the assets directory if it doesn't exist
    const assetsDir = 'assets/images/pieces';
    
    // In a real implementation, we would check if the directory exists and create it if needed
    // Then we would either generate SVGs dynamically or copy them from a source
    
    console.log(`Chess piece assets should be placed in the ${assetsDir} directory.`);
    
    // Example SVG content for a white pawn (simplified)
    const whitePawnSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;
    
    // In a real implementation, we would save this SVG to a file
    // For example: fs.writeFileSync(`${assetsDir}/white-pawn.svg`, whitePawnSVG);
    
    // Similar SVGs would be created for all pieces
}