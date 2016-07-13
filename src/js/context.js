class Context {
  constructor() {
    this.rectSize = 15
    this.ctxSize = { w: 750, h: 405 }
    this.ctx = document.getElementById('c').getContext('2d')
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctxSize.w, this.ctxSize.h)
  }

  drawRect(x, y, color = '#FF0000', isFilled = false) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, this.rectSize, this.rectSize)
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
