class Api {
  constructor(callbacks) {
    this.data = {
      score: 0,
    }

    if (_.isObject(callbacks)) {
      this.setCallbacks(callbacks)
    }
  }

  setCallbacks(callbacks = {}) {
    this.onScoreChange = callbacks.onScoreChange
    this.onGameOver = callbacks.onGameOver
    this.onGameStart = callbacks.onGameStart
    this.onGamePause = callbacks.onGamePause
  }

  set score(value) {
    this.data.score = value

    if (this.onScoreChange) {
      this.onScoreChange.call(null, value)
    }
  }

  gameOver() {
    if (this.onGameOver) {
      this.onGameOver.call(null, this.data.score)
    }
  }

  gameStart() {
    if (this.onGameStart) {
      this.onGameStart.call(null)
    }
  }

  gamePause() {
    if (this.onGamePause) {
      this.onGamePause.call(null)
    }
  }
}

export default Api
