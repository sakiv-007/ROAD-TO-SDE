// Board setup and rendering
class ChessBoard {
    constructor() {
        this.boardElement = document.getElementById('chessboard');
        this.squares = [];
        this.flipped = false;
        this.selectedSquare = null;
        this.validMoves = [];
        this.lastMove = null;
        
        this.initBoard();
    }
    
    initBoard() {
        this.boardElement.innerHTML = '';
        this.squares = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                const isLight = (row + col) % 2 === 0;
                
                square.className = `square ${isLight ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                
                this.boardElement.appendChild(square);
                this.squares.push(square);
            }
        }
    }
    
    getSquare(row, col) {
        if (this.flipped) {
            row = 7 - row;
            col = 7 - col;
        }
        return this.squares[row * 8 + col];
    }
    
    placePiece(row, col, piece) {
        const square = this.getSquare(row, col);
        
        // Remove any existing pieces
        const existingPiece = square.querySelector('.piece');
        if (existingPiece) {
            square.removeChild(existingPiece);
        }
        
        if (piece) {
            const pieceElement = document.createElement('div');
            pieceElement.className = `piece ${piece.color}-${piece.type}`;
            pieceElement.dataset.pieceType = piece.type;
            pieceElement.dataset.pieceColor = piece.color;
            
            // Add drag functionality
            pieceElement.draggable = true;
            pieceElement.addEventListener('dragstart', (e) => this.handleDragStart(e, row, col));
            
            square.appendChild(pieceElement);
        }
    }
    
    clearHighlights() {
        this.squares.forEach(square => {
            square.classList.remove('selected', 'valid-move', 'last-move');
            
            // Remove move indicators
            const indicator = square.querySelector('.move-indicator');
            if (indicator) square.removeChild(indicator);
            
            const captureIndicator = square.querySelector('.capture-indicator');
            if (captureIndicator) square.removeChild(captureIndicator);
        });
    }
    
    highlightSquare(row, col, type) {
        const square = this.getSquare(row, col);
        square.classList.add(type);
    }
    
    highlightValidMove(row, col, isCapture) {
        const square = this.getSquare(row, col);
        square.classList.add('valid-move');
        
        // Add visual indicator
        if (isCapture) {
            const indicator = document.createElement('div');
            indicator.className = 'capture-indicator';
            square.appendChild(indicator);
        } else {
            const indicator = document.createElement('div');
            indicator.className = 'move-indicator';
            square.appendChild(indicator);
        }
    }
    
    highlightLastMove(fromRow, fromCol, toRow, toCol) {
        this.highlightSquare(fromRow, fromCol, 'last-move');
        this.highlightSquare(toRow, toCol, 'last-move');
        this.lastMove = { from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } };
    }
    
    flipBoard() {
        this.flipped = !this.flipped;
        this.boardElement.style.transform = this.flipped ? 'rotate(180deg)' : '';
        
        // Flip all pieces
        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            piece.style.transform = this.flipped ? 'rotate(180deg)' : '';
        });
        
        // Redraw the board with current game state
        game.updateBoard();
    }
    
    handleSquareClick(row, col) {
        game.handleSquareClick(row, col);
    }
    
    handleDragStart(e, row, col) {
        e.dataTransfer.setData('text/plain', `${row},${col}`);
        const piece = e.target;
        
        // Create a ghost image for dragging
        const ghost = piece.cloneNode(true);
        ghost.classList.add('dragging');
        document.body.appendChild(ghost);
        
        e.dataTransfer.setDragImage(ghost, 30, 30);
        
        // Remove the ghost after drag ends
        setTimeout(() => {
            document.body.removeChild(ghost);
        }, 0);
        
        // Trigger the square click to select the piece
        this.handleSquareClick(row, col);
    }
}