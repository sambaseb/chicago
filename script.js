function addPlayer() {
  const currentAmountOfPlayers = gameState.getState().length

  const playerName =
    prompt('Enter player name:') || `Player ${currentAmountOfPlayers + 1}`

  gameState.addPlayer(playerName)
  window.renderer.renderPlayers()
}

function removePlayer() {
  const playerName = prompt('Enter player name to remove:')

  gameState.removePlayer(playerName)
  window.renderer.renderPlayers()
}

function editName(index) {
  const newName = prompt('Edit player name:', players[index].name)
  if (newName) {
    players[index].name = newName

    window.renderer.renderPlayers()
  }
}

function resetGame() {
  gameState.clearState()
  window.renderer.renderPlayers()
}

function adjustPoints(direction) {
  const value = gameState.getCurrentSelection()
  const currentScoreItem = window.utils.scoreMap.findIndex(
    item => item.value === value
  )
  const newScore = window.utils.scoreMap[currentScoreItem + direction]

  // went out of bounds, there's no score like this
  if (!newScore) return

  gameState.setCurrentSelection(newScore.value)
  window.renderer.updateScoreLabel()
}

function changeScore(playerIndex) {
  const score = gameState.getCurrentSelection()

  gameState.addScore(playerIndex, score)

  if (score === 15) {
    window.shootConfetti()
  }

  gameState.setCurrentSelection(0)
  window.renderer.renderPlayers()
  window.renderer.updateScoreLabel()
}

function undo() {
  gameState.undoLastAction()
  window.renderer.renderPlayers()
}

// Attach functions to window to make them accessible in HTML
window.addPlayer = addPlayer
window.removePlayer = removePlayer
window.resetGame = resetGame
window.adjustPoints = adjustPoints
window.changeScore = changeScore
window.undo = undo

document.addEventListener('DOMContentLoaded', function () {
  // Ensure the players render when the page loads
  window.renderer.render()
})
