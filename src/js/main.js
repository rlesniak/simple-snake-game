import Game from './game'

const $overlay = $('.game-over-overlay')
const $stats = $('.board-stats')

const options = {
  events: {
    onScoreChange: (score) => {
      $stats.find('#score').text(score)
    },
    onGameOver: (score) => {
      $overlay.find('#score').text(score)
      $overlay.show()
    },
    onGameStart: () => {
      $overlay.hide()
    },
  },
}

const g = new Game(options)
g.init()
g.start()
