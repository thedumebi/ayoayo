const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const Ayoayo = require('@Ayoayo')

readline.write(`
   █████  ██    ██  ██████   █████  ██    ██  ██████
  ██   ██  ██  ██  ██    ██ ██   ██  ██  ██  ██    ██
  ███████   ████   ██    ██ ███████   ████   ██    ██
  ██   ██    ██    ██    ██ ██   ██    ██    ██    ██
  ██   ██    ██     ██████  ██   ██    ██     ██████

  Let's play!
  To begin, enter the column number for the cell you wish to pick from (1-6).
`)

const ayoayo = new Ayoayo()

function padCell (value) {
  if (value < 10) {
    return ' ' + value
  }

  return '' + value
}

/**
 * Displays the game board
 *
 * @param {Array[]} board game board
 * @param {Number[]} captured captured array showing number of seeds captured by each player
 * @returns {String} Updated Board CLI string
 */
function boardText (board, captured) {
  let s = '\n\n             1      2      3      4      5      6       Captured\n         -------------------------------------------  ------------\n'

  board.forEach((row, rowIndex) => {
    s += `Player ${rowIndex + 1} |`
    row.forEach((cell) => {
      s += `  ${padCell(cell)}  |`
    })

    const capturedCount = padCell(captured[rowIndex])
    s += `  |    ${capturedCount}    |\n         -------------------------------------------  ------------\n`
  })

  return s
}

/**
 * Requests for user input for the game
 */
function requestUserInput () {
  // print out the current board before next play
  readline.write(boardText(ayoayo.board, ayoayo.captured))

  // end if game is over
  if (ayoayo.isGameOver) {
    readline.write(`GAME OVER. Winner: Player ${ayoayo.winner + 1}`)
    readline.close()
    return
  }

  // ask user for input. e.g. If user inputs 1, then that's cell number 0.
  const question = `\nPlayer ${ayoayo.nextPlayer + 1}'s turn. Pick a cell (1-6): `
  readline.question(question, cell => {
    const cellNumber = Number(cell)
    // check if valid input
    if (Number.isNaN(cellNumber) || !ayoayo.permissibleMoves.includes(cellNumber - 1)) {
      readline.write('Please enter a valid and allowed cell index.')
      requestUserInput()
      return
    }

    // play game which would relay sow the seeds.
    ayoayo.play(cellNumber - 1)
    // ask for next user input
    requestUserInput()
  })
}

requestUserInput()
