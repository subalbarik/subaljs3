
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const gameStatus = document.getElementById('gameStatus');
    const gameBoard = document.getElementById('gameBoard');
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

    function checkWin() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player${currentPlayer} wins!`;
            gameActive = false;
            return true;
        }
 
        if (!board.includes('')) {
            gameStatus.textContent = "It's a draw!";
            gameActive = false;
            return true;
        }

        return false;
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute('data-index');

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

       
        if (!checkWin()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function restartGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        gameStatus.textContent = '';
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }

    document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    