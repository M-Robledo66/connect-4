
const winningCombos = [
  [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
  [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
  [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
  [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
  [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
  [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
  [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
  [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
  [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
  [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
  [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
  [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
  [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
  [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
  [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
  [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
  [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
  [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
  [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
  [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
  [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
  [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
  [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')

const messageEl = document.getElementById('message')

const boardEl = document.querySelector('.board')

const resetBtn = document.getElementById('reset-btn')

const sound = new Audio('../assets/audio/button-3.mp3')

const winSound = new Audio('../assets/audio/winSound.wav')
/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)

resetBtn.addEventListener('click', init)
/*-------------------------------- Functions --------------------------------*/

init()

function handleClick(evt) {
  let sqIdx = parseInt(evt.target.id.replace('sq', ''))
  if (board[sqIdx] || winner) {
    return
  }
  startPoint = 35
  while (board[sqIdx + startPoint] !== null) {
    startPoint -= 7
  }
  board[sqIdx + startPoint] = turn
  theSound()
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()

}

function checkForWinner() {
  winningCombos.forEach(combo => {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]]) === 4) {
      winner = true
     winSounds()
    }
  })
}

function theSound() {
  sound.play()
  sound.volume = 0.25
}

function winSounds() {
  winSound.play()
  winSound.volume = 0.35


}

function switchPlayerTurn() {
  if (winner) return
  turn *= -1
}

function checkForTie() {
  if (board.includes(null)) return
  tie = true
}

function placePiece(idx) {
  board[idx] = turn
}

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}

function render() {
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach((boardVal, idx) => {
    if (boardVal === 1) {
      squareEls[idx].style.backgroundColor = 'red'

    } else if (boardVal === -1) {
      squareEls[idx].style.backgroundColor = 'blue'

    } else {
      squareEls[idx].style.backgroundColor = ''
    }
  })
}


function updateMessage() {

  if (!winner && !tie) {
    messageEl.textContent = `Player ${turn == 1 ? '1' : '2'}'s turn`
  } else if (!winner && tie) {
    messageEl.textContent = `Itssa tie ???????????`
  } else {
    messageEl.textContent = `Player ${turn === 1 ? '1' : '2'} wins the game!`
    confetti.start(1500)
  }
}





