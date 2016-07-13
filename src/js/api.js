class Api {
  constructor(callbacks) {
    this.data = {
      score: 0
    }

    if (_.isObject(apiCallbacks)) {
      this.setCallbacks(apiCallbacks)
    }
  }

  set score(value) {
    this.data.score = value

    if (this.onScoreChange) {
      this.onScoreChange(value)
    }
  }

  setCallbacks(options = {}) {
    this.onScoreChange = options.onScoreChange
    this.onGameOver = options.onGameOver
  }

  gameOver() {
    if (this.onGameOver) {
      this.onGameOver(this.data.score)
    }
  }
}
