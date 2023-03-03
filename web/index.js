const Ayoayo = require('@Ayoayo')

/**
 * @typedef {import ("../package")} Ayoayo
 *
 */

/**
 * @type {Ayoayo}
 */
let game
let currentEvent
let eventQueue = []
const pits = document.querySelectorAll('.pit')
const board = document.querySelector('.board')
const players = document.querySelectorAll('.player')
const helpModalBg = document.querySelector('.modal-bg')
const helpModal = document.querySelector('.help-modal')
const sowingHand = document.querySelector('.hand.sowing')
const turnBadges = document.querySelectorAll('.turn-badge')
const capturingHand = document.querySelector('.hand.capturing')
const winnerBadges = document.querySelectorAll('.winner-badge')
const noGamePadding = document.querySelector('.no-game-padding')
const closeHelpModal = document.querySelector('.help-modal-close')
const helpButton = document.querySelector('.controls button.help')
const newAiGameButton = document.querySelector('.controls button.ai')
const newPvPGameButton = document.querySelector('.controls button.pvp')

function getPitAtPosition (row, column) {
  return document.querySelector(`.side-${row + 1} .pit-${column + 1}`)
}

function getPitPosition (row, column) {
  const pit = getPitAtPosition(row, column)
  const pitRect = pit.getBoundingClientRect()
  const boardRect = board.getBoundingClientRect()
  return [pitRect.x - boardRect.x, pitRect.y - boardRect.y]
}

function getPitSummary (pit) {
  return pit.parentElement.querySelector('.pit-summary')
}

function setSummaryTextContent (elem, count) {
  elem.textContent = count === 0 ? '' : String(count)
}

function captureStoreByPlayer (player) {
  return document.querySelector(`.player-${player + 1} .captured`)
}

function getCaptureStorePosition (player) {
  const captureStore = captureStoreByPlayer(player)
  const captureStoreRect = captureStore.getBoundingClientRect()
  const boardRect = board.getBoundingClientRect()
  return [captureStoreRect.x - boardRect.x, captureStoreRect.y - boardRect.y]
}

function getCaptureStoreSummary (captureStore) {
  return captureStore.querySelector('.pit-summary')
}

function finishLastCapture () {
  // get seeds in capturing hand
  const seedsInCapturingHand = capturingHand.querySelectorAll('.seed')
  // get player that's capturing
  const playerThatCaptured = capturingHand.style.top[0] === '-' ? 0 : 1
  const captureStore = captureStoreByPlayer(playerThatCaptured)

  seedsInCapturingHand.forEach(seed => {
    // remove seed from capturing hand
    capturingHand.removeChild(seed)
    // add it to the capture store of the player capturing
    captureStore.appendChild(seed)
  })

  // get the pit for player capture store
  const pitSummary = getCaptureStoreSummary(captureStore)
  // update the count of seeds captured
  setSummaryTextContent(pitSummary, Number(pitSummary.textContent) + seedsInCapturingHand.length)
}

function updateTurnBadges (nextPlayer) {
  // get the other player
  const otherPlayer = Ayoayo.togglePlayer(nextPlayer)
  // show player turn text
  turnBadges.item(nextPlayer).style.display = 'inline-block'
  // hode other player turn text
  turnBadges.item(otherPlayer).style.display = 'none'
}

function handlePickupSeedsEvent (event, fractionDone) {
  if (fractionDone === 0) {
    // event emitted row and column
    const [row, column] = event.args
    // get position relative to the board
    const [handX, handY] = getPitPosition(row, column)
    sowingHand.style.left = `${handX}px`
    sowingHand.style.top = `${handY}px`

    // get pit
    const pit = getPitAtPosition(row, column)
    // get all seeds in a pit
    const seeds = pit.querySelectorAll('.seed')

    // remove seeds from pit and put in sowing hand
    seeds.forEach(seed => {
      pit.removeChild(seed)
      sowingHand.appendChild(seed)
    })

    // set the text summary of pit to zero
    setSummaryTextContent(getPitSummary(pit), 0)
  }
}

function handleMoveToEvent (event, fractionDone) {
  const [[initialRow, initialColumn], [nextRow, nextColumn]] = event.args
  // get pit position for initial pit before move
  const [initialPitX, initialPitY] = getPitPosition(initialRow, initialColumn)
  // get next pit position
  const [nextPitX, nextPitY] = getPitPosition(nextRow, nextColumn)
  // get current hand position
  const currentHandX = initialPitX + fractionDone * (nextPitX - initialPitX)
  const currentHandY = initialPitY + fractionDone * (nextPitY - initialPitY)
  // move hand to next position
  sowingHand.style.left = `${currentHandX}px`
  sowingHand.style.top = `${currentHandY}px`

  // show capturing of seeds
  finishLastCapture()
}

