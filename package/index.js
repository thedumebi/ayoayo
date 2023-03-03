const events = require('events')

const minimax = require('./minimax')

class Ayoayo extends events.EventEmitter {
  // game events
  static events = {
    GAME_OVER: 'game_over',
    DROP_SEED: 'drop_seed',
    SWITCH_TURN: 'switch_turn',
    MOVE_TO: 'move_to',
    PICKUP_SEEDS: 'pickup_seeds',
    CAPTURE: 'capture'
  }

  constructor () {
    super()
    /*
    * The board
    * sideways i.e. => is the row (nextPositionRow)
    * downward or each individual item in the row is the cell (nextPositionCell)
    */
    this.board = [
      [4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4]
    ]
    // number of captured seeds
    this.captured = [0, 0]
    // next player
    this.nextPlayer = 0
    // game over flag
    this.isGameOver = false
    // winner
    this.winner = null
    // permissible moves that can be made
    this.permissibleMoves = [0, 1, 2, 3, 4, 5]
    // total number of seed in the game i.e. 12 * 4
    this.TOTAL_NUM_SEEDS = 48
    // number of cells in a row
    this.NUM_CELLS_PER_ROW = 6
  }

  /**
   * cell in the board
   * @param {number} cell
   */
  play (cell) {
    if (!this.permissibleMoves.includes(cell)) {
      throw new Error('Not permitted to play this cell')
    }

    // relay-sow. update board and increment captures
    let captured
    [this.board, captured] = this.#relaySow(
      this.board,
      this.nextPlayer,
      cell,
      (eventType, ...args) => this.emit(eventType, ...args)
    )
    this.captured[0] += captured[0]
    this.captured[1] += captured[1]

    // Toggle to next player
    this.nextPlayer = Ayoayo.togglePlayer(this.nextPlayer)
    this.emit(Ayoayo.events.SWITCH_TURN, this.nextPlayer)

    // get the next player permissible moves
    this.permissibleMoves = this.#getPermissibleMoves(this.board, this.nextPlayer)

    /**
     * no point in proceeding if next player has no more moves
     * or if someone has more than half of the seeds
     */
    const shouldEndGame = this.permissibleMoves.length === 0 || this.captured.some(count => count > this.TOTAL_NUM_SEEDS / 2)

    // capture the remaining seeds if the opponent is out of moves
    const shouldCaptureRemainingSeeds = this.permissibleMoves.length === 0
    if (shouldCaptureRemainingSeeds) {
      let numberOfRemainingSeeds = 0
      this.board[this.nextPlayer] = this.board[this.nextPlayer].map((cell, index) => {
        numberOfRemainingSeeds += cell
        this.emit(Ayoayo.events.CAPTURE, this.nextPlayer, index, this.nextPlayer)
        return 0
      })
      this.captured[this.nextPlayer] += numberOfRemainingSeeds
    }

