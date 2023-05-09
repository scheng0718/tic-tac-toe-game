const table = document.querySelector('#game-panel table')
let currentPlayer = 'circle'

function draw (cell) {
  cell.innerHTML = `<div class='${currentPlayer}'></div>`
}

table.addEventListener('click', function onTableClicked(event) {
  draw(event.target)
  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'
})

