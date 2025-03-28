document.addEventListener('DOMContentLoaded', function () {
  function renderPlayers() {
    const playersList = document.getElementById('playersList')
    playersList.innerHTML = ''

    const currentState = gameState.getState()

    currentState.forEach((player, index) => {
      let history = player.history ? player.history.join(' ') : ''

      playersList.innerHTML += `
        <div class="player">
            <div class="history"> ${history}</div>
            <div class="score"> ${player.score}</div>
            <span onclick="editName(${index})">${player.name}</span>
            <button class="submit-button" onclick="changeScore(${index})">⇧</button>
        </div>`
    })
  }

  function addPlayer() {
    const currentAmountOfPlayers = gameState.getState().length

    const playerName =
      prompt('Enter player name:') || `Player ${currentAmountOfPlayers + 1}`

    gameState.addPlayer(playerName)

    renderPlayers()
  }

  function removePlayer() {
    const playerName = prompt('Enter player name to remove:')
    gameState.removePlayer(playerName)

    renderPlayers()
  }

  function editName(index) {
    const newName = prompt('Edit player name:', players[index].name)
    if (newName) {
      players[index].name = newName

      renderPlayers()
    }
  }

  function resetGame() {
    gameState.clearState()

    renderPlayers()
  }

  function adjustPoints(amount) {
    const pointValue = document.getElementById('pointValue')
    pointValue.value = parseInt(pointValue.value) + amount
    updateScoreLabel()
  }

  function updateScoreLabel() {
    const label = document.getElementById('scoreLabel')
    let pointValue = parseInt(document.getElementById('pointValue').value, 10)

    if (isNaN(pointValue)) {
      label.textContent = 'Score: 0'
      return
    }

    const scoreMap = {
      1: 'One Pair',
      2: 'Two Pair',
      3: 'Three of a Kind',
      4: 'Straight',
      5: 'Flush',
      6: 'Full House',
      7: 'Four of a Kind',
      8: 'Straight Flush',
      20: 'Royal Flush',
      15: 'Chicago',
    }

    if (pointValue < -15 || pointValue > 20) {
      label.textContent =
        'Invalid Score: Please enter a value between -15 and 20.'
    } else {
      label.textContent = scoreMap[pointValue] || `-`
    }
  }

  function changeScore(index) {
    const pointInput = document.getElementById('pointValue')
    const pointValue = parseInt(pointInput.value, 10)

    if (!isNaN(pointValue) && pointValue >= -15 && pointValue <= 20) {
      gameState.addScore(index, pointValue)

      if (pointValue === 15) {
        window.shootConfetti()
      }

      renderPlayers()
      updateScoreLabel()
      pointInput.value = 0
    } else {
      alert('Please enter a value between -15 and 20.')
    }
  }

  function undo() {
    gameState.undoLastAction()
    renderPlayers()
  }

  // Attach functions to window to make them accessible in HTML
  window.addPlayer = addPlayer
  window.removePlayer = removePlayer
  window.resetGame = resetGame
  window.adjustPoints = adjustPoints
  window.updateScoreLabel = updateScoreLabel
  window.changeScore = changeScore
  window.undo = undo

  // Ensure the players render when the page loads
  renderPlayers()
})
