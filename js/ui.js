export function gameOver() {
  const $el = $('.game-over-overlay')

  return {
    show(score) {
      $el.find('#score').text(score)
      $el.show()
    },

    hide() {
      $el.hide()
    },
  }
}

export function game() {
  const $el = $('.board-stats')

  return {
    updateScore(score) {
      $el.find('#score').text(score)
    },
  }
}
