class Context {
  constructor() {
    this.size = 10
    this.ctxSize = 400
    this.ctx = document.getElementById('c').getContext('2d')
  }

  clear() {
    this.ctx.clearRect(0, 0, 400, 400)
  }

  drawRect(x, y, color = '#FF0000', isFilled = false) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, this.size, this.size)
    if (isFilled) {
      this.ctx.fillStyle = color
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    }
  }
}

export default Context
