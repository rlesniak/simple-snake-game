class Api {
  constructor(callbacks) {
    this.data = {
      score: 0,
    }

    this.onScoreChange = () => {}
    this.onGameOver = () => {}
    this.onGameStart = () => {}
    this.onGamePause = () => {}

    if (_.isObject(callbacks)) {
      this.setCallbacks(callbacks)
    }
  }

  setCallbacks(callbacks = {}) {
    this.onScoreChange = callbacks.onScoreChange || (() => {})
    this.onGameOver = callbacks.onGameOver || (() => {})
    this.onGameStart = callbacks.onGameStart || (() => {})
    this.onGamePause = callbacks.onGamePause || (() => {})
  }

  set score(value) {
    this.data.score = value

    if (this.onScoreChange) {
      this.onScoreChange.call(null, value)
    }
  }
}

export default Api
