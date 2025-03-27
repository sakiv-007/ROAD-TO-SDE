// Move validation and execution
class MoveHandler {
    constructor(game) {
        this.game = game;
        this.moveHistory = [];
        this.capturedPieces = {
            white: [],
            black: []
        };
        this.enPassantTarget = null;
    }
    
    isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.game.board[fromRow][fromCol];
        if (!piece) return false;
        
        // Check if it's the correct player's turn
        if (piece.color !== this.game.currentPlayer) return false;
        
        // Get all valid moves for the piece
        const validMoves = piece.getValidMoves(this.game.board, fromRow, fromCol);
        
        // Check if the target square is in the valid moves
        return validMoves.some(move => move.row === toRow && move.col === toCol);
    }
    
    getValidMovesForPiece(row, col) {
        const piece = this.game.board[row][col];
        if (!piece) return [];
        
        // Get all potential moves
        const potentialMoves = piece.getValidMoves(this.game.board, row, col);
        
        // Filter out moves that would leave the king in check
        return potentialMoves.filter(move => {
            // Make a temporary move
            const tempBoard = this.cloneBoard(this.game.board);
            tempBoard[move.row][move.col] = tempBoard[row][col];
            tempBoard[row][col] = null;
            
            // Check if the king is in check after the move
            return !this.isKingInCheck(piece.color, tempBoard);
        });
    }
    
    makeMove(fromRow, fromCol, toRow, toCol, promotionPiece = null) {
        const piece = this.game.board[fromRow][fromCol];
        const targetPiece = this.game.board[toRow][toCol];
        
        // Save the move for undo
        const moveData = {
            fromRow,
            fromCol,
            toRow,
            toCol,
            piece,
            capturedPiece: targetPiece,
            isFirstMove: !piece.hasMoved,
            enPassantTarget: this.enPassantTarget,
            moveNotation: this.generateMoveNotation(fromRow, fromCol, toRow, toCol, targetPiece !== null)
        };
        
        // Handle captures
        if (targetPiece) {
            this.capturedPieces[targetPiece.color].push(targetPiece);
            this.updateCapturedPiecesDisplay();
        }
        
        // Move the piece
        this.game.board[toRow][toCol] = piece;
        this.game.board[fromRow][fromCol] = null;
        
        // Handle pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            if (promotionPiece) {
                this.game.board[toRow][toCol] = new Piece(promotionPiece, piece.color);
                moveData.promotion = promotionPiece;
            } else {
                // Show promotion modal
                this.showPromotionModal(toRow, toCol, piece.color);
                return false; // Don't complete the move yet
            }
        }
        
        // Handle castling
        if (piece.type === 'king' && Math.abs(fromCol - toCol) === 2) {
            const rookCol = toCol > fromCol ? 7 : 0;
            const newRookCol = toCol > fromCol ? toCol - 1 : toCol + 1;
            
            const rook = this.game.board[fromRow][rookCol];
            this.game.board[fromRow][newRookCol] = rook;
            this.game.board[fromRow][rookCol] = null;
            
            moveData.castling = toCol > fromCol ? 'kingside' : 'queenside';
            moveData.rookMove = { fromCol: rookCol, toCol: newRookCol };
        }
        
        // Handle en passant capture
        if (piece.type === 'pawn' && fromCol !== toCol && !targetPiece) {
            const capturedPawnRow = fromRow;
            const capturedPawnCol = toCol;
            const capturedPawn = this.game.board[capturedPawnRow][capturedPawnCol];
            
            if (capturedPawn && capturedPawn.type === 'pawn') {
                this.game.board[capturedPawnRow][capturedPawnCol] = null;
                this.capturedPieces[capturedPawn.color].push(capturedPawn);
                moveData.enPassantCapture = { row: capturedPawnRow, col: capturedPawnCol };
                this.updateCapturedPiecesDisplay();
            }
        }
        
        // Set en passant target for next move
        this.enPassantTarget = null;
        if (piece.type === 'pawn' && Math.abs(fromRow - toRow) === 2) {
            this.enPassantTarget = { row: (fromRow + toRow) / 2, col: fromCol };
        }
        
        // Update piece's move status
        piece.hasMoved = true;
        
        // Add move to history
        this.moveHistory.push(moveData);
        this.updateMoveHistory();
        
        // Highlight the last move
        this.game.chessboard.clearHighlights();
        this.game.chessboard.highlightLastMove(fromRow, fromCol, toRow, toCol);
        
        // Switch player
        this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
        
        // Update game status
        this.updateGameStatus();
        
        return true;
    }
    
    undoMove() {
        if (this.moveHistory.length === 0) return;
        
        const lastMove = this.moveHistory.pop();
        
        // Restore the piece to its original position
        this.game.board[lastMove.fromRow][lastMove.fromCol] = lastMove.piece;
        
        // Restore captured piece if any
        this.game.board[lastMove.toRow][lastMove.toCol] = lastMove.capturedPiece;
        
        // Restore en passant target
        this.enPassantTarget = lastMove.enPassantTarget;
        
        // Handle en passant capture undo
        if (lastMove.enPassantCapture) {
            const { row, col } = lastMove.enPassantCapture;
            const capturedPieceIndex = this.capturedPieces[this.game.currentPlayer].findIndex(
                p => p.type === 'pawn'
            );
            
            if (capturedPieceIndex !== -1) {
                const capturedPawn = this.capturedPieces[this.game.currentPlayer].splice(capturedPieceIndex, 1)[0];
                this.game.board[row][col] = capturedPawn;
            }
        }
        
        // Handle castling undo
        if (lastMove.castling) {
            const { fromCol, toCol } = lastMove.rookMove;
            const rookRow = lastMove.fromRow;
            
            const rook = this.game.board[rookRow][toCol];
            this.game.board[rookRow][fromCol] = rook;
            this.game.board[rookRow][toCol] = null;
        }
        
        // Restore piece's move status
        if (lastMove.isFirstMove) {
            lastMove.piece.hasMoved = false;
        }
        
        // Remove from captured pieces if it was a capture
        if (lastMove.capturedPiece) {
            const color = lastMove.capturedPiece.color;
            const index = this.capturedPieces[color].findIndex(p => p === lastMove.capturedPiece);
            if (index !== -1) {
                this.capturedPieces[color].splice(index, 1);
            }
            this.updateCapturedPiecesDisplay();
        }
        
        // Update move history display
        this.updateMoveHistory();
        
        // Switch back to previous player
        this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
        
        // Update game status
        this.updateGameStatus();
        
        // Update the board display
        this.game.updateBoard();
    }
    
    isKingInCheck(color, board = this.game.board) {
        // Find the king
        let kingRow = -1;
        let kingCol = -1;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
            if (kingRow !== -1) break;
        }
        
        // Check if any opponent piece can capture the king
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color !== color) {
                    const moves = piece.getValidMoves(board, row, col);
                    if (moves.some(move => move.row === kingRow && move.col === kingCol)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    isCheckmate(color) {
        if (!this.isKingInCheck(color)) return false;
        
        // Check if any move can get the king out of check
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.game.board[row][col];
                if (piece && piece.color === color) {
                    const validMoves = this.getValidMovesForPiece(row, col);
                    if (validMoves.length > 0) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    isStalemate(color) {
        if (this.isKingInCheck(color)) return false;
        
        // Check if the player has any valid moves
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.game.board[row][col];
                if (piece && piece.color === color) {
                    const validMoves = this.getValidMovesForPiece(row, col);
                    if (validMoves.length > 0) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    updateGameStatus() {
        const statusElement = document.getElementById('status-message');
        
        if (this.isCheckmate(this.game.currentPlayer)) {
            const winner = this.game.currentPlayer === 'white' ? 'Black' : 'White';
            statusElement.textContent = `Checkmate! ${winner} wins`;
            this.showGameOverModal(`${winner} wins by checkmate!`);
        } else if (this.isStalemate(this.game.currentPlayer)) {
            statusElement.textContent = 'Stalemate! Game is a draw';
            this.showGameOverModal('Game drawn by stalemate');
        } else if (this.isKingInCheck(this.game.currentPlayer)) {
            statusElement.textContent = `${this.game.currentPlayer === 'white' ? 'White' : 'Black'} is in check`;
        } else {
            statusElement.textContent = `${this.game.currentPlayer === 'white' ? 'White' : 'Black'}'s turn`;
        }
    }
    
    updateCapturedPiecesDisplay() {
        const whiteCapturedElement = document.querySelector('.white-captured');
        const blackCapturedElement = document.querySelector('.black-captured');
        
        whiteCapturedElement.innerHTML = '';
        blackCapturedElement.innerHTML = '';
        
        this.capturedPieces.black.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.className = `captured-piece black-${piece.type}`;
            whiteCapturedElement.appendChild(pieceElement);
        });
        
        this.capturedPieces.white.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.className = `captured-piece white-${piece.type}`;
            blackCapturedElement.appendChild(pieceElement);
        });
    }
    
    updateMoveHistory() {
        const movesListElement = document.getElementById('moves-list');
        movesListElement.innerHTML = '';
        
        for (let i = 0; i < this.moveHistory.length; i += 2) {
            const moveNumber = Math.floor(i / 2) + 1;
            const whiteMove = this.moveHistory[i];
            const blackMove = this.moveHistory[i + 1];
            
            const moveNumberElement = document.createElement('div');
            moveNumberElement.className = 'move-number';
            moveNumberElement.textContent = `${moveNumber}.`;
            
            const whiteMoveElement = document.createElement('div');
            whiteMoveElement.className = 'white-move';
            whiteMoveElement.textContent = whiteMove.moveNotation;
            
            movesListElement.appendChild(moveNumberElement);
            movesListElement.appendChild(whiteMoveElement);
            
            if (blackMove) {
                const blackMoveElement = document.createElement('div');
                blackMoveElement.className = 'black-move';
                blackMoveElement.textContent = blackMove.moveNotation;
                movesListElement.appendChild(blackMoveElement);
            } else {
                const emptyElement = document.createElement('div');
                emptyElement.className = 'black-move';
                movesListElement.appendChild(emptyElement);
            }
        }
        
        // Scroll to the bottom
        movesListElement.scrollTop = movesListElement.scrollHeight;
    }
    
    generateMoveNotation(fromRow, fromCol, toRow, toCol, isCapture) {
        const piece = this.game.board[toRow][toCol];
        if (!piece) return '';
        
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        
        const fromSquare = files[fromCol] + ranks[fromRow];
        const toSquare = files[toCol] + ranks[toRow];
        
        let notation = '';
        
        if (piece.type === 'king' && Math.abs(fromCol - toCol) === 2) {
            // Castling
            notation = toCol > fromCol ? 'O-O' : 'O-O-O';
        } else {
            // Regular move
            if (piece.type !== 'pawn') {
                notation += piece.type.charAt(0).toUpperCase();
            }
            
            if (isCapture) {
                if (piece.type === 'pawn') {
                    notation += files[fromCol];
                }
                notation += 'x';
            }
            
            notation += toSquare;
            
            // Pawn promotion
            if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
                notation += '=Q'; // Default to queen for now
            }
        }
        
        // Check and checkmate will be added later
        
        return notation;
    }
    
    showPromotionModal(row, col, color) {
        const modal = document.getElementById('promotion-modal');
        const options = modal.querySelectorAll('.piece-option');
        
        options.forEach(option => {
            option.className = `piece-option ${color}`;
            option.dataset.row = row;
            option.dataset.col = col;
            
            option.addEventListener('click', () => {
                const promotionPiece = option.dataset.piece;
                this.completePromotion(row, col, promotionPiece);
                modal.style.display = 'none';
            });
        });
        
        modal.style.display = 'flex';
    }
    
    completePromotion(row, col, pieceType) {
        const pawn = this.game.board[row][col];
        this.game.board[row][col] = new Piece(pieceType, pawn.color);
        
        // Update the last move in history
        const lastMove = this.moveHistory[this.moveHistory.length - 1];
        lastMove.promotion = pieceType;
        lastMove.moveNotation = lastMove.moveNotation.replace('=Q', `=${pieceType.charAt(0).toUpperCase()}`);
        
        this.updateMoveHistory();
        this.updateGameStatus();
        this.game.updateBoard();
    }
    
    showGameOverModal(message) {
        const modal = document.getElementById('game-over-modal');
        const messageElement = document.getElementById('game-result-message');
        
        messageElement.textContent = message;
        modal.style.display = 'flex';
        
        document.getElementById('new-game-modal-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            this.game.newGame();
        });
    }
    
    cloneBoard(board) {
        const newBoard = Array(8).fill().map(() => Array(8).fill(null));
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    newBoard[row][col] = new Piece(piece.type, piece.color);
                    newBoard[row][col].hasMoved = piece.hasMoved;
                }
            }
        }
        
        return newBoard;
    }
}