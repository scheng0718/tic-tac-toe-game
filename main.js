const table = document.querySelector('#game-panel table')
const checkingLines = [
  row(1),
  row(2),
  row(3),
  column(1),
  column(2),
  column(3),
  [1, 5, 9],
  [3, 5, 7],
]
const positions = {
  circle: [],
  cross: [],
}
let clickingThrottle = false
let gameOverFlag = false

function row(number) {
  return [(number - 1) * 3 + 1, (number - 1) * 3 + 2, (number - 1) * 3 + 3]
}
function column(number) {
  return [number, number + 3, number + 6]
}

function draw (position, shape) {
  if (shape !== 'circle' && shape !== 'cross') {
    return console.error('Unknown drawing shape, must be one of: circle, cross')
  }
  const cell = document.querySelector(`#game-panel table tr td[data-index='${position}']`)
  cell.innerHTML = `<div class='${shape}'></div>`
}

function isPlayerWin(checkingPositions) {
  for (const line of checkingLines) {
    if (line.every((position) => checkingPositions.includes(position))) {
      return true
    }
  }
  return false
}
function checkIfWins (player) {
  let position = positions['circle']
  if (player === 'cross') {
    position = positions['cross']
  }
  const winningPlayer = isPlayerWin(position)
  if (winningPlayer) {
    gameOverFlag = true
    removeClickListeners()
    return alert(`${player} player won!`)
  }
  if (getEmptyPositions().length === 0) {
    gameOverFlag = true
    return alert("Tied!")
  }
  clickingThrottle = false
}

function removeClickListeners() {
  document.querySelectorAll("#game-panel table tr td").forEach((cell) => {
    cell.removeEventListener("click", onCellClicked);
  });
}

function computerMove() {
  const drawingPosition = getMostValuablePosition()
  draw(drawingPosition, 'cross')
  positions['cross'].push(drawingPosition)
  checkIfWins('cross')
}
function getEmptyPositions() {
  const allOccupiedPosition = positions['circle'].concat(positions['cross'])
  console.log(allOccupiedPosition)
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(position => !allOccupiedPosition.includes(position))
}
function getMostValuablePosition () {
  const emptyPositions = getEmptyPositions()
  let defendingPositions = []
  let randomIndex = Math.floor(Math.random() * emptyPositions.length)
  
  for (const position of emptyPositions) {
    const copiedCirclePositions = Array.from(positions['circle'])
    const copiedCrossPositions = Array.from(positions['cross'])

    copiedCirclePositions.push(position)
    copiedCrossPositions.push(position)
    
    if (isPlayerWin(copiedCrossPositions)) {
      return position
    }
    if (isPlayerWin(copiedCirclePositions)) {
      defendingPositions.push(position)
    }
  }
  if (defendingPositions.length) {
    return defendingPositions[0]
  }
  if (emptyPositions.includes(5)) {
    return 5
  }
  return emptyPositions[randomIndex]
}
function onCellClicked(event) {
  if (clickingThrottle) return
  const position = Number(event.target.dataset.index)
  if (!position) return

  draw(position, 'circle')
  positions["circle"].push(position)
  clickingThrottle = true
  setTimeout(() => {
    checkIfWins('circle')
    if (!gameOverFlag) {    
      computerMove()
    }  
  }, 100);
}
document.querySelectorAll('#game-panel table tr td').forEach((cell) => {
  cell.addEventListener('click', onCellClicked)
})

