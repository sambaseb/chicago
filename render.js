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

function updateScoreLabel() {
  const currentValue = gameState.getCurrentSelection()
  const label = document.getElementById('scoreLabel')
  const pointValue = document.getElementById('pointValue')

  pointValue.value = currentValue

  if (isNaN(currentValue)) {
    label.textContent = 'Score: 0'
    return
  }

  label.innerHTML = window.utils.getScoreMapItem(currentValue)?.name || '&nbsp;'
}

function render() {
  renderPlayers()
  updateScoreLabel()
}

/**
 * public api
 */
window.renderer = {
  render,
  renderPlayers,
  updateScoreLabel,
}
