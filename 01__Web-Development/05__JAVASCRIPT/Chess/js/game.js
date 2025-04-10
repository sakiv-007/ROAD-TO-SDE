// Main game logic
class ChessGame {
    constructor() {
        this.chessboard = new ChessBoard();
        this.moveHandler = new MoveHandler(this);
        this.board = Array(8).fill().map(() => Array(8).fill(null));
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        
        this.setupEventListeners();
        this.newGame();
    }
    
    setupEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('undo-btn').addEventListener('click', () => this.moveHandler.undoMove());
        document.getElementById('flip-board-btn').addEventListener('click', () => this.chessboard.flipBoard());
        
        // Add drag and drop event listeners to the board
        this.chessboard.boardElement.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        this.chessboard.boardElement.addEventListener('drop', (e) => {
            e.preventDefault();
            
            const fromData = e.dataTransfer.getData('text/plain').split(',');
            const fromRow = parseInt(fromData[0]);
            const fromCol = parseInt(fromData[1]);
            
            const targetElement = e.target.closest('.square');
            if (!targetElement) return;
            
            const toRow = parseInt(targetElement.dataset.row);
            const toCol = parseInt(targetElement.dataset.col);
            
            this.handleMove(fromRow, fromCol, toRow, toCol);
        });
    }
    
    newGame() {
        // Clear the board
        this.board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Set up pawns
        for (let col = 0; col < 8; col++) {
            this.board[1][col] = new Piece('pawn', 'black');
            this.board[6][col] = new Piece('pawn', 'white');
        }
        
        // Set up other pieces
        const setupRow = (row, color) => {
            this.board[row][0] = new Piece('rook', color);
            this.board[row][1] = new Piece('knight', color);
            this.board[row][2] = new Piece('bishop', color);
            this.board[row][3] = new Piece('queen', color);
            this.board[row][4] = new Piece('king', color);
            this.board[row][5] = new Piece('bishop', color);
            this.board[row][6] = new Piece('knight', color);
            this.board[row][7] = new Piece('rook', color);
        };
        
        setupRow(0, 'black');
        setupRow(7, 'white');
        
        // Reset game state
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        
        // Reset move handler
        this.moveHandler = new MoveHandler(this);
        
        // Update the board display
        this.updateBoard();
        
        // Update game status
        document.getElementById('status-message').textContent = "White's turn";
    }
    
    updateBoard() {
        this.chessboard.clearHighlights();
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.chessboard.placePiece(row, col, this.board[row][col]);
            }
        }
        
        // Highlight selected square and valid moves
        if (this.selectedSquare) {
            const { row, col } = this.selectedSquare;
            this.chessboard.highlightSquare(row, col, 'selected');
            
            this.validMoves.forEach(move => {
                this.chessboard.highlightValidMove(move.row, move.col, move.capture);
            });
        }
        
        // Highlight last move
        if (this.moveHandler.moveHistory.length > 0) {
            const lastMove = this.moveHandler.moveHistory[this.moveHandler.moveHistory.length - 1];
            this.chessboard.highlightLastMove(lastMove.fromRow, lastMove.fromCol, lastMove.toRow, lastMove.toCol);
        }
    }
    
    handleSquareClick(row, col) {
        const clickedPiece = this.board[row][col];
        
        // If a piece is already selected
        if (this.selectedSquare) {
            const { row: fromRow, col: fromCol } = this.selectedSquare;
            
            // If clicking on the same square, deselect it
            if (fromRow === row && fromCol === col) {
                this.deselectPiece();
                return;
            }
            
            // If clicking on a valid move square, make the move
            const isValidMove = this.validMoves.some(move => move.row === row && move.col === col);
            if (isValidMove) {
                this.handleMove(fromRow, fromCol, row, col);
                return;
            }
            
            // If clicking on another piece of the same color, select that piece instead
            if (clickedPiece && clickedPiece.color === this.currentPlayer) {
                this.selectPiece(row, col);
                return;
            }
            
            // Otherwise, deselect the current piece
            this.deselectPiece();
        } 
        // If no piece is selected and clicked on a piece of the current player's color
        else if (clickedPiece && clickedPiece.color === this.currentPlayer) {
            this.selectPiece(row, col);
        }
    }
    
    selectPiece(row, col) {
        this.selectedPiece = this.board[row][col];
        this.selectedSquare = { row, col };
        this.validMoves = this.moveHandler.getValidMovesForPiece(row, col);
        this.updateBoard();
    }
    
    deselectPiece() {
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.updateBoard();
    }
    
    handleMove(fromRow, fromCol, toRow, toCol) {
        const success = this.moveHandler.makeMove(fromRow, fromCol, toRow, toCol);
        
        if (success) {
            this.deselectPiece();
            this.updateBoard();
        }
    }
    
    startTimers() {
        // Timer functionality to be implemented
        // This would handle the chess clock functionality
    }
}