function handleDropSeedEvent (event, fractionDone) {
  if (fractionDone === 0) {
    const seedInHand = sowingHand.querySelector('.seed')
    // remove seed from current pit
    sowingHand.removeChild(seedInHand)

    const [row, column] = event.args
    const pit = getPitAtPosition(row, column)
    // add seed to next pit
    pit.appendChild(seedInHand)

    // get the number of seeds and increase by one
    const pitSummary = getPitSummary(pit)
    setSummaryTextContent(pitSummary, Number(pitSummary.textContent) + 1)
  }
}

function handleSwitchTurnEvent (event, fractionDone) {
  if (fractionDone === 0) {
    const [nextPlayer] = event.args
    // switch the turn badge
    updateTurnBadges(nextPlayer)
  }
}

function handleCaptureEvent (event, fractionDone) {
  /**
   * in the final turn, multiple captures happen consecutively
   * and need to be cleaned up before the next one.
   */
  if (fractionDone === 0) {
    finishLastCapture()
  }

  const [row, column, capturingPlayer] = event.args
  // get pit position
  const pit = getPitAtPosition(row, column)
  // get seeds inside pit
  const seedsInPit = pit.querySelectorAll('.seed')
  seedsInPit.forEach(seed => {
    // remove seed from pit
    pit.removeChild(seed)
    // add seed to capturing hand
    capturingHand.appendChild(seed)
  })

  // get the pit position so that the hand can show there
  const [pitX, pitY] = getPitPosition(row, column)
  // get the capture stor position
  const [captureStoreX, captureStoreY] = getCaptureStorePosition(capturingPlayer)

  const currentHandX = pitX + fractionDone * (captureStoreX - pitX)
  const currentHandY = pitY + fractionDone * (captureStoreY - pitY)
  capturingHand.style.left = `${currentHandX}px`
  capturingHand.style.top = `${currentHandY}px`

  setSummaryTextContent(getPitSummary(pit), 0)
}

function handleGameOverEvent (event, fractionDone) {
  if (fractionDone === 0) {
    finishLastCapture()

    const [winner] = event.args
    // remove turn text
    turnBadges.forEach(badge => {
      badge.style.display = 'none'
    })

    // handle draw
    if (winner === -1) {
      winnerBadges.forEach(badge => {
        badge.textContent = 'Draw!'
        badge.style.display = 'inline-block'
      })
      return
    }

    const badge = winnerBadges.item(winner)
    badge.textContent = 'Winner!'
    badge.style.display = 'inline-block'
  }
}

const eventTypeToHandler = {
  [Ayoayo.events.PICKUP_SEEDS]: handlePickupSeedsEvent,
  [Ayoayo.events.MOVE_TO]: handleMoveToEvent,
  [Ayoayo.events.DROP_SEED]: handleDropSeedEvent,
  [Ayoayo.events.SWITCH_TURN]: handleSwitchTurnEvent,
  [Ayoayo.events.CAPTURE]: handleCaptureEvent,
  [Ayoayo.events.GAME_OVER]: handleGameOverEvent
}

const DEFAULT_EVENT_DURATION = 200

function styleSeed (seed) {
  const parentWidth = seed.parentElement.clientWidth
  // by how much will the random position extend
  const range = (40 * parentWidth) / 90
  // from what point
  const offset = (-20 * parentWidth) / 90
  const r = Math.round(Math.random() * 360)
  const x = Math.round(Math.random() * range) + offset
  const y = Math.round(Math.random() * range) + offset
  seed.style.transform = `rotate(${r}deg) translate(${x}px, ${y}px)`
}

function initSeedStore (store, count) {
  // empty out pits
  store.querySelectorAll('.seed').forEach(seed => {
    store.removeChild(seed)
  })

  for (let i = 0; i < count; i++) {
    // create the seeds
    const seed = document.createElement('div')
    seed.classList.add('seed')
    // add seed to pit
    store.appendChild(seed)
    styleSeed(seed)
  }
}

function enableOnlyPermissiblePits () {
  const nextPlayer = game.nextPlayer
  const otherPlayer = Ayoayo.togglePlayer(game.nextPlayer)

  // disable pits for other player
  game.board[otherPlayer].forEach((_cell, cellIndex) => {
    const pit = getPitAtPosition(otherPlayer, cellIndex)
    pit.classList.add('disabled')
  })

  // disable pits that are not part of permissible moves
  game.board[nextPlayer].forEach((_cell, cellIndex) => {
    const pit = getPitAtPosition(nextPlayer, cellIndex)
    if (game.permissibleMoves.includes(cellIndex)) {
      pit.classList.remove('disabled')
    } else {
      pit.classList.add('disabled')
    }
  })
}

/**
 *
 * @param {Ayoayo} game
 */
