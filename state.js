/**
 * constants
 */
const INITIAL_STATE = {
  current: [], // the score rendered on screen
  history: [], // a list of all previous scores/states
}

/**
 * history cache
 */
const storage = {
  set(state) {
    localStorage.setItem('game', JSON.stringify(state))
  },
  get() {
    return JSON.parse(localStorage.getItem('game'))
  },
}

/**
 * internal state
 */
let _state = storage.get() || INITIAL_STATE

/**
 * exposed api
 */
window.gameState = {
  getState() {
    return _state.current
  },

  clearState() {
    _state = INITIAL_STATE
    storage.set(_state)
  },

  addPlayer(name) {
    // save the current state in the history
    _state.history.push(copyObject(_state.current))

    const newPlayer = {
      name: name,
      score: 0,
      history: [],
    }

    _state.current.push(newPlayer)

    // save game between window reloads
    storage.set(_state)
  },

  removePlayer(name) {
    _state.history.push(copyObject(_state.current))
    _state.current = _state.current.filter(player => player.name !== name)
    storage.set(_state)
  },

  addScore(player, score) {
    // save the current state in the history
    _state.history.push(copyObject(_state.current))

    _state.current[player].score += score
    _state.current[player].history.push(score)

    // save game between window reloads
    storage.set(_state)
  },

  undoLastAction() {
    // make the last element in the history array the current state
    _state.current = _state.history[_state.history.length - 1]
    // remove the last history element (which is now the current state)
    _state.history.pop()

    storage.set(_state)
  },
}

/**
 * helper functions
 */
function copyObject(object) {
  return JSON.parse(JSON.stringify(object))
}
