const table = document.querySelector('#game-panel table')
const currentPlayer = ['Player', 'Computer']
const winningConditions = [
  row(1),
  row(2),
  row(3),
  column(1),
  column(2),
  column(3),
  [1, 5, 9],
  [3, 5, 7],
]
let shape = 'circle'
let emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let playerPositions = []
let computerPositions = []


function row (number) {
  return [(number - 1) * 3 + 1, (number - 1) * 3 + 2, (number - 1) * 3 + 3]
}
function column (number) {
  return [number, number + 3, number + 6]
}

function draw (cell) {
  cell.innerHTML = `<div class='${shape}'></div>`
}

function recordPositions (position) {
  const positionIndex = Number(position.dataset.index)
  if (shape === 'circle') {
    playerPositions.push(positionIndex)
  } else {
    computerPositions.push(positionIndex)
  }
}

function removeFromEmpty (position) {
  const positionIndex = Number(position.dataset.index)
  const deletedIndex = emptyPositions.findIndex(element => element === positionIndex)
  emptyPositions.splice(deletedIndex, 1)
  console.log(emptyPositions)
}
function checkIfWins (positions, player) {
  for (condition of winningConditions) {
    if (condition.every(position => positions.includes(position))) {
      return console.log(`${player} wins the game!`)
    }
  }
  if (emptyPositions.length === 0) {
    return console.log("ties!")
  }
}

table.addEventListener('click', function onTableClicked(event) {
  draw(event.target)
  recordPositions(event.target)
  removeFromEmpty(event.target)
  if (shape === 'circle') {
    checkIfWins(playerPositions, currentPlayer[0])
  } else {
    checkIfWins(computerPositions, currentPlayer[1])
  }
  shape = shape === 'circle' ? 'cross':'circle'
})