function initDisplay (game) {
  // set in-game seeds
  game.board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const pit = getPitAtPosition(rowIndex, cellIndex)
      initSeedStore(pit, cell)
      setSummaryTextContent(getPitSummary(pit), cell)
    })
  })

  // set captured seeds
  game.captured.forEach((capturedCount, index) => {
    const capturedStore = captureStoreByPlayer(index)
    initSeedStore(capturedStore, capturedCount)
    setSummaryTextContent(getCaptureStoreSummary(capturedStore), capturedCount)
  });

  // clear seeds in hands
  [sowingHand, capturingHand].forEach(hand => {
    const seedInHand = hand.querySelectorAll('.seed')
    seedInHand.forEach(seed => {
      hand.removeChild(seed)
    })
  })

  // hide winner badges
  winnerBadges.forEach(badge => {
    badge.style.display = 'none'
  })

  // update turn badge
  updateTurnBadges(game.nextPlayer)

  // allow only permissible pits
  enableOnlyPermissiblePits()
}

function onGameEvent (type) {
  return function (...args) {
    eventQueue.push({ type, args })
  }
}

const onPickupSeeds = onGameEvent(Ayoayo.events.PICKUP_SEEDS)
const onMoveTo = onGameEvent(Ayoayo.events.MOVE_TO)
const onDropSeed = onGameEvent(Ayoayo.events.DROP_SEED)
const onSwitchTurn = onGameEvent(Ayoayo.events.SWITCH_TURN)
const onCapture = onGameEvent(Ayoayo.events.CAPTURE)
const onGameOver = onGameEvent(Ayoayo.events.GAME_OVER)

function onNewGame (playerTwoName) {
  game.on(Ayoayo.events.PICKUP_SEEDS, onPickupSeeds)
  game.on(Ayoayo.events.MOVE_TO, onMoveTo)
  game.on(Ayoayo.events.DROP_SEED, onDropSeed)
  game.on(Ayoayo.events.SWITCH_TURN, onSwitchTurn)
  game.on(Ayoayo.events.CAPTURE, onCapture)
  game.on(Ayoayo.events.GAME_OVER, onGameOver)

  players.forEach((player, index) => {
    player.style.display = 'block'
    if (index === 1) {
      const playerName = player.querySelector('.player-name')
      // show player name (either player 2 or AI)
      playerName.textContent = playerTwoName
    }
  })
  noGamePadding.style.display = 'none'

  initDisplay(game)

  // reset the event and event queue
  currentEvent = null
  eventQueue = []
}

function onClickNewPvPGame () {
  game = new Ayoayo()
  onNewGame('Player 2')
}

function onClickNewAiGame () {
  game = Ayoayo.vsMinimax()
  onNewGame('AI')
}
newAiGameButton.addEventListener('click', onClickNewAiGame)
newPvPGameButton.addEventListener('click', onClickNewPvPGame)
helpButton.addEventListener('click', () => {
  helpModalBg.style.display = 'block'
  helpModalBg.style.opacity = 1
  helpModal.style.display = 'flex'
  helpModal.style.opacity = 1
})
closeHelpModal.addEventListener('click', () => {
  helpModalBg.style.display = 'none'
  helpModalBg.style.opacity = 0
  helpModal.style.display = 'none'
  helpModal.style.opacity = 0
})
helpModalBg.addEventListener('click', () => {
  helpModal.style.opacity = 0
  helpModal.style.display = 'none'
  helpModalBg.style.opacity = 0
  helpModalBg.style.display = 'none'
})

function onClickPit (evt) {
  // only fire if pit isn't disabled
  if (game && !evt.currentTarget.classList.contains('disabled')) {
    // e.g. "3" is in index 4 in "pit-3"
    const startIndexOfCellIndex = 4
    const cellIndex = evt.currentTarget.classList.toString().split(' ').find(className => className.includes('pit-'))[startIndexOfCellIndex]
    game.play(cellIndex - 1)
  }
}

document.querySelectorAll('.side .pit').forEach(pit => {
  pit.addEventListener('click', onClickPit)
})

function init () {
  const seeds = document.querySelectorAll('.seed')
  seeds.forEach(seed => {
    styleSeed(seed)
  })
}

init()

function handleEventQueue (time) {
  if (!currentEvent) {
    if (eventQueue.length === 0) {
      window.requestAnimationFrame(handleEventQueue)
      return
    }

    currentEvent = eventQueue.shift()
    currentEvent.start = time
  }

  const fractionDone = (time - currentEvent.start) / DEFAULT_EVENT_DURATION
  if (fractionDone > 1) {
    // end of animation. enable permissible pits
    if (eventQueue.length === 0) {
      enableOnlyPermissiblePits()
    }

    // reset current event
    currentEvent = null
    // update animation before next repaint
    window.requestAnimationFrame(handleEventQueue)
    return
  }

  // disable all pits during animations
  pits.forEach(pit => {
    pit.classList.add('disabled')
  })

  const handler = eventTypeToHandler[currentEvent.type]
  handler(currentEvent, fractionDone)

  // update animation
  window.requestAnimationFrame(handleEventQueue)
}
window.requestAnimationFrame(handleEventQueue)
