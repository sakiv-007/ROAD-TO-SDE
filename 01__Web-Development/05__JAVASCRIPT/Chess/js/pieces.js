// Chess pieces and their movement logic
class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.hasMoved = false;
    }
    
    getValidMoves(board, row, col) {
        switch(this.type) {
            case 'pawn':
                return this.getPawnMoves(board, row, col);
            case 'rook':
                return this.getRookMoves(board, row, col);
            case 'knight':
                return this.getKnightMoves(board, row, col);
            case 'bishop':
                return this.getBishopMoves(board, row, col);
            case 'queen':
                return this.getQueenMoves(board, row, col);
            case 'king':
                return this.getKingMoves(board, row, col);
            default:
                return [];
        }
    }
    
    getPawnMoves(board, row, col) {
        const moves = [];
        const direction = this.color === 'white' ? -1 : 1;
        const startRow = this.color === 'white' ? 6 : 1;
        
        // Move forward one square
        if (board[row + direction]?.[col] === null) {
            moves.push({ row: row + direction, col: col, capture: false });
            
            // Move forward two squares from starting position
            if (row === startRow && board[row + 2 * direction]?.[col] === null) {
                moves.push({ row: row + 2 * direction, col: col, capture: false });
            }
        }
        
        // Capture diagonally
        const captureDirections = [{ row: direction, col: -1 }, { row: direction, col: 1 }];
        
        for (const dir of captureDirections) {
            const newRow = row + dir.row;
            const newCol = col + dir.col;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece && targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol, capture: true });
                }
                
                // En passant (to be implemented)
            }
        }
        
        return moves;
    }
    
    getRookMoves(board, row, col) {
        const moves = [];
        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ];
        
        for (const dir of directions) {
            let newRow = row + dir.row;
            let newCol = col + dir.col;
            
            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece === null) {
                    moves.push({ row: newRow, col: newCol, capture: false });
                } else {
                    if (targetPiece.color !== this.color) {
                        moves.push({ row: newRow, col: newCol, capture: true });
                    }
                    break;
                }
                
                newRow += dir.row;
                newCol += dir.col;
            }
        }
        
        return moves;
    }
    
    getKnightMoves(board, row, col) {
        const moves = [];
        const knightMoves = [
            { row: -2, col: -1 }, { row: -2, col: 1 },
            { row: -1, col: -2 }, { row: -1, col: 2 },
            { row: 1, col: -2 }, { row: 1, col: 2 },
            { row: 2, col: -1 }, { row: 2, col: 1 }
        ];
        
        for (const move of knightMoves) {
            const newRow = row + move.row;
            const newCol = col + move.col;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece === null) {
                    moves.push({ row: newRow, col: newCol, capture: false });
                } else if (targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol, capture: true });
                }
            }
        }
        
        return moves;
    }
    
    getBishopMoves(board, row, col) {
        const moves = [];
        const directions = [
            { row: -1, col: -1 }, // up-left
            { row: -1, col: 1 },  // up-right
            { row: 1, col: -1 },  // down-left
            { row: 1, col: 1 }    // down-right
        ];
        
        for (const dir of directions) {
            let newRow = row + dir.row;
            let newCol = col + dir.col;
            
            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece === null) {
                    moves.push({ row: newRow, col: newCol, capture: false });
                } else {
                    if (targetPiece.color !== this.color) {
                        moves.push({ row: newRow, col: newCol, capture: true });
                    }
                    break;
                }
                
                newRow += dir.row;
                newCol += dir.col;
            }
        }
        
        return moves;
    }
    
    getQueenMoves(board, row, col) {
        // Queen combines rook and bishop moves
        return [
            ...this.getRookMoves(board, row, col),
            ...this.getBishopMoves(board, row, col)
        ];
    }
    
    getKingMoves(board, row, col) {
        const moves = [];
        const kingMoves = [
            { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
            { row: 0, col: -1 }, { row: 0, col: 1 },
            { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
        ];
        
        for (const move of kingMoves) {
            const newRow = row + move.row;
            const newCol = col + move.col;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = board[newRow][newCol];
                
                if (targetPiece === null) {
                    moves.push({ row: newRow, col: newCol, capture: false });
                } else if (targetPiece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol, capture: true });
                }
            }
        }
        
        // Castling (to be implemented with proper checks)
        if (!this.hasMoved) {
            // Kingside castling
            if (board[row][col + 1] === null && 
                board[row][col + 2] === null && 
                board[row][col + 3]?.type === 'rook' && 
                !board[row][col + 3]?.hasMoved) {
                moves.push({ row: row, col: col + 2, capture: false, castling: 'kingside' });
            }
            
            // Queenside castling
            if (board[row][col - 1] === null && 
                board[row][col - 2] === null && 
                board[row][col - 3] === null && 
                board[row][col - 4]?.type === 'rook' && 
                !board[row][col - 4]?.hasMoved) {
                moves.push({ row: row, col: col - 2, capture: false, castling: 'queenside' });
            }
        }
        
        return moves;
    }
}