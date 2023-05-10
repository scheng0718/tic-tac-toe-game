const table = document.querySelector('#game-panel table')
let currentPlayer = 'circle'
let playerPositions = []
let computerPositions = []

function draw (cell) {
  cell.innerHTML = `<div class='${currentPlayer}'></div>`
}
function recordPositions (position) {
  const positionIndex = Number(position.dataset.index)
  if (currentPlayer === 'circle') {
    playerPositions.push(positionIndex)
  } else {
    computerPositions.push(positionIndex)
  }
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'
}
table.addEventListener('click', function onTableClicked(event) {
  draw(event.target)
  recordPositions(event.target)
})