    if (shouldEndGame) {
      this.permissibleMoves = []
      this.isGameOver = true
      this.winner = this.#getWinner(this.captured)
      this.emit(Ayoayo.events.GAME_OVER, this.winner)
    }
  }

  /**
   * Sow the seeds starting from cell
   * Returns the updated board and number of captured seeds
   * Reports events by calling emit
   *
   * @param {*} board game board
   * @param {*} player current player
   * @param {*} cell current cell picking from
   * @param {*} emit  emit events while sowing
   */
  #relaySow (board, player, cell, emit = () => {}) {
    const captured = [0, 0]

    // pick up seeds
    let numberOfSeedsInHand = board[player][cell]
    emit(Ayoayo.events.PICKUP_SEEDS, player, cell)
    board[player][cell] = 0

    // move to next cell position
    let nextPosition = this.#next(player, cell)
    emit(Ayoayo.events.MOVE_TO, [player, cell], nextPosition)
    let [nextPositionRow, nextPositionCell] = nextPosition

    /*
      * continue to move. Terminate when all seeds have been dropped
      * and can't pickup again.
      */
    while (numberOfSeedsInHand > 0) {
    // drop one seed in next cell
      board[nextPositionRow][nextPositionCell]++
      numberOfSeedsInHand--
      emit(Ayoayo.events.DROP_SEED, nextPositionRow, nextPositionCell)

      /**
       * If the cell has four seeds then capture. If this is the last seed in hand,
       * give the current player. If not, give to the owner of the row.
       */
      if (board[nextPositionRow][nextPositionCell] === 4) {
        const capturer = numberOfSeedsInHand === 0 ? player : nextPositionRow
        captured[capturer] += 4
        // make the seeds in the captured cell zero
        board[nextPositionRow][nextPositionCell] = 0
        emit(Ayoayo.events.CAPTURE, nextPositionRow, nextPositionCell, capturer)
      }

      /**
       * relay if this is the last seed in hand and the cell was not originally empty
       * pickup the seeds in the cell so before dropping the last seed the cell had one or
       * more seeds
       */
      if (numberOfSeedsInHand === 0 && board[nextPositionRow][nextPositionCell] > 1) {
        // pickup all seeds in the cell
        numberOfSeedsInHand = board[nextPositionRow][nextPositionCell]
        // set the seeds in the cell to zero
        board[nextPositionRow][nextPositionCell] = 0
        emit(Ayoayo.events.PICKUP_SEEDS, nextPositionRow, nextPositionCell)
      }

      // move to next position
      nextPosition = this.#next(nextPositionRow, nextPositionCell)
      emit(Ayoayo.events.MOVE_TO, [nextPositionRow, nextPositionCell], nextPosition);
      [nextPositionRow, nextPositionCell] = nextPosition
    }

    return [board, captured]
  }

  /**
   * Toggles players
   *
   * @param {number} player current player
   * @returns {number} other player
   */
  static togglePlayer (player) {
    return (player + 1) % 2
  }

  /**
   * Returns a list of all possible cells that the next player can play
   * A player must only play cells with at least one seed.
   * If the other player has no seeds, the current player must "feed" them if possible
   *
   * @param {Array[]} board game board
   * @param {number} player current player
   * @returns {number[]}
   */
  #getPermissibleMoves (board, player) {
    const otherPlayer = Ayoayo.togglePlayer(player)
    // get the non empty cells the player has
    const nonEmptyCellIndexes = board[player].map((_, index) => index).filter(seeds => board[player][seeds] > 0)

    // if the other player has seeds, permit all non-empty cells
    const otherPlayerHasSeeds = board[otherPlayer].some(cell => cell > 0)
    if (otherPlayerHasSeeds) {
      return nonEmptyCellIndexes
    }

    // if other player has no seeds, permit only non-empty cells that feed them
    return nonEmptyCellIndexes.filter(cellIndex => {
      // clone board
      const boardCopy = board.map(row => row.slice())
      // simulate the play
      const [boardIfCellPlayed] = this.#relaySow(boardCopy, player, cellIndex)
      // return if the play would lead to non empty cells
      return boardIfCellPlayed[otherPlayer].some(cell => cell > 0)
    })
  }

  /**
   * returns the winning player, or -1, if draw
   * @param {Number[]} captured
   * @returns
   */
  #getWinner (captured) {
    if (captured[0] === captured[1]) return -1
    if (captured[0] > captured[1]) return 0
    return 1
  }

  /**
   *  Returns the next position moving counter-clockwise from the given row and cell
   * @param {number} row row number on board
   * @param {number} cell cell number on board
   * @returns {number[]}
   */
  #next (row, cell) {
    if (row === 0) return cell === 0 ? [1, 0] : [0, cell - 1]
    return cell === this.NUM_CELLS_PER_ROW - 1
      ? [0, this.NUM_CELLS_PER_ROW - 1]
      : [1, cell + 1]
  }

  /**
   * Returns a copy of the game state. event listeners are not copied
   */
  clone () {
    const clone = new Ayoayo()
    clone.winner = this.winner
    clone.captured = this.captured.slice()
    clone.board = this.board.map(row => row.slice())
    clone.permissibleMoves = this.permissibleMoves.slice()
    clone.nextPlayer = this.nextPlayer

    return clone
  }

  static vsMinimax (depth = 5) {
    const game = new Ayoayo()
    const oldPlayFunc = game.play.bind(game)
    game.play = function minimaxPlay (...args) {
      oldPlayFunc(...args)
      if (game.winner == null) {
        const [, moves] = minimax(game, depth, '', game.nextPlayer === 0)
        const move = Number(moves[0])
        oldPlayFunc(move)
      }
    }

    return game
  }
}

module.exports = Ayoayo
