export function gameOver() {
  const $el = $('.game-over-overlay')

  return {
    show() {
      $el.show()
    },

    hide() {
      $el.hide()
    },
  }
}
